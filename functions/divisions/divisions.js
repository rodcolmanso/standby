const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{

  
  try {
    const eventId= event.queryStringParameters.eventID;
    
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection= database.collection(process.env.MONGODB_COLLECTION);
    const id= "573a1390f29313caabcd50e5";
    const o_id = new ObjectId(id);
    const results= await collection.find({_id:o_id}).limit(10).toArray();
    return{
      statusCode: 200
      ,body: JSON.stringify(results)
    }

  } catch (error) {
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}