const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event, context) => {

  console.log(JSON.stringify(context, null, 2))
  let user= context.clientContext.user;

  if(user===null || user===undefined){
    user= {email:uuidv4()};
  }

  console.log(`user.email: ${user.email}`);
  let isAdmin= (user!==null&&user!==undefined&&user.app_metadata!==null&&user.app_metadata!==undefined &&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
  console.log(`is Admin: ${isAdmin}`);
  try {
    
    
    switch (event.httpMethod){
      case 'GET':
        // const subject = event.queryStringParameters.name || 'World'
        // const p_eventId= event.queryStringParameters.eventId.toString();
        
        let p_event_date_from="2021-12-31";
        let p_event_date_to="2099-12-31";
        let p_split_duels="0";

        let ordem=-1;
        
        if(event.queryStringParameters.date_from !=null && event.queryStringParameters.date_from != undefined){
          p_event_date_from= event.queryStringParameters.date_from.toString();
        }
        if(event.queryStringParameters.date_to !=null && event.queryStringParameters.date_to != undefined){
          p_event_date_to= event.queryStringParameters.date_to.toString();
        }
        if(event.queryStringParameters.split_duels !=null && event.queryStringParameters.split_duels != undefined){
          p_split_duels= event.queryStringParameters.split_duels.toString();
        }

        if(event.queryStringParameters.order !=null && event.queryStringParameters.order != undefined){
          ordem= parseInt(event.queryStringParameters.order);
        }

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
        const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
        
        let events= await cEvents.aggregate( [
          // Stage 1: Filter pizza events by date range
          {
             $match:
             {
                "date": { $gte: new Date(p_event_date_from.replace(/-/g, '\/'))
                         , $lt: new Date(p_event_date_to.replace(/-/g, '\/')) }
                         , $or:[{"public":true}, {"owners":user.email}, {"public":!isAdmin}]
             }
          }
          ,{ "$addFields": { "eventIdd": { "$toString": "$_id" }}}
          ,{
            $lookup:
              {
                from: "divisions",
                localField: "eventIdd",
                foreignField: "eventId",
                as: "divisions"
              }
         }
          // Stage 3: Sort events by event_date in descending order
        ,{
             $sort: { "date": ordem }
          }
        ] ).toArray();

        const z= events.length;

        for(let i=0;i<z;i++){
          events[i].subTitle="Contra o relógio + Duelos";
          console.log('p_split_duels='+p_split_duels);
          if(p_split_duels==="1"){
            if(events[i].dateDuel!==null&&events[i].dateDuel!==undefined&&events[i].dateDuel!==''&&events[i].dateDuel.toDateString()!==events[i].date.toDateString()){
              console.log(`${events[i].dateDuel.toDateString()}!==${events[i].date.toDateString()}?`);
              let nEvent= JSON.parse(JSON.stringify(events[i]));
              nEvent.date=nEvent.dateDuel;
              nEvent.subTitle="Duelos";
              events[i].subTitle="Contra o relógio";
              events.push(nEvent);

              console.log(`events[i].subTitle= ${events[i].subTitle}`);
              console.log(`nEvent.subTitle= ${nEvent.subTitle}`);
              
              console.log(``);
            }
          }
        }
          
          console.log(`ordem=${ordem}`);
          if(ordem>0){
            console.log(`Sorte Up`);
            events = events.sort((a, b) => {
              if (Date.parse(new Date(a.date)) < Date.parse(new Date(b.date))) {
                return -1;
              }
            });
          }else{
            console.log(`Sorte Down`);
            events = events.sort((a, b) => {
              if (Date.parse(new Date(a.date)) > Date.parse(new Date(b.date))) {
                return -1;
              }
            });
          }

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
