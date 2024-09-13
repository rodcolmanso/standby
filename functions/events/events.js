const { cat } = require("@cloudinary/url-gen/qualifiers/focusOn");
const {MongoClient} = require ("mongodb");

require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event, context) => {

  // console.log(JSON.stringify(context, null, 2))
  let user= context.clientContext.user;

  if(user===null || user===undefined){
    user= {email:(Math.random()*1000000).toString()};
  }

  // console.log(`user.email: ${user.email}`);
  let isAdmin= (user&&user.app_metadata&&user.app_metadata.roles&&user.app_metadata.roles!==""&&(user.app_metadata.roles.indexOf("admin")>=0));
  // console.log(`is Admin: ${isAdmin}`);
  try {
    
    
    switch (event.httpMethod){
      case 'GET':
        
        let p_event_date_from="2021-12-31";
        let p_event_date_to="2099-12-31";
        let p_split_duels="0";

        let p_event_id="0";

        let p_short_id="";

        let ordem=-1;
        
        if(event.queryStringParameters.date_from !=null && event.queryStringParameters.date_from != undefined){
          p_event_date_from= event.queryStringParameters.date_from.toString();
        }
        if(event.queryStringParameters.date_to !=null && event.queryStringParameters.date_to != undefined){
          p_event_date_to= event.queryStringParameters.date_to.toString();
        }
        if(event.queryStringParameters.split_duels !=null && event.queryStringParameters.split_duels != undefined){
          p_split_duels= event.queryStringParameters.split_duels.toString();
        }

        if(event.queryStringParameters.order !=null && event.queryStringParameters.order != undefined){
          ordem= parseInt(event.queryStringParameters.order);
        }

        if(event.queryStringParameters.short_id !=null && event.queryStringParameters.short_id != undefined){
          p_short_id= parseInt(event.queryStringParameters.short_id);
        }

        
        
        let mMatch=  {
          "date": { $gte: new Date(p_event_date_from.replace(/-/g, '\/'))
                   , $lt: new Date(p_event_date_to.replace(/-/g, '\/')) }
          , $or:[{"public":true}, {"owners":user.email.toLowerCase().trim()}, {"public":!isAdmin}]
       };

        

      if(p_short_id!==""){

        mMatch=  {"short_id": p_short_id};

      }else if(event.queryStringParameters.event_id !=null && event.queryStringParameters.event_id != undefined){
          p_event_id= event.queryStringParameters.event_id.toString();
          let o_id;
          try{
            o_id= new ObjectId(p_event_id);
          }catch(error){
             o_id= new ObjectId('000000000000000000000000');
          }

          mMatch=  {"_id": o_id
                   , $or:[{"public":true}, {"owners":user.email.toLowerCase().trim()}, {"public":!isAdmin}]
                   };
        }

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
        const cEvents= database.collection(process.env.MONGODB_COLLECTION_EVENTS);

        
        let events= await cEvents.aggregate( [
          // Stage 1: Filter
          {
             $match: mMatch
          }
          // Stage 1: Leftjoin with range
          ,{ "$addFields": { "_rangeId": { "$toObjectId": "$rangeId" }}}
          ,{$lookup: {from: "ranges"
                    ,localField: "_rangeId"
                    ,foreignField: "_id"
                    ,as: "range"}
          }
          // Stage 2: Leftjoin with divisions
          ,{ "$addFields": { "eventId": { "$toString": "$_id" }, "eventIdd": { "$toString": "$_id" }}}
          ,{$lookup:
              {
                from: "divisions",
                localField: "eventId",
                foreignField: "eventId",
                as: "divisions"
                ,pipeline:[
                  { "$addFields": { "divisionId": { "$toString": "$_id" }}}
                  ,{$lookup:{ from: "shooters_divisions"
                            ,localField: "divisionId"
                            ,foreignField: "divisionId"
                            ,as: "count_shooters_divisions"
                            ,pipeline:[
                              {$group: {_id: "$divisionId"
                                        ,subscribers:{$sum:1}}}
                            ]
                      }
                  }
                  ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$count_shooters_divisions", 0 ] }, "$$ROOT" ] } } }
                  ,{$lookup:{ from: "time_records"
                            ,localField: "divisionId"
                            ,foreignField: "divisionId"
                            ,as: "best"
                            ,pipeline:[
                              { "$addFields": { "_penalty": {$sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}}}
                              ,{$group: {_id: "$divisionId"
                                        ,best_score:{$min:"$_penalty"}
                              }}
                            ]
                      }
                  }
                  ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$best", 0 ] }, "$$ROOT" ] } } }
                ]
              }
         }
         ,{"$project":{"divisions.count_shooters_divisions":0, "divisions.best":0}}
          // Stage 3: Sort events by event_date in descending order
        ,{
             $sort: { "date": ordem }
          }
        ] ).toArray();

        const z= events.length;

        for(let i=0;i<z;i++){

          events[i].address= events[i].range[0].address;
          events[i].city= events[i].range[0].city;
          events[i].state= events[i].range[0].state;
          events[i].local= events[i].range[0].name;
          events[i].owners= events[i].owners.concat(events[i].range[0].adm);
          events[i].owners= [...new Set(events[i].owners)];
          events[i].owners= events[i].owners.reduce((acc, i) => i ? [...acc, i] : acc, []);
          // console.log('events[i].owners= '+ JSON.stringify(events[i].owners));

          if(events[i].clock && events[i].duel){
            events[i].subTitle="Contra o relógio + Duelos"
          }else if(events[i].clock){
            events[i].subTitle="Contra o relógio"
          }else{
            events[i].subTitle="Duelos"
          }
          
          let divisionsSummary="";
          if(events[i].clock&&events[i].duel&&p_split_duels==="1"){
            if(events[i].dateDuel!==null&&events[i].dateDuel!==undefined&&events[i].dateDuel!==''&&events[i].dateDuel.toDateString()!==events[i].date.toDateString()){
              
              let nEvent= JSON.parse(JSON.stringify(events[i]));
              nEvent.date=nEvent.dateDuel;
              nEvent.subTitle="Duelos";
              events[i].subTitle="Contra o relógio";
              events.push(nEvent);

            }
          }

          for(let j=0;j<events[i].divisions.length;j++){
            if(j>0){
              divisionsSummary+=', ';    
            }
            divisionsSummary+=events[i].divisions[j].name;
          }
          events[i].divisionsSummary= divisionsSummary;

        }
          
          if(ordem>0){
            
            events = events.sort((a, b) => {
              if (Date.parse(new Date(a.date)) < Date.parse(new Date(b.date))) {
                return -1;
              }
            });
          }else{
            
            events = events.sort((a, b) => {
              if (Date.parse(new Date(a.date)) > Date.parse(new Date(b.date))) {
                return -1;
              }
            });
          }

        return {
          statusCode: 200,
          body: JSON.stringify(events),
          // // more keys you can return:
          headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*","Access-Control-Allow-Methods": "*"
                  //  ,"Access-Control-Allow-Headers": "Accept, X-Requested-With, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization" 
                  }
          // isBase64Encoded: true,
        }
    
    }
    
    
  } catch (error) {
    return { statusCode: 500, body: error.toString(),headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*","Access-Control-Allow-Methods": "*" }, }
  }
}

module.exports = { handler }
