// const {MongoClient} = require ("mongodb");

// require('dotenv').config();

// const mongoClient= new MongoClient(process.env.MONGODB_URI);
// const clientPromise= mongoClient.connect();
// var ObjectId = require('mongodb').ObjectId; 

exports.handler = async (event, context) => {
  console.log('GOT IN IDENTITY-LOGIN function');
  console.log(event);
  const user = JSON.parse(event.body).user;
  return {
    body: JSON.stringify({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        events_admin: ["XPTO", "Xyz"],
      },
    }),
      statusCode: 200,
  };
}