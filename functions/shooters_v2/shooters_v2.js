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

    console.log(`Starting shooter_v2?`);


    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    console.log(`got database`);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    console.log(`got cShooters`);
    
    // const userContext= context.clientContext.user;
    let userContext=null;
    try{
      console.log(`before get rawNetlifyContex`);
      const rawNetlifyContext = context.clientContext.custom.netlify;
      console.log(`rawNetlifyContex=`, netlifyContext);
      const netlifyContext = Buffer.from(rawNetlifyContext, 'base64').toString('utf-8');
      
      const { identity, user } = JSON.parse(netlifyContext);
      console.log(`got user:`, user);
      if(!user || !user.email ){
        throw new Error('Error getting user new method');
      }
      console.log(`JSON.user:stringify`, JSON.stringify(user));
      
      userContext= user;
    }catch(e){
      console.log(`got error getting rawNetlifyContex`);
      userContext= context.clientContext.user;
    }

    console.log(`userContext=`, userContext);
    console.log(`userContext.email=`, userContext?userContext.email:'userContext undefined');

    switch (event.httpMethod){
      case 'GET':

      console.log(`getting into de GET phethod`);

      try{
        console.log(`Got into shooter_v2?logged=${event.queryStringParameters.logged}`);
        console.log(`Got into shooter_v2?uuid=${event.queryStringParameters.uuid}`);

        filter={};
        if(event.queryStringParameters.logged!==undefined){
          console.log(`Got into event.queryStringParameters.logged!==undefined`);

          // if(context.clientContext!==undefined&&context.clientContext.user!==undefined){
          if(userContext!==undefined){
            console.log(`Got into context.clientContext!==undefined&&context.clientContext.user!==undefined`);
            // filter.email= context.clientContext.user.email.toLowerCase().trim();
            filter.email= userContext.email.toLowerCase().trim();
          }else{
            console.log(`NOTTTTTT got into context.clientContext!==undefined&&context.clientContext.user!==undefined`);
            filter.email= (Math.random()*1000000).toString();
          }

        }else{ 
          console.log(`NOT Got into event.queryStringParameters.logged!==undefined`);
          
          if(event.queryStringParameters.email!==undefined){
            filter.email= event.queryStringParameters.email.toLowerCase().trim();
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

        let retShooters;
        try{
          retShooters = await cShooters.find(filter).toArray();
        }catch(error){
          console.log('Error finding shooter!');
          // return res.status(400).json({ success: false, errors: _error.array() });
          console.log('error here B: ', error);
          return  {
            statusCode: 400,
            body: JSON.stringify(_error)
          };
        }

        console.log('retShooters.length', retShooters.length);
        if(retShooters.length>0 && retShooters[0]._id
          &&userContext&&userContext.email&&userContext.email.toLowerCase().trim() ===retShooters[0].email.toLowerCase().trim()   //usuário logado é o mesmo do avatar
          && userContext.user_metadata&& userContext.user_metadata.avatar_url&&userContext.user_metadata.avatar_url!==''){

          console.log('Vai consultar img', retShooters[0]._id);

          let _hasImg= false;
          await cloudinary.api.resource("profile/"+retShooters[0]._id)
          .then(result =>{
            _hasImg=true;
            console.log(result);
          })
          .catch(error =>{
            console.error(error);
            _hasImg=false;
          });
          
          if(!_hasImg){
          console.log('VAI FAZER UPDOAD NO CLOUDINARY!!!!!!!!!!!!! avatar_url=',avatar_url);
          await cloudinary.uploader.upload(userContext.user_metadata.avatar_url,
              { public_id: "profile/"+retShooters[0]._id
                ,overwrite: false
                })
              .then(result=>console.log(result));
          }

        }

        let isAdmin= userContext&&userContext.app_metadata&&userContext.app_metadata.roles&&(userContext.app_metadata.roles.indexOf("admin")>=0||userContext.app_metadata.roles.indexOf("super")>=0);
        
        if(!isAdmin){ //mask sensitivy data

          let isEventAdmin=false;
          if(event.queryStringParameters.eventId && userContext && userContext.email){

            //check if the userContext is admin of the event:
            const cEvent= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
            const f_id= new ObjectId(event.queryStringParameters.eventId)
            
            const _e= await cEvent.aggregate( [
              { $addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
              ,{$lookup:{
                  from: "ranges"
                  ,localField: "_rangeId"
                  ,foreignField: "_id"
                  ,as: "range"
              }}
              ,{$match:{_id: f_id
                      ,$or:[ {owners: userContext.email.toLowerCase().trim()}
                      , {'range.adm': userContext.email.toLowerCase().trim()}]
                      }
                  }
            ]).toArray();
            
            isEventAdmin= (_e.length>0);

            console.log('isEventAdmin=',isEventAdmin);
          }

          if(!isEventAdmin)
            for(let i=0;i<retShooters.length;i++){
                if(!userContext||!userContext.email||userContext.email.trim().toLowerCase() !== retShooters[0].email.trim().toLowerCase()){
                  retShooters[0].docnum= retShooters[0].docnum.substring(0,2)+'*.***.*'+retShooters[0].docnum.substring(7,9)+"-"+retShooters[0].docnum.substring(9);
                  
                retShooters[0].fullName= "*******";
                retShooters[0].birthday= null;
                retShooters[0].cr= '******';
                retShooters[0].crEndDate= null;

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
      }catch(_error){
        // return res.status(400).json({ success: false, errors: _error.array() });
        console.log('error here A: ', _error);
        return  {
          statusCode: 400,
          body: JSON.stringify(_error)
        };


      }

      case 'PATCH':

        let shooterData= JSON.parse(event.body);

        try{

          console.log('shooterData.eventOwners=',shooterData.eventOwners);
          

          if(!userContext|| !shooterData.email ||!userContext.app_metadata|| 
            (userContext.email.toLowerCase().trim()!==shooterData.email.toLowerCase().trim())
             &&((!userContext.app_metadata.roles || userContext.app_metadata.roles.indexOf("admin")<0)
             && (!userContext.app_metadata.roles || userContext.app_metadata.roles.indexOf("super")<0)
             && (!shooterData.eventOwners || shooterData.eventOwners.length<1|| shooterData.eventOwners.indexOf(userContext.email.toLowerCase().trim())<0))
            ){
              console.log(`Unauthorized, userContext not logged!`);
              console.log(`userContext.app_metadata.roles= ${userContext.app_metadata.roles}`);
              return  {
                statusCode: 401,
                body: `Unauthorized, userContext not logged!`
              }; 
          }

          console.log('after cheking auth!');

          let retShooterUpdate=null;

          if(!shooterData._id||shooterData._id===null||shooterData._id===0||shooterData._id===""||shooterData._id==="new"){
            // console.log(`[Shooters] Inserting new shooter:${shooterData.email.toLowerCase().trim()}, docnum:${shooterData.docnum}`);
            retShooterUpdate = await cShooters.insertOne(
              { email : shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
              ,docnum: shooterData.docnum
              ,name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
              ,category: shooterData.category
              ,inserter: userContext.email.toLowerCase().trim()
              ,inserter_date: Date.now()
              }
            );

            console.log('GOT in INSERTTTT!');

            shooterData._id= retShooterUpdate.insertedId;

          }else{
            console.log(`[Shooters] Updating shooter:${shooterData.email.toLowerCase().trim()}, id:${shooterData._id}, docnum:${shooterData.docnum}`);

            let _shooterUpd= {
              //  email: shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
              // ,docnum: shooterData.docnum
                name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
                ,category: shooterData.category
                
                ,fullName: shooterData.fullName
                ,birthday: shooterData.birthday
                ,sex: shooterData.sex
                ,cr: shooterData.cr
                ,crEndDate: shooterData.crEndDate
                ,last_updater: userContext.email.toLowerCase().trim()
                ,last_updater_date: Date.now()
              };

              console.log('First _shooterUpd', _shooterUpd);

              if(shooterData.email&&shooterData.email.indexOf('*')<0){
                _shooterUpd.email= shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','');
              }

              console.log('ater testing email. _shooterUpd', _shooterUpd);

              if(shooterData.docnum && shooterData.docnum.indexOf('**')<0){
                _shooterUpd.docnum= shooterData.docnum;
              }

              console.log('ater testing docnum. _shooterUpd', _shooterUpd);


            retShooterUpdate = await cShooters.updateOne(
              { _id : new ObjectId(shooterData._id) }
             ,{ $set: _shooterUpd
              }
            );

          }

          // console.log('shooterData.imgChanged='+shooterData.imgChanged);
          if(shooterData.imgChanged===true || shooterData.imgChanged==='true' ){
            console.log('Uploading shooter img to cloudinary. img='+shooterData._id);
            console.log('Uploading shooter img to cloudinary. shooterData.imgChanged='+shooterData.imgChanged);
            
            await cloudinary.uploader.upload(shooterData.img,
                { public_id: "profile/"+shooterData._id
                  ,invalidate: true
                 })
                .then(result=>console.log(result))
                .catch( (error) => {
                  console.log("error", JSON.stringify(error,null,2));
                });
          }

          shooterData.dbReturn= retShooterUpdate;

          return  {
            statusCode: 200,
            body: JSON.stringify(shooterData)
          };
    
        }catch(error){
          console.log('GOT error updating Shooter. error=',error);
          console.log("Error patching shooter: "+error.toString());
          if(error.code.toString()==="11000"){
            
            if(error.toString().toLowerCase().indexOf('docnum_1')>0){

              // usuário na base com cpf cadastrado por Supper, mas sem cadastro no Identiry
              if(event.queryStringParameters.replace){ 
                // associa o userdb/cpf ao email
                console.log('[Shooters] Will try to update shooter my document number: '+shooterData.docnum);
                try{

                  let user_updater= 'unknown';
                  if(userContext && userContext.email){ 
                    user_updater= userContext.email;
                  }

                  console.log('=====================================');
                  console.log(shooterData.docnum+'@tpmonline.com.br');
                  console.log(shooterData.docnum);
                  console.log( shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`',''));
                  console.log(shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`',''));
                  console.log(user_updater);
                  console.log(Date.now());
                  console.log('=====================================');
                  

                  const dbShooter= await cShooters.updateOne(
                                              {'email':shooterData.docnum+'@tpmonline.com.br', 'docnum':shooterData.docnum}
                                              ,{ $set: { email : shooterData.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
                                                ,name: shooterData.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
                                                ,last_updater: user_updater
                                                ,last_updater_date: Date.now()}
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
                  console.log('ERRORRR aqui: ', errrrr)
                  //// CPF já cadastrado com um outro email. Exibir o email já cadastrado!
                  const existentShooter= await cShooters.find({'docnum':shooterData.docnum}).toArray();
                  let _existentEmailMsg=', EMAIL NOT FOUND!?!?';
                  let _existentEmail='';
                  if(existentShooter.length>0){
                    _existentEmailMsg= ', email= '+existentShooter[0].email;
                    _existentEmail= existentShooter[0].email;
                  }

                  return  {
                    statusCode:  409,
                    body: JSON.stringify( { errorCode:409, registeredEmail:_existentEmail, errorMessage: `E11000. Error, document number already registred for anoter user. docnum ${shooterData.docnum}${_existentEmailMsg}`})
                  };
                }
              }else{

                //// CPF já cadastrado com um outro email. Exibir o email já cadastrado!
                const existentShooter= await cShooters.find({'docnum':shooterData.docnum}).toArray();
                let _existentEmailMsg=', EMAIL NOT FOUND!?!?';
                let _existentEmail='';
                if(existentShooter.length>0){
                  _existentEmailMsg= ', email= '+existentShooter[0].email;
                  _existentEmail= existentShooter[0].email;
                }

                return  {
                  statusCode:  409,
                  body: JSON.stringify( { errorCode:409, registeredEmail:_existentEmail, errorMessage: `E11001. Error, document number already registred for anoter user. docnum=${shooterData.docnum}${_existentEmailMsg}`})
                };
              }
            }else if(error.toString().toLowerCase().indexOf('email_1')>0){

              //// email já usado para outro CPF. Exibir CPF já cadastrado?????
              const existentShooter= await cShooters.find({'email':shooterData.email}).toArray();
                let _existentEmailMsg=', EMAIL NOT FOUND!?!?';
                let _existentEmail='';
                if(existentShooter.length>0){
                  _existentEmailMsg= ', email= '+existentShooter[0].email;
                  _existentEmail= existentShooter[0].email;
                }

              return  {
                statusCode:  408,
                body: JSON.stringify( { errorCode:408
                                        , registeredEmail:_existentEmail
                                       ,errorMessage:  `E11002. Error, email already registred for anoter user. { ${shooterData.email}${_existentEmailMsg} `})
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