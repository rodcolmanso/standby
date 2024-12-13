const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cPayments= database.collection(process.env.MONGODB_COLLECTION_SHOOTER_PAYMENTS);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    const cBankPaymentHistory= database.collection(process.env.MONGODB_COLLECTION_BANK_PAYMENT_HISTORY);
    const cMembershipNum    = database.collection(process.env.MONGODB_COLLECTION_MEMBERSHIP_NUM);
    
    
    switch (event.httpMethod){
      case 'GET':

        return  {
          statusCode: 200,
          body: JSON.stringify({payments:[]})
        };

        case 'POST':

        // event.body= {
        //     pix: [
        //       {
        //         endToEndId: 'E00416968202412112221qapP7TCNVbG',
        //         txid: '7978c0c97ea847e78e8849634473c1f1',
        //         valor: '1.0',
        //         chave: '8900bada-fda4-4544-97e6-701b7041b8ef',
        //         horario: '2024-12-11T01:21:58.289Z',
        //         infoPagador: 'pagamento SandBox',
        //         componentesValor: [Object],
        //         devolucoes: []
        //       }
        //     ]
        //   }


        let paymentData= JSON.parse(event.body);

        console.log('===================WEBHOOK POST =================');  
        console.log('==== context=',context);
        console.log('==== event.body=',paymentData);
        console.log('==== event=',event);
        console.log('=================================================');

        
        for(let i=0; i< paymentData.pix.length;i++){

            let filterPayment= {bankTxId: paymentData.pix[i].txid
              ,pixKey: paymentData.pix[i].chave
              ,value: paymentData.pix[i].valor}

            const paymentTb= await cPayments.aggregate([
              { $addFields: {"_shooterId": { $toObjectId: "$shooterId" }}}
              ,{$match:filterPayment}
              ,{$lookup:{
                from: process.env.MONGODB_COLLECTION_SHOOTERS
                ,localField: "_shooterId"
                ,foreignField: "_id"
                ,as: "shooter"
                }
              }
              ]            
            ).toArray();

            let updatePaymentPayload= {};
            let updateShooterPayload= {};

            if(paymentTb.length>0){
                //update payment
                updatePaymentPayload.status= 0;
                updatePaymentPayload.paymentDate= new Date(paymentData.pix[i].horario);
                updatePaymentPayload.bankEndToEndId= paymentData.pix[i].endToEndId;
                updatePaymentPayload.paymentInfo= paymentData.pix[i].infoPagador;
                updatePaymentPayload.last_updater= 'webhook';
                updatePaymentPayload.last_updater_date= new Date();

                // let _ObjPayId = new ObjectId(paymentTb[0]._id);
                let _ObjPayId = paymentTb[0]._id;
                await cPayments.updateOne({_id: _ObjPayId },{
                  $set: updatePaymentPayload
                });

                // add membershipNum if it does not exist
                if(!paymentTb[0].shooter[0].membershipNumber){

                  let membershipRet= await cMembershipNum.insertOne({
                    shooterId: paymentTb[0].shooter[0]._id
                    ,bankEndToEndId: updatePaymentPayload.bankEndToEndId
                    ,inserter: 'webhook'
                    ,inserter_date: new Date()
                  });

                  console.log('membershipRet= ', membershipRet);

                  paymentTb[0].shooter[0].membershipNumber= cMembershipNum.find({_id: membershipRet.insertedId}).toArray()[0].membershipNumber;
                  console.log('paymentTb[0].shooter[0].membershipNumber=', paymentTb[0].shooter[0].membershipNumber);
                  
                }

                if(!paymentTb[0].shooter[0].membershipStart){
                  paymentTb[0].shooter[0].membershipStart= paymentTb[0].termIni;
                }

                if(!paymentTb[0].shooter[0].membershipEnd || paymentTb[0].shooter[0].membershipEnd.getTime()<paymentTb[0].termEnd.getTime()){
                  paymentTb[0].shooter[0].membershipStart= paymentTb[0].termEnd;
                }

                //update user with membership
                updateShooterPayload= {
                  membershipNumber: paymentTb[0].shooter[0].membershipNumber
                  ,membershipStart: paymentTb[0].shooter[0].membershipStart
                  ,membershipEnd: paymentTb[0].shooter[0].membershipEnd
                  ,membershipStatus: 0
                }

                await cShooters.updateOne({_id: paymentTb[0].shooter[0]._id},{
                  $set: updateShooterPayload
                });

                paymentData.pix[i].shooterId= paymentTb[0].shooter[0]._id;
                paymentData.pix[i].shooter_payment_id= paymentTb[0]._id;

            }

            paymentData.pix[i].inserter= 'webhook';
            paymentData.pix[i].inserter_date= new Date();
                    
            paymentData.pix[i].headers           = event.headers;
            paymentData.pix[i].multiValueHeaders = event.multiValueHeaders;

            cBankPaymentHistory.insertOne(
              paymentData.pix[i]
            );
            
          }
        
          return  {
            statusCode: 200,
            body: JSON.stringify([])
          };

        
        case 'DELETE':


              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}