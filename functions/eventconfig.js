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
  // const userContext= context.clientContext.user;
  
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

  try {

    const p_eventId= event.queryStringParameters.eventId.toString();
    
    console.log(`=======================`);
    console.log(`p_eventId= ${p_eventId}`);
    console.log(`=======================`);

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cDivisions= database.collection(process.env.MONGODB_COLLECTION_DIVISIONS);
    const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
    const cRanges= database.collection(process.env.MONGODB_COLLECTION_RANGES);

    let o_id = null;
    // if(p_eventId!=='0'||p_eventId!==''){
    try{
      o_id = new ObjectId(p_eventId);
    }catch(error){
      o_id = null;
    }


    switch (event.httpMethod){
      case 'PATCH':

        console.log('Entrou no patch');
        console.log('userContext='+userContext);
        console.log('userContext.emal='+userContext.email);
        // console.log('userContext.app_metadata.roles[0]='+userContext.app_metadata.roles[0]);
        let event_config= JSON.parse(event.body);
      
        let isAdmin= (userContext.app_metadata.roles!==undefined&&userContext.app_metadata.roles!==""&&!(userContext.app_metadata.roles.indexOf("admin")<0));
        console.log('isAdmin='+isAdmin);

        let updatedEvent=null;
        if(!isAdmin){

          const rangeAdm= cRanges.find({_id: new ObjectId(event_config.rangeId), adm: {$eq:userContext.email.toLowerCase().trim()}}).toArray();

          if( rangeAdm.length<=0){
            return  {
              statusCode: 401,
                body: `Unauthorized, userContext ${userContext.email} cannot update/insert events for this shooting range!`
              };
          }

          console.log('Nao eh adm 0');
          // filter.owners=userContext.email;
          event_config.owners.push(userContext.email.toLowerCase().trim());
          console.log('Nao eh adm 1');
          event_config.owners = [...new Set(event_config.owners)];
          console.log('event_config.owners'+event_config.owners);
        }
        
        let clearOwners=[];
        for(let i=0; i< event_config.owners.length;i++){
          if(event_config.owners[i]!==null||event_config.owners[i]!==undefined||event_config.owners[i].trim()!==""){
            clearOwners.push(event_config.owners[i]);
          }
        }

        if(o_id===null){
           updatedEvent= await cEvents.insertOne({  
              name : event_config.name
              // ,date: event_config.date
              ,date: new Date(event_config.date)
              //,dateDuel: (event_config.dateDuel===null||event_config.dateDuel===undefined||event_config.dateDuel===''?event_config.date:event_config.dateDuel)
              ,dateDuel: new Date((event_config.dateDuel===null||event_config.dateDuel===undefined||event_config.dateDuel===''?event_config.date:event_config.dateDuel))
              // ,rangeId: event_config.local
              ,rangeId: event_config.rangeId
              ,img: ''
              ,note: event_config.note
              // ,owners:event_config.owners
              ,owners: clearOwners
              // ,address: event_config.address
              // ,city: event_config.city
              // ,state: event_config.state
              ,public: event_config.public
              ,clock: event_config.clock
              ,duel: event_config.duel
              ,randomDuel:event_config.randomDuel
              ,vl_first_try:event_config.vl_first_try
              ,vl_second_try:event_config.vl_second_try
              ,vl_other_tries:event_config.vl_other_tries

            });
        }else{
          try{
            let filter={ "_id" : o_id};
            if(!isAdmin){
              console.log('Nao eh adm');
              // filter.owners=userContext.email;
              event_config.owners.push(userContext.email.toLowerCase().trim());
              event_config.owners = [...new Set(event_config.owners)];
              event_config.owners= event_config.owners.reduce((acc, i) => i ? [...acc, i] : acc, []);
              console.log('event_config.owners'+event_config.owners);
            }
            
            if(event_config.dateDuel===null||event_config.dateDuel===undefined||event_config.dateDuel===''){
              event_config.dateDuel= event_config.date;
            }

              let clearOwners=[];
              for(let i=0; i< event_config.owners.length;i++){
                if(event_config.owners[i]!==null||event_config.owners[i]!==undefined||event_config.owners[i].trim()!==""){
                  clearOwners.push(event_config.owners[i]);
                }
              }
              updatedEvent= await cEvents.updateOne(
                                                //{ _id : o_id, owners: userContext.email }
                                                  filter
                                                  ,{ $set: { 
                                                    name : event_config.name
                                                    ,date: new Date(event_config.date)
                                                    ,dateDuel: new Date(event_config.dateDuel)
                                                    // ,date: event_config.date
                                                    // ,dateDuel: event_config.dateDuel
                                                    // ,rangeId: event_config.local
                                                    ,rangeId: event_config.rangeId
                                                    ,img: ''
                                                    ,note: event_config.note
                                                    // ,owners: event_config.owners
                                                    ,owners: clearOwners
                                                    // ,address: event_config.address
                                                    // ,city: event_config.city
                                                    // ,state: event_config.state
                                                    ,public: event_config.public
                                                    ,clock: event_config.clock
                                                    ,duel: event_config.duel
                                                    ,randomDuel: event_config.randomDuel
                                                    ,vl_first_try: event_config.vl_first_try
                                                    ,vl_second_try: event_config.vl_second_try
                                                    ,vl_other_tries: event_config.vl_other_tries
                                                    }
                                                  }
                                                  // ,{ upsert: true }
                                                  );
            
              console.log('=============================================');
              console.log('filter= '+JSON.stringify(filter));
              console.log('updatedEvent= '+JSON.stringify(updatedEvent));
              console.log('=============================================');

              } catch (e) {
                // print(e);
                console.log('ERROR updating Event'+e);
              }
        }

        // console.log('0 Atualizou evento:'+ event_config.name);
        // console.log('updatedEvent.insertedId:'+ updatedEvent.insertedId);
        if(updatedEvent.insertedId!==null&&updatedEvent.insertedId!==undefined){
          // console.log('updatedEvent.insertedId.toString():'+ updatedEvent.insertedId.toString());
          event_config._id= updatedEvent.insertedId.toString();
        }else{
          updatedEvent.insertedId= event_config._id;
        }

        // console.log('event_config.imgChanged='+event_config.imgChanged);
        if(event_config.imgChanged){
          // console.log('Uploading img to cloudinary. img='+event_config.img);
          
          cloudinary.uploader.upload(event_config.img,
              { public_id: event_config._id 
                ,invalidate:true
              }, 
              function(error, result) {
                console.log(result);
              });
        }

        updatedEvent.divisions=[];
        
        console.log('Atualizou evento:'+ event_config.name);
        let updatedDivision=null;

        console.log('event_config.divisions.length:'+event_config.divisions.length);
        for(let i=0;i<event_config.divisions.length;i++ ){
          try {

            if(event_config.divisions[i].delete!==undefined&&event_config.divisions[i].delete){
              updatedDivision= await cDivisions.deleteOne({ _id : new ObjectId(event_config.divisions[i]._id) });
            }else{
              updatedDivision= await cDivisions.updateOne({ _id : new ObjectId(event_config.divisions[i]._id) }
                                                          ,{ $set: { 
                                                                      // eventId: event_config.divisions[i].eventId
                                                                    eventId: event_config._id
                                                                    ,name: event_config.divisions[i].name
                                                                    ,categories: event_config.divisions[i].categories 
                                                                    ,advanceLimit: event_config.divisions[i].advanceLimit 
                                                                    ,order: event_config.divisions[i].order
                                                                    }
                                                          }
                                                          ,{ upsert: true });
              }
              console.log('Atualizou divisào '+i+'. ');
              updatedEvent.divisions.push(updatedDivision);
            } catch (e) {
              // print(e);
              console.log('ERROOR '+e);
           }
        }

        return{
          statusCode: 201
          ,body: JSON.stringify(updatedEvent)
        }
  


          
    
      case 'DELETE': // associates divisions with a shooter
        console.log('Entrou no DELETE');
        let deleteDivision= await cDivisions.deleteMany({ eventId : p_eventId});
        let deleteEvent= await cEvents.deleteOne({ _id : o_id});
        // deleteEvent.divisions= deleteDivision;
        return{
          statusCode: 204
          // ,body: JSON.stringify(deleteEvent)
          ,body: JSON.stringify({message: "Deleted OKAY"})
          
        }
      

      case 'GET':

      console.log('Entrou no GET do eventConfig');

        const events= await cEvents.find({_id:o_id}).toArray();

        if(events[0].dateDuel===null||events[0].dateDuel===undefined||events[0].dateDuel===''){
          events[0].dateDuel= events[0].date;
        }
        
        const divisions= await cDivisions.find({eventId:p_eventId}).sort({order:1}).toArray();

        events[0].divisions= divisions;

        const ranges= await cRanges.find({_id:new ObjectId(events[0].rangeId)}).toArray();

        if(ranges.length>0){
          events[0].ranges= ranges;
          events[0].local= ranges[0].name;
          events[0].rangeId= ranges[0]._id;
          events[0].address= ranges[0].address;
          events[0].city= ranges[0].city;
          events[0].state= ranges[0].state;
        }
        
        return{
          statusCode: 200
          ,body: JSON.stringify(events[0])
        }

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