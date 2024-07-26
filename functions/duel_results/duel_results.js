const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

const mainIdx=0;
const recapIdx=1;

function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}
    
const processKOs = (kos, _eventId, _divisionId ,_category, _duelDate)=>{

    let hasRecap= kos.length>1;

    let duel_list=[];
    for(let o=0 ;o<kos.length && o<3;o++){ //0 Main and 1 Recaps
        for(let levelIdx=0;levelIdx<kos[o].length;levelIdx++){
            for(let duelIdx=0;duelIdx<kos[o][levelIdx].length;duelIdx++){
                if(kos[o][levelIdx][duelIdx].v.id!==null){
                    let duel_row={eventId:_eventId, divisionId: _divisionId, category:_category, duelDate: _duelDate};
                    duel_row.duelId= kos[o][levelIdx][duelIdx].id;
                    duel_row.shooterDivisionId= kos[o][levelIdx][duelIdx].v.shooterDivisionId;
                    duel_row.divisionName= kos[o][levelIdx][duelIdx].v.division_name;

                    duel_row.v_shooterId  = kos[o][levelIdx][duelIdx].v.shooterId;
                    duel_row.v_shooterName= kos[o][levelIdx][duelIdx].v.name;
                    duel_row.v_gun        = kos[o][levelIdx][duelIdx].v.gun;
                    duel_row.v_optics     = kos[o][levelIdx][duelIdx].v.optics;
                    duel_row.v_gunId      = kos[o][levelIdx][duelIdx].v.gunId;
                    duel_row.v_gunModel   = kos[o][levelIdx][duelIdx].v.gunModel;
                    duel_row.v_gunFactory = kos[o][levelIdx][duelIdx].v.gunFactory;

                    duel_row.d_shooterId  = kos[o][levelIdx][duelIdx].d.shooterId;
                    duel_row.d_shooterName= kos[o][levelIdx][duelIdx].d.name;
                    duel_row.d_gun        = kos[o][levelIdx][duelIdx].d.gun;
                    duel_row.d_optics     = kos[o][levelIdx][duelIdx].d.optics;
                    duel_row.d_gunId      = kos[o][levelIdx][duelIdx].d.gunId;
                    duel_row.d_gunModel   = kos[o][levelIdx][duelIdx].d.gunModel;
                    duel_row.d_gunFactory = kos[o][levelIdx][duelIdx].d.gunFactory;

                    if(!hasRecap){
                        if(levelIdx==(kos[o].length-2)){//Third of event without recap; 
                            duel_row.v_reward = "bronze";
                            duel_row.d_reward = "none";
                        }else if(levelIdx==(kos[o].length-1)){//Final of event without recap; 
                            duel_row.v_reward = "gold";
                            duel_row.d_reward = "silver";
                        }else{
                            duel_row.v_reward = "none";
                            duel_row.d_reward = "none";
                        }

                    }else{   //has recaps

                        if(levelIdx==(kos[o].length-1)){ //Final or third
                            if(o===recapIdx){
                                duel_row.v_reward = "silver";
                                duel_row.d_reward = "bronze";
                            }else{
                                duel_row.v_reward = "gold";
                                duel_row.d_reward = "none";
                            }

                        }else{ 
                            duel_row.v_reward = "none";
                            duel_row.d_reward = "none";
                        }

                    }

                    duel_list.push(duel_row);
                    // duel_list.push(JSON.parse(JSON.stringify(duel_row)));
                }
            }
        }
    }
    
    return duel_list;
            
}

const handler = async (event, context)=>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cKos= database.collection(process.env.MONGODB_COLLECTION_KOS);
    const cDuelResults= database.collection(process.env.MONGODB_COLLECTION_DUEL_RESULTS);


    let p_eventId= event.queryStringParameters.eventId;
    let p_divisionId= event.queryStringParameters.divisionId;
    let p_category= event.queryStringParameters.category?event.queryStringParameters.category.toString():null;
    

    switch (event.httpMethod){
        case 'GET':

            let p_shooterA= event.queryStringParameters.shooterA.toString();
            let p_shooterB= event.queryStringParameters.shooterB.toString();
            let p_divisionName= event.queryStringParameters.divisionName;

            let _filter;

            if(p_divisionName)
                _filter= { $and:[ {divisionName:p_divisionName.toString()} ,{$or:[{v_shooterId:{$in:[p_shooterA,p_shooterB]}},{d_shooterId:{$in:[p_shooterA,p_shooterB]}}]}]};
            else
                _filter= { $or:[{v_shooterId:{$in:[p_shooterA,p_shooterB]}},{d_shooterId:{$in:[p_shooterA,p_shooterB]}}]}; 
            
            if(p_divisionId){
                _filter.divisionId= p_divisionId;
            }

            // if(p_category!==null){
            //     _filter.category= Number(p_category);
            // }
        
            // console.log(`GET JUST BEFERE QUERY, _filter=${JSON.stringify(_filter)}`);
            const ret_duels= await cDuelResults.find(_filter).toArray();

            let shooterA={
                shooterId:p_shooterA
                ,victories:0
                ,defeats:0
                ,direct_victories:0
                ,direct_defeats:0
                ,gold_reward:0
                ,silver_reward:0
                ,bronze_reward:0
            }

            let shooterB={
                shooterId:p_shooterB
                ,victories:0
                ,defeats:0
                ,direct_victories:0
                ,direct_defeats:0
                ,gold_reward:0
                ,silver_reward:0
                ,bronze_reward:0
            }


            for(let a=0;a<ret_duels.length;a++){

                shooterA.victories += ret_duels[a].v_shooterId===p_shooterA?1:0;
                shooterA.defeats   += ret_duels[a].d_shooterId===p_shooterA?1:0;
                
                shooterB.victories += ret_duels[a].v_shooterId===p_shooterB?1:0;
                shooterB.defeats   += ret_duels[a].d_shooterId===p_shooterB?1:0;

                if( (ret_duels[a].v_shooterId===p_shooterA&&ret_duels[a].d_shooterId===p_shooterB) 
                  ||(ret_duels[a].v_shooterId===p_shooterB&&ret_duels[a].d_shooterId===p_shooterA) ){  //Direct confront

                    shooterA.direct_victories += ret_duels[a].v_shooterId===p_shooterA?1:0;
                    shooterA.direct_defeats   += ret_duels[a].d_shooterId===p_shooterA?1:0;
                    
                    shooterB.direct_victories += ret_duels[a].v_shooterId===p_shooterB?1:0;
                    shooterB.direct_defeats   += ret_duels[a].d_shooterId===p_shooterB?1:0;

                }


                shooterA.gold_reward   += (ret_duels[a].v_shooterId===p_shooterA && ret_duels[a].v_reward==='gold')        ?1:0;
                shooterA.silver_reward += (ret_duels[a].v_shooterId===p_shooterA && ret_duels[a].v_reward==='silver')      ?1:0;
                shooterA.bronze_reward += (ret_duels[a].v_shooterId===p_shooterA && ret_duels[a].v_reward==='bronze')      ?1:0;

                shooterA.gold_reward   += (ret_duels[a].d_shooterId===p_shooterA && ret_duels[a].d_reward==='gold')        ?1:0;
                shooterA.silver_reward += (ret_duels[a].d_shooterId===p_shooterA && ret_duels[a].d_reward==='silver')      ?1:0;
                shooterA.bronze_reward += (ret_duels[a].d_shooterId===p_shooterA && ret_duels[a].d_reward==='bronze')      ?1:0;


                shooterB.gold_reward   += (ret_duels[a].v_shooterId===p_shooterB && ret_duels[a].v_reward==='gold')        ?1:0;
                shooterB.silver_reward += (ret_duels[a].v_shooterId===p_shooterB && ret_duels[a].v_reward==='silver')      ?1:0;
                shooterB.bronze_reward += (ret_duels[a].v_shooterId===p_shooterB && ret_duels[a].v_reward==='bronze')      ?1:0;

                shooterB.gold_reward   += (ret_duels[a].d_shooterId===p_shooterB && ret_duels[a].d_reward==='gold')        ?1:0;
                shooterB.silver_reward += (ret_duels[a].d_shooterId===p_shooterB && ret_duels[a].d_reward==='silver')      ?1:0;
                shooterB.bronze_reward += (ret_duels[a].d_shooterId===p_shooterB && ret_duels[a].d_reward==='bronze')      ?1:0;

                
            }

            let card_compare= {};

            if(ret_duels.length>0){
                card_compare.divisionId=ret_duels[0].divisionId;
                card_compare.divisionName=ret_duels[0].divisionName;
                card_compare.shooterA= shooterA;
                card_compare.shooterB= shooterB;
            }


          return  {
            statusCode: 200,
            body: JSON.stringify(card_compare)  
          };

        
        case 'PATCH':
            
            // TODO: processar por shooterId
            // let p_shooterId= event.queryStringParameters.category;
    
            // let filter_kos;
            // let filter_shooter;
            
            // if(p_eventId && p_divisionId){
            //     filter_kos= {$match:{eventId:p_eventId, divisionId:p_divisionId}};
            //     filter_shooter={};
            // }
            // if(p_shooterId){
            //     filter_kos= {};
            //     // filter_shooter={s$match:{hooterId:p_shooterId}};   
            // }
            // if(!filter_kos && !filter_shooter)
            if(!p_eventId)
                return  {
                    statusCode: 400,
                    body: JSON.stringify({message: "Informe Event ID"})
                    };

            let _filterP= {divisionId :{$exists:true}, eventId: p_eventId};
            // _filterP.eventId=p_eventId;
            // console.log(` _filterP: ${JSON.stringify(_filterP)}`);

            if(p_divisionId){
                _filterP.divisionId= p_divisionId;
            }

            // console.log(`JUST BEFOREEEE QUERING: _filterP: ${JSON.stringify(_filterP)}`);
//{"eventId":"6640c844109c47cb34890fae"}
            const division_kos= await cKos.aggregate([
                {$match:_filterP}
                ,{$addFields:{eventId:{$toObjectId:"$eventId"}}}
               ,{$lookup:{
                   from: "events"
                   ,localField: "eventId"
                   ,foreignField: "_id"
                   ,as: "events"
                }}
               ,{$match:{events:{$ne:[]}}}
           ]).toArray();

            // if(!division_kos || division_kos.length<1)
            //     return  {
            //         statusCode: 404,
            //         body: JSON.stringify({message: "Duels not found"})
            //         };
                    
            let duelsProcessed=[];

            console.log(`division_kos.length ${division_kos.length}`)
            if(division_kos && division_kos.length>0){

                for(let j=0; j<division_kos.length ; j++){
                    if((p_category===null||p_category===""+cAdvance) && division_kos[j].advancedDoubleKOs && division_kos[j].advancedDoubleKOs.length>0){
                        duelsProcessed= duelsProcessed.concat(processKOs(division_kos[j].advancedDoubleKOs, p_eventId, division_kos[j].divisionId, cAdvance, division_kos[j].events[0].dateDuel));
                                                //    (cDuelResults, kos                              , _eventId , _divisionId ,_category, _duelDate)
                        // console.log(`1. _ret.advancedDoubleKOs=${division_kos[j].advancedDoubleKOs}`);
                    }
                    if((p_category===null||p_category===""+cLadies) && division_kos[j].ladyDoubleKOs && division_kos[j].ladyDoubleKOs.length>0){
                        duelsProcessed= duelsProcessed.concat(processKOs(division_kos[j].ladyDoubleKOs, p_eventId, division_kos[j].divisionId, cLadies, division_kos[j].events[0].dateDuel));
                    // console.log(`2. _ret.ladyDoubleKOs=${division_kos[j].ladyDoubleKOs}`);
                    }
                    if((p_category===null||p_category===""+cOptics) && division_kos[j].opticDoubleKOs && division_kos[j].opticDoubleKOs.length>0){
                        duelsProcessed= duelsProcessed.concat(processKOs(division_kos[j].opticDoubleKOs, p_eventId, division_kos[j].divisionId, cOptics, division_kos[j].events[0].dateDuel));
                    // console.log(`3. _ret.opticDoubleKOs=${division_kos[j].opticDoubleKOs}`);
                    }
                    if((p_category===null||p_category===""+cSeniors) && division_kos[j].seniorDoubleKOs && division_kos[j].seniorDoubleKOs.length>0){
                        duelsProcessed= duelsProcessed.concat(processKOs(division_kos[j].seniorDoubleKOs, p_eventId, division_kos[j].divisionId, cSeniors, division_kos[j].events[0].dateDuel));
                    // console.log(`4. _ret.seniorDoubleKOs=${division_kos[j].seniorDoubleKOs}`);
                    }
                    if((p_category===null||p_category===""+cOverall) && division_kos[j].overallDoubleKOs!==undefined && division_kos[j].overallDoubleKOs.length>0){
                        duelsProcessed= duelsProcessed.concat(processKOs(division_kos[j].overallDoubleKOs, p_eventId, division_kos[j].divisionId, cOverall, division_kos[j].events[0].dateDuel));
                    // console.log(`5. _ret.overallDoubleKOs=${division_kos[j].overallDoubleKOs}`);
                    }
                }
            }

            let delFilter= {divisionId :{$exists:true}, eventId: p_eventId};
            
            if(p_divisionId){
                delFilter.divisionId= p_divisionId;
            }
            
            if(p_category!==null){
                delFilter.category= Number(p_category);
            }

            await cDuelResults.deleteMany(delFilter);

            if(duelsProcessed.length<1){
                return  {
                    // statusCode: 404,
                    // body: JSON.stringify({message: "Duels not found"})
                    statusCode: 200,
                        body: JSON.stringify({message: "Duels successufly processed (clear), but zero duels added."})
                    };
            }else{

                   const ak_duelsResults= await cDuelResults.insertMany(duelsProcessed);
                    // console.log(JSON.stringify(duelsProcessed,null,2));
                    return  {
                        statusCode: 200,
                        body: JSON.stringify({message: duelsProcessed.length+ " duels successufly processed"})
                        };
                        
            }

        case 'POST':

        

        case 'DELETE':

          // var ObjectId = require('mongodb').ObjectId; const o_id = new ObjectId(id);

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