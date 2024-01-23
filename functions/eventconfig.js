const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const p_eventId= event.queryStringParameters.eventId.toString();
    
    console.log(`p_eventId= ${p_eventId}`);

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cDivisions= database.collection(process.env.MONGODB_COLLECTION_DIVISIONS);
    const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);
    let o_id = null;
    if(p_eventId!=='0'){
      o_id = new ObjectId(p_eventId);
    }
    switch (event.httpMethod){
      case 'PATCH':

      console.log('Entrou no patch');
        let event_config= JSON.parse(event.body);
        // let divisions= shooter.registered;
        // let event_id=event_config._id;
        // delete shooter.registered;
        // delete shooter.shooterId;


        console.log('_id:'+ event_config._id);
        console.log('o_id:'+ o_id);
        
        console.log('new name:'+ event_config.name);
        

        let updatedEvent=null;
        if(o_id===null){
           updatedEvent= await cEvents.insertOne({  
              name : event_config.name
              ,date: event_config.date
              ,local: event_config.local
              ,img: event_config.img
              ,note: event_config.note
            });
        }else{
          try{
           updatedEvent= await cEvents.updateOne({ _id : o_id }
                                                  ,{ $set: { 
                                                    name : event_config.name
                                                    ,date: event_config.date
                                                    ,local: event_config.local
                                                    ,img: event_config.img
                                                    ,note: event_config.note
                                                    }
                                                  }
                                                  // ,{ upsert: true }
                                                  );
              } catch (e) {
                // print(e);
                console.log('ERROR updating Event'+e);
              }
        }
        console.log('0 Atualizou evento:'+ event_config.name);
        console.log('updatedEvent.insertedId:'+ updatedEvent.insertedId);
        if(updatedEvent.insertedId!==null&&updatedEvent.insertedId!==undefined){
          console.log('updatedEvent.insertedId.toString():'+ updatedEvent.insertedId.toString());
          event_config._id= updatedEvent.insertedId.toString();
        }else{
          updatedEvent.insertedId= event_config._id;
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
        
        const divisions= await cDivisions.find({eventId:p_eventId}).sort({order:1}).toArray();

        events[0].divisions= divisions;

        
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