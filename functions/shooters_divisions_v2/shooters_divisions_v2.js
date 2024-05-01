const {MongoClient} = require ("mongodb");
require('dotenv').config();

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


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    const cShooters_Divisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS_DIVISIONS);

    switch (event.httpMethod){
      case 'GET':
        let p_eventId=null;
        let p_email=null;
        if(event.queryStringParameters.eventId!==undefined&&event.queryStringParameters.eventId!==null&&event.queryStringParameters.eventId!==""){
          p_eventId= event.queryStringParameters.eventId.toString();
          console.log(`p_eventId= ${p_eventId}`);
        }
        if(event.queryStringParameters.email!==undefined&&event.queryStringParameters.email!==null&&event.queryStringParameters.email!==""){
          p_email= event.queryStringParameters.email.toLowerCase();
          console.log(`p_email= ${p_email}`);
        }
        console.log(`p_emailXXXXXXXX= ${p_email}`);

      if(p_eventId!==null&&p_email!==null){ // List shooter_division(inscriptions) detail
        
        console.log(`ENTROU NO EMAIL= ${p_email}`);
        
        const shootersDiv= await cShooters.aggregate([
          { "$addFields": { 
              "shooterId": { "$toString": "$_id" }
          }}
          ,{$lookup:
              {
                  from: "shooters_divisions"
                  ,localField: "shooterId"
                  ,foreignField: "shooterId"
                  ,pipeline: [
                      { $match: { eventId: p_eventId}}
                      ]
                  ,as: "shooters_divisions"
              }
          }
          ,{$match:{ $and:[{email: p_email}
                          // ,{shooters_divisions: {$ne: []}}
                      ]
                  }}
          ,{$project:{"eventId":0}}
          ]).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(shootersDiv)
          };

      }else if(p_eventId!==null){ //listing all shooters in a eventId, with their best time for each division
        console.log(`ENTROU NO ENVENTO= ${p_eventId}`);
          
        const shootersDiv= await cShooters.aggregate([
          { "$addFields": {"shooterId": { "$toString": "$_id" }}}
          ,{$lookup:{
              from: "shooters_divisions"
              ,localField: "shooterId"
              ,foreignField: "shooterId"
              ,as: "registered"
              ,pipeline:[
                  {$match:{eventId: p_eventId}}
                  ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
                  ,{ $lookup:
                      {
                          from: "time_records"
                          ,localField: "shooterDivisionId"
                          ,foreignField: "shooterDivisionId"
                          ,as: "time_records"
                          ,pipeline:[
                              {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                              ,{$group:
                                  { _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}
                              }
                          ]
                      }
                  }
                  ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
              ]
              }
          }
          ,{$match: {registered: {$ne: []}}}
          ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
          ]).sort({"registered.score":1}).toArray();

            return  {
              statusCode: 200,
              body: JSON.stringify(shootersDiv)
            };

          }else{ //list all
            //TODO: 
          }

      case 'PUT': // associates divisions with a shooter

        let shooterDivisions= JSON.parse(event.body);
        try{

          console.log(JSON.stringify(context, null, 2))
          let user= context.clientContext.user;

          console.log(`user.email: ${user.email}`);
          let isAdmin= (user!==null&&user!==undefined&&user.app_metadata!==null&&user.app_metadata!==undefined &&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
          console.log(`is Admin: ${isAdmin}`);

          if(!isAdmin && user.email.toLowerCase().trim()!==shooterDivisions.email.toLowerCase().trim()){
            return  {
              statusCode: 401,
              body: `Unauthorized, User ${user.email} cannot update the user ${shooterDivisions.email.toLowerCase().trim()} (shooterId: ${shooterDivisions.shooterId})!`
            }; 
          }
          console.log(`PUTTED JSON.stringify(body)=: ${JSON.stringify(event.body,null,2)}`);
          
          const new_record= await cShooters.updateOne(
                                            {email: shooterDivisions.email.toLowerCase().trim()}
                                            ,{$set:{
                                                    name: shooterDivisions.name
                                                    ,category: shooterDivisions.category
                                                    ,email: shooterDivisions.email.toLowerCase().trim()
                                                    }}
                                            ,{upsert:true}
          
                                          );

          console.log('');
          console.log('==============new_record===================');
          console.log(JSON.stringify(new_record,null,2));
          console.log('===========================================');
          console.log('');
          if(shooterDivisions.shooterId===null||shooterDivisions.shooterId===""||shooterDivisions.shooterId===undefined){
            shooterDivisions._id= new_record.upsertedId.toString();
            shooterDivisions.shooterId= shooterDivisions._id;
          }

          new_record.updatedShooterDivisions=[];
          for(let i=0; i< shooterDivisions.shooters_divisions.length;i++){
          
            if( shooterDivisions.shooters_divisions[i]._id===undefined
              ||shooterDivisions.shooters_divisions[i]._id===null
              ||shooterDivisions.shooters_divisions[i]._id===""){
                shooterDivisions.shooters_divisions[i]._id=""
            }
            
            if( shooterDivisions.shooters_divisions[i].shooterId===undefined
              ||shooterDivisions.shooters_divisions[i].shooterId===null
              ||shooterDivisions.shooters_divisions[i].shooterId===""){
                shooterDivisions.shooters_divisions[i].shooterId=shooterDivisions._id.toString();
            }

            if(shooterDivisions.shooters_divisions[i]._id===""){

              new_record.updatedShooterDivisions.push(await cShooters_Divisions.insertOne(
                { shooterId: shooterDivisions.shooters_divisions[i].shooterId
                    ,divisionId: shooterDivisions.shooters_divisions[i].divisionId
                    ,eventId: shooterDivisions.shooters_divisions[i].eventId
                    ,gun: shooterDivisions.shooters_divisions[i].gun
                    ,optics: shooterDivisions.shooters_divisions[i].optics
                    ,clock: shooterDivisions.shooters_divisions[i].clock
                    ,duel: shooterDivisions.shooters_divisions[i].duel
                    }
                                                    ));
            }else{
              
              new_record.updatedShooterDivisions.push(await cShooters_Divisions.updateOne(
                                                                {_id: new ObjectId(shooterDivisions.shooters_divisions[i]._id)}
                                                            ,{$set:{ shooterId: shooterDivisions.shooters_divisions[i].shooterId
                                                                    ,divisionId: shooterDivisions.shooters_divisions[i].divisionId
                                                                    ,eventId: shooterDivisions.shooters_divisions[i].eventId
                                                                    ,gun: shooterDivisions.shooters_divisions[i].gun
                                                                    ,optics: shooterDivisions.shooters_divisions[i].optics
                                                                    ,clock: shooterDivisions.shooters_divisions[i].clock
                                                                    ,duel: shooterDivisions.shooters_divisions[i].duel
                                                                    }}
                                                              ,{upsert:true}
                                                            ));
                  }
          } //for

          console.log('shooterDivisions.imgChanged='+shooterDivisions.imgChanged);
          if(shooterDivisions.imgChanged){
            console.log('Uploading shooter img to cloudinary. img='+shooterDivisions._id);
            
            cloudinary.uploader.upload(shooterDivisions.img,
                { public_id: "profile/"+shooterDivisions._id })
                .then(result=>console.log(result));
          }

          return  {
            statusCode: 200,
            body: JSON.stringify(new_record)
          };
        }catch(error){
          console.log("Error updating shooter_divisions: "+error.toString());
          if(error.code.toString()==="11000"){
            let gun= error.toString().slice(-1*error.toString().indexOf('gun: "'));
            return  {
              statusCode:  409,
              body: `E11000. Cannot subscribe a gun twice in a same division. { ${gun} `
            };
            }

          return  {
            statusCode: 510,
            body: error.toString()
          };
        }


      case 'PATCH': // associates divisions with a shooter
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let shooter= JSON.parse(event.body);
        let registered= shooter.registered;
        let shooterId=shooter.shooterId;
        let event_id= shooter.event_id;
        delete shooter.registered;
        delete shooter.shooterId;
        delete shooter.event_id;
  
        if(shooterId===null||shooterId===""||shooterId===0){ // new shooter

  
          new_record= await cShooters.insertOne(shooter);

          shooter.shooterId= new_record.insertedId.toString();
          shooterId= new_record.insertedId.toString();

          //TODO: index unique key shooter
        }else{
            new_record= await cShooters.updateOne({ _id : new ObjectId(shooterId) }
                                                 ,{ $set: { 
                                                   name : shooter.name
                                                   ,email: shooter.email 
                                                   ,category: shooter.category 
                                                  //  ,eventId: shooter.eventId 
                                                  }
                                                 });
          // console.log(`Updated!: ${new_record.toString()}, Name: ${shooter.name}`);
          new_record.shooterId= new_record;
          console.log(`Done!`);
        }

        let shooter_division= {};
        let shooters_divisions= [];

        for(let i=0 ;i< registered.length;i++){
          shooter_division= {};
          shooter_division.shooterId=shooterId;
          shooter_division.divisionId= registered[i].divisionId;
          shooter_division.eventId=event_id;
          shooter_division.gun= registered[i].gun;
          shooter_division.optics= registered[i].optics;
          shooters_divisions.push(shooter_division);
        }
        await cShooters_Divisions.deleteMany({"shooterId":shooterId});

        new_record= await cShooters_Divisions.insertMany(shooters_divisions);
        new_record.shooterId= shooterId;;

        return  { 
          statusCode: 201,  
          body: JSON.stringify(new_record)
        };

      case 'DELETE':


      try{
          console.log(`DELETE shooter_division.JSON.stringify(body)=: ${JSON.stringify(event.body,null,2)}`);
        
          let user= context.clientContext.user;
          console.log(`user.email: ${user.email}`);
          let isAdmin= (user!==null&&user!==undefined&&user.app_metadata!==null&&user.app_metadata!==undefined &&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
          console.log(`is Admin: ${isAdmin}`);

          if(!isAdmin && user.email.toLowerCase().trim()!==shooterDivisions.email.toLowerCase().trim()){
            return  {
              statusCode: 401,
              body: `Unauthorized, User ${user.email} cannot update the user ${shooterDivisions.email.toLowerCase().trim()} (shooterId: ${shooterDivisions.shooterId})!`
            }; 
          }


          let shooterDivisions= JSON.parse(event.body);
          let filter_Ids= [new ObjectId("000000000000000000000000")];
          let filterStringIds= ["000000000000000000000000"];
          for(let i=0; i< shooterDivisions.shooters_divisions.length;i++){
            filter_Ids.push(new ObjectId(shooterDivisions.shooters_divisions[i]._id));
            filterStringIds.push(shooterDivisions.shooters_divisions[i]._id);
          }
          
          let r_delete_divisions= await cShooters_Divisions.deleteMany({_id: { $in: filter_Ids }});
          console.log(`Deleto divisões: r_delete_divisions.toString() ${r_delete_divisions.toString()}`);

          const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);
          await cTime_Records.deleteMany({shooterDivisionId:{$in: filterStringIds }});

          r_delete_divisions.time_records_deleted= await cTime_Records.deleteMany({shooterDivisionId:{$in: filterStringIds }});
          
          console.log(`Deleted objects:  ${JSON.stringify(r_delete_divisions,null,2)}`);


          return  { 
            statusCode: 200,  
            body: JSON.stringify(r_delete_divisions)
          };
        }catch(error){
          console.log("Error delleting shooter_divisions: "+error.toString());
          return  {
            statusCode: 510,
            body: error.toString()
          };
        }

      default:
        return  {
          statusCode: 400,
          body: JSON.stringify({message: "Route not found"})
        };

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}