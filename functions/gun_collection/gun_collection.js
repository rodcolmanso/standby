const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cCollectionGun= database.collection(process.env.MONGODB_COLLECTION_GUN_COLLECTION);
    const cShooter= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    
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

    if(!userContext || !userContext.email){
      console.log(`Unauthorized, userContext not logged!`);
       return  {
        statusCode: 401,
        body: `Unauthorized, User not logged!`
      }; 
    }

    const isAdmin= userContext.app_metadata && userContext.app_metadata.roles && (userContext.app_metadata.roles.indexOf("admin")>-1||userContext.app_metadata.roles.indexOf("super")>-1);

    switch (event.httpMethod){
      case 'GET':
        const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;
        let filter= {_shooterId: p_shooterId};

        if(!userContext.app_metadata || !userContext.app_metadata.roles || (userContext.app_metadata.roles.indexOf("admin")<0 && userContext.app_metadata.roles.indexOf("super")<0)){
          filter.email= userContext.email.toLowerCase().trim();
        }

        console.log("filter=", JSON.stringify(filter,null,2));

        // const _guns= await cShooter.find({shooterId:p_shooterId}).toArray();
        let shooterGuns= await cShooter.aggregate([
          { $addFields: {"_shooterId": { "$toString": "$_id" }}}
          ,{$lookup:{
              from: "gun_collection"
              ,localField: "_shooterId"
              ,foreignField: "shooterId"
              ,as: "gun_collection"
              ,pipeline:[
                { $addFields: {"_gunId": { $toObjectId: "$gunId" }}}
                ,{$lookup:{
                    from: "guns"
                    ,localField: "_gunId"
                    ,foreignField: "_id"
                    ,as: "gun_det"
                    ,pipeline:[
                        { $project: { type:1, factory:1, model:1, caliber:1, operation:1, alias: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] } } }
                    ]
                    }
                }
            ]
              }
          }
          ,{$match:filter}
        ]).toArray();

        let _guns=[];
        if(shooterGuns && shooterGuns.length>0){
          _guns= shooterGuns[0].gun_collection;
        }
        
        return  {
          statusCode: 200,
          body: JSON.stringify(_guns)
        };

        case 'POST':
          //const p_gun_collection= event.queryStringParameters.shooterId?event.queryStringParameters.gunCollection.toString():null;

          let gunData= JSON.parse(event.body);
            
          if(!isAdmin){
            const _shooter= await cShooter.find({email:userContext.email}).toArray();

            if(_shooter.length===0 || !gunData.shooterId || _shooter[0]._id.toString()!==gunData.shooterId){
              console.log(`Unauthorized, GunCollection UPDATER is not adm neither the updating gun owner!`);
              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 
            }

          }

          let gunRet;
          if(gunData._id && gunData._id!==null && gunData._id!=="" && gunData._id!=="0"){
            gunData._id= new ObjectId(gunData._id);
            gunRet= await cCollectionGun.updateOne({ _id: gunData._id }
              ,{ $set: {
                    shooterId: gunData.shooterId
                    ,gunId: gunData.gunId
                    ,gun: gunData.gun
                    ,serialNum: gunData.serialNum
                    ,regType: gunData.regType
                    ,regNum: gunData.regNum
                    ,regExpirationDate: gunData.regExpirationDate
                    ,gunOwner: gunData.gunOwner
                    ,acerveFolder: gunData.acerveFolder
                    ,active: gunData.active
                    ,note: gunData.note
                    ,last_updater: userContext.email
                    ,last_updater_date: new Date()
                    }
              }
              ,{ upsert: false });
          }else{
            gunData._id= new ObjectId("000000000000000000000000");
            gunRet= await cCollectionGun.insertOne({
                    shooterId: gunData.shooterId
                    ,gunId: gunData.gunId
                    ,gun: gunData.gun
                    ,serialNum: gunData.serialNum
                    ,regType: gunData.regType
                    ,regNum: gunData.regNum
                    ,regExpirationDate: gunData.regExpirationDate
                    ,gunOwner: gunData.gunOwner
                    ,acerveFolder: gunData.acerveFolder
                    ,active: gunData.active
                    ,note: gunData.note
                    ,last_updater: userContext.email
                    ,last_updater_date: new Date()
                    });
          }

        if(gunRet && ( (gunRet.modifiedCount && gunRet.modifiedCount>0) || gunRet.insertedId  ) ){

          if(gunRet.insertedId){
            gunData._id= gunRet.insertedId.toString();
          }

          return  {
            statusCode: 201,
            body: JSON.stringify(gunData)
          };
        }else{
          return{
            statusCode: 404
            // ,body: JSON.stringify(deleteEvent)
            ,body: JSON.stringify({message: "Gun not found"})  
          }
        }
        
        case 'DELETE':

          let gunDelete= JSON.parse(event.body);
            
          if(!isAdmin){
            const _shooter= await cShooter.find({email:userContext.email}).toArray();

            if(_shooter.length===0 || !gunDelete.shooterId || _shooter[0]._id.toString()!==gunDelete.shooterId){
              console.log(`Unauthorized, GunCollection DELETER is not adm neither the deleter gun owner!`);
              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 
            }

          }

          gunDelete._id= new ObjectId(gunDelete._id);

          const delRet= await cCollectionGun.deleteOne({ _id: gunDelete._id, shooterId:gunDelete.shooterId  });
          
          if(delRet&& delRet.deletedCount>0){
            return{
              statusCode: 204
              // ,body: JSON.stringify(deleteEvent)
              ,body: JSON.stringify({message: "Deleted OKAY"})  
            }
          }else{
            return{
              statusCode: 404
              // ,body: JSON.stringify(deleteEvent)
              ,body: JSON.stringify({message: "Gun not found"})  
            }
          }

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}