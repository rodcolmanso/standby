
const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';


const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

const catNames= ["Overall","Advance","Ladies","","Optics","Seniors"];

let dbPlayers= [];

let eventConfig=null;
let playersArray;
let timeRecords;
let modalChanged;
let language="pt-br";
let loggedUser;

const gunOthers= {
    _id: '66cfb8ee0badeb112d52d3c1'
    ,type: "Outras"
    ,factory: "Outras"
    ,model: "Outras"
    ,caliber: "."
    ,operation: "Outras"
    };

let mouseDown = false;
let startX, scrollLeft;
let allToAll=false;
const slider = document.querySelector('.scrolling-wrapper');

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

const stopDragging = (e) => {
  mouseDown = false;
}

const move = (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
}

// Add the event listeners
slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

function updateAllMatches(mainMatches, recapMatches, categ, force){
    
    let parentMatch=[];

    let co=1;
    let li=2;
    for(let round=0;round<mainMatches.length;round++){
        for(let match=0 ; match<mainMatches[round].length;match++){

            if(mainMatches[round][match].parentA!=="root"){
                parentMatch= mainMatches[round][match].parentA.split('.');
                if(parentMatch[0]==="m")
                    mainMatches[round][match].shooterA= mainMatches[parentMatch[co]][parentMatch[li]].v;
                else
                    mainMatches[round][match].shooterA= recapMatches[parentMatch[co]][parentMatch[li]].v;
            }

            if(mainMatches[round][match].parentB!=="root"){
                parentMatch= mainMatches[round][match].parentB.split('.');
                if(parentMatch[0]==="m")
                    mainMatches[round][match].shooterB= mainMatches[parentMatch[co]][parentMatch[li]].v;
                else
                    mainMatches[round][match].shooterB= recapMatches[parentMatch[co]][parentMatch[li]].v;
            }

        }
    }

    for(let round=0;round<recapMatches.length;round++){
        for(let match=0 ; match<recapMatches[round].length;match++){
            if(recapMatches[round][match].parentA!=="root"){
                parentMatch= recapMatches[round][match].parentA.split('.');
                if(parentMatch[0]==="m")
                    recapMatches[round][match].shooterA= mainMatches[parentMatch[co]][parentMatch[li]].d;
                else
                    recapMatches[round][match].shooterA= recapMatches[parentMatch[co]][parentMatch[li]].v;
            }

            if(recapMatches[round][match].parentB!=="root"){
                parentMatch= recapMatches[round][match].parentB.split('.');
                if(parentMatch[0]==="m")
                    recapMatches[round][match].shooterB= mainMatches[parentMatch[co]][parentMatch[li]].d;
                else
                    recapMatches[round][match].shooterB= recapMatches[parentMatch[co]][parentMatch[li]].v;
            }

        }
    }

    addMainMatches(mainMatches, recapMatches, categ);
    if(allToAll)
        hideVrSpace();
}

function replaceShooter(matchId, targetId, categ){

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
        
        }    mainMatches[0][1]

    let idM= matchId.split('.');
    let duelsS;

    if(idM[0]==="m")
        duelsS= mainMatches;
    else
        duelsS= recapMatches;

    const roundS= idM[1];
    const matchS= idM[2];
    const abS= idM[3];

    idM= targetId.split('.');
    let duelsT;

    if(idM[0]==="m")
        duelsT= mainMatches;
    else
        duelsT= recapMatches;

    const roundT= idM[1];
    const matchT= idM[2];
    const abT= idM[3];

    let saveS;
    let saveSv;
    let saveSd;
    let saveSp;

        saveS= abS==='A'?duelsS[roundS][matchS].shooterA:duelsS[roundS][matchS].shooterB;
        saveSp= abS==='A'?duelsS[roundS][matchS].parentA:duelsS[roundS][matchS].parentB;
        // saveSv= duelsS[roundS][matchS].v;
        // saveSd= duelsS[roundS][matchS].d;
        
        
        if(abS==='A'){
            duelsS[roundS][matchS].shooterA= (abT==='A'?duelsT[roundT][matchT].shooterA:duelsT[roundT][matchT].shooterB);
            duelsS[roundS][matchS].parentA= (abT==='A'?duelsT[roundT][matchT].parentA:duelsT[roundT][matchT].parentB);
        }else{ 
            duelsS[roundS][matchS].shooterB= (abT==='A'?duelsT[roundT][matchT].shooterA:duelsT[roundT][matchT].shooterB);
            duelsS[roundS][matchS].parentB= (abT==='A'?duelsT[roundT][matchT].parentA:duelsT[roundT][matchT].parentB);
        }
        // duelsS[roundS][matchS].v= duelsT[roundT][matchT].v;
        // duelsS[roundS][matchS].d= duelsT[roundT][matchT].d;
        
        
        if(abT==='A'){
            duelsT[roundT][matchT].shooterA=saveS;
            duelsT[roundT][matchT].parentA=saveSp;
        }else{
            duelsT[roundT][matchT].shooterB= saveS;
            duelsT[roundT][matchT].parentB= saveSp;
        }

    // updateAllMatches(mainMatches, recapMatches, categ);
    addMainMatches(mainMatches, recapMatches, categ);
    addEventListenerShooterDiv();
    saveDivision();

}

function updateMatch(matchId, v, categ){
        // alert(`matchId=${matchId}, v.id=${v.id}`);

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
        
        }    mainMatches[0][1]

    let idM= matchId.split('.');
    let duels;

    if(idM[0]==="m")
        duels= mainMatches;
    else
        duels= recapMatches;

    const round= idM[1];
    const match= idM[2];

    if(duels[round][match].shooterA.id!==null&&duels[round][match].shooterB.id!==null){
        duels[round][match].v= ""+duels[round][match].shooterA.id===v ? duels[round][match].shooterA : duels[round][match].shooterB;
        duels[round][match].d= ""+duels[round][match].shooterA.id===v ? duels[round][match].shooterB : duels[round][match].shooterA;
        saveDivision();
    }

    updateAllMatches(mainMatches, recapMatches, categ);
    addEventListenerShooterDiv()

}

function addLevels(mainMatches, recapMatches, categ){
    // console.log("addLevels. categ="+categ);
    let div_levels= document.getElementById(categ+'Levels');

    let levels="";

    let count= mainMatches.length;
    let col_matches= "col-matches";
    // "col-matches-final-1"

    let col_match_aux="col-matches-final-1";
    if(mainMatches.length===1){
        col_match_aux= "col-matches-final-All2All";
    
    }

    let has4play=0;
    if(mainMatches.length>0 && mainMatches[0].length>0&&mainMatches&&mainMatches.length>1&&mainMatches[1].length>0&&
        mainMatches[0].length/mainMatches[1].length!==2 &&
        (mainMatches[0].length!==4&&mainMatches[0].length!==8&&mainMatches[0].length!==16&&mainMatches[0].length!==32&&mainMatches[0].length!==64)
        ){
            has4play=1;
        }

    for(let round=0;round<count;round++){
        if(round+1===count){
            col_matches= col_match_aux;
        };
        
        levels+= `<div id="${categ}LevelM${round}" class="col-5 ${col_matches}"></div>
            <div class="col-5 col-matches-rule" id="${categ}RuleLevelM${round}">
            <div class="row no-gutters justify-content-md-center text-center"><b>&nbsp</b></div>
            <div class="d-flex ps-1"></div>`;
            

            for(let match=0;match<mainMatches[round].length/2;match++){
                
                space=["",""];
                let s="";
                if(round>=has4play){
                    // for(let k=1; k < 2**round;k++){
                    for(let k=1; k < 2**(round-(has4play-1));k++){

                        
                        if(k>(2**(round-(has4play-1))/2)){
                            s+= `<div class="hiVRde"><div class="hiVRde d-flex ps-58 vr"></div></div>
                            `;
                        }else{
                            s+= `<div class="hiVRde d-flex ps-58"></div>`;
                        }

                    }

                    s+= `<div class="hiVRde" ><div class="d-flex hiVRde ps-33 vr" ></div></div>`;
                    s+= `<div class="hiVRde d-flex ps-50"></div>`;
                    
                    s+= `<div class="hiVRde" ><div class="d-flex hiVRde ps-33 vr "></div></div>`;
                }

                


                if(round>=has4play){
                    // for(let k=1; k < 2**round;k++){
                    for(let k=1; k < 2**(round-(has4play-1));k++){

                        if(k<(2**(round-(has4play-1))/2)){
                            s+= `<div class="hiVRde" ><div class=" hiVRde d-flex ps-58 vr"></div></div>`;
                        }else{
                            s+= `<div class="hiVRde" ><div class="hiVRde d-flex ps-58"></div></div>`;
                        }
                        


                    }
                }

                levels+=s;
            }
            
                
                // <div class="d-flex" style="height: 50%;">
                //     <div class="vr">&nbsp;</div>
                // </div>


        levels+= `</div>`;
    }

    div_levels.innerHTML= levels;

    if(mainMatches.length===1){ // Todos contra todas. Coluna para lista de atiradores

        for(let i=0;i<count;i++){
            if(i+1===count){
                col_matches= col_match_aux;
            };
        levels+= `<div id="${categ}LevelL${i}" class="col-5 ${col_matches}">
                </div>
                <div class="col-5 col-matches-rule" id="${categ}RuleLevelL${i}">
                </div>`;
        }
    
        div_levels.innerHTML=levels;

    }

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

function showHeadToHead(){
    //TBD
}

function addEventListenerShooterDiv(){
    
    const doppables= document.querySelectorAll('.droppable');

    doppables.forEach((targetCard)=>{
        
        targetCard.addEventListener('dragstart', (e)=>{
            e.target.classList.add("dragging");
        } );

        targetCard.addEventListener("dragend",(ev) => {
            ev.target.classList.remove("dragging");
        });

        targetCard.addEventListener('dragover', (e)=>{
            e.preventDefault();
        });

        targetCard.addEventListener('drop', (e)=>{
            e.preventDefault();

            const draggings= document.querySelectorAll('.dragging');
            draggings.forEach((dragging)=>{

                const sourceId=dragging.id.split("-");
                const targetId=targetCard.id.split("-");

                if(sourceId[1]===targetId[1] &&sourceId[2].split(".")[0]===targetId[2].split(".")[0]
                &&sourceId[2].substring(0,sourceId[2].length-2)!==targetId[2].substring(0,targetId[2].length-2)){
                    replaceShooter(sourceId[2], targetId[2], sourceId[1]);
                }
            });     
        });
    });
};

vrHide=true;
function hideVrSpace(){

    vrHide=!vrHide;

    if(allToAll)
        vrHide=true;
        

    let _div = document.querySelectorAll("div");
    [].forEach.call(_div,elem=>{

        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hiVRde')>=0)){
            if(!vrHide)
                elem.style.display = ''//'visible'; //'hidden'
            else
                elem.style.display = 'none'//'visible'; //'hidden'
        }

    });

     _div = document.querySelectorAll("hr");
    [].forEach.call(_div,elem=>{

        
        // if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hiVRde')>=0)){
            if(!vrHide)
                elem.style.display = ''//'visible'; //'hidden'
            else
                elem.style.display = 'none'//'visible'; //'hidden'
        // }

    });
}

function addMainMatches(mainMatches, recapMatches, categ){
    
    let matches="";

    let levelSpace= [];
    let space=["",""];
    
    //finding out if has preliminares or not
    let has4play= 1;
    if(mainMatches.length>0 && mainMatches[0].length>0&&mainMatches&&mainMatches.length>1&&mainMatches[1].length>0&&
        mainMatches[0].length/mainMatches[1].length!==2 &&
        (mainMatches[0].length!==4&&mainMatches[0].length!==8&&mainMatches[0].length!==16&&mainMatches[0].length!==32&&mainMatches[0].length!==64)
        ){
            has4play=2;
        }

    let droppable= '" draggable="false';

    for(let round=0;round<mainMatches.length;round++){
        
        if(mainMatches.length===1){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()"><b>Todos Contra Todos</b></div>`;
        }else if(has4play>1 && round===0){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()" ><b>Preliminares</b></div>`;
        }else if (mainMatches.length-round===1){

            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()" style='color:black; font-weight: bold;'> <i class="bi bi-trophy-fill"></i>&nbsp;FINAL&nbsp;`;
            
            if(recapMatches&&recapMatches[0]&&recapMatches[0][0]
                &&mainMatches[mainMatches.length-2]&&mainMatches[mainMatches.length-2][0]&&mainMatches[mainMatches.length-2][0].id
                &&mainMatches[mainMatches.length-2]&&mainMatches[mainMatches.length-2][1]&&mainMatches[mainMatches.length-2][1].id
                &&recapMatches[0][0].parentA===mainMatches[mainMatches.length-2][0].id
                &&recapMatches[0][0].parentB===mainMatches[mainMatches.length-2][1].id
            ){
                matches+=`&nbsp;1º e 2º Colocados:</div>`;
            }else{  //<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()" style='color:black'>
               matches+=`&nbsp;1º Colocado:</div>`;
            }

        }else if (mainMatches.length-round===2){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()"><b>Semi-finais:</b></div>`;
        }else if (mainMatches.length-round===3){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()"><b>Quartas-de-final:</b></div>`;
        }else if (mainMatches.length-round===4){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()"><b>Oitavas-de-final:</b></div>`;
        }else
            matches+=`<div class="row no-gutters justify-content-md-center text-center" onclick="hideVrSpace()"><b>${mainMatches.length-round+1}º Rodada</b></div>`;

        for(let match=0;match<mainMatches[round].length;match++){
            checkedA= mainMatches[round][match].v.id!==null&&mainMatches[round][match].v.id===mainMatches[round][match].shooterA.id?"checked":"";
            checkedB= mainMatches[round][match].v.id!==null&&mainMatches[round][match].v.id===mainMatches[round][match].shooterB.id?"checked":"";
            
            space=["",""];
            
            let s="";
            
            if(round>=has4play)
                // for(let k=1; k < 2**round;k++){
                for(let k=1; k < 2**(round-(has4play-1));k++){
                    s+= `<div class=" hiVRde card-block-vr" onclick="hideVrSpace()"></div>
                    <div class="hiVRde ps-8" onclick="hideVrSpace()"></div>`;
                }
            space[0]=s;
            
            _rd= mainMatches[round][match].shooterA.optics?`<span class="text-danger">⦿</span>`:"";

            
            droppable= '" draggable="false';
            if(mainMatches[round][match].v.id===null && mainMatches[round][match].shooterA.id!==null){
                droppable= 'droppable" draggable="true';
            }

            if(!mainMatches[round][match].shooterA.gun&&mainMatches[round][match].shooterA.gunModel){
                mainMatches[round][match].shooterA.gun= mainMatches[round][match].shooterA.gunFactory+' '+mainMatches[round][match].shooterA.gunModel+' ('+mainMatches[round][match].shooterA.gunCaliber+')';
            }
            if(!mainMatches[round][match].shooterB.gun&&mainMatches[round][match].shooterB.gunModel){
                mainMatches[round][match].shooterB.gun= mainMatches[round][match].shooterB.gunFactory+' '+mainMatches[round][match].shooterB.gunModel+' ('+mainMatches[round][match].shooterB.gunCaliber+')';
            }

            let allToAllRow='';
            let allToAllCol='';
            let roundNum='';

            if(mainMatches.length===1){
                allToAllRow='row';
                allToAllCol='col';
                roundNum=`<div class="col-md-1">${match+1}</div>`;
            }

            matches+= space[0]+`
        <div class="ps-8" ></div>
        <div class="dropdown">
            <div  class="${allToAllRow} nodisable" data-bs-toggle="dropdown" aria-expanded="false">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" 
                    onclick="compareShooters('${mainMatches[round][match].shooterA.shooterId}', '${mainMatches[round][match].shooterA.name}', '${mainMatches[round][match].shooterB.shooterId}', '${mainMatches[round][match].shooterB.name}', '')"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
        <path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
        </svg> ${mainMatches[round][match].shooterA.name.substring(0,mainMatches[round][match].shooterA.name.indexOf(" "))} vs ${mainMatches[round][match].shooterB.name.substring(0,mainMatches[round][match].shooterB.name.indexOf(" "))}</a></li>
                    <li><a class="dropdown-item" onClick="goToSubscription('${mainMatches[round][match].shooterA.shooterId}')" ><i class="bi bi-pencil-fill"></i> Editar ${mainMatches[round][match].shooterA.name}</a></li>
                    <li><a class="dropdown-item" onClick="goToSubscription('${mainMatches[round][match].shooterB.shooterId}')" ><i class="bi bi-pencil-fill"></i> Editar ${mainMatches[round][match].shooterB.name}</a></li>
                </ul>
                ${roundNum}
                <div class="${allToAllCol} card mb-3 card-block ${droppable}" id="div-${categ}-${mainMatches[round][match].id}.A">
                    <div class="row align-items-center" style="padding-left:3px; ">
                    <hr class="hiVRde" style="width:8px; padding-left:0px; padding-right:0px; height:0px; margin-bottom:3px; ">
                        <div class="col-md-4 small-avatar-pic" >
                                <img ${droppable}" id="img-${categ}-${mainMatches[round][match].id}.A" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${mainMatches[round][match].shooterA.shooterId}.jpg?${getCodeImg()}" class="img-fluid rounded-start small-avatar-pic" alt="...">
                        </div>
                        <div class="col-md-6 col-card-match text-truncate">
                            <div class="card-header-2">
                            <h10 class="card-title text-truncate"><b>  ${mainMatches[round][match].shooterA.name} </b></h10>
                            <p class="card-text" id="card-text-${mainMatches[round][match].id}-A">
                                <span class="badge text-bg-secondary d-inline-block text-truncate">${mainMatches[round][match].shooterA.gun}
                                ${_rd}</span></p>
                            </div>
                        </div>
                        <div class="row align-items-center col-card-check-B">
                            <div class="form-check">
                            <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${mainMatches[round][match].id}" value="${mainMatches[round][match].shooterA.id}"    onClick="javascript:updateMatch('${mainMatches[round][match].id}', this.value,  '${categ}')" >
                            </div>
                        </div>
                    </div>
                </div>`;
        
            let iB=match;
            droppable= '" draggable="false';
            if(mainMatches[round][match].v.id===null && mainMatches[round][match].shooterB.id!==null){
                droppable= 'droppable" draggable="true';
            }

            _rd= mainMatches[round][iB].shooterB.optics?`<span class="text-danger">⦿</span>`:"";
            matches+= `<!---->
            
            <div class="row hiVRde" style="padding-left:200px !important; padding-right:2px !important; height:0px !important;">
              <hr class="hiVRde" >
            </div>

            <div class="${allToAllCol} card mb-3 card-block ${droppable}" id="div-${categ}-${mainMatches[round][match].id}.B">
                
                <div class="row align-items-center" style="padding-left:3px; " >
                    <hr class="hiVRde" style="width:8px; padding-left:0px; padding-right:0px; height:0px;  margin-bottom:3px;" >`;

                if(mainMatches.length===1){ //todos contra todos

                    matches+=  `
                    <!-----radioooooo---------->
                    <div class="row align-items-center col-card-check-B">
                        <div class="form-check">
                            <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${mainMatches[round][iB].id}" value="${mainMatches[round][iB].shooterB.id}"  onClick="javascript:updateMatch('${mainMatches[round][iB].id}', this.value, '${categ}')" >
                        </div>
                    </div>`;

                }

                matches+= `
                    
                    <div class="col-md-4 small-avatar-pic" >
                        <img  ${droppable}" id="img-${categ}-${mainMatches[round][match].id}.B" style="height:50px" 
                            src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${mainMatches[round][match].shooterB.shooterId}.jpg?${getCodeImg()}" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match text-truncate">
                        <div class="card-header-2" >
                            <h10 class="card-title text-truncate"><b> `;
                        
            matches+= ` ${mainMatches[round][iB].shooterB.name} `;
            matches+=  `    </b></h10>
                            <p class="card-text"><span class="badge text-bg-secondary  d-inline-block text-truncate">${mainMatches[round][iB].shooterB.gun}${_rd}</span> </p>
                        </div>
                    </div> `;

            if(mainMatches.length>1){ //Eliminatorios

                matches+=  `
                <!-----radioooooo---------->
                <div class="row align-items-center col-card-check-B">
                    <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${mainMatches[round][iB].id}" value="${mainMatches[round][iB].shooterB.id}"  onClick="javascript:updateMatch('${mainMatches[round][iB].id}', this.value, '${categ}')" >
                    </div>
                </div>`;

            }

            matches+=  `
                </div>
            </div>

        </div>
    </div>
    <div class="ps-8"></div>
    <!--fim Partida-->`;
    matches+= space[0];
  
            s="";
            
        } 
        matches+= `<div style="height:100%" onclick="hideVrSpace()">&nbsp;</div>`;
        document.getElementById(categ+'LevelM'+round).innerHTML= matches;
        matches="";
    }

    if(mainMatches.length===1){ //Todos contra todos. Exibe tabela de jogadores

        let dbPlayersCat=[];

        for(let p=0;p<dbPlayers.length;p++){

            if(dbPlayers[p].category===mainMatches[0][0].shooterA.category){
                dbPlayers[p].vics= 0;
                dbPlayers[p].duels= 0;
                dbPlayers[p].defs= 0;
                dbPlayers[p].duelsTotal= 0;
                dbPlayers[p].directM= 0;

                dbPlayersCat.push(dbPlayers[p]);
            }

        }

        for(let i=0;i<mainMatches[0].length;i++){

            for(let p=0;p<dbPlayersCat.length;p++){

                if(mainMatches[0][i].shooterA.id=== dbPlayersCat[p].shooterDivisionId){
                    dbPlayersCat[p].duelsTotal= dbPlayersCat[p].duelsTotal+1;
                }
                if(mainMatches[0][i].shooterB.id=== dbPlayersCat[p].shooterDivisionId){
                    dbPlayersCat[p].duelsTotal= dbPlayersCat[p].duelsTotal+1;
                }

                if(mainMatches[0][i].v.id=== dbPlayersCat[p].shooterDivisionId){
                    dbPlayersCat[p].vics= dbPlayersCat[p].vics-1;
                    dbPlayersCat[p].duels= dbPlayersCat[p].duels+1;
                }

                if(mainMatches[0][i].d.id=== dbPlayersCat[p].shooterDivisionId){
                    dbPlayersCat[p].defs= dbPlayersCat[p].defs+1;
                    dbPlayersCat[p].duels= dbPlayersCat[p].duels+1;

                }

            }     

        }
        dbPlayersCat.sort((a, b) => a.vics - b.vics || a.defs - b.defs || a.duels - b.duels);
        
        for(let i=0; i<dbPlayersCat.length-1;i++){
            for(let j=0; j< mainMatches[0].length; j++){

                if((mainMatches[0][j].shooterA.id===dbPlayersCat[i].shooterDivisionId
                    && mainMatches[0][j].shooterB.id===dbPlayersCat[i+1].shooterDivisionId)||
                    (mainMatches[0][j].shooterB.id===dbPlayersCat[i].shooterDivisionId
                    && mainMatches[0][j].shooterA.id===dbPlayersCat[i+1].shooterDivisionId)
                ){ // confronto direto

                    if(mainMatches[0][j].v.id===dbPlayersCat[i].shooterDivisionId){
                        dbPlayersCat[i].directM=-1;
                    }else if(mainMatches[0][j].v.id===dbPlayersCat[i+1].shooterDivisionId){
                        dbPlayersCat[i+1].directM=-1;
                    }

                }
            }
            
        }

        dbPlayersCat.sort((a, b) => a.vics - b.vics || a.directM - b.directM || a.defs - b.defs || a.duels - b.duels);

          
        
        matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>Ranking</b></div><br><br><br>`;
        
        matches+= `<table class="table">
              <thead>
                <tr>
                  <th class="text-start">#</th>
                  <th class="text-start w-40">Atirador</th>
                  <th class="text-end text-muted">Duelos</th>
                  <th class="text-end text-muted">Derrotas</th>
                  <th class="text-end">Vitórias</th>
                  <!--<th class="text-end text-muted">C. D.</th>-->
                </tr>
              </thead>
              <tbody id="table-ranking">`;
             
              let pos=0;
              for(let i=0;i<dbPlayersCat.length;i++){
                _rd= dbPlayersCat[i].optics?`<span class="text-danger"> ⦿</span>`:"";
                // if(dbPlayersCat[i].category===mainMatches[0][0].shooterA.category){
                    matches+=`  <tr>
                        <td class="text-start">${++pos}º</td>
                        <td class="text-start text-truncate">${dbPlayersCat[i].name}
                            <p class="card-text"><span class="badge text-bg-secondary d-inline-block text-truncate">${dbPlayersCat[i].gun}${_rd}</span> </p>
                        </td>
                        <td class="text-end text-muted"> ${dbPlayersCat[i].duels}/${dbPlayersCat[i].duelsTotal} </td>
                        <td class="text-end text-muted"> ${dbPlayersCat[i].defs} </td>
                        <td class="text-end"> ${dbPlayersCat[i].vics*-1}${dbPlayersCat[i].directM!==0?'*':''} </td>
                        <!--<td class="text-end"> ${dbPlayersCat[i].directM*-1} </td>-->
                    </tr>`;
                // }
            }
              matches+=`</tbody>
            </table>`;
        document.getElementById(categ+'LevelL0').innerHTML= matches;
    }

    // levelSpace.push(space);
    let ls=0;
    for(let round=recapMatches.length-1;round>=0;round--){

        if ((round+1)===recapMatches.length){
            
            if(recapMatches&&recapMatches[0]&&recapMatches[0][0]
                &&mainMatches[mainMatches.length-2]&&mainMatches[mainMatches.length-2][0]&&mainMatches[mainMatches.length-2][0].id
                &&mainMatches[mainMatches.length-2]&&mainMatches[mainMatches.length-2][1]&&mainMatches[mainMatches.length-2][1].id
                &&recapMatches[0][0].parentA===mainMatches[mainMatches.length-2][0].id
                &&recapMatches[0][0].parentB===mainMatches[mainMatches.length-2][1].id
            ){
                matches+=`<div style='color:black' class="row no-gutters justify-content-md-center text-center"><b><i class="bi bi-trophy"></i>
                &nbsp;3º e 4º Colocados:</b></div>`;
            }else{
                matches+=`<div style='color:black' class="row no-gutters justify-content-md-center text-center"><b><i class="bi bi-trophy"></i>
                    &nbsp;2º e 3º Colocados:</b><br><br></div>`;
            }

        }else{
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>${round+1}º Rodata de repescagem</b></div><br><br>`;
        }

        for(let match=0;match<recapMatches[round].length;match++){
            checkedA= recapMatches[round][match].v.id!==null&&recapMatches[round][match].v.id===recapMatches[round][match].shooterA.id?"checked":"";
            checkedB= recapMatches[round][match].v.id!==null&&recapMatches[round][match].v.id===recapMatches[round][match].shooterB.id?"checked":"";
            
            ls++;
            if(levelSpace.length-ls>=0){
                matches+= levelSpace[levelSpace.length-ls][0];
            }
            _rdA= recapMatches[round][match].shooterA.optics?`<span class="text-danger">⦿</span>`:"";
            _rdB= recapMatches[round][match].shooterB.optics?`<span class="text-danger">⦿</span>`:"";

            droppable= '" draggable="false';
            if(recapMatches[round][match].v.id===null && recapMatches[round][match].shooterA.id!==null){
                droppable= 'droppable" draggable="true';
            }

            if(!recapMatches[round][match].shooterA.gun&&recapMatches[round][match].shooterA.gunModel){
                recapMatches[round][match].shooterA.gun= recapMatches[round][match].shooterA.gunFactory+' '+recapMatches[round][match].shooterA.gunModel+' ('+recapMatches[round][match].shooterA.gunCaliber+')';
            }
            if(!recapMatches[round][match].shooterB.gun&&recapMatches[round][match].shooterB.gunModel){
                recapMatches[round][match].shooterB.gun= recapMatches[round][match].shooterB.gunFactory+' '+recapMatches[round][match].shooterB.gunModel+' ('+recapMatches[round][match].shooterB.gunCaliber+')';
            }

            matches+= `
            <div class="dropdown">
                <div  class=" nodisable" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" 
                        onclick="compareShooters('${recapMatches[round][match].shooterA.shooterId}', '${recapMatches[round][match].shooterA.name}', '${recapMatches[round][match].shooterB.shooterId}', '${recapMatches[round][match].shooterB.name}', '')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
                            <path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
                        </svg> ${recapMatches[round][match].shooterA.name.substring(0,recapMatches[round][match].shooterA.name.indexOf(" "))} vs ${recapMatches[round][match].shooterB.name.substring(0,recapMatches[round][match].shooterB.name.indexOf(" "))}</a></li>
                        <li><a class="dropdown-item" onClick="goToSubscription('${recapMatches[round][match].shooterA.shooterId}')" ><i class="bi bi-pencil-fill"></i> Editar ${recapMatches[round][match].shooterA.name}</a></li>
                        <li><a class="dropdown-item" onClick="goToSubscription('${recapMatches[round][match].shooterB.shooterId}')" ><i class="bi bi-pencil-fill"></i> Editar ${recapMatches[round][match].shooterB.name}</a></li>
                        <!--<li><a class="dropdown-item" onClick="goShot()" ><i class="bi bi-fire"></i> Atira</a></li>
                        <li><a class="dropdown-item" onClick="goPrepare()" ><i class="bi bi-fast-forward-fill"></i></i> Prepara</a></li>-->
                    </ul>
                    
            <div class="card mb-3 card-block ${droppable}" id="div-${categ}-${recapMatches[round][match].id}.A" >
            
                <div class="row " >
                    
                    <div class="row align-items-center col-card-check-B">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${recapMatches[round][match].id}" value="${recapMatches[round][match].shooterA.id}"  onClick="javascript:updateMatch('${recapMatches[round][match].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                    
                    <div class="col-md-4 small-avatar-pic" >
                        <img  ${droppable}" id="img-${categ}-${recapMatches[round][match].id}.A" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${recapMatches[round][match].shooterA.shooterId}.jpg?${getCodeImg()}" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match text-truncate">
                        <div class="card-header-2" >
                            <h10 class="card-title text-truncate"><b>${recapMatches[round][match].shooterA.name}</b></h10>
                            <p class="card-text"><span class="badge text-bg-secondary  d-inline-block text-truncate">${recapMatches[round][match].shooterA.gun} ${_rdA}</span></p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!---->`;

            droppable= '" draggable="false';
            if(recapMatches[round][match].v.id===null && recapMatches[round][match].shooterB.id!==null){
                droppable= 'droppable" draggable="true';
            }

            matches+= `<div class="card mb-3 card-block ${droppable}" id="div-${categ}-${recapMatches[round][match].id}.B">
                <div class="row" >

                    <div class="row align-items-center col-card-check-B">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${recapMatches[round][match].id}" value="${recapMatches[round][match].shooterB.id}"  onClick="javascript:updateMatch('${recapMatches[round][match].id}', this.value, '${categ}')" >
                        </div>
                    </div>

                    <div class="col-md-4 small-avatar-pic" >
                        <img ${droppable}" id="img-${categ}-${recapMatches[round][match].id}.B" style="height:50px" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${recapMatches[round][match].shooterB.shooterId}.jpg?${getCodeImg()}" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match text-truncate">
                        <div class="card-header-2" >
                            <h10 class="card-title text-truncate"><b>${recapMatches[round][match].shooterB.name}</b></h10>
                            <p class="card-text"><span class="badge text-bg-secondary  d-inline-block text-truncate">${recapMatches[round][match].shooterB.gun} ${_rdB}</span></p>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            </div>
            <!--fim Partida-->
            <p class="ps-8"></p>
            <p class="ps-8"></p>`;
            if(levelSpace.length-ls>=0){
                matches+= levelSpace[levelSpace.length-ls][1];
            }
        } 
        
        document.getElementById(categ+'LevelR'+round).innerHTML= matches;
        matches="";
    }
    
}

let KOs;

function deleteKos(){
    if(!confirm('Tem certeza que deseja recriar as chaves? Todos os resultados anteriores serão perdidos.')) {
        return 0;
    }
    applySpinners(true);

    loggedUser= netlifyIdentity.currentUser();
    let _header= {"Content-type": "application/json; charset=UTF-8"}
    if(loggedUser && loggedUser.token && loggedUser.token.access_token){
        _header.Authorization= `Bearer ${loggedUser.token.access_token}`;
    }
    const categ= getActiveCatNum();
    const selectDivisions= document.getElementById('selectDivision');
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${selectDivisions.value}&category=${categ}`, {
        method: "DELETE",
        // body: JSON.stringify(body),
        headers: _header
        })
        .then(response => response.json()) 
        .then(json => {
            //location.reload(true);
            // alert('Partidas Salvas');
            document.getElementById(catNames[categ].toLocaleLowerCase()+"Levels").innerHTML="";
            
            if(KOs){
                if(categ===cAdvance)
                    KOs.advancedDoubleKOs=null;
                
                if(categ===cOverall)
                    KOs.overallDoubleKOs=null;
            
                if(categ===cOptics)
                    KOs.opticDoubleKOs=null;
                
                if(categ===cSeniors)
                    KOs.seniorDoubleKOs=null;
                
                if(categ===cLadies)
                    KOs.ladyDoubleKOs=null;
            }
            // getDivision(selectDivisions);
            window.location.href = window.location="/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum();
        })
        .catch(err => console.log(`Error deleting matches. Error: ${err}`))
        .finally(()=> applySpinners(false));

}

function generateKos(){
    

    applySpinners(true);

    loggedUser= netlifyIdentity.currentUser();
    let _header= {"Content-type": "application/json; charset=UTF-8"}
    if(loggedUser && loggedUser.token && loggedUser.token.access_token){
        _header.Authorization= `Bearer ${loggedUser.token.access_token}`;
    }

    let categ= getActiveCatNum();
    const selectDivisions= document.getElementById('selectDivision').value;

    let kos_type= 0;

    if(document.getElementById('radioAllToAll').checked){
        kos_type= 2;
    }else if(document.getElementById('radioSingleEliminiation').checked){
        kos_type= 1;
    }
    
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${selectDivisions}&category=${categ}&kos_type=${kos_type}`, {
        method: "PUT",
        // body: JSON.stringify(body),
        headers: _header
        })
        // .then(response => response.json())
        .then(function(response) {

            if (!response.ok) {
                var textDivision = document.getElementById('selectDivision').options[document.getElementById('selectDivision').selectedIndex].innerHTML;
                if(response.status===410){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Damas]. Elimine essa categoria ou inscreva mais participantes.`);
                } else if(response.status===411){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Seniores]. Elimine essa categoria ou inscreva mais participantes.`);
                }else if(response.status===412){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Optics]. Elimine essa categoria ou inscreva mais participantes.`);
                }else if(response.status===413){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Overall/Sport]. Elimine essa categoria ou inscreva mais participantes.`);
                }else if(response.status===414){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Avançados]. Elimine essa categoria ou inscreva mais participantes.`);
                }
                throw new Error("HTTP status " + response.status);
            }else{
                return response.json();
            }
        })
        .then(json => {
            // KOs=json;
            KOs=loadDuelsDetails(json);
            buildKOs(KOs);
        })
        .catch(err => console.log(`Error generating matches. Error: ${err}`))
        .finally(()=> {
            applySpinners(false);
            document.getElementById('btn-closemodal-duel-gen').click();
            disableInputs();
            });

}

function getLightShooter(_shooter){
    delete _shooter.name;
    delete _shooter.email;
    delete _shooter.gun;
    delete _shooter.gunId;
    delete _shooter.gunModel;
    delete _shooter.gunFactory;
    delete _shooter.gunCaliber;
    delete _shooter.optics;
    delete _shooter.score;
    delete _shooter.tries;
    delete _shooter.shooterDivisionId;
    delete _shooter.eventId;
    delete _shooter.shooterId;
    return _shooter;
}

function lightDuelsPayload(_CatKos_ref){

    _CatKos= JSON.parse(JSON.stringify(_CatKos_ref));
    
    for(let MainRecap=0;MainRecap<_CatKos.length;MainRecap++){
        for(let level=0; level<_CatKos[MainRecap].length; level++){

            for(let duel=0; duel<_CatKos[MainRecap][level].length; duel++){

                if(_CatKos[MainRecap][level][duel].shooterA.id!==null)
                    _CatKos[MainRecap][level][duel].shooterA= getLightShooter(_CatKos[MainRecap][level][duel].shooterA);
                
                if(_CatKos[MainRecap][level][duel].shooterB.id!==null)
                    _CatKos[MainRecap][level][duel].shooterB= getLightShooter(_CatKos[MainRecap][level][duel].shooterB);

                if(_CatKos[MainRecap][level][duel].v.id!==null)
                    _CatKos[MainRecap][level][duel].v= getLightShooter(_CatKos[MainRecap][level][duel].v);
                
                if(_CatKos[MainRecap][level][duel].d.id!==null)
                    _CatKos[MainRecap][level][duel].d= getLightShooter(_CatKos[MainRecap][level][duel].d);
            }
        }
    }

    return _CatKos;

}

function saveDivision(){
    applySpinners(true);
    let categ= getActiveCatNum();
    const selectDivisions= document.getElementById('selectDivision');
        
    const body= {"eventId":eventConfig._id, "divisionId":selectDivisions.value};

    if(categ===cAdvance)
        body.advancedDoubleKOs=lightDuelsPayload(KOs.advancedDoubleKOs);
    
    if(categ===cOverall)
        body.overallDoubleKOs=lightDuelsPayload(KOs.overallDoubleKOs);

    if(categ===cOptics)
        body.opticDoubleKOs=lightDuelsPayload(KOs.opticDoubleKOs);
    
    if(categ===cSeniors)
        body.seniorDoubleKOs=lightDuelsPayload(KOs.seniorDoubleKOs);
    
    if(categ===cLadies)
        body.ladyDoubleKOs=lightDuelsPayload(KOs.ladyDoubleKOs);
    
    loggedUser= netlifyIdentity.currentUser();
    let _header= {"Content-type": "application/json; charset=UTF-8"}
    if(loggedUser && loggedUser.token && loggedUser.token.access_token){
        _header.Authorization= `Bearer ${loggedUser.token.access_token}`;
    }
        
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${selectDivisions.value}&category=${categ}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: _header
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(`Matches updated.`);
            //location.reload(true);
            // alert('Partidas Salvas');
        })
        .catch(err => {console.log(`Error updating matches. Error: ${err}`);
                        alert('Erro ao salvar duelo. Tente novamente!');
                        window.location.reload();
                    })
        .finally(()=> applySpinners(false));
}//function saveDivision(){

function changeDivision(selectDivision){
    
    document.getElementById(catNames[getActiveCatNum()].toLocaleLowerCase()+"Levels").innerHTML="";
    if(selectDivision.value==='')
        return 0;
    window.location.href = window.location="/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum();
}

function getDuels(selectDivision){    
    applySpinners(true);
    const idDivision= selectDivision.value;
    // selectDivision.disabled=true;
    
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${idDivision}&category=${getActiveCatNum()}&${uuidv4()}`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        // .then(r=>r.json())
        .then(function(response) {

            if (!response.ok) {
                if(response.status===300){
                    var textDivision = document.getElementById('selectDivision').options[document.getElementById('selectDivision').selectedIndex].innerHTML;
                    if(isAdmin){

                        let qtdShooters=0;
                        
                        let dbPlayersCat=[];
                        for(let i=0;i<dbPlayers.length;i++){
                            if(dbPlayers[i].category===getActiveCatNum()){
                                dbPlayersCat.push(dbPlayers[i]);
                            }
                        }


                        qtdShooters= dbPlayersCat.length;

                        dbPlayersCat= dbPlayersCat.sort((a, b) => {
                            if (a.shooterId < b.shooterId) {
                              return -1;
                            }
                          });

                        let qtdUniqShooters=0;
                        for(let i=0; i<dbPlayersCat.length;i++){
                            if(i>0&& dbPlayersCat[i].shooterId===dbPlayersCat[i-1].shooterId){
                                qtdUniqShooters++;
                            }
                        }

                        let poten=2;
                        
                        while(qtdShooters>=poten){
                            poten=poten*2;
                        }
                        let preKO=qtdShooters*2-poten;

                        // poten=poten/2;

                        // preKO=preKO/2;

                        let qtdDuesAllbyAll= ((qtdShooters * (qtdShooters-1)) / 2)-qtdUniqShooters;

                        let disableSingleDuels='';
                        if((poten/2+preKO/2) < 4){
                            disableSingleDuels= 'disabled'
                        }
                        

                        document.getElementById('duelGenerateModalLabel').innerText=`Gerar duelos para ${textDivision} - ${catNames[getActiveCatNum()]}`;
                        document.getElementById('duel-gen-body').innerHTML=`<h6>Escolha um opção de duelos para <u><b>${qtdShooters}</b> inscrições.</u></h6>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioKosType" id="radioDoupleEliminiation" value=0 checked>
                            <label class="form-check-label" for="radioDoupleEliminiation">
                                Eliminatórias com repescagem (dupla eliminação):<li> ${((qtdShooters*2-3)<0?0:(qtdShooters*2-3))} duelos.</li><p></p>
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input nodisable" type="radio" name="flexRadioKosType" id="radioSingleEliminiation" value=1 ${disableSingleDuels} >
                            <label class="form-check-label" for="radioSingleEliminiation">
                                Eliminatórias simples (eliminação única):<li> ${poten/2+preKO/2} duelos.</li><p></p>
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input nodisable" type="radio" name="flexRadioKosType" id="radioAllToAll" valeu=2 >
                            <label class="form-check-label" for="radioAllToAll">
                                Todos contra todos:<li> ${qtdDuesAllbyAll} duelos.</li><p></p>
                            </label>
                            </div>`;
                    }else{
                        document.getElementById('duel-gen-body').innerHTML=
                            `<h3>Aguarde o Supervisor de prova gerar os duelos...</h3>`;
                    }

                    document.getElementById('btn-modal-duel-gen').click();
                    throw new Error("HTTP status " + response.status);
                }else{
                    throw new Error("HTTP status " + response.status);
                }
            }else return response.json();
        })
        .then(kos=>{
            KOs=loadDuelsDetails(kos);
            buildKOs(KOs);
        } )
        .catch(err => console.log(`Error bringing knokouts: ${err}`))
        .finally(()=> {
            applySpinners(false);
            disableInputs();
        });
    
}; //function changeDivision(selectDivision){

function buildKOs(KOs){
    
    if(KOs.advancedDoubleKOs && KOs.advancedDoubleKOs.length>0 &&  KOs.advancedDoubleKOs[0]!==null && KOs.advancedDoubleKOs[0].length>0){
        addLevels(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');
        
        addMainMatches(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');
        updateAllMatches(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');

        document.getElementById('liAdvance').style.display= '';
        if(KOs.advancedDoubleKOs[0].length===1){
            allToAll=true;
            hideVrSpace();
        }else allToAll=false;
    }
    
    if(KOs.overallDoubleKOs && KOs.overallDoubleKOs.length>0 && KOs.overallDoubleKOs[0]!==null && KOs.overallDoubleKOs[0].length>0){
        addLevels(KOs.overallDoubleKOs[0], KOs.overallDoubleKOs[1], 'overall');
        addMainMatches(KOs.overallDoubleKOs[0], KOs.overallDoubleKOs[1], 'overall');
        updateAllMatches(KOs.overallDoubleKOs[0], KOs.overallDoubleKOs[1], 'overall');

        document.getElementById('liOverall').style.display= '';
        if(KOs.overallDoubleKOs[0].length===1){
            allToAll=true;
            hideVrSpace();
        }else allToAll=false;
    }
    
    if(KOs.opticDoubleKOs && KOs.opticDoubleKOs.length>0 && KOs.opticDoubleKOs !=="" && KOs.opticDoubleKOs[0]!==undefined && KOs.opticDoubleKOs[0].length>0){
        addLevels(KOs.opticDoubleKOs[0],KOs.opticDoubleKOs[1],'optics');
        addMainMatches(KOs.opticDoubleKOs[0],KOs.opticDoubleKOs[1],'optics');
        updateAllMatches(KOs.opticDoubleKOs[0],KOs.opticDoubleKOs[1],'optics');

        document.getElementById('liOptics').style.display= '';
        if(KOs.opticDoubleKOs[0].length===1){
            allToAll=true;
            hideVrSpace();
        }else allToAll=false;
    }
    
    if(KOs.seniorDoubleKOs && KOs.seniorDoubleKOs.length>0 && KOs.seniorDoubleKOs[0]!==undefined && KOs.seniorDoubleKOs[0].length>0){
        addLevels(KOs.seniorDoubleKOs[0], KOs.seniorDoubleKOs[1], 'seniors');
        addMainMatches(KOs.seniorDoubleKOs[0], KOs.seniorDoubleKOs[1], 'seniors');
        updateAllMatches(KOs.seniorDoubleKOs[0], KOs.seniorDoubleKOs[1], 'seniors');

        document.getElementById('liSeniors').style.display= '';    
        if(KOs.seniorDoubleKOs[0].length===1){
            allToAll=true;
            hideVrSpace();
        }else allToAll=false;
    }
    
    if(KOs.ladyDoubleKOs && KOs.ladyDoubleKOs.length>0 && KOs.ladyDoubleKOs[0]!==undefined && KOs.ladyDoubleKOs[0].length>0){
        addLevels(KOs.ladyDoubleKOs[0],KOs.ladyDoubleKOs[1],'ladies');
        addMainMatches(KOs.ladyDoubleKOs[0],KOs.ladyDoubleKOs[1], 'ladies');
        updateAllMatches(KOs.ladyDoubleKOs[0],KOs.ladyDoubleKOs[1], 'ladies');

        document.getElementById('liLadies').style.display= '';
        if(KOs.ladyDoubleKOs[0].length<1){
            allToAll=true;
            hideVrSpace();
        }else allToAll=false;
    }
    addEventListenerShooterDiv();
}//function buildKOs(KOs){

function autoRefresh(){
    const _tbord= params.tbord?"&tbord="+params.tbord:"";
    window.location.href = window.location="/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum()+_tbord+"&rl=2";
}

function hrefQualify(){
    const _tbord= params.tbord?"&tbord="+params.tbord:"";
    window.location.href = window.location="/qualify.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+getActiveCat()+_tbord;
}

function hrefMatches(){
    const _tbord= params.tbord?"&tbord="+params.tbord:"";
    window.location.href = window.location="/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum()+_tbord;
}

const promiseOfGetDivisionPlayers = (_eventId, _divisionId)=>{

        let _headers;
        if(netlifyIdentity.currentUser()!==null){
            _headers= {"Content-type": "application/json; charset=UTF-8"
                    ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`}
        }else{
            _headers= {"Content-type": "application/json; charset=UTF-8"}
        }
        return fetch("/.netlify/functions/build_matches?players=1&eventId="+_eventId+"&divisionId="+_divisionId, {
        method: "GET",
        // body: JSON.stringify(eventConfig),
        headers: _headers}).then(r=>r.json())
        .then(data => {
            return data;
        });

};


async function loadPage(){
    loggedUser= netlifyIdentity.currentUser();
    applySpinners(true);
    eventConfig = await promiseOfSessionEventConfig(null,loggedUser);
    applySpinners(false);
    if(eventConfig===null){
        alert(`Evento não encontrado`);
        window.location.href = window.location="/index.html";
    }
}

function getDbShooter(_shooterDivisionId, vORd){

    for(let i=0;i<dbPlayers.length ;i++){

        dbPlayers[i].vics       = dbPlayers[i].vics       ===undefined?0 : dbPlayers[i].vics;
        dbPlayers[i].defs       = dbPlayers[i].defs       ===undefined?0 : dbPlayers[i].defs;
        dbPlayers[i].duels      = dbPlayers[i].duels      ===undefined?0 : dbPlayers[i].duels;
        dbPlayers[i].duelsTotal = dbPlayers[i].duelsTotal ===undefined?0 : dbPlayers[i].duelsTotal;
        dbPlayers[i].directM    = dbPlayers[i].directM    ===undefined?0 : dbPlayers[i].directM;

        if(dbPlayers[i].shooterDivisionId===_shooterDivisionId){
            if(vORd==='v'){
                // dbPlayers[i].vics= !dbPlayers[i].vics?1:dbPlayers[i].vics+1;
                // dbPlayers[i].duels= !dbPlayers[i].duels?1:dbPlayers[i].duels+1;
            }else if(vORd==='d'){
                // dbPlayers[i].defs= !dbPlayers[i].defs?1:dbPlayers[i].defs+1;
                // dbPlayers[i].duels= !dbPlayers[i].duels?1:dbPlayers[i].duels+1;
            }
            return dbPlayers[i];
        }
    }

    return {id:null,name:"", victories: 0, defeats:0, gun:"", gunId:null, gunFactory:"", gunModel:"", gunCaliber:"", optics:false};

     
}

function loadDuelsDetails(_kos){

    if(_kos.overallDoubleKOs){
        _kos.overallDoubleKOs= loadDuelsDetailsCat(_kos.overallDoubleKOs);   
    }

    if(_kos.advancedDoubleKOs){
        _kos.advancedDoubleKOs= loadDuelsDetailsCat(_kos.advancedDoubleKOs);   
    }

    if(_kos.ladyDoubleKOs){
        _kos.ladyDoubleKOs= loadDuelsDetailsCat(_kos.ladyDoubleKOs);   
    }

    if(_kos.seniorDoubleKOs){
        _kos.seniorDoubleKOs= loadDuelsDetailsCat(_kos.seniorDoubleKOs);   
    }

    if(_kos.opticDoubleKOs){
        _kos.opticDoubleKOs= loadDuelsDetailsCat(_kos.opticDoubleKOs);   
    }

    return _kos;

}

function loadDuelsDetailsCat(_CatKos){
    
    for(let MainRecap=0;MainRecap<_CatKos.length;MainRecap++){
        for(let level=0; level<_CatKos[MainRecap].length; level++){

            for(let duel=0; duel<_CatKos[MainRecap][level].length; duel++){


                if(_CatKos[MainRecap][level][duel].shooterA.id!==null)
                    _CatKos[MainRecap][level][duel].shooterA= getDbShooter(_CatKos[MainRecap][level][duel].shooterA.id);
                
                if(_CatKos[MainRecap][level][duel].shooterB.id!==null)
                    _CatKos[MainRecap][level][duel].shooterB= getDbShooter(_CatKos[MainRecap][level][duel].shooterB.id);

                if(_CatKos[MainRecap][level][duel].v.id!==null)
                    _CatKos[MainRecap][level][duel].v= getDbShooter(_CatKos[MainRecap][level][duel].v.id, 'v');
                
                if(_CatKos[MainRecap][level][duel].d.id!==null)
                    _CatKos[MainRecap][level][duel].d= getDbShooter(_CatKos[MainRecap][level][duel].d.id, 'd');
            }
        }
    }

    return _CatKos;

}

netlifyIdentity.on('close', () => {
    loadPage();
});
function goToSubscription(parms){

    const user= netlifyIdentity.currentUser();
    const _eventConfig= getSessionEventConfig();
    let isAdmin= (user&&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    let isEventAdmin=  (user&&user.email&&_eventConfig&&_eventConfig.owners&&_eventConfig.owners.indexOf(user.email.toLowerCase().trim())>=0);

    if(!isAdmin && !isEventAdmin && user&&user.email.toLowerCase().trim()){
        parms='&email='+user.email.toLowerCase().trim();
    }

    if(parms!==undefined && parms!==''){
        parms= '&shooterId='+parms;
    }else parms='';
    window.location="/event-details.html?inscription=duel&selected_division="+document.getElementById('selectDivision').value+parms+"&category="+getActiveCatNum();
}

// function goToSubscription(parms){
//     if(parms!==undefined && parms!==''){
//         parms= '&shooterId='+parms;
//     }else parms='';
//        window.location="/event-details.html?inscription=duel&selected_division="+document.getElementById('selectDivision').value+parms+(_tb?'&tbord='+btoa(JSON.stringify(_tb.order())):""); //->+getActiveCat();
// }

function editInscriptions(){
    window.location.href = window.location="/event-details.html?allInscriptions=duel&event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum();
}

function getActiveCat(){
    let _cat="";
    if(document.getElementById('liAdvance').getAttribute('class').indexOf('active')>=0)
        _cat= "&cat=liAdvance";

    if(document.getElementById('liLadies').getAttribute('class').indexOf('active')>=0)
        _cat= "&cat=liLadies";

    if(document.getElementById('liOptics').getAttribute('class').indexOf('active')>=0)
        _cat= "&cat=liOptics";

    if(document.getElementById('liSeniors').getAttribute('class').indexOf('active')>=0)
        _cat= "&cat=liSeniors";
    
    return _cat;
}

function shareEvent(){
    const _link = 'https://'+window.location.host+"/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value+"&category="+getActiveCatNum();
     // Copy the text inside the text field
     navigator.clipboard.writeText(_link);
}

let isAdmin=false;
let eventAdmin= false;
window.onload = async () => {

    await loadPage();  //load event config
    document.getElementById('eventTitleSelect').innerHTML=`<h5>Duelos - <span class="text-small"><a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a></span></h5>`;
    
    const user= netlifyIdentity.currentUser();
    const _eventConfig= getSessionEventConfig();
    
    eventAdmin= (_eventConfig&&_eventConfig.owners&&user&&_eventConfig.owners.indexOf(user.email.toLowerCase().trim())>=0);
    isAdmin= eventAdmin||(user&&user.app_metadata&&user.app_metadata.roles&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    

    if(!isAdmin){
        document.getElementById('btn-reset').style.display='none';
        document.getElementById('btnRelPassadas').style.display='none';
    }else{
        document.getElementById('btn-reset').style.display='';
        document.getElementById('btnRelPassadas').style.display='';
    }

    if(_eventConfig.clock)
        document.getElementById('btnOptClock').style.display='';
    else
        document.getElementById('btnOptClock').style.display='none';
    
    document.getElementById('btnAddShooter').style.display='';
    document.getElementById('nav-matches').classList.add('active');

    document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate"  href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    buildDivisions(eventConfig.divisions);

    if(params.selected_division!==undefined){
        document.getElementById('selectDivision').value=params.selected_division;            
    }
    const dbCategs= getDivision(_eventConfig.divisions, document.getElementById('selectDivision').value).categories;

    applySpinners(true);
    dbPlayers = await promiseOfGetDivisionPlayers(eventConfig._id,document.getElementById('selectDivision').value);
    applySpinners(false);
        
    document.getElementById('liAdvance').style.display=dbCategs.advance?'':'none';
    document.getElementById('liOverall').style.display= '';
    document.getElementById('liLadies').style.display=dbCategs.ladies?'':'none';
    document.getElementById('liOptics').style.display=dbCategs.optics?'':'none';
    document.getElementById('liSeniors').style.display=dbCategs.seniors?'':'none';
    
    if(params.category){ // categoria informada na url
        let selectedCateg =params.category?Number(params.category.toString()):0;
        // const triggerEl = document.querySelector(`#myTab button[data-bs-target="#nav-li${catNames[selectedCateg]}"]`)
        const triggerEl = document.getElementById(`li${catNames[selectedCateg]}`)

        if((selectedCateg===cAdvance && dbCategs.advance)
          ||(selectedCateg===cLadies && dbCategs.ladies)
          ||(selectedCateg===cOptics && dbCategs.optics)
          ||(selectedCateg===cSeniors && dbCategs.seniors)){
            // bootstrap.Tab.getInstance(triggerEl).show(); // Select tab by name
            triggerEl.click();
        } else document.getElementById(`li${catNames[cOverall]}`).click();

    }else{
        document.getElementById(`li${catNames[cOverall]}`).click();
    }

    // changeDivision(document.getElementById('selectDivision'));
    // getDuels(document.getElementById('selectDivision'));
    applySpinners(false);

    // if(params.cat){
    //     document.getElementById('liOverall').classList.remove('active');
    //     document.getElementById(params.cat).classList.add('active');
    // }

    if(params.rl&& Number(params.rl)>=1){

        // var counter = 0;
        var i = setInterval(async function () {
            
            applySpinners(true);
            getDuels(document.getElementById('selectDivision'));
            applySpinners(false);
            console.log('Reloaded!');

            // counter++;
            // if (counter === params.rl) {
            //     clearInterval(i);
            // }
        }, Number(params.rl) * 10000);
        
        
    }
    
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

}


function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i]._id === divisionID){
            return eventDivisions[i];
        }
    }
}

// function getSelectedCat(){

//     if(document.getElementById("liOverall").ariaSelected){
//         return cOverall;
//     }else if(document.getElementById("liAdvance").ariaSelected){
//         return cAdvance;
//     }else if(document.getElementById("liLadies").ariaSelected){
//         return cLadies;
//     }else if(document.getElementById("liOptics").ariaSelected){
//         return cOptics;
//     }else if(document.getElementById("liSeniors").ariaSelected){
//         return cSeniors;
//     }else{
//         console.log('Categoria não encontrada!');
//         return null;
//     }

// }
function getActiveCatNum(){
    let _cat=cOverall;

    if(document.getElementById('liAdvance').getAttribute('class').indexOf('active')>=0)
        _cat= cAdvance;

    if(document.getElementById('liLadies').getAttribute('class').indexOf('active')>=0)
        _cat= cLadies;

    if(document.getElementById('liOptics').getAttribute('class').indexOf('active')>=0)
        _cat= cOptics;

    if(document.getElementById('liSeniors').getAttribute('class').indexOf('active')>=0)
        _cat= cSeniors;

    if(document.getElementById('liOverall').getAttribute('class').indexOf('active')>=0)
        _cat= cOverall;
    
    return _cat;
}

const triggerTabList = document.querySelectorAll('#nav-tab button')
triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault();
    
    // Construct URLSearchParams object instance from current URL querystring.
    var queryParams = new URLSearchParams(window.location.search);

    // Set new or modify existing parameter value. 
    queryParams.set("category", getActiveCatNum());

    // Replace current querystring with the new one.
    // history.replaceState(null, null, "?"+queryParams.toString());
    history.pushState(null, null, "?"+queryParams.toString());
    tabTrigger.show();
    getDuels(document.getElementById('selectDivision'));
    
  })
})

function compareShooters(shooterIdA, shooterNameA, shooterIdB, shooterNameB, divisionName){

    var sel = document.getElementById('selectDivision');
    var divisionName= sel.options[sel.selectedIndex].text;
    
    document.getElementById('duelCompareModalLabel').innerText= shooterNameA + ' vs '+shooterNameB;
    document.getElementById('compareDivisionName').innerText= divisionName;

    document.getElementById('compareNameA').innerText= shooterNameA;
    document.getElementById('compareNameB').innerText= shooterNameB;


    document.getElementById('pic-profileCompareA').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+shooterIdA+".jpg?"+uuidv4();
    document.getElementById('pic-profileCompareB').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+shooterIdB+".jpg?"+uuidv4();
    
// ------------------------------
    applySpinners(false);

    const user= netlifyIdentity.currentUser();
    let _headers= {"Content-type": "application/json; charset=UTF-8"} ;
    if(user&&user.token&&user.token.access_token){
        _headers.Authorization= `Bearer ${user.token.access_token}` ;
    }
    

    fetch(`/.netlify/functions/duel_results?shooterA=${shooterIdA}&shooterB=${shooterIdB}&divisionName=${divisionName}` , {
        method: "GET",
        headers: _headers
        }
    ).then(response => response.json()
    ).then(json => {
            if(json){
                
                console.log(`JSON.stringify(json)= ${JSON.stringify(json)}`);

                perVicA= (json.shooterA.victories+json.shooterA.defeats)>0?Math.round(json.shooterA.victories/(json.shooterA.victories+json.shooterA.defeats)*100) +'%':'';
                perDefA= (json.shooterA.victories+json.shooterA.defeats)>0?Math.round(json.shooterA.defeats/(json.shooterA.victories+json.shooterA.defeats)*100) +'%':'';

                perVicB= (json.shooterB.victories+json.shooterB.defeats)>0?Math.round(json.shooterB.victories/(json.shooterB.victories+json.shooterB.defeats)*100) +'%':'';
                perDefB= (json.shooterB.victories+json.shooterB.defeats)>0?Math.round(json.shooterB.defeats/(json.shooterB.victories+json.shooterB.defeats)*100) +'%':'';


                perDircVicA= (json.shooterA.direct_victories+json.shooterA.direct_defeats)>0?Math.round(json.shooterA.direct_victories/(json.shooterA.direct_victories+json.shooterA.direct_defeats)*100) +'%':'';
                perDircVicB= (json.shooterB.direct_victories+json.shooterB.direct_defeats)>0?Math.round(json.shooterB.direct_victories/(json.shooterB.direct_victories+json.shooterB.direct_defeats)*100) +'%':'';

                perDirecDefA= (json.shooterA.direct_victories+json.shooterA.direct_defeats)>0?Math.round(json.shooterA.direct_defeats/(json.shooterA.direct_victories+json.shooterA.direct_defeats)*100) +'%':'';
                perDirecDefB= (json.shooterB.direct_victories+json.shooterB.direct_defeats)>0?Math.round(json.shooterB.direct_defeats/(json.shooterB.direct_victories+json.shooterB.direct_defeats)*100) +'%':'';


                document.getElementById('vA').innerHTML= ` ${json.shooterA.victories}  <span class="text-small"> (${perVicA}) </span>`;
                document.getElementById('vB').innerHTML= ` ${json.shooterB.victories}  <span class="text-small"> (${perVicB}) </span>`;
                
                document.getElementById('dA').innerHTML= ` ${json.shooterA.defeats}  <span class="text-small"> (${ perDefA}) </span>`;
                document.getElementById('dB').innerHTML= ` ${json.shooterB.defeats}  <span class="text-small"> (${ perDefB}) </span>`;

                document.getElementById('dvA').innerHTML= ` ${json.shooterA.direct_victories}  <span class="text-small"> (${ perDircVicA}) </span>`;
                document.getElementById('dvB').innerHTML= ` ${json.shooterB.direct_victories}  <span class="text-small"> (${ perDircVicB}) </span>`;

                // document.getElementById('ddA').innerHTML= ` ${json.shooterA.direct_defeats}  <span class="text-small"> (${perDirecDefA}) </span>`;
                // document.getElementById('ddB').innerHTML= ` ${json.shooterB.direct_defeats}  <span class="text-small"> (${ perDirecDefB}) </span>`;

                document.getElementById('goldA').innerHTML= json.shooterA.gold_reward;
                document.getElementById('goldB').innerHTML= json.shooterB.gold_reward;
                
                document.getElementById('silverA').innerHTML= json.shooterA.silver_reward;
                document.getElementById('silverB').innerHTML= json.shooterB.silver_reward;

                document.getElementById('bronzeA').innerHTML= json.shooterA.bronze_reward;
                document.getElementById('bronzeB').innerHTML= json.shooterB.bronze_reward;
                document.getElementById('btn-modal-compareduel').click();

            }else{ 
                alert(`Não encontrado`);
             }
            
        }
    ).catch(err => {console.log(`Error getting user rank: ${err}`); alert(`Erro ao comparar atiradores.`); }
    ).finally(()=> {applySpinners(false);});
}
// ------------------------------