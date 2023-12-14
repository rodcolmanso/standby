const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {


    const p_shooterId= event.queryStringParameters.shooterId.toString();
    console.log(`p_eventId= ${p_shooterId}`);

    const p_divisionId= event.queryStringParameters.divisionId.toString();

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cDivisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    

    switch (event.httpMethod){
      case 'GET':
        if(p_divisionId!==null){ //listing all shooters in this division, with their best time

        }else{ //list all

        }

      case 'POST':

      case 'DELETE':

      default:
        return  {
          statusCode: 400,
          body: JSON.stringify({message: "Route not found"})
        };

    }

    
    const o_id = new ObjectId(p_shooterId);
    const events= await cEvents.find({_id:o_id}).toArray();
    
    const divisions= await cDivisions.find({eventId:p_eventId}).sort({order:1}).toArray();

    events[0].divisions= divisions;

    
    return{
      statusCode: 200
      ,body: JSON.stringify(events[0])
    }

  } catch (error) {
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}