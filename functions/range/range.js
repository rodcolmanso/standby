const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cRanges= database.collection(process.env.MONGODB_COLLECTION_RANGES);

    switch (event.httpMethod){
      case 'GET':
        const p_rangeId= event.queryStringParameters.rangeId?event.queryStringParameters.rangeId.toString():'000000000000000000000000';
        const p_updater= event.queryStringParameters.updater?event.queryStringParameters.updater.toString():null;
        const p_name= event.queryStringParameters.name?event.queryStringParameters.name.toString():null;

        const filter= {active:true};

        if(p_name!==null){
          let v_name=new RegExp(p_name,"i");
          filter.name= {$regex:v_name};
        }
        console.log('Antes do filter updater!!!!!!!!!!!!!');
        if(p_updater&&context.clientContext.user&&context.clientContext.user.email){
          const isAdmin= (context.clientContext.user&&context.clientContext.user.app_metadata.roles!==undefined &&!(context.clientContext.user.app_metadata.roles.indexOf("admin")<0));

          console.log('isAdmin='+isAdmin);

            filter.$or=[{active:{$exists:isAdmin}, _id: new ObjectId(p_rangeId)},
              {adm: {$eq:context.clientContext.user.email}}
            ];

            // filter.adm= {$eq:context.clientContext.user.email};
            console.log('entrou no updater. filter='+JSON.stringify(filter));

            

        }else if(p_rangeId!=='000000000000000000000000'){
          filter._id= new ObjectId(p_rangeId);
          console.log('entrou rangeId');
      }else console.log('Nao entrou rangeId:'+p_rangeId);
        
        const ranges= await cRanges.find(filter).sort({ name:1}).toArray();

        return  {
          statusCode: 200,
          body: JSON.stringify(ranges)
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