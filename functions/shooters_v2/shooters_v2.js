const { cat } = require("@cloudinary/url-gen/qualifiers/focusOn");
const {MongoClient} = require ("mongodb");
require('dotenv').config();

// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require ("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    
    const user= context.clientContext.user;

    switch (event.httpMethod){
      case 'GET':

      try{
        console.log(`Got into shooter_v2?logged=${event.queryStringParameters.logged}`);
        console.log(`Got into shooter_v2?uuid=${event.queryStringParameters.uuid}`);

        filter={};
        if(event.queryStringParameters.logged!==undefined){
          console.log(`Got into event.queryStringParameters.logged!==undefined`);

          if(context.clientContext!==undefined&&context.clientContext.user!==undefined){
            console.log(`Got into context.clientContext!==undefined&&context.clientContext.user!==undefined`);
            filter.email= context.clientContext.user.email;
          }else{
            console.log(`NOTTTTTT got into context.clientContext!==undefined&&context.clientContext.user!==undefined`);
            filter.email= (Math.random()*1000000).toString();
          }

        }else{ 
          console.log(`NOT Got into event.queryStringParameters.logged!==undefined`);
          
          if(event.queryStringParameters.email!==undefined){
            filter.email= event.queryStringParameters.email;
          }

          if(event.queryStringParameters.name!==undefined){

            if(event.queryStringParameters.regex!==undefined){
              filter.name= {'$regex':event.queryStringParameters.name, '$options': 'si' };
            }else{
              filter.name= event.queryStringParameters.name;
            }
          }

          if(event.queryStringParameters.category!==undefined){
            filter.category= event.queryStringParameters.category;
          }

          if(event.queryStringParameters.id!==undefined){
            filter._id= new ObjectId(event.queryStringParameters.id);
          }

          if(event.queryStringParameters.docnum!==undefined){
            filter.docnum= event.queryStringParameters.docnum;
          }

        }
        console.log(`Got into shooter_v2?logged. filter=${JSON.stringify(filter,null,2)}`);
          
        // console.log("filter="+JSON.stringify(filter,null,2));
        const retShooters = await cShooters.find(filter).toArray();



  // ============================================
  // console.log('Is there privider avatar?');
    // const testProvidedImg= 'https://lh3.googleusercontent.com/a/ACg8ocKWUCCEL1qobxrjqmQAHsT2rNlJ4XSVJaOvyoJ7uxBxNO4Prw=s96-c'; //'https://www.imfdb.org/images/d/d6/YG2_012.jpg';
    // const testemail= 'luccamangamer@gmail.com';


    if(user&& user.user_metadata&& user.user_metadata.avatar_url&&user.user_metadata.avatar_url!==''){
      // if(testProvidedImg){
      // console.log('YES, provider avatar='+user.user_metadata.avatar_url+'. Getting dbUser._id...  user.email='+ user.email);
      // console.log('YES, provider avatar='+testProvidedImg+'. Getting dbUser._id...  user.email='+ testemail);
      
      const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
      const shooters= await cShooters.aggregate(
        [
        {$match: {email: user.email}}
        // {$match: {email: testemail}}
        ]).toArray();
      
      if(shooters && shooters.length && shooters.length>0){
        // console.log('dbUser._id= '+ shooters[0]._id);
        
        // console.log('          uploading provider avatar on Cloudinay....... dbUser._id= '+ shooters[0]._id);
        
        cloudinary.uploader.upload(user.user_metadata.avatar_url,
          // cloudinary.uploader.upload(testProvidedImg,
            { public_id: "profile/"+shooters[0]._id
              ,overwrite: false
              })
            .then(result=>console.log(result));

      // console.log('SUCCESS! Uploaded provider avatar='+user.user_metadata.avatar_url+' to Cloudinay....... dbUser._id= '+ shooters[0]._id);

      }//else console.log('dbUser not found. user.email='+ user.email);

    }//else console.log('There is NO privider avatar.');
  // ============================================


        // const user= context.clientContext.user;
        let isAdmin= user&&user.app_metadata&&user.app_metadata.roles&&(user.app_metadata.roles.indexOf("admin")>=0||user.app_metadata.roles.indexOf("super")>=0);
        
        if(!isAdmin){ //mask sensitivy data

          let isEventAdmin=false;
          if(event.queryStringParameters.eventId && user && user.email){

            //check if the user is admin of the event:
            const cEvent= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
            const f_id= new ObjectId(event.queryStringParameters.eventId)
            
            // const _e= await cEvent.aggregate( [
            //   {$match:{_id: f_id
            //           , owners: user.email}}
            // ]).toArray();
            const _e= await cEvent.aggregate( [
              { $addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
              ,{$lookup:{
                  from: "ranges"
                  ,localField: "_rangeId"
                  ,foreignField: "_id"
                  ,as: "range"
              }}
              ,{$match:{_id: f_id
                      ,$or:[ {owners: user.email}
                      , {'range.adm': user.email}]
                      }
                  }
            ]).toArray();
            
            isEventAdmin= (_e.length>0);
          }

          if(!isEventAdmin)
            for(let i=0;i<retShooters.length;i++){
                if(!user||!user.email||user.email.trim().toLowerCase() !== retShooters[0].email.trim().toLowerCase()){
                  retShooters[0].docnum= retShooters[0].docnum.substring(0,2)+'*.***.*'+retShooters[0].docnum.substring(7,9)+"-"+retShooters[0].docnum.substring(9);

                  const emailsize= retShooters[0].email.indexOf('@');
                  if(emailsize<4){
                    retShooters[0].email='***'+  retShooters[0].email.substring(emailsize-1);
                  }else{
                    let asterics='';
                    for(let i=0;i<emailsize-3;i++)
                      asterics+='*';

                    retShooters[0].email=  retShooters[0].email.substring(0,2)+ asterics + retShooters[0].email.substring(retShooters[0].email.indexOf('@')-1);

                  }
                  
                }
            }
        }
        

        return  {
          statusCode: 200,
          body: JSON.stringify(retShooters)
        };
      }catch(error){
        return  {
          statusCode: 400,
          body: "Error GETting shooters_v2. error: "+error.toString()
        };
      }

      case 'PATCH':

        let shooterData= JSON.parse(event.body);

        try{

          //  console.log('user: '+user);
          //  console.log('shooterData.email: '+shooterData.email);
          //  console.log('user.email.toLowerCase().trim()): '+user.email.toLowerCase().trim());
          //  console.log('shooterData.email.toLowerCase().trim(): '+shooterData.email.toLowerCase().trim());
          //  console.log('user.app_metadata: '+user.app_metadata);
          //  console.log('user.app_metadata.roles: '+user.app_metadata.roles)
          //  console.log('user.app_metadata.roles.indexOf("admin")<0: '+user.app_metadata.roles.indexOf("admin")<0);

          if(!user|| !shooterData.email ||!user.app_metadata|| (user.email.toLowerCase().trim()!==shooterData.email.toLowerCase().trim())&&(user.app_metadata.roles.indexOf("admin")<0&&user.app_metadata.roles.indexOf("super")<0)){
              console.log(`Unauthorized, User not logged!`);
              console.log(`user.app_metadata.roles= ${user.app_metadata.roles}`);
              return  {
                statusCode: 401,
                body: `Unauthorized, User not logged!`
              }; 
          }
          let retShooterUpdate=null;

          if(!shooterData._id||shooterData._id===null||shooterData._id===0||shooterData._id===""||shooterData._id==="new"){
            // console.log(`[Shooters] Inserting new shooter:${shooterData.email.toLowerCase().trim()}, docnum:${shooterData.docnum}`);
            retShooterUpdate = await cShooters.insertOne(
              { email : shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
              ,docnum: shooterData.docnum
              ,name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
              ,category: shooterData.category
              }
            );

            shooterData._id= retShooterUpdate.insertedId;

          }else{
            // console.log(`[Shooters] Updating shooter:${shooterData.email.toLowerCase().trim()}, id:${shooterData._id}, docnum:${shooterData.docnum}`);
            retShooterUpdate = await cShooters.updateOne(
              { _id : new ObjectId(shooterData._id) }
             ,{ $set: { email: shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
                      ,docnum: shooterData.docnum
                      ,name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
                      ,category: shooterData.category
                      }
              }
            );

          }

          // console.log('shooterData.imgChanged='+shooterData.imgChanged);
          if(shooterData.imgChanged===true || shooterData.imgChanged==='true' || shooterData.imgChanged){
            // console.log('Uploading shooter img to cloudinary. img='+shooterData._id);
            
            cloudinary.uploader.upload(shooterData.img,
                { public_id: "profile/"+shooterData._id
                  ,invalidate: true
                 })
                .then(result=>console.log(result));
          }

          shooterData.dbReturn= retShooterUpdate;

          return  {
            statusCode: 200,
            body: JSON.stringify(shooterData)
          };
    
        }catch(error){
          console.log("Error patching shooter: "+error.toString());
          if(error.code.toString()==="11000"){
            
            if(error.toString().toLowerCase().indexOf('docnum_1')>0){

              // usuário na base com cpf cadastrado por Supper, mas sem cadastro no Identiry
              if(event.queryStringParameters.replace){ 
                // associa o userdb/cpf ao email
                console.log('[Shooters] Will try to update shooter my document number: '+shooterData.docnum);
                try{
                  const dbShooter= await cShooters.updateOne(
                                              {'email':shooterData.docnum+'@tpmonline.com.br', 'docnum':shooterData.docnum}
                                              ,{ $set: { email : shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
                                                ,name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')}
                                              });

                   if(dbShooter.modifiedCount<1){
                    const _msgE='[Shooters] Cannot update existing shooter by docment number: '+shooterData.docnum;
                    console.log(_msgE);
                    throw new Error(_msgE);
                   }else{
                      const dbShooterUp= await cShooters.find({'email':shooterData.email.toLowerCase().trim()}).toArray();
                      shooterData._id= dbShooterUp[0]._id;
                    return  {
                      statusCode: 200,
                      body: JSON.stringify(shooterData)
                    };
                   }
                }catch(errrrr){
                  return  {
                    statusCode:  409,
                    body: `E11000. Error, document number already registred for anoter user. { ${shooterData.docnum} `
                  };
                }
              }else{
                return  {
                  statusCode:  409,
                  body: `E11000. Error, document number already registred for anoter user. { ${shooterData.docnum} `
                };
              }
            }else if(error.toString().toLowerCase().indexOf('email_1')>0){
              return  {
                statusCode:  408,
                body: `E11000. Error, email already registred for anoter user. { ${shooterData.email} `
              };
            }


          }

          return  {
            statusCode: 510,
            body: error.toString()
          };
        }

      case 'DELETE':

      default:
        return  {
          statusCode: 400,
          body: JSON.stringify({message: "Route not found"})
        };

    }

  } catch (error) {
    console.log('[Shooters] Error- '+error);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}