const {MongoClient} = require ("mongodb");
require('dotenv').config();

const { cat } = require("@cloudinary/url-gen/qualifiers/focusOn");
// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require ("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

exports.handler = async (event, context) => {
  console.log('GOT IN IDENTITY-LOGIN function');
  console.log(event);
  const user = JSON.parse(event.body).user;

  const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);

  console.log('Is there privider avatar?');
  // const testProvidedImg= 'https://lh3.googleusercontent.com/a/ACg8ocKWUCCEL1qobxrjqmQAHsT2rNlJ4XSVJaOvyoJ7uxBxNO4Prw=s96-c'; //'https://www.imfdb.org/images/d/d6/YG2_012.jpg';
  // const testemail= 'luccamangamer@gmail.com';


  if(user.user_metadata&& user.user_metadata.avatar_url&&user.user_metadata.avatar_url!==''){
    // if(testProvidedImg){
    console.log('YES, provider avatar='+user.user_metadata.avatar_url+'. Getting dbUser._id...  user.email='+ user.email);
    // console.log('YES, provider avatar='+testProvidedImg+'. Getting dbUser._id...  user.email='+ testemail);
    
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    const shooters= await cShooters.aggregate(
      [
      {$match: {email: user.email}}
      // {$match: {email: testemail}}
      ]).toArray();
    
    if(shooters && shooters.length && shooters.length>0){
      console.log('dbUser._id= '+ shooters[0]._id);
      
      console.log('          uploading provider avatar on Cloudinay....... dbUser._id= '+ shooters[0]._id);
      
      cloudinary.uploader.upload(user.user_metadata.avatar_url,
        // cloudinary.uploader.upload(testProvidedImg,
          { public_id: "profile/"+shooters[0]._id
            ,overwrite: false
            })
          .then(result=>console.log(result));

    console.log('SUCCESS! Uploaded provider avatar='+user.user_metadata.avatar_url+' to Cloudinay....... dbUser._id= '+ shooters[0]._id);

    }else console.log('dbUser not found. user.email='+ user.email);

  }else console.log('There is NO privider avatar.');

  const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
  let events= [];
  // let events= await cEvents.aggregate(
  //    [
  //     {$match: {owners: user.email}}
  //     // {$match: {owners: 'pris.rocha@gmail.com'}}
  //    ,{$addFields:{"eventId": { "$toString": "$_id" }}}
  //    ,{$group:{_id:null, array:{$push:"$eventId"}}}
  //    ,{$project:{array:true,_id:false}}
  //    ]).toArray();
     
     let r_events=[];
     if(events&&events.length&&events.length>0&&events[0]&&events[0].array)
      r_events= events[0].array;

  return {
    body: JSON.stringify({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        admin_events: r_events,
      },
    }),
      statusCode: 200,
  };
}