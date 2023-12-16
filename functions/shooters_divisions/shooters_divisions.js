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
        const p_eventId= event.queryStringParameters.eventId.toString();
        console.log(`p_eventId= ${p_eventId}`);
  
        if(p_eventId!==null){ //listing all shooters in a eventId, with their best time for each division

          const shootersDiv= await cShooters.aggregate([
            {$match:{eventId: p_eventId}} //"6578ad76e53c8b23971032c4"
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
                                    $project:{ "score":{"$add":["$sTime","$penalties"]}},
                                }
                                ,{$group:
                                    { _id:["$shooterId","$divisionId"],
                                       tries:{$count:{}},
                                        score:{$min:"$score"}
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
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let shooter= JSON.parse(event.body);
        let registered= shooter.registered;
        let shooterId=shooter.shooterId;
        delete shooter.registered;
        delete shooter.shooterId;
  
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