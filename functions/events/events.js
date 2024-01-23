const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    
    
    switch (event.httpMethod){
      case 'GET':
        // const subject = event.queryStringParameters.name || 'World'
        // const p_eventId= event.queryStringParameters.eventId.toString();

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
        const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
        // const o_id = new ObjectId(p_eventId);
        
        const events= await cEvents.find().toArray();

        return {
          statusCode: 200,
          body: JSON.stringify(events)
          // // more keys you can return:
          // headers: { "headerName": "headerValue", ... },
          // isBase64Encoded: true,
        }
    
      case 'PATCH': 

      case 'DELETE':

      default:
      return  {
        statusCode: 400,
        body: JSON.stringify({message: "Route not found"})
      };
    }

    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
