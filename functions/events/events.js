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
        
        let p_event_date_from="2021-12-31";
        let p_event_date_to="2099-12-31";

        let ordem=-1;
        
        if(event.queryStringParameters.date_from !=null && event.queryStringParameters.date_from != undefined){
          p_event_date_from= event.queryStringParameters.date_from.toString();
        }
        if(event.queryStringParameters.date_to !=null && event.queryStringParameters.date_to != undefined){
          p_event_date_to= event.queryStringParameters.date_to.toString();
        }
        if(event.queryStringParameters.order !=null && event.queryStringParameters.order != undefined){
          ordem= parseInt(event.queryStringParameters.order);
        }

        console.log(`ordem=${ordem}`);
        
        console.log(`p_event_date_from=${p_event_date_from}`);
        console.log(`p_event_date_to=${p_event_date_to}`);

        console.log('');

        console.log('builded date from .replace(/-/g, \/): '+(new Date(p_event_date_from.replace(/-/g, '\/'))));

        console.log('builded date to .replace(/-/g, \/): '+(new Date(p_event_date_to.replace(/-/g, '\/'))));
        

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
        const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
        // const o_id = new ObjectId(p_eventId);
        
        // const events= await cEvents.find().toArray();
        const events= await cEvents.aggregate( [
          // Stage 1: Filter pizza events by date range
          {
             $match:
             {
                "date": { $gte: new Date(p_event_date_from.replace(/-/g, '\/'))
                  , $lt: new Date(p_event_date_to.replace(/-/g, '\/')) }
             }
          },
          // Stage 3: Sort events by event_date in descending order
          {
             $sort: { "date": ordem }
          }
        ] ).toArray();

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
