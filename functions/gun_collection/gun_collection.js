const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cGuns= database.collection(process.env.MONGODB_COLLECTION_GUN_COLLECTION);
    

    switch (event.httpMethod){
      case 'GET':
        const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;
        
          const _guns= await cGuns.find({shooterId:p_shooterId}).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(_guns)
          };

        
        case 'POST':

        

          case 'DELETE':

          // var ObjectId = require('mongodb').ObjectId; const o_id = new ObjectId(id);

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}