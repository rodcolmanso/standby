const {MongoClient} = require ("mongodb");
require('dotenv').config();
require('./helpers');

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

const shootersDiv = async(cShooters, p_eventId)=>{
  return await cShooters.aggregate([
      {$match:{eventId: "6578ad76e53c8b23971032c4"}} //"6578ad76e53c8b23971032c4"  p_eventId
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

const buildMatches = (shooters)=>{
  // function buildMatches(shooters){
    let mainMatches=[];
    let recapMatches=[];
    let levelMatches=[];
    let shootersTBD={id:null,name:"", victories: 0, defeats:0, gun:""};

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
    // console.log('Antes do primeiro .shooter.');
    // console.log('mainMatches.length= '+mainMatches.length);
    // console.log('rootRecapShooters.lenght= '+rootRecapShooters.length);
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
const zeroPad = (num, places) => String(num).padStart(places, '0');
const flatPlayesDivisions = (players, sort)=>{
// function flatPlayesDivisions(players, sort){
  let rP= [];
  let aRow= '';
  for(i=0;i<players.length;i++){
      for(j=0;j<players[i].registered.length;j++){
          if(players[i].registered[j].score===undefined||players[i].registered[j].score===null||players[i].registered[j].score===''){
              players[i].registered[j].score=999;
              players[i].registered[j].tries=0;
              players[i].registered[j].datetime="2099-01-01T00:00:00.000Z";
          }

          score_idx= zeroPad((""+(players[i].registered[j].score*100)),7);
          sort_idx= ''+score_idx+zeroPad(players[i].registered[j].tries,3)+players[i].registered[j].datetime;
          aRow= {'division':players[i].registered[j].divisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries, 'sort_idx':sort_idx };
          rP.push(aRow);  
      }
  }

  if (sort>0){
      rP= rP.sort((a, b) => {
          if (a.sort_idx < b.sort_idx) {
          return -1;
          }
      });
  } else {
      rP= rP.sort((a, b) => {
          if (a.sort_idx > b.sort_idx) {
          return -1;
          }
      });
  }

//  console.log('Retornando rP. rP.lenght='+rP.length);
  return rP;
}

const matchShootersCategories = (players, divisions)=>{
// function matchShootersCategories(players, divisions){
  players= players.sort((a, b) => {
      if (a.sort_idx < b.sort_idx) {
      return -1;
      }
  });

  let divPosition;

  // console.log(`matchShootersCategories. ${}`);
  // console.log(`matchShootersCategories. divisions.length= ${divisions.length}`);
  // console.log(`matchShootersCategories. players.length= ${players.length}`);
  
  for(let c=0; c<divisions.length;c++){

      divPosition=0;
      for(let i=0;i<players.length;i++){
          
        // console.log(`matchShootersCategories| players[${i}].name:${players[i].name}, players[${i}].category:${players[i].category}, players[${i}].division===divisions[${c}]._id.toString()= ${players[i].division}===${divisions[c]._id.toString()}`);
          if(players[i].division===divisions[c]._id.toString()){



              players[i].division_name= divisions[c].name;
              players[i].qualify_position= ++divPosition;
              // console.log(`matchShootersCategories. SETO players[i].division_name [${players[i].division_name}]`);
              // console.log(`matchShootersCategories. SETO players[i].qualify_position [${players[i].qualify_position}]`);

              if(divisions[c].categories.optics && players[i].optics){
                // console.log('matchShootersCategories. players[i].category===cOptics');
                // console.log('matchShootersCategories.  !divisions[c].categories.optics='+!divisions[c].categories.optics);                
                  players[i].category= cOptics;
                  // console.log(`matchShootersCategories.  SETO PARA cOptics!!! ${players[i].name}`);
              }

              
              if( players[i].category===cLadies && !divisions[c].categories.ladies){
                players[i].category= cOverall;
                // console.log(`matchShootersCategories. SETO cLadies PARA players[${i}].category=cOverall [${cOverall}]`);
              }

              
              if( players[i].category===cSeniors && !divisions[c].categories.seniors){
                players[i].category= cOverall;
                // console.log(`matchShootersCategories.  SETO DE cSeniors PARA players[${i}].category=cOverall [${cOverall}]`);
              }

              if(divisions[c].categories.advance &&
                  ((players[i].score<100&&players[i].score<=divisions[c].advanceLimit.passingScore) ||
                  divPosition< divisions[c].advanceLimit.topBestOf )){
                    // console.log(`matchShootersCategories.  SETO DE ${players[i].category} PARA players[${i}].category=cAdvance [${cAdvance}]`);
                    players[i].category= cAdvance;
              }
          }
      }
  }
  // console.log('Retornando players. players.lenght='+players.length);
  return players;
}

const getShootersByDivisionCategory = (players, divisionId, category)=>{

  // console.log('AAAAnntes do ret. players.lenght='+ players.length);
  // console.log('AAAAnntes do ret. divisionId='+ divisionId);
  // console.log('AAAAnntes do ret. category='+ category);
  const ret=[];

  // console.log('===========================================================================');
  for(let i=0; i< players.length;i++){

    // console.log(`=== players[${i}].name= ${players[i]}. players[${i}].division:${players[i].division} === divisionId:${divisionId} && players[${i}].category:${players[i].category} === category:${category} ====`);
  
      if(players[i].division===divisionId && players[i].category===category){
          ret.push(players[i]);
          // console.log('=====            PUSHOU!!!                       ======');
      }
  
  }
  // console.log('===========================================================================');

  // console.log('REEEtornando ret. ret.lenght='+ ret.length);
  return ret;

}



////////////////////////////////----------
const handler = async (event, context)=>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cDivisions= database.collection(process.env.MONGODB_COLLECTION_DIVISIONS);
    const cShooters= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS);
    const cShooters_Divisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS_DIVISIONS);

    let shootersAux=[];
    
    switch (event.httpMethod){
      case 'PUT':
        const p_eventId= event.queryStringParameters.eventId.toString();
        const p_divisionId= event.queryStringParameters.divisionId.toString();
  
        if(p_eventId!==null&&p_divisionId!==null){ //listing all shooters in a eventId, with their best time for each division

          const o_id = new ObjectId(p_divisionId);
          const division= await cDivisions.find({_id:o_id}).limit(10).toArray();
          // console.log('After division. division.lenght=' +division.length);
          
          const shootersDivx= await shootersDiv(cShooters, p_eventId);
          // console.log('After shootersDivx. shootersDivx.lenght=' +shootersDivx.length);
          let players= flatPlayesDivisions(shootersDivx, 1);
          players= matchShootersCategories(players, division);  

          let ladyDoubleKOsKOs=[];
          if(division[0].categories.ladies){
            shootersAux=  getShootersByDivisionCategory(players, p_divisionId, cLadies).sort((a, b) => {
              if (a.sort_idx > b.sort_idx) {
              return -1;
              }
          });
            ladyDoubleKOsKOs= buildMatches(shootersAux);
          }
          let seniorDoubleKOsKOs=[];

          if(division[0].categories.seniors){
            shootersAux=  getShootersByDivisionCategory(players, p_divisionId, cSeniors).sort((a, b) => {
            // seniorDoubleKOsKOs=  buildMatches(getShootersByDivisionCategory(players, p_divisionId, cSeniors).sort((a, b) => {
              if (a.sort_idx > b.sort_idx) {
              return -1;
              }
            });
            seniorDoubleKOsKOs= buildMatches(shootersAux);
          }

          let opticDoubleKOsKOs=[];
          if(division[0].categories.optics){
            // console.log(`DIVISAOOO OPTICS!!!!!!!`);
            shootersAux=  getShootersByDivisionCategory(players, p_divisionId, cOptics).sort((a, b) => {
            // opticDoubleKOsKOs=  buildMatches(getShootersByDivisionCategory(players, p_divisionId, cOptics).sort((a, b) => {
              if (a.sort_idx > b.sort_idx) {
              return -1;
              }
            });
            shootersAux
            opticDoubleKOsKOs= buildMatches(shootersAux);
          }

          let overallDoubleKOsKOs=[];
          if(division[0].categories.overall){
            // console.log(`DIVISAOOO OVERALL!!!!!!!`);
            shootersAux=  getShootersByDivisionCategory(players, p_divisionId, cOverall).sort((a, b) => {
            // overallDoubleKOsKOs=  buildMatches(getShootersByDivisionCategory(players, p_divisionId, cOverall).sort((a, b) => {
              if (a.sort_idx > b.sort_idx) {
              return -1;
              }
            });
            overallDoubleKOsKOs= buildMatches(shootersAux);
           }

          let advancedDoubleKOsKOs=[];
          if(division[0].categories.advance){
            shootersAux=  getShootersByDivisionCategory(players, p_divisionId, cAdvance).sort((a, b) => {
            // advancedDoubleKOsKOs=  buildMatches(getShootersByDivisionCategory(players, p_divisionId, cAdvance).sort((a, b) => {
              if (a.sort_idx > b.sort_idx) {
              return -1;
              }
            });
            advancedDoubleKOsKOs= buildMatches(shootersAux);
          }

          return  {
            statusCode: 201,
            body: JSON.stringify({"ladyDoubleKOs":ladyDoubleKOsKOs
                                ,"seniorDoubleKOs":seniorDoubleKOsKOs
                                ,"opticDoubleKOs":opticDoubleKOsKOs
                                ,"overallDoubleKOs":overallDoubleKOsKOs
                                ,"advancedDoubleKOs":advancedDoubleKOsKOs
                              })
          };

        }else{ //list all
            //TODO: 
        }

      case 'PATCH': // associates divisions with a shooter
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let shooter= JSON.parse(event.body);
        let registered= shooter.registered;
        let shooterId=shooter.shooterId;
        delete shooter.registered;
        delete shooter.shooterId;
  
        if(shooterId===null||shooterId===""||shooterId===0){ // new shooter

  
          new_record= await cShooters.insertOne(shooter);

          shooter.shooterId= new_record.insertedId.toString();
          shooterId= new_record.insertedId.toString();

          //TODO: index unique key shooter
        }else{
            new_record= await cShooters.updateOne({ _id : new ObjectId(shooterId) }
                                                 ,{ $set: { 
                                                   name : shooter.name
                                                   ,email: shooter.email 
                                                   ,category: shooter.category 
                                                   ,eventId: shooter.eventId 
                                                  }
                                                 });
          new_record.shooterId= new_record;
          
        }

        let shooter_division= {};
        let shooters_divisions= [];

        for(let i=0 ;i< registered.length;i++){
          shooter_division= {};
          shooter_division.shooterId=shooterId;
          shooter_division.divisionId= registered[i].divisionId;
          shooter_division.gun= registered[i].gun;
          shooter_division.optics= registered[i].optics;
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

      const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);

        let body= JSON.parse(event.body);
        let delShooterId= body.shooterId;

        let r_delete_divisions= await cShooters_Divisions.deleteMany({shooterId: delShooterId});
        console.log(`Deleto divisões: r_delete_divisions.toString() ${r_delete_divisions.toString()}`);

        let r_delete_shooter= await cShooters.deleteOne({_id: new ObjectId(delShooterId)});
        console.log(`Deleto atirador! r_delete_shooter.toString(): ${r_delete_shooter.toString()}`);

         await cTime_Records.deleteMany({shooterId: delShooterId});

        r_delete_shooter.shooter_acknowledged= r_delete_shooter.acknowledged;
        r_delete_shooter.shooter_deletedCount= r_delete_shooter.deletedCount;

        r_delete_shooter.divisions_acknowledged= r_delete_divisions.acknowledged;
        r_delete_shooter.divisions_deletedCount= r_delete_divisions.deletedCount;

        delete r_delete_shooter.acknowledged;
        delete r_delete_shooter.deletedCount;
        

        console.log(`r_delete_shooter.divisions_deletedCount: ${r_delete_shooter.divisions_deletedCount}`);
        console.log(`r_delete_shooter.shooter_deletedCount: ${r_delete_shooter.shooter_deletedCount}`);


        return  { 
          statusCode: 200,  
          body: JSON.stringify(r_delete_shooter)
        };

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