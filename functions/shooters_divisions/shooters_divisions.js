const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {


    
    // const p_divisionId= event.queryStringParameters.divisionId.toString();
    // const p_shooterId= event.queryStringParameters.shooterId.toString();
    
    // console.log(`p_divisionId= ${p_divisionId}`);
    // console.log(`p_shooterId= ${p_shooterId}`);


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
          ,{$match:{ $and:[{email: "lucca@tpm.com"}
                          // ,{shooters_divisions: {$ne: []}}
                      ]
                  }}
          ,{$project:{"_id":0,"eventId":0,"shooters_divisions.shooterId":0}}
          ]).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(shootersDiv)
          };

      }else if(p_eventId!==null){ //listing all shooters in a eventId, with their best time for each division
        console.log(`ENTROU NO ENVENTO= ${p_eventId}`);
          
        const shootersDiv= await cShooters.aggregate([
            {$match:{eventId: p_eventId}}
            ,{ "$addFields": { "shooterId": { "$toString": "$_id" }}},
            {$lookup:
                {
                    from: "shooters_divisions",
                    let: {div_shooterId:"$shooterId", div_divisionId:"$divisionId"},
                    pipeline: [
                        { $match: { $expr: 
                                        { $eq: [ "$shooterId", "$$div_shooterId" ] }
                                  } 
                        }
                        //,{ $project: { shooterId: 0, _id:0 } }
                        ,{ $lookup:
                              {
                                from: "time_records",
                                let: {record_shooter_id: "$shooterId", record_division_id:"$divisionId"},
                                pipeline:[{ $match:
                                    { $expr:
                                       { $and:
                                          [
                                            { $eq: [ "$shooterId",  "$$record_shooter_id" ] },
                                            { $eq: [ "$divisionId", "$$record_division_id" ] }
                                          ]
                                       }
                                    }
                                 }
                                 ,{
                                    $project:{ "score":{"$add":["$sTime","$penalties"]}
                                              ,datetime:1
                                  },
                                }
                                ,{$group:
                                    { _id:["$shooterId","$divisionId"],
                                       tries:{$count:{}},
                                        score:{$min:"$score"},
                                        datetime:{$min:"$datetime"}
                                    }
                                }
                                ],
                                as: "time_records"
                              }
                         }
                         ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
                        ],
                    as: "registered"
                }
            }            
            ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0, "registered.time_records":0}}
            ]).sort({"registered.score":1}).toArray();

            return  {
              statusCode: 200,
              body: JSON.stringify(shootersDiv)
            };

          }else{ //list all
            //TODO: 
          }

      case 'PATCH': // associates divisions with a shooter
        
      // console.log('entrou');
        let user= context.clientContext.user;

        if(!user){
          console.log('user not logged');
          return  {
            statusCode: 401,
            body: `Unauthorized, User (not logged)!`
          }; 

        }

        // console.log('user logado');

        let isAdmin= (user.app_metadata&&user.app_metadata.roles&&user.app_metadata.roles!==undefined&&(user.app_metadata.roles.indexOf("admin")>-1));

        // console.log('user admin? '+isAdmin);

        let _body= JSON.parse(event.body);

        // console.log('_body= '+JSON.stringify(_body));

        if(!_body||!_body.shooterDivisionId || _body.pauseResume===undefined || _body.pauseResume==='' || _body.pauseResume=== null){
          console.log('ERROR 401= Informe shooterDivisionId and pauseResume value');
        return  {
            statusCode: 401,
            body: JSON.stringify({message: "Informe shooterDivisionId and pauseResume value."})
          };
        }

        if(!isAdmin){
          // console.log('Will find shooter_division. _body.shooterDivisionId='+_body.shooterDivisionId);
          const _r_sd= await cShooters_Divisions.aggregate([
            {$addFields: {"_shooterDivisionId": { $toString: "$_id" }
                        ,"_eventId": { $toObjectId: "$eventId" }
                        ,"_shooterId": { $toObjectId: "$shooterId" }}}
            ,{$match:{"_shooterDivisionId":_body.shooterDivisionId}}
            ,{$lookup:{ from: 'shooters'
                      ,foreignField: '_id'
                      ,localField: '_shooterId'
                      ,as: 'shooter'
            }}
            ,{$lookup:{ from:"events"
                      ,localField:'_eventId'
                      ,foreignField:'_id'
                      ,as: 'events'
                      ,pipeline:[
                        {$addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
                        ,{$lookup:{ from: 'ranges'
                                  ,localField: '_rangeId'
                                  ,foreignField: '_id'
                                  ,as: 'range'
                        }}
                      ]
            }}
          ]).toArray();

          // console.log('aggregate='+JSON.stringify(_r_sd,null,2));

          if(_r_sd.length<1){
             console.log('ShooterDivisionId='+_body.shooterDivisionId+' not found.');
            return  {
              statusCode: 401,
              body: JSON.stringify({message: `ShooterDivisionId ${_body.shooterDivisionId} not found.`})
            };
          }

          const _authorized = (_r_sd[0].shooter[0].email.toLowerCase().trim()=== user.email 
                               ||_r_sd[0].events[0].owners.indexOf(user.email.toLowerCase().trim())>-1
                               ||_r_sd[0].events[0].gange[0].adm.indexOf(user.email.toLowerCase().trim())>-1 );
          if(!_authorized){
            console.log(`Unauthorized, User ${user.email} cannot update ShooterDivisionId: ${_body.shooterDivisionId})!`);
            return  {
              statusCode: 401,
              body: `Unauthorized, User ${user.email} cannot update ShooterDivisionId: ${_body.shooterDivisionId})!`
            };
          }

        }

        // console.log('Will update shooter_division');        
        await cShooters_Divisions.updateOne({_id:new ObjectId(_body.shooterDivisionId)}
                                           ,{ $set: {
                                            order_aux : _body.pauseResume
                                            ,subscribe_date: new Date()
                                          }}
        );

        return  {
          statusCode: 201,
          body: JSON.stringify({message: `Updated. shooterDivisionId:${_body.shooterDivisionId} .order_aux:${_body.pauseResume}`})
        };
        

      case 'PUT': // associates divisions with a shooter
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
                                                   ,eventId: shooter.eventId 
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
          shooter_division.gun= registered[i].gun.replaceAll('"','').replaceAll("'","").replaceAll('`','');
          shooter_division.optics= registered[i].optics;
          shooters_divisions.push(shooter_division);
        }
        await cShooters_Divisions.deleteMany({"shooterId":shooterId});

        new_record= await cShooters_Divisions.insertMany(shooters_divisions);
        new_record.shooterId= shooterId;

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