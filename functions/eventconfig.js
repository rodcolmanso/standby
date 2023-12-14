const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {


    const p_eventId= event.queryStringParameters.eventId.toString();
    console.log(`p_eventId= ${p_eventId}`);

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cDivisions= database.collection(process.env.MONGODB_COLLECTION_DIVISIONS);
    const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
    
    const o_id = new ObjectId(p_eventId);
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