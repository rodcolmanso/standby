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

    // console.log('entrou');
    // let userContext= context.clientContext.user;
    let userContext=null;
    try{
      console.log(`before get rawNetlifyContex`);
      const rawNetlifyContext = context.clientContext.custom.netlify;
      console.log(`rawNetlifyContex`);
      const netlifyContext = Buffer.from(rawNetlifyContext, 'base64').toString('utf-8');
      const { identity, user } = JSON.parse(netlifyContext);
      console.log(`got user`);
      console.log(`got user:`, user);
      if(!user || !user.email ){
        console.log('Error getting user new method');
        throw new Error('Error getting user new method');
      }
      console.log(`JSON.user:stringify`, JSON.stringify(user));
      userContext= user;
    }catch(e){
      console.log(`got error getting rawNetlifyContex`);
      userContext= context.clientContext.user;
    }

    switch (event.httpMethod){
      case 'GET':
        let p_eventId=null;
        let p_email=null;
        if(event.queryStringParameters.eventId!==undefined&&event.queryStringParameters.eventId!==null&&event.queryStringParameters.eventId!==""){
          p_eventId= event.queryStringParameters.eventId.toString();
          console.log(`p_eventId= ${p_eventId}`);
        }
        if(event.queryStringParameters.email!==undefined&&event.queryStringParameters.email!==null&&event.queryStringParameters.email!==""){
          p_email= event.queryStringParameters.email.toLowerCase().trim();
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
        

        if(!userContext){
          console.log('userContext not logged');
          return  {
            statusCode: 401,
            body: `Unauthorized, userContext (not logged)!`
          }; 

        }

        // console.log('userContext logado');

        let isAdmin= (userContext.app_metadata&&userContext.app_metadata.roles&&userContext.app_metadata.roles!==undefined&&(userContext.app_metadata.roles.indexOf("admin")>-1));

        // console.log('userContext admin? '+isAdmin);

        let _body= JSON.parse(event.body);

        if(_body._id)
          _body.shooterDivisionId= _body._id;
        else if(_body.shooterDivisionId)
          _body._id= _body.shooterDivisionId;
        else{
          return  {
              statusCode: 401,
              body: JSON.stringify({message: "Informe shooterDivisionId"})
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

          console.log('aggregate='+JSON.stringify(_r_sd,null,2));

          if(_r_sd.length<1){
             console.log('ShooterDivisionId='+_body.shooterDivisionId+' not found.');
            return  {
              statusCode: 401,
              body: JSON.stringify({message: `ShooterDivisionId ${_body.shooterDivisionId} not found.`})
            };
          }
          console.log('HEEEERRRRR 1');

          const _authorized = (_r_sd[0].shooter[0].email.toLowerCase().trim()=== userContext.email.toLowerCase().trim() 
                               ||_r_sd[0].events[0].owners.indexOf(userContext.email.toLowerCase().trim())>-1
                               ||_r_sd[0].events[0].range[0].adm.indexOf(userContext.email.toLowerCase().trim())>-1 );

          console.log('HEEEERRRRR 2');
          if(!_authorized){
            console.log(`Unauthorized, userContext ${userContext.email} cannot update ShooterDivisionId: ${_body.shooterDivisionId})!`);
            return  {
              statusCode: 401,
              body: `Unauthorized, userContext ${userContext.email} cannot update ShooterDivisionId: ${_body.shooterDivisionId})!`
            };
          }

        }

        const _updateId= _body._id?_body._id :_body.shooterDivisionId;
        delete _body._id;
        delete _body.shooterDivisionId;

        _body.last_updater= userContext.email;
        _body.last_updater_date= new Date();
        try{
          await cShooters_Divisions.updateOne({_id:new ObjectId(_updateId)}
                                            ,{ $set: _body}
          );

          return  {
            statusCode: 201,
            body: JSON.stringify({message: `Updated.`,shooter_division: _body }  )
          };
        }catch(error){
          console.log("Error updating shooter_divisions: "+error.toString());
          if(error.code.toString()==="11000"){
            let gun= error.toString().slice(-1*error.toString().indexOf('gun: "'));
            return  {
              statusCode:  409,
              body: JSON.stringify(`E11000. Cannot subscribe a gun twice in a same division. { ${gun} `)
            };
            }

          return  {
            statusCode: 510,
            body: error.toString()
          };
        }
        

      case 'PUT': // associates divisions with a shooter
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let shooter= JSON.parse(event.body);
        let registered= shooter.registered;
        let shooterId=shooter.shooterId;
        let event_id= shooter.event_id;
        delete shooter.registered;
        delete shooter.shooterId;
        delete shooter.event_id;

        shooter.inserter= (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown';
        shooter.inserter_date= Date.now();
  
        if(shooterId===null||shooterId===""||shooterId===0){ // new shooter

          new_record= await cShooters.insertOne(shooter);

          shooter.shooterId= new_record.insertedId.toString();
          shooterId= new_record.insertedId.toString();

          //TODO: index unique key shooter
        }else{
            new_record= await cShooters.updateOne({ _id : new ObjectId(shooterId) }
                                                 ,{ $set: { 
                                                   name : shooter.name
                                                   ,email: shooter.email.toLowerCase().trim() 
                                                   ,category: shooter.category 
                                                   ,eventId: shooter.eventId 
                                                   ,last_updater: shooter.inserter
                                                   ,last_updater_date: shooter.inserter_date
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
          shooter_division.inserter= (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown';
          shooter_division.inserter_date= Date.now();

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