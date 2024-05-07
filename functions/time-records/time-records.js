const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {
    

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);

    switch (event.httpMethod){
      case 'GET':
        const p_shooterId= event.queryStringParameters.shooterId.toString();
        const p_divisionId= event.queryStringParameters.divisionId.toString();
        const p_shooter_divisionId= event.queryStringParameters.shooterDivisionId.toString();
        
        //listing all time records from a particular shooter and division
          console.log(`Estamos no GET! p_shooterId,p_divisionId = ${p_shooterId}, ${p_divisionId} `);

          const timerRcords= await cTime_Records.aggregate([
            // {$match:{shooterId: p_shooterId, divisionId: p_divisionId}}
            {$match:{shooterDivisionId: p_shooter_divisionId}}
            ,{$project:{"shooterId":1, "divisionId":1, "datetime":1, "sTime":1, "penalties":1, "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]} }}
            ,{$sort:{score:1}}
          ]).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(timerRcords)
          };

          case 'POST':

              let new_record= JSON.parse(event.body);

              new_record.datetime= new Date();
              console.log(`POSTING NEW TIME, JSON.stringify(new_record)=:${JSON.stringify(new_record,null,2)} `);

              new_record= await cTime_Records.insertOne(new_record);
    
              return  { 
                statusCode: 201,
                body: JSON.stringify(new_record)
              };

          case 'DELETE':

          // var ObjectId = require('mongodb').ObjectId; const o_id = new ObjectId(id);
            const p_time_record_id= event.queryStringParameters.timeRecordId.toString();
            const delTimerRcords= await cTime_Records.deleteOne( { "_id" : new ObjectId(p_time_record_id) } );

            return  { 
              statusCode: 204,
              body: JSON.stringify(delTimerRcords)
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