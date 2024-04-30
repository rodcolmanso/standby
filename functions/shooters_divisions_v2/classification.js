// const {MongoClient} = require ("mongodb");
// require('dotenv').config();

// const mongoClient= new MongoClient(process.env.MONGODB_URI);
// const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

// const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
// const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    

function shootersDiv(cShooters, p_eventId){
    console.log('dentro do classification.js');
    return cShooters.aggregate([
        {$match:{eventId: p_eventId}} //"6578ad76e53c8b23971032c4"  p_eventId
        ,{ "$addFields": { "shooterId": { "$toString": "$_id" }}},
        {$lookup:
            {
                from: "shooters_divisions",
                let: {div_shooterId:"$shooterId", div_divisionId:"$divisionId"},
                pipeline: [
                    { $match: { $expr: 
                                    { $eq: [ "$shooterId", "$$div_shooterId" ] }
                              } 
                    }
                    //,{ $project: { shooterId: 0, _id:0 } }
                    ,{ $lookup:
                          {
                            from: "time_records",
                            let: {record_shooter_id: "$shooterId", record_division_id:"$divisionId"},
                            pipeline:[{ $match:
                                { $expr:
                                   { $and:
                                      [
                                        { $eq: [ "$shooterId",  "$$record_shooter_id" ] },
                                        { $eq: [ "$divisionId", "$$record_division_id" ] }
                                      ]
                                   }
                                }
                             }
                             ,{
                                $project:{
                                  "score":{"$add":["$sTime","$penalties"]}
                                  ,datetime:1
                                },
                            }
                            ,{$group:
                                { _id:["$shooterId","$divisionId"],
                                   tries:{$count:{}},
                                    score:{$min:"$score"},
                                    datetime:{$min:"$datetime"}
                                }
                            }
                            ],
                            as: "time_records"
                          }
                     }
                     ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
                    ],
                as: "registered"
            }
        }            
        ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0, "registered.time_records":0}}
    ]).sort({"registered.score":1,"registered.tries":1, "registered.datetime":1}).toArray();
}
    
function buildMatches(shooters){
    let mainMatches=[];
    let recapMatches=[];
    let levelMatches=[];

    //NIVEL 0: Caso exista partiipantes <>4,8,16,32, 64, etc, deve existir uma rodada preliminhar
    let poten=2;
    let preKOs0=0;
    let hasPreKOs=0;

    while(shooters.length>=poten){
        poten=poten*2;
    }
    let preKO=shooters.length*2-poten;

    for(let i= 0; i< preKO; i++){
        levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:shooters[i], shooterB:shooters[i+1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
        i++;
    }
    if(levelMatches.length>0){
        mainMatches.push(levelMatches);
        levelMatches=[];
        hasPreKOs=1;    
    }

    //-------- NIVEL 1: cria o segundo nível de partidas mesclando os vitoriosos das partidas priliminares ou 
    // cria o primeiro nível de partidas (root) quando não houver preliminares
    levelMatches=[];
    if(mainMatches.length>0){ // preliminares

        for(let i=0;i<mainMatches[0].length;i++){

            if(preKO<shooters.length){
                levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[0][i].v, shooterB:shooters[preKO], v:shootersTBD, d:shootersTBD , parentA:mainMatches[0][i].id, parentB:"root" });
                preKO++;
            }else{
                levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[0][i].v, shooterB:mainMatches[0][i+1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[0][i].id, parentB:mainMatches[0][i+1].id });
                i++;
            }
        }
    }
    for(let i=preKO; i< shooters.length;i++){
        levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:shooters[i], shooterB:shooters[i+1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
        i++;
    }
    mainMatches.push(levelMatches);

    // NIVEL 2: partidas de vitoriosos até a final
    //    pula a rodada preliminar
    for(let l=(preKO>0?1:0) ; l<mainMatches.length; l++){
        levelMatches=[];
        hasMatches=false;
        for(let i=0; i<mainMatches[l].length-1; i++){

            levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[l][i].v, shooterB:mainMatches[l][i+1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[l][i].id, parentB:mainMatches[l][i+1].id });
            i++;
            hasMatches=true;

        }
        if(hasMatches) mainMatches.push(levelMatches);
    }


    // 3. NIVEL RECAP: partidas de derrotados do main match
    // 3.1 root level

    rootRecapShooters=[];
    for(let i=0; i<mainMatches[0].length;i++){
        rootRecapShooters.push({id:mainMatches[0][i].id , shooter:mainMatches[0][i].d});
    }
    if(hasPreKOs>0){
        for(let i=0; i<mainMatches[1].length;i++){
            rootRecapShooters.push({id:mainMatches[1][i].id ,shooter:mainMatches[1][i].d});
        }
    }

    poten=2;
    preKOs0=0;
    while(rootRecapShooters.length>=poten){
        poten=poten*2;
    }
    preKO=rootRecapShooters.length*2-poten;
    levelMatches=[];
    for(let i= 0; i< preKO; i++){
        levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
        i++;
    }
    if(levelMatches.length>0){
        recapMatches.push(levelMatches);
        levelMatches=[];
    }

    levelMatches=[];
    if(recapMatches.length>0){ // preliminares

        for(let i=0;i<recapMatches[0].length;i++){

            if(preKO<rootRecapShooters.length){
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:rootRecapShooters[preKO].shooter, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:rootRecapShooters[preKO].id });
                preKO++;
            }else{
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:recapMatches[0][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:recapMatches[0][i+1].id });
                i++;
            }
        }
    }
    for(let i=preKO; i< rootRecapShooters.length;i++){
        levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
        i++;
    }
    recapMatches.push(levelMatches);

    ////resolvendo os niveis seguintes

    for(let l=1+hasPreKOs;l<mainMatches.length;l++){
        levelMatches=[];
        for(let i=0;i<recapMatches[recapMatches.length-1].length;i++){
            even= mainMatches[l].length===recapMatches[recapMatches.length-1].length;
            if(even){
                //intercala com jogos principais
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:mainMatches[l][i].d, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:mainMatches[l][i].id });
            }else{
            //jogos só de repesqueiros
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:recapMatches[recapMatches.length-1][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:recapMatches[recapMatches.length-1][i+1].id });
                i++;
                // l--;
            }
        }
        if(!even){
            l--;
        }
        recapMatches.push(levelMatches);
    }

    // 4. Super final com o ganhador do Main Matches com o campeao do Recap
    levelMatches=[];
    levelMatches.push({id:"r."+(mainMatches.length)+"."+levelMatches.length, shooterA:mainMatches[mainMatches.length-1][0].v
                    , shooterB:recapMatches[recapMatches.length-1][0].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[mainMatches.length-1][0].id, parentB:recapMatches[recapMatches.length-1][0].id });
    //  mainMatches.push(levelMatches);

    return [mainMatches,recapMatches];
}