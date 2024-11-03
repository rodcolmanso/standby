const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cGuns= database.collection(process.env.MONGODB_COLLECTION_GUNS);
    const cCollectionGun= database.collection(process.env.MONGODB_COLLECTION_GUN_COLLECTION);

    switch (event.httpMethod){
      case 'GET':
        // const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;

        let filter= {active:true};

        if(event.queryStringParameters.hec && event.queryStringParameters.hec.toLowerCase()==='no'){
          filter.caliber= {$nin:['.454 Casull', '.308 Win', '5.56', '7.62', '10mm', '300BLK', '44Mag']};
        }

        if(event.queryStringParameters.division_name && event.queryStringParameters.division_name.toLowerCase()==='pistola'){
          filter.type= {$in:['Pistola','Outras']};
        }

        if(event.queryStringParameters.division_name && event.queryStringParameters.division_name.toLowerCase()==='revolver'){
          filter.type= {$in:['Revolver','Outras']};
        }

        if(event.queryStringParameters.division_name && event.queryStringParameters.division_name.toLowerCase()==='handgun'){
          filter.type= {$in:['Pistola', 'Revolver','Outras']};
        }

        console.log('GET GUNS. filter=',JSON.stringify(filter))
        
          let _guns= await cGuns.aggregate(
            [  {$match: filter}
               ,{ $project: { type:1, factory:1, model:1, caliber:1, operation:1, alias: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] } } }
            ]
         ).sort({ alias:1}).toArray();

         if(event.queryStringParameters.shooterId){

          console.log('GOT into shooterId part');

          const collectionGun= await cCollectionGun.find({shooterId:event.queryStringParameters.shooterId}).sort({ gun:1}).toArray();

          console.log('collectionGun.length=', collectionGun.length);

          for(let i=0; i<collectionGun.length;i++){
            
            for(let j=0;j<_guns.length;j++){

              if(_guns[j]._id.toString()===collectionGun[i].gunId){
                _guns.unshift( JSON.parse(JSON.stringify(_guns[j]) ));
                _guns[0].regNum= collectionGun[i].regNum;
                _guns[0].gunCollectionId= collectionGun[i]._id;
                _guns[0].gunOther= collectionGun[i].gun;
                _guns[0].alias= collectionGun[i].gun;

                console.log('Added Acerto:',JSON.stringify(_guns[0]));
                break;
              }

            }

          }

         }

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