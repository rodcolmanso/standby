const {MongoClient} = require ("mongodb");
require('dotenv').config();

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
                      { $match: { eventId: "661ab4f9c412f4a5f17f0624"}}
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
          console.log(`PUTTED body=: ${event.body}`);
          let shooterDivisions= JSON.parse(event.body);
          const new_record= await cShooters.updateOne(
                                            {email: shooterDivisions.email.toLowerCase().trim()}
                                            ,{$set:{
                                                    name: shooterDivisions.name
                                                    ,category: shooterDivisions.category
                                                    ,email: shooterDivisions.email.toLowerCase().trim()
                                                    }}
                                            ,{upsert:true}
                                            );

          if(shooterDivisions.shooterId===null||shooterDivisions.shooterId===""||shooterDivisions.shooterId===undefined){
            shooterDivisions._id= new_record.insertedId.toString();
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

          return  {
            statusCode: 200,
            body: JSON.stringify(new_record)
          };
        }catch(error){
          console.log("Error updating shooter_divisions: "+error.toString())
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

      const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);

        let body= JSON.parse(event.body);
        let delShooterId= body.shooterId;

        console.log(`Deleting shooter: trues shooterId: ${delShooterId}.`);

        let r_delete_divisions= await cShooters_Divisions.deleteMany({shooterId: delShooterId});
        console.log(`Deleto divisões: r_delete_divisions.toString() ${r_delete_divisions.toString()}`);

        let r_delete_shooter= await cShooters.deleteOne({_id: new ObjectId(delShooterId)});
        console.log(`Deleto atirador! r_delete_shooter.toString(): ${r_delete_shooter.toString()}`);

         await cTime_Records.deleteMany({shooterId: delShooterId});

        r_delete_shooter.shooter_acknowledged= r_delete_shooter.acknowledged;
        r_delete_shooter.shooter_deletedCount= r_delete_shooter.deletedCount;

        r_delete_shooter.divisions_acknowledged= r_delete_divisions.acknowledged;
        r_delete_shooter.divisions_deletedCount= r_delete_divisions.deletedCount;

        delete r_delete_shooter.acknowledged;
        delete r_delete_shooter.deletedCount;
        

        console.log(`r_delete_shooter.divisions_deletedCount: ${r_delete_shooter.divisions_deletedCount}`);
        console.log(`r_delete_shooter.shooter_deletedCount: ${r_delete_shooter.shooter_deletedCount}`);


        return  { 
          statusCode: 200,  
          body: JSON.stringify(r_delete_shooter)
        };

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