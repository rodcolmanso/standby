const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cCollectionGun= database.collection(process.env.MONGODB_COLLECTION_GUN_COLLECTION);
    const cPayments= database.collection(process.env.MONGODB_COLLECTION_MEMBERSHIP_PAYMENTS);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    
    let userContext=null;
    try{
      const rawNetlifyContext = context.clientContext.custom.netlify;
      const netlifyContext = Buffer.from(rawNetlifyContext, 'base64').toString('utf-8');
      const { identity, user } = JSON.parse(netlifyContext);
      
      if(!user || !user.email ){
        throw new Error('Error getting user new method');
      }
      userContext= user;
    }catch(e){
      userContext= context.clientContext.user;
    }

    if(!userContext || !userContext.email){
       return  {
        statusCode: 401,
        body: `Unauthorized, User not logged!`
      }; 
    }

    const isAdmin= userContext.app_metadata && userContext.app_metadata.roles && (userContext.app_metadata.roles.indexOf("admin")>-1||userContext.app_metadata.roles.indexOf("super")>-1);
    let filter= {};

    switch (event.httpMethod){
      case 'GET':

        
        const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;
        const mmembersOnly= event.queryStringParameters.mmembersOnly?event.queryStringParameters.mmembersOnly.toString().toLowerCase():null;
        
        filter= {};

        if(mmembersOnly==='true')
          filter= {payments: {$ne: []}};
        
        if(p_shooterId!==null){
          filter._shooterId= p_shooterId;
        }

        if(!userContext.app_metadata || !userContext.app_metadata.roles || (userContext.app_metadata.roles.indexOf("admin")<0 && userContext.app_metadata.roles.indexOf("super")<0)){
          filter.email= userContext.email.toLowerCase().trim();
        }

        let filterPayment= {};

        if(event.queryStringParameters.status){
          filterPayment.status= event.queryStringParameters.status;
        }
        
        if(event.queryStringParameters.referringTo){
          filterPayment.referringTo= event.queryStringParameters.referringTo;
        }

        if(event.queryStringParameters.paymentId){
          filterPayment._id= new ObjectId(event.queryStringParameters.paymentId);
        }

        if(event.queryStringParameters.paymentDateIni){
          filterPayment.paymentDate= {$gte: ISODate(event.queryStringParameters.paymentDateIni)};
        }

        if(event.queryStringParameters.paymentDateEnd){
          filterPayment.paymentDate= {$lte: ISODate(event.queryStringParameters.paymentDateEnd)};
        }

        
        if(event.queryStringParameters.issueDateIni){
          filterPayment.issueDate= {$gte: ISODate(event.queryStringParameters.issueDateIni)};
        }
        if(event.queryStringParameters.issueDateEnd){
          filterPayment.issueDate= {$lte: ISODate(event.queryStringParameters.issueDateEnd)};
        }

        if(event.queryStringParameters.termDate){
          filterPayment.termIni= {$lte: new Date(event.queryStringParameters.termDate)};
          filterPayment.termEnd= {$gte: new Date(event.queryStringParameters.termDate)};
        }

        console.log("filter=", JSON.stringify(filter,null,2));
        console.log("filterPayment=", JSON.stringify(filterPayment,null,2));

        let userPayments= await cShooters.aggregate([
          { $addFields: {"_shooterId": { "$toString": "$_id" }}}
          ,{$lookup:{
              from: "membership_payments"
              ,localField: "_shooterId"
              ,foreignField: "shooterId"
              ,as: "payments"
              ,pipeline:[
                  {$match:filterPayment}
                  ,{ $sort : { termIni : 1 }}
                ]
              }
          }

          ,{$lookup:{
            from: "time_records"
            ,localField: "_shooterId"
            ,foreignField: "shooterId"
            ,as: "time_records"
            ,pipeline:[
              {$addFields: {
                    "truncDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$datetime" } }
                }
              },
            { $match:{$expr:{$gt:[
                                  "$datetime",
                                   {
                                      $dateSubtract:
                                         {
                                            startDate: "$$NOW",
                                            unit: "month",
                                            amount: 12
                                         }
                                   }
                               ]}}
                },
                {$group: {
                    _id: {truncDate:"$truncDate", shooterDivisionId: "$shooterDivisionId"}
                    ,y: {$first:"$datetime"}
                }
              },
                { $sort : { y : 1 }}
              ]
            }
        }

          ,{$match:filter}
        ]).toArray();
        let d= new Date();
        for(let i=0; i< userPayments.length; i++){
          for(let j=0; j<userPayments[i].payments.length;j++){
            if(userPayments[i].payments[j].status===0){ //paid

              if(!userPayments[i].membershipStart || userPayments[i].payments[j].termIni<userPayments[i].membershipStart){
                userPayments[i].membershipStart= userPayments[i].payments[j].termIni;
              }

              if(!userPayments[i].membershipEnd || userPayments[i].payments[j].termEnd>userPayments[i].membershipEnd){
                userPayments[i].membershipEnd= userPayments[i].payments[j].termEnd;
              }

            }
          }

          if(d<=userPayments[i].membershipEnd && d>=userPayments[i].membershipStart ){
            userPayments[i].membershipStatus= 0;
          }else if(d>userPayments[i].membershipEnd ){
            userPayments[i].membershipStatus= 2;
          }else{
            userPayments[i].membershipStatus=1;
          }

        }


        return  {
          statusCode: 200,
          body: JSON.stringify(userPayments)
        };

        case 'POST':
          //const p_gun_collection= event.queryStringParameters.shooterId?event.queryStringParameters.gunCollection.toString():null;

          let paymentData= JSON.parse(event.body);


          if(paymentData.termIni){
            paymentData.termIni= new Date(paymentData.termIni);
          }

          if(paymentData.termEnd){
            paymentData.termEnd = new Date(paymentData.termEnd);
          }

          if(paymentData.issueDate){
            paymentData.issueDate = new Date(paymentData.issueDate);
          }

          if(paymentData.dueDate){
            paymentData.dueDate = new Date(paymentData.dueDate);
          }

          if(paymentData.status){
            paymentData.status = Number(paymentData.status);
          }

          if(paymentData.value){
            paymentData.value = parseFloat(paymentData.value);
          }
            
          if(!isAdmin){
            const _shooter= await cShooters.find({email:userContext.email}).toArray();

            if(_shooter.length===0 || !paymentData.shooterId || _shooter[0]._id.toString()!==paymentData.shooterId){
              console.log(`Unauthorized, Payment UPDATER is not adm neither the updating shooter!`);
              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 
            }

          }

          filter= { _id: new ObjectId(paymentData._id) };
          if(!isAdmin || event.queryStringParameters.force!=='true'){
            filter.status = {$gt:0};
            let today= new Date();
            // let tomorrow= today.getDate() + 1;
            filter.dueDate= {$gte: new Date(today.toDateString())};
            filter.value= paymentData.value;
          }


          let paymentRet;
          
          if(paymentData._id && paymentData._id!==null && paymentData._id!=="" && paymentData._id!=="0"){

            paymentData.last_updater= userContext.email;
            paymentData.last_updater_date= new Date();

            delete paymentData._id;
            // paymentData._id= new ObjectId(paymentData._id);
console.log('==================================');
console.log('filter=',filter);
console.log('paymentData=',paymentData);

console.log('==================================');
            paymentRet= await cPayments.updateOne(filter
              ,{ $set: 
                  paymentData
                    // shooterId: paymentData.shooterId
                    // ,rangeId: paymentData.rangeId
                    // ,referringTo: paymentData.referringTo
                    // ,termIni: paymentData.termIni
                    // ,termEnd: paymentData.termEnd
                    // ,issueDate: paymentData.issueDate
                    // ,paymentDate: paymentData.paymentDate
                    // ,dueDate: new Date(paymentData.dueDate.toDateString())
                    // ,bankTxId: paymentData.bankTxId
                    // ,value: paymentData.value
                    // ,qrcode: paymentData.qrcode
                    // ,qrcodecopy: paymentData.qrcodecopy
                    // ,status: paymentData.status.status
                    // ,last_updater: userContext.email
                    // ,last_updater_date: new Date()
                    
              }
              ,{ upsert: false });
          }else{

            paymentData.inserter= userContext.email;
            paymentData.inserter_date= new Date();

            delete paymentData._id;
            // paymentData._id= new ObjectId("000000000000000000000000");

            paymentRet= await cPayments.insertOne(
              paymentData
                    // shooterId: paymentData.shooterId
                    // ,rangeId: paymentData.rangeId
                    // ,referringTo: paymentData.referringTo
                    // ,termIni: paymentData.termIni
                    // ,termEnd: paymentData.termEnd
                    // ,issueDate: paymentData.issueDate
                    // ,paymentDate: paymentData.paymentDate
                    // ,dueDate: new Date(paymentData.dueDate.toDateString())
                    // ,bankTxId: paymentData.bankTxId
                    // ,value: paymentData.value
                    // ,qrcode: paymentData.qrcode
                    // ,qrcodecopy: paymentData.qrcodecopy
                    // ,status: paymentData.status.status
                    // ,inserter: userContext.email
                    // ,inserter_date: new Date()
                    );
          }

        if(paymentRet && ( (paymentRet.modifiedCount && paymentRet.modifiedCount>0) || paymentRet.insertedId  ) ){

          if(paymentRet.insertedId){
            paymentData._id= paymentRet.insertedId.toString();
            console.log('GOT paymentData._id:', paymentData._id);
          }else {
            paymentData._id= filter._id;
          }

          return  {
            statusCode: 201,
            body: JSON.stringify(paymentData)
          };
        }else{
          return{
            statusCode: 404
            // ,body: JSON.stringify(deleteEvent)
            ,body: JSON.stringify({message: "Payment not found"})  
          }
        }
        
        case 'DELETE':

          let paymentDelete= JSON.parse(event.body);
            
          if(!isAdmin){
            const _shooterPayment= await cShooters.find({email:userContext.email}).toArray();

            if(_shooterPayment.length===0 || !paymentDelete.shooterId || _shooterPayment[0]._id.toString()!==paymentDelete.shooterId){
              console.log(`Unauthorized, ShooterPayment DELETER is not adm neither the deleter payer!`);
              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 
            }

          }

          paymentDelete._id= new ObjectId(paymentDelete._id);

          filter= { _id: paymentDelete._id, shooterId:paymentDelete.shooterId };

          if(!isAdmin || event.queryStringParameters.force!=='true'){
            filter.status = {$gt:0};
            filter.dueDate= {$lt: new Date(new Date().toDateString())};
          }

          const delRet= await cPayments.deleteOne(filter);
          
          if(delRet&& delRet.deletedCount>0){
            return{
              statusCode: 204
              // ,body: JSON.stringify(deleteEvent)
              ,body: JSON.stringify({message: "Deleted OKAY"})  
            }
          }else{
            return{
              statusCode: 404
              // ,body: JSON.stringify(deleteEvent)
              ,body: JSON.stringify({message: "Gun not found"})  
            }
          }

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}