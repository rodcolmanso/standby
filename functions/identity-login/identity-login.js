const {MongoClient} = require ("mongodb");

require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

exports.handler = async (event, context) => {
  console.log('GOT IN IDENTITY-LOGIN function');
  console.log(event);
  const user = JSON.parse(event.body).user;

  const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
  const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
  let events= await cEvents.aggregate(
     [
      {$match: {owners: user.email}}
     ,{$addFields:{"eventId": { "$toString": "$_id" }}}
     ,{$group:{_id:null, array:{$push:"$eventId"}}}
     ,{$project:{array:true,_id:false}}
     ]).toArray();

  return {
    body: JSON.stringify({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        admin_events: events,
      },
    }),
      statusCode: 200,
  };
}