const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    

    switch (event.httpMethod){
      case 'GET':

      filter={};
      if(event.queryStringParameters.logged!==undefined){

        if(context.clientContext!==undefined&&context.clientContext.user!==undefined){
          filter.email= context.clientContext.user.email;
        }else{
          filter.email= (Math.random()*1000000).toString();
        }

      }else{ 
        
        if(event.queryStringParameters.email!==undefined){
          filter.email= event.queryStringParameters.email;
        }

        if(event.queryStringParameters.name!==undefined){
          filter.name= event.queryStringParameters.name;
        }

        if(event.queryStringParameters.category!==undefined){
          filter.category= event.queryStringParameters.category;
        }

        if(event.queryStringParameters.id!==undefined){
          filter._id= new ObjectId(event.queryStringParameters.id);
        }

        if(event.queryStringParameters.docnun!==undefined){
          filter.docnum= event.queryStringParameters.docnun;
        }

      }
        
      const retShooters = await cShooters.find(filter).toArray();

      const user= context.clientContext.user;
      let isAdmin= user&&user.app_metadata&&user.app_metadata.roles&&user.app_metadata.roles.indexOf("admin")>=0;
      
      if(!isAdmin){ //mask sensitivy data
        for(let i=0;i<retShooters.length;i++){
            if(!user||!user.email||user.email.trim().toLowerCase() !== retShooters[0].email.trim().toLowerCase()){
              retShooters[0].docnum='*********';
              retShooters[0].email='*********@tpm.com';
            }
        }
      }
      

      return  {
        statusCode: 200,
        body: JSON.stringify(retShooters)
      };

      case 'POST':

      case 'DELETE':

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