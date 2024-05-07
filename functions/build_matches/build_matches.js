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

const shootersDiv = async(cShooters_divisions, p_eventId, p_divisionId)=>{
  return await cShooters_divisions.aggregate([
    {$match:{eventId: p_eventId //"661ab4f9c412f4a5f17f0624" //  p_eventId
            ,divisionId: p_divisionId //"00000000c412f4a5f17f0625"  //p_division 
            ,duel:true}}
    ,{ $addFields: { "_shooterId": { $toObjectId: "$shooterId" }}}   
    ,{$lookup:
        {    from: "shooters"
            ,localField: "_shooterId"
            ,foreignField: "_id"
            ,as:"shooter" //"shooters"
        }
    } 
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }           
    ,{$project:{"_shooterId":0,"shooter":0}}
    /// Stage time records
    ,{ "$addFields": { "shooterDivisionId": { "$toString": "$_id" }}}
    ,{ $lookup:
        {from: "time_records"
        ,localField:"shooterDivisionId"
        ,foreignField: "shooterDivisionId"
        ,as:"time_records"
        ,pipeline:[
          {$project:{
                "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}
                ,datetime:1
            }}
          ,{$group:
              { _id:["$shooterDivisionId"],
                 tries:{$count:{}},
                  score:{$min:"$score"},
                  datetime:{$min:"$datetime"}
              }
          }]}
   }
   ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
   ,{$project:{"time_records":0}}
]).sort({"score":1,"tries":1, "datetime":1}).toArray();
}

const buildMatches = (shooters)=>{
  
  console.log(`------------------------------------------------`);
    for(let i=0; i<shooters.length;i++){
      console.log(`|       shooters[${i}]= ${shooters[i].name} ${shooters[i].gun}`);
    }
    console.log(`------------------------------------------------`);

    let mainMatches=[];
    let recapMatches=[];
    let levelMatches=[];
    let shootersTBD={id:null,name:"", victories: 0, defeats:0, gun:""};

    //NIVEL 0: Caso exista participantes <>4,8,16,32, 64, etc, deve existir uma rodada preliminhar
    let poten=2;
    let hasPreKOs=0;

    while(shooters.length>=poten){
        poten=poten*2;
    }
    let preKO=shooters.length*2-poten;

    ////Reoredenar a lista, 
    //       1. reservando os cabeças de chave
    //       2.  intercalando os primeiros com os ultimos (até a podentica de 2)
    //  [0],[1],[2],[3],[4]

    console.log(`preKO = ${preKO} , poten= ${poten}  , preK= ${preKO} `);
    let _4Players=[];
    _4Players=shooters.slice(0,preKO);
    let _midPlayer=[];
    _midPlayer=shooters.slice(preKO);
    let minNumAux= ((_4Players.length/2)<_midPlayer.length?(_4Players.length/2):_midPlayer.length);
    let _headPleayer=[];
    _headPleayer= _midPlayer.slice(_midPlayer.length-minNumAux);
    _midPlayer= _midPlayer.slice(0,_midPlayer.length-minNumAux);
    

    // console.log(`=========4Players: size:${_4Players.length} - ${JSON.stringify(_4Players,null,2)}=========`);
    // console.log(`=========_headPleayer. size:${_headPleayer.length} - ${JSON.stringify(_headPleayer,null,2)}=========`);
    // console.log(`=========_midPlayer size:${_midPlayer.length} - ${JSON.stringify(_midPlayer,null,2)}=========`);
    
    levelMatches=[];
    _4Players.reverse();
    for(let i=0; i<_4Players.length/2;i++){ //melhores contra piores
      if(i%2!==0)
        levelMatches.push({id:"m."+mainMatches.length+"."+i, shooterA:_4Players[i], shooterB:_4Players[_4Players.length-i-1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
      else
        levelMatches.unshift({id:"m."+mainMatches.length+"."+i, shooterA:_4Players[i], shooterB:_4Players[_4Players.length-i-1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
    }
      //create root level with 4Plays
     if(levelMatches.length>0){
        hasPreKOs=1;
        // fix IDs
        for(let i=0;i<levelMatches.length;i++){
          levelMatches[i].id="m.0."+i;
        }
        mainMatches.push(levelMatches);
      }
    
    console.log(`4Plays done! mainMatches[0].length; `);

    //-------- NIVEL 1: cria o segundo nível de partidas mesclando os vitoriosos das partidas priliminares ou 
    //---------cria o primeiro nível de partidas (root) quando não houver preliminares
    let headMatches=[]
    let saveI=0
    for(saveI=0; saveI<_headPleayer.length;saveI++){
      console.log('ENTROU NO ADD HEADER!!!')
      headMatches.unshift({id:"m."+mainMatches.length+"."+saveI, shooterA:_headPleayer[saveI], shooterB:mainMatches[0][saveI].v, v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"reorg" });
    }

    console.log(`Head players done. _headPleayer.length=${_headPleayer.length} . saveI=${saveI} `)

    levelMatches=[];

    // console.log(`========+Building rest os duels. saveI=${saveI}, mainMatches[0].length=${mainMatches[0].length}`);

    //criando duelos para o resto das 4plays
    for(let i= saveI; mainMatches.length>0 && i<((mainMatches[0].length+saveI)/2);i++){
      console.log(`ENTROOOOOOOU i=${i}`)
      if(i%2!==0)
           levelMatches.push({id:"m."+mainMatches.length+"."+i, shooterA:mainMatches[0][mainMatches[0].length-i-1].v, shooterB:mainMatches[0][i].v, v:shootersTBD, d:shootersTBD, parentA:"reorg", parentB:"reorg" });
      else
        levelMatches.unshift({id:"m."+mainMatches.length+"."+i, shooterA:mainMatches[0][mainMatches[0].length-i-1].v, shooterB:mainMatches[0][i].v, v:shootersTBD, d:shootersTBD, parentA:"reorg", parentB:"reorg" });
    }


    console.log(`Head Plays done!`);

    // levelMatches=[];
    for(let i=0; i<_midPlayer.length/2;i++){ //melhores contra piores
      if(i%2!==0)
        levelMatches.push({id:"m."+mainMatches.length+"."+i, shooterA:_midPlayer[_midPlayer.length-i-1], shooterB:_midPlayer[i], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
      else
        levelMatches.unshift({id:"m."+mainMatches.length+"."+i, shooterA:_midPlayer[_midPlayer.length-i-1], shooterB:_midPlayer[i], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
    }
    console.log(`Meddle Plays done! headMatches.length = ${headMatches.length}`);

    for(let i=0;i<headMatches.length;i++){
      if(i===0){
        levelMatches.unshift(headMatches[i]);
        console.log(`Adicionou o 1º colocado`)
      }

      if(i===1)
        levelMatches.push(headMatches[i]);

      if(i===2)
        levelMatches.splice(Math.round(levelMatches.length/2),0,headMatches[i]);

      if(i>2)
        levelMatches.splice(1,0,headMatches[i]);
    }

    if(levelMatches.length>0){
      //Fixing IDs
      for(let i=0; i<levelMatches.length; i++){
        levelMatches[i].id="m."+mainMatches.length+"."+i;
      }

      // Fixing parentIds
      for(let j=0; mainMatches.length>0 && j< mainMatches[0].length;j++){

        for(let i=0;i<levelMatches.length;i++){
          if(levelMatches[i].parentA==="reorg"){
            levelMatches[i].parentA=mainMatches[0][j].id;
            break;
          }else if(levelMatches[i].parentB==="reorg"){
            levelMatches[i].parentB=mainMatches[0][j].id;
            break;
          }
        }
      }
      
      mainMatches.push(levelMatches);
    }
    
    for(let l=mainMatches.length-1 ; l<mainMatches.length; l++){
        levelMatches=[];
        hasMatches=false;

        for(let i=0; mainMatches[l].length>1 && i<mainMatches[l].length-1; i=i+2){
          
          levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[l][i].v, shooterB:mainMatches[l][i+1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[l][i].id, parentB:mainMatches[l][i+1].id });
          // levelMatches.push({id:"m."+mainMatches.length+"."+i, shooterA:mainMatches[l][i].v, shooterB:mainMatches[l][mainMatches[l].length-i-1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[l][i].id, parentB:mainMatches[l][mainMatches[l].length-i-1].id });
            hasMatches=true;
        }
        if(levelMatches.length>0){;
          console.log(`ADD`);
          mainMatches.push(levelMatches)
        }
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
    backCount=0;
    for(let i= 0; i< preKO; i++){
// console.log('Vai dar pau aqui RECAP 3.1?');
      //levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[rootRecapShooters-i-1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[rootRecapShooters.length-i-1].id });
      levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
      i++;
// console.log('NÃO deu pau aqui RECAP 3.1?');
        
    }
    if(levelMatches.length>0){
        recapMatches.push(levelMatches);
        levelMatches=[];
    }

    levelMatches=[];
    if(recapMatches.length>0){ // preliminares

        let backCount=0;
        // for(let i=0;i<recapMatches[0].length-backCount;i++){
        for(let i=0;i<recapMatches[0].length;i++){


            if(preKO<rootRecapShooters.length){
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:rootRecapShooters[preKO].shooter, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:rootRecapShooters[preKO].id });
                preKO++;
            }else{
//              console.log('Vai dar pau aqui RECAP 3.2?');
              // SAVE levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:recapMatches[0][recapMatches[0].length-(1+backCount)].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:recapMatches[0][recapMatches[0].length-(1+backCount)].id });
              backCount++;
              if(recapMatches[0][i+1]!==null && recapMatches[0][i+1]!== undefined){
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:recapMatches[0][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:recapMatches[0][i+1].id });
              }
              i++;
    // console.log('NÃO deu pau aqui RECAP 3.2?');
            }
        }
    }
    backCount=0;
    // for(let i=preKO; i< rootRecapShooters.length-backCount;i++){
    for(let i=preKO; i< rootRecapShooters.length;i++){
// console.log('Vai dar pau aqui RECAP 3.3?');
      // SAVE?  levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[rootRecapShooters.length-i-1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[rootRecapShooters.length-i-1].id });  
      backCount++;
      if(rootRecapShooters[i+1]!==null && rootRecapShooters[i+1]!== undefined){
        levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
      }
      i++;
 //     console.log('NÃO deu pau aqui RECAP 3.3?');
    }
    recapMatches.push(levelMatches);

    console.log('Aqui!!!!!!!!!');
    console.log(`-=====================hasPreKOs= ${hasPreKOs}=]======================================`);
    console.log(`mainMatches= ${JSON.stringify(mainMatches,null,2)} `);
    console.log(`-====================================================================================`);


// =======================================
    ////resolvendo os niveis seguintes
    let even=true;
    for(let l=1+hasPreKOs;l<mainMatches.length;l++){
        levelMatches=[];
        let backCount=0;
        // for(let i=0;i<recapMatches[recapMatches.length-1].length-backCount;i++){
          for(let i=0;i<recapMatches[recapMatches.length-1].length;i++){
            even= mainMatches[l].length===recapMatches[recapMatches.length-1].length;
            if(even){
                //intercala com jogos principais
                levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:mainMatches[l][i].d, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:mainMatches[l][i].id });
            }else{
  
            backCount++;
            if (recapMatches[recapMatches.length-1][i+1]!==null && recapMatches[recapMatches.length-1][i+1]!== undefined){
              
              levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:recapMatches[recapMatches.length-1][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:recapMatches[recapMatches.length-1][i+1].id });
              i++;
            }
            }
        }
        if(!even){
            l--;
        }
        recapMatches.push(levelMatches);
    }
    console.log('Aqui FIM!!!!!!!!!');
    // 4. Super final com o ganhador do Main Matches com o campeao do Recap
    levelMatches=[];
    levelMatches.push({id:"r."+(mainMatches.length)+"."+levelMatches.length, shooterA:mainMatches[mainMatches.length-1][0].v
                    , shooterB:recapMatches[recapMatches.length-1][0].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[mainMatches.length-1][0].id, parentB:recapMatches[recapMatches.length-1][0].id });
    //  mainMatches.push(levelMatches);

    return [mainMatches,recapMatches];
}
const zeroPad = (num, places) => String(num).padStart(places, '0');

const flatPlayesDivisions = (players, sort)=>{
  let rP= [];
  let aRow= '';
  // for(i=0;i<players.length;i++){
      // for(j=0;j<players[i].registered.length;j++){
  let gun_rd=""
  for(i=0;i<players.length;i++){
    if(players[i].score===undefined||players[i].score===null||players[i].score===''){
        players[i].score=Math.floor(Math.random() * (9999 - 9900 + 1)) + 9900;//range 9900 - 9999;
        players[i].tries=0;
        players[i].datetime="2099-01-01T00:00:00."+zeroPad(i,3)+"Z";
    }

    score_idx= zeroPad((""+(Math.round(players[i].score*100))),7);
    // 0999900 003 2099-01-01T00:00:00.
    sort_idx= ''+score_idx+zeroPad(players[i].tries,3)+players[i].datetime;
    // aRow= {'division':players[i].divisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'gun':players[i].gun,'optics':players[i].optics,'score':players[i].score,'tries':players[i].tries, 'sort_idx':sort_idx , 'shooterDivisionId': players[i].shooterDivisionId, "eventId": players[i].eventId };
    gun_rd= players[i].optics? players[i].gun+" (RD)" : players[i].gun;
    aRow= {'division':players[i].divisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterDivisionId,'gun': gun_rd, 'optics':players[i].optics,'score':players[i].score,'tries':players[i].tries, 'sort_idx':sort_idx , 'shooterDivisionId': players[i].shooterDivisionId, "eventId": players[i].eventId ,'shooterId':players[i].shooterId};
    rP.push(aRow);  
  }
  // }

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
              divPosition++;
              players[i].qualify_position= divPosition;
              // console.log(`matchShootersCategories. SETO players[i].division_name [${players[i].division_name}]`);
              // console.log(`matchShootersCategories. SETO players[i].qualify_position [${players[i].qualify_position}]`);

              if(divisions[c].categories.optics && players[i].optics){
                // console.log('matchShootersCategories. players[i].category===cOptics');
                // console.log('matchShootersCategories.  !divisions[c].categories.optics='+!divisions[c].categories.optics);                
                  players[i].category= cOptics;
                  // console.log(`matchShootersCategories.  SETO PARA cOptics!!! ${players[i].name}`);
              }else if( players[i].category===cLadies && divisions[c].categories.ladies){
                players[i].category= cLadies;
                // console.log(`matchShootersCategories. SETO cLadies PARA players[${i}].category=cOverall [${cOverall}]`);
              }else if( players[i].category===cSeniors && divisions[c].categories.seniors){
                players[i].category= cSeniors;
                // console.log(`matchShootersCategories.  SETO DE cSeniors PARA players[${i}].category=cOverall [${cOverall}]`);
              }else if(divisions[c].categories.advance &&
                  ((players[i].score<100&&players[i].score<divisions[c].advanceLimit.passingScore) ||
                  divPosition<= divisions[c].advanceLimit.topBestOf )){
                    // console.log(`matchShootersCategories.  SETO DE ${players[i].category} PARA players[${i}].category=cAdvance [${cAdvance}]`);
                    players[i].category= cAdvance;
              }else{
                players[i].category= cOverall;
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
    const cShooters_divisions= database.collection(process.env.MONGODB_COLLECTION_SHOOTERS_DIVISIONS);
    const cKos= database.collection(process.env.MONGODB_COLLECTION_KOS);
    
    let shootersAux=[];
    
    switch (event.httpMethod){
        
        case 'GET': // update kos of a division
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        let p_eventId= event.queryStringParameters.eventId.toString();
        let p_divisionId= event.queryStringParameters.divisionId.toString();
        
        if(p_eventId!==null&&p_divisionId!==null){ //listing all shooters in a eventId, with their best time for each division

          console.log(`consultando p_eventId=${p_eventId}, p_divisionId:=${p_divisionId}`);
          const division_matches= await cKos.find({eventId:p_eventId, divisionId:p_divisionId }).toArray();

          console.log
        
          if(division_matches.length>0){
            return{
              statusCode: 200
              ,body: JSON.stringify(division_matches[0])
            }
          }else{
            const o_id = new ObjectId(p_divisionId);
            const division= await cDivisions.find({_id:o_id}).limit(10).toArray();
            // console.log('After division. division.lenght=' +division.length);
            
            const shootersDivx= await shootersDiv(cShooters_divisions, p_eventId, p_divisionId);
            
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
          }

        }else{ //list all
          //TODO: 
      }

      case 'PATCH': // update kos of a division
        // let shooter= {" name":"", "email": "", "category":0, "eventId":[]};
        console.log('Entrou no PATCH dos KOs');
        let matchesBody= JSON.parse(event.body);
    
        new_record= await cKos.updateOne({ eventId: matchesBody.eventId 
                                          ,divisionId: matchesBody.divisionId}
                                        ,{ $set: { 
                                                  eventId: matchesBody.eventId
                                                  ,divisionId: matchesBody.divisionId
                                                  ,ladyDoubleKOs: matchesBody.ladyDoubleKOs
                                                  ,seniorDoubleKOs: matchesBody.seniorDoubleKOs
                                                  ,opticDoubleKOs: matchesBody.opticDoubleKOs
                                                  ,overallDoubleKOs: matchesBody.overallDoubleKOs
                                                  ,advancedDoubleKOs: matchesBody.advancedDoubleKOs
                                                  }
                                          }
                                          ,{ upsert: true });
        return  { 
          statusCode: 201,  
          body: JSON.stringify(new_record)
        };

      case 'DELETE':

      console.log('Entrou no DELETE dos KOs');
        let eventId= event.queryStringParameters.eventId.toString();
        let divisionId= event.queryStringParameters.divisionId.toString();
        
        // console.log(`consultando eventId=${eventId}, divisionId:=${divisionId}`);

        if(eventId!==null&&divisionId!==null){ //listing all shooters in a eventId, with their best time for each division

          r_delete_shooter= await cKos.deleteMany({ eventId: eventId 
                                          ,divisionId: divisionId});


          return  { 
            statusCode: 201,  
            body: JSON.stringify(r_delete_shooter)
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