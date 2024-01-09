
const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';


const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig;
let playersArray;
let timeRecords;
let modalChanged;
let language="pt-br"

// let matches=[[]];

// let shootersTBD={id:null,name:"", victories: 0, defeats:0, gun:""};

// let shooters=[];
// let id=0;

// shooters.push({id:id++,name:"Rodrigo ", victories: 0, defeats:0, gun:"PT57S"});
// shooters.push({id:id++,name:"Priscla ", victories: 0, defeats:0, gun:"TX 22"});

// shooters.push({id:id++,name:"Bia ", victories: 0, defeats:0, gun:"Chiappa 22"});
// shooters.push({id:id++,name:"Lucca ", victories: 0, defeats:0, gun:"Colt 1911"});

// shooters.push({id:id++,name:"Fauna ", victories: 0, defeats:0, gun:"Glock 19"});
// shooters.push({id:id++,name:"Flora ", victories: 0, defeats:0, gun:"Massada"});

// shooters.push({id:id++,name:"Ludovick ", victories: 0, defeats:0, gun:"G3 Toro"});
// shooters.push({id:id++,name:"Satoshi ", victories: 0, defeats:0, gun:"Chiappa 22"});

// shooters.push({id:id++,name:"Aloe ", victories: 0, defeats:0, gun:"Gerico"});
// shooters.push({id:id++,name:"Vera ", victories: 0, defeats:0, gun:"CZ"});

// shooters.push({id:id++,name:"Micky ", victories: 0, defeats:0, gun:"Beretta"});
// shooters.push({id:id++,name:"Molly ", victories: 0, defeats:0, gun:"TS9"});

// shooters.push({id:id++,name:"Pedro ", victories: 0, defeats:0, gun:"G2C"});
// shooters.push({id:id++,name:"Paulo ", victories: 0, defeats:0, gun:"Bersa 380"});

// shooters.push({id:id++,name:"João ", victories: 0, defeats:0, gun:"S&W 9"});
// shooters.push({id:id++,name:"Maria ", victories: 0, defeats:0, gun:"Imbel Chodó"});

// shooters.push({id:id++,name:"Xitãozinho ", victories: 0, defeats:0, gun:"G3C"});
// shooters.push({id:id++,name:"Xororó ", victories: 0, defeats:0, gun:"Tangfolio 380"});

// shooters.push({id:id++,name:"Vitor ", victories: 0, defeats:0, gun:"Tissas .40"});
// shooters.push({id:id++,name:"Matheus ", victories: 0, defeats:0, gun:"PTN"});

// shooters.push({id:id++,name:"Ariely ", victories: 0, defeats:0, gun:"1911"});
// shooters.push({id:id++,name:"Bernadeth ", victories: 0, defeats:0, gun:"Glock 22"});

// shooters.push({id:id++,name:"Joana ", victories: 0, defeats:0, gun:"PT58"});
// shooters.push({id:id++,name:"Marcia ", victories: 0, defeats:0, gun:"Beretta 92F"});

// shooters.push({id:id++,name:"Norra ", victories: 0, defeats:0, gun:"CZ Shadow"});
// shooters.push({id:id++,name:"Franklin ", victories: 0, defeats:0, gun:"TS9"});

// let mainMatches=[];
// let recapMatches=[];
    
// function buildMatches(){
//     let levelMatches=[];


//     //NIVEL 0: Caso exista partiipantes <>4,8,16,32, 64, etc, deve existir uma rodada preliminhar
//     let poten=2;
//     let preKOs0=0;
//     let hasPreKOs=0;

//     while(shooters.length>=poten){
//         poten=poten*2;
//     }
//     let preKO=shooters.length*2-poten;

//     for(let i= 0; i< preKO; i++){
//         levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:shooters[i], shooterB:shooters[i+1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
//         i++;
//     }
//     if(levelMatches.length>0){
//         mainMatches.push(levelMatches);
//         levelMatches=[];
//         hasPreKOs=1;    
//     }

//     //-------- NIVEL 1: cria o segundo nível de partidas mesclando os vitoriosos das partidas priliminares ou 
//     // cria o primeiro nível de partidas (root) quando não houver preliminares
//     levelMatches=[];
//     if(mainMatches.length>0){ // preliminares

//         for(let i=0;i<mainMatches[0].length;i++){

//             if(preKO<shooters.length){
//                 levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[0][i].v, shooterB:shooters[preKO], v:shootersTBD, d:shootersTBD , parentA:mainMatches[0][i].id, parentB:"root" });
//                 preKO++;
//             }else{
//                 levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[0][i].v, shooterB:mainMatches[0][i+1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[0][i].id, parentB:mainMatches[0][i+1].id });
//                 i++;
//             }
//         }
//     }
//     for(let i=preKO; i< shooters.length;i++){
//         levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:shooters[i], shooterB:shooters[i+1], v:shootersTBD, d:shootersTBD, parentA:"root", parentB:"root" });
//         i++;
//     }
//     mainMatches.push(levelMatches);

//     // NIVEL 2: partidas de vitoriosos até a final
//     //    pula a rodada preliminar
//     for(let l=(preKO>0?1:0) ; l<mainMatches.length; l++){
//         levelMatches=[];
//         hasMatches=false;
//         for(let i=0; i<mainMatches[l].length-1; i++){

//             levelMatches.push({id:"m."+mainMatches.length+"."+levelMatches.length, shooterA:mainMatches[l][i].v, shooterB:mainMatches[l][i+1].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[l][i].id, parentB:mainMatches[l][i+1].id });
//             i++;
//             hasMatches=true;

//         }
//         if(hasMatches) mainMatches.push(levelMatches);
//     }


//     // 3. NIVEL RECAP: partidas de derrotados do main match
//     // 3.1 root level

//     rootRecapShooters=[];
//     for(let i=0; i<mainMatches[0].length;i++){
//         rootRecapShooters.push({id:mainMatches[0][i].id , shooter:mainMatches[0][i].d});
//     }
//     if(hasPreKOs>0){
//         for(let i=0; i<mainMatches[1].length;i++){
//             rootRecapShooters.push({id:mainMatches[1][i].id ,shooter:mainMatches[1][i].d});
//         }
//     }

//     poten=2;
//     preKOs0=0;
//     while(rootRecapShooters.length>=poten){
//         poten=poten*2;
//     }
//     preKO=rootRecapShooters.length*2-poten;
//     levelMatches=[];
//     for(let i= 0; i< preKO; i++){
//         levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
//         i++;
//     }
//     if(levelMatches.length>0){
//         recapMatches.push(levelMatches);
//         levelMatches=[];
//     }

//     levelMatches=[];
//     if(recapMatches.length>0){ // preliminares

//         for(let i=0;i<recapMatches[0].length;i++){

//             if(preKO<rootRecapShooters.length){
//                 levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:rootRecapShooters[preKO].shooter, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:rootRecapShooters[preKO].id });
//                 preKO++;
//             }else{
//                 levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[0][i].v, shooterB:recapMatches[0][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[0][i].id, parentB:recapMatches[0][i+1].id });
//                 i++;
//             }
//         }
//     }
//     for(let i=preKO; i< rootRecapShooters.length;i++){
//         levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:rootRecapShooters[i].shooter, shooterB:rootRecapShooters[i+1].shooter, v:shootersTBD, d:shootersTBD, parentA:rootRecapShooters[i].id, parentB:rootRecapShooters[i+1].id });
//         i++;
//     }
//     recapMatches.push(levelMatches);

//     ////resolvendo os niveis seguintes

//     for(let l=1+hasPreKOs;l<mainMatches.length;l++){
//         levelMatches=[];
//         for(let i=0;i<recapMatches[recapMatches.length-1].length;i++){
//             even= mainMatches[l].length===recapMatches[recapMatches.length-1].length;
//             if(even){
//                 //intercala com jogos principais
//                 levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:mainMatches[l][i].d, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:mainMatches[l][i].id });
//             }else{
//             //jogos só de repesqueiros
//                 levelMatches.push({id:"r."+recapMatches.length+"."+levelMatches.length, shooterA:recapMatches[recapMatches.length-1][i].v, shooterB:recapMatches[recapMatches.length-1][i+1].v, v:shootersTBD, d:shootersTBD, parentA:recapMatches[recapMatches.length-1][i].id, parentB:recapMatches[recapMatches.length-1][i+1].id });
//                 i++;
//                 // l--;
//             }
//         }
//         if(!even){
//             l--;
//         }
//         recapMatches.push(levelMatches);
//     }

//     // 4. Super final com o ganhador do Main Matches com o campeao do Recap
//     levelMatches=[];
//     levelMatches.push({id:"r."+(mainMatches.length)+"."+levelMatches.length, shooterA:mainMatches[mainMatches.length-1][0].v
//                     , shooterB:recapMatches[recapMatches.length-1][0].v, v:shootersTBD, d:shootersTBD, parentA:mainMatches[mainMatches.length-1][0].id, parentB:recapMatches[recapMatches.length-1][0].id });
//     //  mainMatches.push(levelMatches);

// }

function updateAllMatches(mainMatches, recapMatches, categ){
    
    let idM=[];
    for(let l=0;l<mainMatches.length;l++){
        for(let i=0 ; i<mainMatches[l].length;i++){
            if(mainMatches[l][i].parentA!=="root"){
                idM= mainMatches[l][i].parentA.split('.');
                if(idM[0]==="m")
                    mainMatches[l][i].shooterA= mainMatches[idM[1]][idM[2]].v;
                else
                    mainMatches[l][i].shooterA= recapMatches[idM[1]][idM[2]].v;
            }

            if(mainMatches[l][i].parentB!=="root"){
                idM= mainMatches[l][i].parentB.split('.');
                if(idM[0]==="m")
                    mainMatches[l][i].shooterB= mainMatches[idM[1]][idM[2]].v;
                else
                    mainMatches[l][i].shooterB= recapMatches[idM[1]][idM[2]].v;
            }

        }
    }

    for(let l=0;l<recapMatches.length;l++){
        for(let i=0 ; i<recapMatches[l].length;i++){
            if(recapMatches[l][i].parentA!=="root"){
                idM= recapMatches[l][i].parentA.split('.');
                if(idM[0]==="m")
                    recapMatches[l][i].shooterA= mainMatches[idM[1]][idM[2]].d;
                else
                    recapMatches[l][i].shooterA= recapMatches[idM[1]][idM[2]].v;
            }

            if(recapMatches[l][i].parentB!=="root"){
                idM= recapMatches[l][i].parentB.split('.');
                if(idM[0]==="m")
                    recapMatches[l][i].shooterB= mainMatches[idM[1]][idM[2]].d;
                else
                    recapMatches[l][i].shooterB= recapMatches[idM[1]][idM[2]].v;
            }

        }
    }

    addMainMatches(mainMatches, recapMatches, categ);
}
//updateMatch('${mainMatches[l][i].id}', ${mainMatches}, ${recapMatches}, ${categ}, this.value)" >
// function updateMatch(matchId, mainMatches, recapMatches, categ, v){
    function updateMatch(matchId, v, categ){
        // console.log("Entrou no updateMatch");

        // advance
        // overall
        // optics
        // seniors
        // ladies

        let mainMatches=[];
        let recapMatches=[];
        if(categ==='advance'){
            // KOs.advancedDoubleKOs
            mainMatches=KOs.advancedDoubleKOs[0];
            recapMatches=KOs.advancedDoubleKOs[1];
        }
        if(categ==='overall'){
            //     KOs.overallDoubleKOs
            mainMatches=KOs.overallDoubleKOs[0];
            recapMatches=KOs.overallDoubleKOs[1];
        }
        if(categ==='optics'){
            //     KOs.opticDoubleKOs
            mainMatches=KOs.opticDoubleKOs[0];
            recapMatches=KOs.opticDoubleKOs[1];
        }
        if(categ==='seniors'){
                //     KOs.seniorDoubleKOs
                mainMatches=KOs.seniorDoubleKOs[0];
                recapMatches=KOs.seniorDoubleKOs[1];
        }
        if(categ==='ladies'){
            //     KOs.ladyDoubleKOs
            mainMatches=KOs.ladyDoubleKOs[0];
            recapMatches=KOs.ladyDoubleKOs[1];
        
        }

    // alert('No updateMatch. matchId='+matchId);
    let idM= matchId.split('.');

    if(idM[0]==="m"){
       mainMatches[idM[1]][idM[2]].v= ""+mainMatches[idM[1]][idM[2]].shooterA.id===v ? mainMatches[idM[1]][idM[2]].shooterA : mainMatches[idM[1]][idM[2]].shooterB;
       mainMatches[idM[1]][idM[2]].d= ""+mainMatches[idM[1]][idM[2]].shooterA.id===v ? mainMatches[idM[1]][idM[2]].shooterB : mainMatches[idM[1]][idM[2]].shooterA;
    }else{
       recapMatches[idM[1]][idM[2]].v= ""+recapMatches[idM[1]][idM[2]].shooterA.id===v ? recapMatches[idM[1]][idM[2]].shooterA : recapMatches[idM[1]][idM[2]].shooterB;
       recapMatches[idM[1]][idM[2]].d= ""+recapMatches[idM[1]][idM[2]].shooterA.id===v ? recapMatches[idM[1]][idM[2]].shooterB : recapMatches[idM[1]][idM[2]].shooterA;
    }

    updateAllMatches(mainMatches, recapMatches, categ);

}

function addLevels(mainMatches, recapMatches, categ){
    // console.log("addLevels. categ="+categ);
    let div_levels= document.getElementById(categ+'Levels');

    let levels="";

    let count= mainMatches.length;
    let col_matches= "col-matches";
    "col-matches-final-1"
    for(let i=0;i<count;i++){
        if(i+1===count){
            col_matches= "col-matches-final-1"
        };
    levels+= `<div id="${categ}LevelM${i}" class="col-5 ${col_matches}">
            </div>
            <div class="col-5 col-matches-rule" id="${categ}RuleLevelM${i}">
                
            </div>`;
    }
    div_levels.innerHTML=levels;

    levels="";
    count= recapMatches.length;
    col_matches= "col-matches-final-2"
    for(let i=count-1;i>=0;i--){
        levels+= `<div id="${categ}LevelR${i}" class="col-5 ${col_matches}">
                </div>
                <div class="col-5 col-matches-rule" id="${categ}RuleLevelR${i}">
                </div>`;
        col_matches= "col-matches";
        }
        div_levels.innerHTML+=levels;
}

function addMainMatches(mainMatches, recapMatches, categ){
    
    let matches="";

    for(let l=0;l<mainMatches.length;l++){

        for(let i=0;i<mainMatches[l].length;i++){

            checkedA= mainMatches[l][i].v.id!==null&&mainMatches[l][i].v.id===mainMatches[l][i].shooterA.id?"checked":"";
            checkedB= mainMatches[l][i].v.id!==null&&mainMatches[l][i].v.id===mainMatches[l][i].shooterB.id?"checked":"";
            matches+= `
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${mainMatches[l][i].shooterA.name}</h10>
                        <p class="card-text"><small class="text-body-secondary">${mainMatches[l][i].shooterA.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${mainMatches[l][i].id}" value="${mainMatches[l][i].shooterA.id}"    onClick="javascript:updateMatch('${mainMatches[l][i].id}', this.value,  '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  style="height:50px" src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${mainMatches[l][i].shooterB.name}</h10>
                        <p class="card-text"><small class="text-body-secondary">${mainMatches[l][i].shooterB.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${mainMatches[l][i].id}" value="${mainMatches[l][i].shooterB.id}"  onClick="javascript:updateMatch('${mainMatches[l][i].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!--fim Partida-->
            <p class="ps-8"></p>
            <p class="ps-8"></p>`;

            
        } 
        document.getElementById(categ+'LevelM'+l).innerHTML= matches;

        matches="";

        divRule=`<p class="ps-50"></p>
        <div class="d-flex align-items-center" style="height: 136px;">
            <div class="vr"><p class="ps-50"></p><p class="ps-2">-</p></div>
        </div>
        <p class="ps-50"></p>
        <p class="ps-50"></p>
        <div class="d-flex align-items-center" style="height: 136px;">
            <div class="vr"><p class="ps-50"></p><p class="ps-2">-</p></div>
        </div>`;

        // document.getElementById('overallRuleLevelM'+l).innerHTML= divRule;
    }

    for(let l=recapMatches.length-1;l>=0;l--){

        for(let i=0;i<recapMatches[l].length;i++){
            checkedA= recapMatches[l][i].v.id!==null&&recapMatches[l][i].v.id===recapMatches[l][i].shooterA.id?"checked":"";
            checkedB= recapMatches[l][i].v.id!==null&&recapMatches[l][i].v.id===recapMatches[l][i].shooterB.id?"checked":"";
            matches+= `
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${recapMatches[l][i].shooterA.name}</h10>
                        <p class="card-text"><small class="text-body-secondary">${recapMatches[l][i].shooterA.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${recapMatches[l][i].id}" value="${recapMatches[l][i].shooterA.id}"  onClick="javascript:updateMatch('${recapMatches[l][i].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  style="height:50px" src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${recapMatches[l][i].shooterB.name}</h10>
                        <p class="card-text"><small class="text-body-secondary">${recapMatches[l][i].shooterB.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${recapMatches[l][i].id}" value="${recapMatches[l][i].shooterB.id}"  onClick="javascript:updateMatch('${recapMatches[l][i].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!--fim Partida-->
            <p class="ps-8"></p>
            <p class="ps-8"></p>`;
        } 
        document.getElementById(categ+'LevelR'+l).innerHTML= matches;
        matches="";
    }

}

const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
    .then(r=>r.json())
    .then(data => {
    return data;
});

// const promiseOfPlayers = fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
//     .then(r=>r.json())
//     .then(data => {
//     return data;
// });

// let mainMatches=[];
// let recapMatches=[];
const promiseKOs = fetch("/.netlify/functions/build_matches?eventId=6578ad76e53c8b23971032c4&divisionId=6578a6dae53c8b23971032c1", {
    method: "PUT",
    headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(r=>r.json())
    .then(data => {
    return data;
});


let KOs;
function changeDivision(selectDivision){
    
    if(selectDivision.value==='')
        return 0;

    applySpinners(true);
    document.getElementById('liAdvance').style.display='none';
    document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    
    const idDivision= selectDivision.value;
    // selectDivision.disabled=true;
    
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${idDivision}`, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(r=>r.json())
        .then(kos=>{

            KOs = kos;
            // mainMatches=KOs.overallDoubleKOs[0];
            // recapMatches=KOs.overallDoubleKOs[1];
    
            if(KOs.advancedDoubleKOs !==null && KOs.advancedDoubleKOs.length>0 &&  KOs.advancedDoubleKOs[0]!==null && KOs.advancedDoubleKOs[0].length>0){
                // function addLevels(mainMatches, recapMatches, categ){
                addLevels(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');

                // function addMainMatches(mainMatches, recapMatches, categ){
                addMainMatches(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');

                document.getElementById('liAdvance').style.display= '';
            }

            if(KOs.overallDoubleKOs !==null && KOs.overallDoubleKOs.length>0 && KOs.overallDoubleKOs[0]!==null && KOs.overallDoubleKOs[0].length>0){
                addLevels(KOs.overallDoubleKOs[0], KOs.overallDoubleKOs[1], 'overall');
                addMainMatches(KOs.overallDoubleKOs[0], KOs.overallDoubleKOs[1], 'overall');

                document.getElementById('liOverall').style.display= '';
            }

            if(KOs.opticDoubleKOs !==null && KOs.opticDoubleKOs.length>0 && KOs.opticDoubleKOs !=="" && KOs.opticDoubleKOs[0]!==undefined && KOs.opticDoubleKOs[0].length>0){
                addLevels(KOs.opticDoubleKOs[0],KOs.opticDoubleKOs[1],'optics');
                addMainMatches(KOs.opticDoubleKOs[0],KOs.opticDoubleKOs[1],'optics');

                document.getElementById('liOptics').style.display= '';
            }

            if(KOs.seniorDoubleKOs !==null && KOs.seniorDoubleKOs.length>0 && KOs.seniorDoubleKOs[0]!==undefined && KOs.seniorDoubleKOs[0].length>0){
                addLevels(KOs.seniorDoubleKOs[0], KOs.seniorDoubleKOs[1], 'seniors');
            addMainMatches(KOs.seniorDoubleKOs[0], KOs.seniorDoubleKOs[1], 'seniors');

                document.getElementById('liSeniors').style.display= '';        
            }

            if(KOs.ladyDoubleKOs !==null && KOs.ladyDoubleKOs.length>0 && KOs.ladyDoubleKOs[0]!==undefined && KOs.ladyDoubleKOs[0].length>0){
                addLevels(KOs.ladyDoubleKOs[0],KOs.ladyDoubleKOs[1],'ladies');
                addMainMatches(KOs.ladyDoubleKOs[0],KOs.ladyDoubleKOs[1], 'ladies');

                document.getElementById('liLadies').style.display= '';
            }
        } )
        .catch(err => console.log(`Error bringing knokouts: ${err}`))
        .finally(()=> applySpinners(false));
    
};

window.onload = async () => {
    
    document.getElementById('liAdvance').style.display='none';
    document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    applySpinners(true);
    eventConfig = await promiseOfEventConfig;
    document.getElementById('eventTitle').innerHTML= eventConfig.name;
    buildDivisions(eventConfig.divisions);
    changeDivision(selectDivision);
    applySpinners(false);
    
    
}


function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    
    return parseFloat(str);
    }

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

function getRandomDateTime() {
    return new Date((new Date()).getTime() - getRandomInt(4, 120)*60000);
}

function buildDivisions(eventDivisions){

    const selectDivisions= document.getElementById('selectDivision');

    while (selectDivisions.options.length > 0)
        selectDivisions.remove(0);

    let newOption = new Option('<<selecione>>','');
    // selectDivisions.add(newOption,undefined);

    for(i=0;i<eventDivisions.length;i++){
        newOption = new Option(eventDivisions[i].name,eventDivisions[i]._id);
        selectDivisions.add(newOption,undefined);

    }

    //selectDivisions.value= eventDivisions[0].id;

}


function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i]._id == divisionID){
            return eventDivisions[i];
        }
    }
}


function applySpinners(onoff){

    // document.getElementById('spinner').visibility=onoff;
    if(onoff)
        spinner.style.visibility = 'visible'//'visible'; //'hidden'
    else
        spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    
    document.getElementById('selectDivision').disabled=onoff;

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        btn.disabled=onoff;
        if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-danger")
            ||btn.getAttribute('class').includes("btn-secondary")
            ||btn.getAttribute('class').includes("btn-primary"))) {

            if(onoff)
                btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
            else
                btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
        }
    });
}

