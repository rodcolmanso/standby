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

            let _filter= {eventId:p_eventId, divisionId: p_divisionId};

            if(p_category!==null){
                _filter.category= Number(p_category)
            }
        
          const ret_duels= await cDuelResults.find(_filter).toArray();

          return  {
            statusCode: 200,
            body: JSON.stringify(ret_duels)
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
            if(!p_eventId && !p_divisionId)
                return  {
                    statusCode: 400,
                    body: JSON.stringify({message: "Informe Event and Division or a ShooterID"})
                    };

            const division_kos= await cKos.aggregate([
                {$match:{eventId:p_eventId,divisionId:p_divisionId}}
                ,{$addFields:{eventId:{$toObjectId:"$eventId"}}}
               ,{$lookup:{
                   from: "events"
                   ,localField: "eventId"
                   ,foreignField: "_id"
                   ,as: "events"
                }}
               ,{$match:{events:{$ne:[]}}}
           ]).toArray();

            if(!division_kos || division_kos.length<1)
                return  {
                    statusCode: 404,
                    body: JSON.stringify({message: "Duels not found"})
                    };


                    
            let duelsProcessed=[];

            if((p_category===null||p_category===""+cAdvance) && division_kos[0].advancedDoubleKOs && division_kos[0].advancedDoubleKOs.length>0){
                duelsProcessed= duelsProcessed.concat(processKOs(division_kos[0].advancedDoubleKOs, p_eventId, p_divisionId, cAdvance, division_kos[0].events[0].dateDuel));
                                        //    (cDuelResults, kos                              , _eventId , _divisionId ,_category, _duelDate)
                // console.log(`1. _ret.advancedDoubleKOs=${_ret.advancedDoubleKOs}`);
            }
            if((p_category===null||p_category===""+cLadies) && division_kos[0].ladyDoubleKOs && division_kos[0].ladyDoubleKOs.length>0){
                duelsProcessed= duelsProcessed.concat(processKOs(division_kos[0].ladyDoubleKOs, p_eventId, p_divisionId, cLadies, division_kos[0].events[0].dateDuel));
            // console.log(`2. _ret.ladyDoubleKOs=${_ret.ladyDoubleKOs}`);
            }
            if((p_category===null||p_category===""+cOptics) && division_kos[0].opticDoubleKOs && division_kos[0].opticDoubleKOs.length>0){
                duelsProcessed= duelsProcessed.concat(processKOs(division_kos[0].opticDoubleKOs, p_eventId, p_divisionId, cOptics, division_kos[0].events[0].dateDuel));
            // console.log(`3. _ret.opticDoubleKOs=${_ret.opticDoubleKOs}`);
            }
            if((p_category===null||p_category===""+cSeniors) && division_kos[0].seniorDoubleKOs && division_kos[0].seniorDoubleKOs.length>0){
                duelsProcessed= duelsProcessed.concat(processKOs(division_kos[0].seniorDoubleKOs, p_eventId, p_divisionId, cSeniors, division_kos[0].events[0].dateDuel));
            // console.log(`4. _ret.seniorDoubleKOs=${_ret.seniorDoubleKOs}`);
            }
            if((p_category===null||p_category===""+cOverall) && division_kos[0].overallDoubleKOs!==undefined && division_kos[0].overallDoubleKOs.length>0){
                duelsProcessed= duelsProcessed.concat(processKOs(division_kos[0].overallDoubleKOs, p_eventId, p_divisionId, cOverall, division_kos[0].events[0].dateDuel));
            // console.log(`5. _ret.overallDoubleKOs=${_ret.overallDoubleKOs}`);
            }

            let delFilter= {eventId:p_eventId, divisionId:p_divisionId};
            
            if(p_category!==null){
                delFilter.category= Number(p_category);
            }

            await cDuelResults.deleteMany(delFilter);

            if(duelsProcessed.length<1){
                return  {
                    statusCode: 404,
                    body: JSON.stringify({message: "Duels not found"})
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