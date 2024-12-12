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
    
    
    switch (event.httpMethod){
      case 'GET':

        return  {
          statusCode: 200,
          body: JSON.stringify({payments:[]})
        };

        case 'POST':

        let paymentData= JSON.parse(event.body);

        console.log('===================WEBHOOK POST =================');  
        console.log('==== context=',context);
        console.log('==== event.body=',paymentData);
        console.log('==== event=',event);
        console.log('=================================================');  

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