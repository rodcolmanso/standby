const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cGuns= database.collection(process.env.MONGODB_COLLECTION_GUNS);

    switch (event.httpMethod){
      case 'GET':
        // const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;

        let filter= {active:true};

        if(event.queryStringParameters.hec && event.queryStringParameters.hec.toLowerCase()==='no'){
          filter.caliber= {$nin:['.454 Casull', '.308 Win', '5.56', '7.62', '10mm', '300BLK', '44Mag']};
        }

        if(event.queryStringParameters.division && event.queryStringParameters.division.toLowerCase()==='pistola'){
          filter.type= 'Pistola';
        }

        if(event.queryStringParameters.division && event.queryStringParameters.division.toLowerCase()==='revolver'){
          filter.type= 'Revolver';
        }

        if(event.queryStringParameters.division && event.queryStringParameters.division.toLowerCase()==='handgun'){
          filter.type= {$in:['Pistola', 'Revolver']};
        }
        
          const _guns= await cGuns.aggregate(
            [  {$match: filter}
               ,{ $project: { type:1, factory:1, model:1, caliber:1, operation:1, alias: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] } } }
            ]
         ).sort({ alias:1}).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(_guns)
          };

        
        case 'POST':

        

          case 'DELETE':

          // var ObjectId = require('mongodb').ObjectId; const o_id = new ObjectId(id);

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}