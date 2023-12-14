const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {


    const p_eventId= event.queryStringParameters.eventId.toString();
    // const p_divisionId= event.queryStringParameters.divisionId.toString();
    // const p_shooterId= event.queryStringParameters.shooterId.toString();
    console.log(`p_eventId= ${p_eventId}`);
    // console.log(`p_divisionId= ${p_divisionId}`);
    // console.log(`p_shooterId= ${p_shooterId}`);


    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    // const cShooters_Divisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS_DIVISIONS);
    // const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);
    

    switch (event.httpMethod){
      case 'GET':
        if(p_eventId!==null){ //listing all shooters in a eventId, with their best time for each division
          console.log(`Estamos no GET! p_eventId= ${p_eventId}`);

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

        }

      case 'POST':

      case 'DELETE':

      default:
        return  {
          statusCode: 400,
          body: JSON.stringify({message: "Route not found"})
        };

    }

  } catch (error) {
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}