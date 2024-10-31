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
    const cShooters_Divisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS_DIVISIONS);

    let p_eventId=null;
    let p_email=null;
    let p_clockDuel=null;
    let p_shooterId=null;

    switch (event.httpMethod){
      case 'GET':

        // const user= context.clientContext.user;
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
        throw new Error('Error getting user new method');
      }
      console.log(`JSON.user:stringify`, JSON.stringify(user));
      userContext= user;
    }catch(e){
      console.log(`got error getting rawNetlifyContex`);
      userContext= context.clientContext.user;
    }

        // if(!userContext){
        //   console.log(`userContext not logged!`);
        // }else console.log(`userContext logged!`);

        p_eventId=null;
        p_email=null;
        p_clockDuel=null;
        p_docnum=null;
        p_shooterId=null;

        if(event.queryStringParameters.eventId!==undefined&&event.queryStringParameters.eventId!==null&&event.queryStringParameters.eventId!==""){
          p_eventId= event.queryStringParameters.eventId.toString();
          // console.log(`p_eventId= ${p_eventId}`);
        }
        if(event.queryStringParameters.email!==undefined&&event.queryStringParameters.email!==null&&event.queryStringParameters.email!==""){
          p_email= event.queryStringParameters.email.toLowerCase().trim();
          // console.log(`p_email= ${p_email}`);
        }
        
        if(event.queryStringParameters.clock_duel!==undefined&&event.queryStringParameters.clock_duel!==null&&event.queryStringParameters.clock_duel!==""){
          p_clockDuel= event.queryStringParameters.clock_duel.toLowerCase();
          // console.log(`p_clockDuel= ${p_clockDuel}`);
        }

        if(event.queryStringParameters.docnum&&event.queryStringParameters.docnum!==""){
          p_docnum= event.queryStringParameters.docnum.toLowerCase();
          // console.log(`p_docnum= ${p_docnum}`);
        }

        if(event.queryStringParameters.shooterId&&event.queryStringParameters.shooterId!==""){
          p_shooterId= event.queryStringParameters.shooterId.trim();
          // console.log(`p_shooterId= ${p_shooterId}`);
        }

        // console.log(`userContext.email: ${userContext.email}`);
        let isAdmin= (userContext&&userContext.app_metadata&&userContext.app_metadata.roles&&userContext.app_metadata.roles.indexOf("admin")>=0);
        // let isEventAdmin= (userContext&&userContext.user_metadata&&userContext.user_metadata.admin_events&&userContext.user_metadata.admin_events!==""&&userContext.user_metadata.admin_events.indexOf(p_eventId)>-1);
        let isEventAdmin=false;
          if(!isAdmin&& userContext && userContext.email){

            //check if the userContext is admin of the event:
            const cEvent= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
            const f_id= new ObjectId(p_eventId)
            // const _e= await cEvent.aggregate( [
            //   {$match:{_id: f_id
            //           , owners: userContext.email}}
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
                       ,$or:[ {owners: userContext.email.toLowerCase().trim()}
                       , {'range.adm': userContext.email.toLowerCase().trim()}]
                      }
                  }
            ]).toArray();
            
            isEventAdmin= (_e.length>0);
          }

      
      if(p_eventId&&(p_email||p_docnum|| p_shooterId)){ // List shooter_division(inscriptions) detail
        
        // console.log(`ENTROU NO EMAIL= ${p_email}`);
        
        let fEmail= {};

        if(p_email==="all"||p_docnum==="all")
          fEmail= {shooters_divisions: {$ne: []}}
        else if(p_docnum!==null){
          fEmail= {"docnum": p_docnum};
        }else if(p_shooterId!==null){
          fEmail= {"shooterId": p_shooterId};
        }else{
          fEmail= {"email": p_email};
        }
        // console.log('[shooters_divisions_v2] fEmail='+JSON.stringify(fEmail,null,2));

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
                       { $match: { eventId: p_eventId}}
                      ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
                      ,{ $lookup:
                        {
                            from: "guns"
                            ,localField: "_gunId"
                            ,foreignField: "_id"
                            ,as: "gun_det"
                        }
                      }
                  ]
                  ,as: "shooters_divisions"
              }
          }
          ,{$match: fEmail }
          // ,{$match: {shooters_divisions: {$ne: []}}}
          ,{$project:{"eventId":0}}
          ]).toArray();

          // console.log('Masking Docnun. isEventAdmin='+isEventAdmin);
          
          for(let i=0;i<shootersDiv.length;i++){

            for(let j=0; j<shootersDiv[i].shooters_divisions.length;j++){
              if((!shootersDiv[i].shooters_divisions[j].gun || shootersDiv[i].shooters_divisions[j].gun==='') && shootersDiv[i].shooters_divisions[j].gun_det&&shootersDiv[i].shooters_divisions[j].gun_det.length>0){
                // console.log('Entrou editando gun.'+shootersDiv[i].shooters_divisions[j].gun);
                shootersDiv[i].shooters_divisions[j].gun= shootersDiv[i].shooters_divisions[j].gun_det[0].factory+" "
                                + shootersDiv[i].shooters_divisions[j].gun_det[0].model+" ("
                                + shootersDiv[i].shooters_divisions[j].gun_det[0].caliber+")";
              }
              shootersDiv[i].shooters_divisions[j].gunModel= shootersDiv[i].shooters_divisions[j].gun_det[0].model;
              shootersDiv[i].shooters_divisions[j].gunCaliber= shootersDiv[i].shooters_divisions[j].gun_det[0].caliber;
              shootersDiv[i].shooters_divisions[j].gunFactory= shootersDiv[i].shooters_divisions[j].gun_det[0].factory;
            }
            
            console.log('');
            console.log('');
            console.log('####################################');
            console.log('userContext=',userContext);
            
            if(userContext&&userContext.email&&shootersDiv[i].email){
              console.log('userContext.email.toLowerCase().trim()=',userContext.email.toLowerCase().trim());
              console.log('shootersDiv[i].email.toLowerCase().trim()=',shootersDiv[i].email.toLowerCase().trim());
            }

            console.log('####################################');
            console.log('');
            console.log('');

            if(!isAdmin&&!isEventAdmin){
              if(!userContext||!userContext.email||!shootersDiv[i].email||userContext.email.toLowerCase().trim()!==shootersDiv[i].email.toLowerCase().trim()){
                
                shootersDiv[i].docnum= shootersDiv[i].docnum.substring(0,2)+'*.***.*'+shootersDiv[i].docnum.substring(7,9)+"-"+shootersDiv[i].docnum.substring(9);

              }
            }
          }

          return  {
            statusCode: 200,
            body: JSON.stringify(shootersDiv)
          };

      }else if(p_eventId!==null){ //listing all shooters in a eventId, with their best time for each division
        // console.log(`ENTROU NO ENVENTO= ${p_eventId}`);
        let _match={"eventId": p_eventId};

        if(p_clockDuel==='clock'){
          _match.clock= true;
        }else if(p_clockDuel==='duel'){
          _match.duel= true;
        }

        p_clockDuel=null;
        const shootersDiv= await cShooters.aggregate([
          { "$addFields": {"shooterId": { "$toString": "$_id" }}}
          ,{$lookup:{
              from: "shooters_divisions"
              ,localField: "shooterId"
              ,foreignField: "shooterId"
              ,as: "registered"
              ,pipeline:[
                  // {$match:{eventId: p_eventId}}
                  {$match:_match}
                  ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
                  ,{ $lookup:
                      {
                          from: "time_records"
                          ,localField: "shooterDivisionId"
                          ,foreignField: "shooterDivisionId"
                          ,as: "time_records"
                          ,pipeline:[
                              // {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                              {$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                              
                              // ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}}
                              ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$max:"$datetime"}, penalties:{$min:"$penalties"}}}
                          ]
                      }
                  }
                  ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
              
                  ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
                  ,{ $lookup:
                      {
                          from: "guns"
                          ,localField: "_gunId"
                          ,foreignField: "_id"
                          ,as: "gun_det"
                      }
                  }

                ]
              }
          }
          ,{$match: {registered: {$ne: []}}}
          ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
          ]).sort({"registered.score":1}).toArray();
          
          // console.log('==================================');
          

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
        throw new Error('Error getting user new method');
      }
      console.log(`JSON.user:stringify`, JSON.stringify(user));
      userContext= user;
    }catch(e){
      console.log(`got error getting rawNetlifyContex`);
      userContext= context.clientContext.user;
    }
          
          for(let i=0;i<shootersDiv.length;i++){
            // console.log('=antes do if=');
            // console.log(`shootersDiv[i].registered&& shootersDiv[i].registered.gun_det && shootersDiv[i].registered.gun_det.length= ${shootersDiv[i].registered} && ${shootersDiv[i].registered.gun_det} && ${shootersDiv[i].registered.gun_det.length}` );
            if(shootersDiv[i].registered &&shootersDiv[i].registered.length>0&& shootersDiv[i].registered[0].gun_det && shootersDiv[i].registered[0].gun_det.length>0){
              
              for(let j=0; j<shootersDiv[i].registered.length;j++){
                if(!shootersDiv[i].registered[j].gun){
                  shootersDiv[i].registered[j].gun= shootersDiv[i].registered[j].gun_det[0].factory+" "
                            +shootersDiv[i].registered[j].gun_det[0].model+ " ("
                            +shootersDiv[i].registered[j].gun_det[0].caliber+ ")";
                }
                shootersDiv[i].registered[j].gunModel= shootersDiv[i].registered[j].gun_det[0].model;
                shootersDiv[i].registered[j].gunCaliber= shootersDiv[i].registered[j].gun_det[0].caliber;
                shootersDiv[i].registered[j].gunFactory= shootersDiv[i].registered[j].gun_det[0].factory;

                // console.log(`===DENTRO DO If shootersDiv[i].registered[j].gun= ${shootersDiv[i].registered[j].gun}`);
              }
            }

            console.log('');
            console.log('');
            console.log('====================================');
            console.log('userContext=',userContext);
            
            if(userContext){
              console.log('userContext.email.toLowerCase().trim()=',userContext.email.toLowerCase().trim());
              console.log('shootersDiv[i].email.toLowerCase().trim()=',shootersDiv[i].email.toLowerCase().trim());
            }

            if(!userContext||userContext.email.toLowerCase().trim()!==shootersDiv[i].email.toLowerCase().trim()){
              shootersDiv[i].docnum= shootersDiv[i].docnum.substring(0,2)+'*.***.*'+shootersDiv[i].docnum.substring(7,9)+"-"+shootersDiv[i].docnum.substring(9);
            }
            console.log('====================================');
            console.log('');
            console.log('');
          }

            return  {
              statusCode: 200,
              body: JSON.stringify(shootersDiv)
            };

          }else{ //list all
            //TODO: 
          }

      case 'PUT': // associates divisions with a shooter

        let shooterDivisions= JSON.parse(event.body);
        p_eventId=null;
        if(event.queryStringParameters.eventId!==undefined&&event.queryStringParameters.eventId!==null&&event.queryStringParameters.eventId!==""){
              p_eventId= event.queryStringParameters.eventId.toString();
            }else{
              p_eventId= shooterDivisions.eventId;
            }
            // console.log(`p_eventId= ${p_eventId}`);

        try{
          // console.log(`PUTTED JSON.stringify(body)=: ${JSON.stringify(event.body,null,2)}`);

          // console.log(JSON.stringify(context, null, 2))
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
            throw new Error('Error getting user new method');
          }
          console.log(`JSON.user:stringify`, JSON.stringify(user));
          userContext= user;
        }catch(e){
          console.log(`got error getting rawNetlifyContex`);
          userContext= context.clientContext.user;
        }

          if(!userContext||!userContext.email){
            // console.log(`Unauthorized, userContext not logged!`);
            return  {
              statusCode: 401,
              body: `Unauthorized, userContext not logged!`
            }; 
          }

          // console.log(`userContext.email: ${userContext.email}`);
          let isAdmin= (userContext!==null&&userContext!==undefined&&userContext.app_metadata!==null&&userContext.app_metadata!==undefined &&userContext.app_metadata.roles!==undefined&&userContext.app_metadata.roles!==""&&!(userContext.app_metadata.roles.indexOf("admin")<0));
          // console.log(`is Admin: ${isAdmin}`);

          let isEventAdmin=false;
          if(!isAdmin){

            //check if the userContext is admin of the event:
            const cEvent= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
            const f_id= new ObjectId(p_eventId)
            // const _e= await cEvent.aggregate( [
            //   {$match:{_id: f_id
            //           , owners: userContext.email}}
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
                       ,$or:[ {owners: userContext.email.toLowerCase().trim()}
                       , {'range.adm': userContext.email.toLowerCase().trim()}]
                      }
                  }
            ]).toArray();
            
            isEventAdmin= (_e.length>0);
          }

          if(shooterDivisions.email.toLowerCase().trim()!==userContext.email.toLowerCase().trim()
          &&!isAdmin&&!isEventAdmin){
            console.log(`Unauthorized, userContext ${userContext.email} (isEventAdmin=${isEventAdmin}) cannot update/insert the userContext ${shooterDivisions.email.toLowerCase().trim()} (shooterId: ${shooterDivisions.shooterId})!`);
            return  {
              statusCode: 401,
              body: `Unauthorized, userContext ${userContext.email} cannot update/insert the userContext ${shooterDivisions.email.toLowerCase().trim()} (shooterId: ${shooterDivisions.shooterId})!`
            };
          }

          let _shooterUpsert= {
            name: shooterDivisions.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
            ,email: shooterDivisions.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
            ,docnum: shooterDivisions.docnum
            ,last_updater: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
            ,last_updater_date: Date.now()
            };
          
           if(shooterDivisions.category && shooterDivisions.category!==null){
              _shooterUpsert.category= shooterDivisions.category;
           }
            
          const new_record= await cShooters.updateOne(
                                            {email: shooterDivisions.email.toLowerCase().trim()}
                                            ,{$set: _shooterUpsert
                                              ,$setOnInsert: { 
                                                inserter: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
                                               ,inserter_date: Date.now()
                                             }
                                            }
                                            ,{upsert:true}
          
                                          );
                                        
          // console.log('');
          // console.log('==============new_record===================');
          // console.log(JSON.stringify(new_record,null,2));
          // console.log('===========================================');
          // console.log('');
          if(shooterDivisions.shooterId===null||shooterDivisions.shooterId===""||shooterDivisions.shooterId===undefined){

            if(new_record.upsertedId!==null && new_record.upsertedId!==undefined){
              shooterDivisions._id= new_record.upsertedId.toString();
              shooterDivisions.shooterId= shooterDivisions._id;
            }
          }

          new_record.updatedShooterDivisions=[];
          for(let i=0; i< shooterDivisions.shooters_divisions.length;i++){
          
            if( shooterDivisions.shooters_divisions[i].shooterId===undefined
              ||shooterDivisions.shooters_divisions[i].shooterId===null
              ||shooterDivisions.shooters_divisions[i].shooterId===""){
                shooterDivisions.shooters_divisions[i].shooterId=shooterDivisions._id.toString();
            }

            if( shooterDivisions.shooters_divisions[i]._id===undefined
              ||shooterDivisions.shooters_divisions[i]._id===null
              ||shooterDivisions.shooters_divisions[i]._id===""){
                shooterDivisions.shooters_divisions[i]._id=""
            }

            if(shooterDivisions.shooters_divisions[i].eventId !== p_eventId
             ||shooterDivisions.shooters_divisions[i].shooterId!== shooterDivisions._id
            ){
              console.log(`Unauthorized, userContext ${userContext.email} cannot update/insert registritions in events different than ${p_eventId}) or for other shoooters in this operation!`);
              return  {
                statusCode: 401,
                body: `Unauthorized, userContext ${userContext.email} cannot update/insert registritions in events different than ${p_eventId}) in this operation!`
                };
            }

            if(shooterDivisions.shooters_divisions[i]._id===""){

              new_record.updatedShooterDivisions.push(await cShooters_Divisions.insertOne(
                { shooterId: shooterDivisions.shooters_divisions[i].shooterId
                    ,divisionId: shooterDivisions.shooters_divisions[i].divisionId
                    ,eventId: shooterDivisions.shooters_divisions[i].eventId
                    ,gun: shooterDivisions.shooters_divisions[i].gun?shooterDivisions.shooters_divisions[i].gun.replaceAll('"','').replaceAll("'","").replaceAll('`',''):""
                    ,gunId: shooterDivisions.shooters_divisions[i].gunId
                    ,gunRegNum: shooterDivisions.shooters_divisions[i].gunRegNum?shooterDivisions.shooters_divisions[i].gunRegNum:""
                    ,optics: shooterDivisions.shooters_divisions[i].optics
                    ,clock: shooterDivisions.shooters_divisions[i].clock
                    ,duel: shooterDivisions.shooters_divisions[i].duel
                    ,order_aux: 0
                    ,subscribe_date: new Date()
                    ,inserter: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
                    ,inserter_date: Date.now()
                    }));

                    if(new_record.updatedShooterDivisions[new_record.updatedShooterDivisions.length-1].insertedId!==null && new_record.updatedShooterDivisions[new_record.updatedShooterDivisions.length-1].insertedId!==undefined)
                      shooterDivisions.shooters_divisions[i]._id= new_record.updatedShooterDivisions[new_record.updatedShooterDivisions.length-1].insertedId.toString();
                    else
                      shooterDivisions.shooters_divisions[i]._id= shooterDivisions.shooterId;
                    
            }else{
              
              new_record.updatedShooterDivisions.push(await cShooters_Divisions.updateOne(
                                                                {_id: new ObjectId(shooterDivisions.shooters_divisions[i]._id)}
                                                            ,{$set:{ shooterId: shooterDivisions.shooters_divisions[i].shooterId
                                                                    ,divisionId: shooterDivisions.shooters_divisions[i].divisionId
                                                                    ,eventId: shooterDivisions.shooters_divisions[i].eventId
                                                                    ,gun: shooterDivisions.shooters_divisions[i].gun?shooterDivisions.shooters_divisions[i].gun.replaceAll('"','').replaceAll("'","").replaceAll('`',''):""
                                                                    ,gunId: shooterDivisions.shooters_divisions[i].gunId
                                                                    ,gunRegNum: shooterDivisions.shooters_divisions[i].gunRegNum?shooterDivisions.shooters_divisions[i].gunRegNum:""
                                                                    ,optics: shooterDivisions.shooters_divisions[i].optics
                                                                    ,clock: shooterDivisions.shooters_divisions[i].clock
                                                                    ,duel: shooterDivisions.shooters_divisions[i].duel
                                                                    ,order_aux: 0
                                                                    ,subscribe_date: new Date()
                                                                    ,last_updater: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
                                                                    ,last_updater_date: Date.now()
                                                                    }
                                                                ,$setOnInsert: { 
                                                                  inserter: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
                                                                  ,inserter_date: Date.now()
                                                                 }}
                                                              ,{upsert:true}
                                                            ));
                  }
          } //for

          // console.log('shooterDivisions.imgChanged='+shooterDivisions.imgChanged);
          if(shooterDivisions.imgChanged){
            console.log('Uploading shooter img to cloudinary. img='+shooterDivisions._id);
            
            cloudinary.uploader.upload(shooterDivisions.img,
                { public_id: "profile/"+shooterDivisions._id
                  ,invalidate: true
                 })
                .then(result=>console.log(result));
          }
          shooterDivisions.db_return= new_record;
          return  {
            statusCode: 200,
            body: JSON.stringify(shooterDivisions)
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


      case 'PATCH': // associates divisions with a shooter
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let shooter= JSON.parse(event.body);

        let registered= shooter.registered;
        let shooterId=shooter.shooterId;
        let event_id= shooter.event_id;
        delete shooter.registered;
        delete shooter.shooterId;
        delete shooter.event_id;
  
        if(shooterId===null||shooterId===""||shooterId===0){ // new shooter

          shooter.inserter= (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown';
          shooter.inserter_date= Date.now();
  
          new_record= await cShooters.insertOne(shooter);

          shooter.shooterId= new_record.insertedId.toString();
          shooterId= new_record.insertedId.toString();

          //TODO: index unique key shooter
        }else{
            new_record= await cShooters.updateOne({ _id : new ObjectId(shooterId) }
                                                 ,{ $set: { 
                                                   name : shooter.name.replaceAll('"','').replaceAll("'","").replaceAll('`','')
                                                   ,email: shooter.email.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','')
                                                   ,category: shooter.category 
                                                  //  ,eventId: shooter.eventId 
                                                  ,last_updater: (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown'
                                                  ,last_updater_date: Date.now()
                                                  }
                                                 });
          // console.log(`Updated!: ${new_record.toString()}, Name: ${shooter.name}`);
          new_record.shooterId= new_record;
          // console.log(`Done!`);
        }

        let shooter_division= {};
        let shooters_divisions= [];

        for(let i=0 ;i< registered.length;i++){
          shooter_division= {};
          shooter_division.shooterId=shooterId;
          shooter_division.divisionId= registered[i].divisionId;
          shooter_division.eventId=event_id;
          shooter_division.gun= registered[i].gun?registered[i].gun.replaceAll('"','').replaceAll("'","").replaceAll('`',''):"";
          shooter_division.gunId= registered[i].gunId?registered[i].gunId:"";
          shooter_division.gunRegNum= registered[i].gunRegNum?registered[i].gunRegNum:"";
          shooter_division.optics= registered[i].optics;
          shooter_division.order_aux= 0;
          shooter_division.subscribe_date= new Date();
          shooter_division.inserter= (userContext&&userContext.email)?userContext.email.toLowerCase().trim():'unknown';
          shooter_division.inserter_date= Date.now();
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


      try{
          // console.log(`DELETE shooter_division.JSON.stringify(body)=: ${JSON.stringify(event.body,null,2)}`);
          let shooterDivisions= JSON.parse(event.body);
        
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
              throw new Error('Error getting user new method');
            }
            console.log(`JSON.user:stringify`, JSON.stringify(user));
            userContext= user;
          }catch(e){
            console.log(`got error getting rawNetlifyContex`);
            userContext= context.clientContext.user;
          }
          if(!userContext){
            console.log(`Unauthorized, userContext (not logged)!`);
            return  {
              statusCode: 401,
              body: `Unauthorized, userContext (not logged)!`
            }; 
          }

          let isAdmin= (userContext.app_metadata&&userContext.app_metadata.roles&&userContext.app_metadata.roles!==undefined&&(userContext.app_metadata.roles.indexOf("admin")>-1));
          // console.log(`is Admin: ${isAdmin}`);

          
          let filter_Ids= [new ObjectId("000000000000000000000000")];
          let filterStringIds= ["000000000000000000000000"];

          for(let i=0; i< shooterDivisions.shooters_divisions.length;i++){
            filter_Ids.push(new ObjectId(shooterDivisions.shooters_divisions[i]._id));
            filterStringIds.push(shooterDivisions.shooters_divisions[i]._id);
          }
          
          if(!isAdmin){
            /*
            Identify if the user has permissions to delete the subscriptions.
            Users can delete  substriptins only if he/she is:
            1, Master Admin (identiy role)
            2. The Ouner of the event
            3. The substriber itself
            This logic will ignore the unautorized records, deletting only the autorized ones.  
            */
            // console.log(``);
            // console.log(`=================================================`);
            // console.log(`filter ids: ${JSON.stringify(filter_Ids,null,2) }`);
            // console.log(`=================================================`);
            let autorized_shooters_divisions= await cShooters_Divisions.aggregate( [
              {$match:{_id: { $in: filter_Ids} }}
              ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
              ,{ $lookup:{ from: "events"
                      ,localField: "eventId"
                      ,foreignField: "_id"
                      ,as: "events_adm"
                      ,pipeline:[
                          {$match:{"owners": userContext.email.toLowerCase().trim()}}
                      ]
              }}
              ,{ $addFields: { "shooterId": { $toObjectId: "$shooterId" }}}
              ,{$lookup:{ from: "shooters"
                  ,localField: "shooterId"
                  ,foreignField: "_id"
                  ,as: "shooters"
                  ,pipeline:[
                      {$match:{"email": userContext.email.toLowerCase().trim()}}
                  ]
              }}
              ,{$match: { $or:[ {events_adm: {$ne: []}}, {shooters: {$ne: []}} ]  }}
              ]).toArray();

              let _e= [];

              if(autorized_shooters_divisions.length<1){

                const cEvent= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
                const f_id= new ObjectId(event.queryStringParameters.eventId.toString());

                _e= await cEvent.aggregate( [
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

              }

              if(autorized_shooters_divisions.length<1 &&_e.length<1){
                console.log(`Unauthorized! userContext ${userContext.email} cannot delete subscriptions of other shooters! (shooterId: ${shooterDivisions.shooterId})`);
                return  {
                  statusCode: 401,
                  body: `Unauthorized! userContext ${userContext.email} cannot delete subscriptions of other shooters! (shooterId: ${shooterDivisions.shooterId})`
                }; 
              }

              filter_Ids= [new ObjectId("000000000000000000000000")];
              let filterStringIds= ["000000000000000000000000"];
              
              // for(let i=0; i< autorized_shooters_divisions.length;i++){
              //   filter_Ids.push(autorized_shooters_divisions[i]._id);
              //   filterStringIds.push(autorized_shooters_divisions[i]._id.toString());
              // }

              for(let i=0; i< shooterDivisions.shooters_divisions.length;i++){
                filter_Ids.push(new ObjectId(shooterDivisions.shooters_divisions[i]._id));
                filterStringIds.push(shooterDivisions.shooters_divisions[i]._id.toString());
              }

              // console.log('shooterDivisions.shooters_divisions.length='+shooterDivisions.shooters_divisions.length);

              // console.log('filter_Ids='+JSON.stringify(filter_Ids));
              // console.log('filterStringIds='+JSON.stringify(filterStringIds));

          }

          //test if has time recorded. Do not delete inscription if it has time recorded
          const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);
          const r_time_Records= await cTime_Records.find({shooterDivisionId:{$in: filterStringIds }}).toArray();
        
          if(r_time_Records.length>0){

            return  { 
              statusCode: 409,  
              body: `Cannot delete inscription with time recorded!`
            };

          }

          
          let r_delete_divisions= await cShooters_Divisions.deleteMany({_id: { $in: filter_Ids }});
          // console.log(`Deleto divisões: r_delete_divisions.toString() ${JSON.stringify(r_delete_divisions,null,2)}`);

          // const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);
          // r_delete_divisions.time_records_deleted= await cTime_Records.deleteMany({shooterDivisionId:{$in: filterStringIds }});
          
          // console.log(`Deleted objects:  ${JSON.stringify(r_delete_divisions,null,2)}`);


          return  { 
            statusCode: 200,  
            body: JSON.stringify(r_delete_divisions)
          };
        }catch(error){
          console.log("Error deleting shooter_divisions: "+error.toString());
          return  {
            statusCode: 510,
            body: error.toString()
          };
        }

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