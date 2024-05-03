
const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';


const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig=null;
let playersArray;
let timeRecords;
let modalChanged;
let language="pt-br";
let loggedUser;


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

    function updateMatch(matchId, v, categ){
        // console.log("Entrou no updateMatch");

        // advance
        // overall
        // optics
        // seniors
        // ladies
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
        
        }

    let idM= matchId.split('.');

    if(idM[0]==="m"){
        // alert(`mainMatches[idM[1]][idM[2]].shooterA.id= ${mainMatches[idM[1]][idM[2]].shooterA.id},
        // mainMatches[idM[1]][idM[2]].shooterB.id= ${mainMatches[idM[1]][idM[2]].shooterB.id}`);
        if(mainMatches[idM[1]][idM[2]].shooterA.id!==null&&mainMatches[idM[1]][idM[2]].shooterB.id!==null){
            mainMatches[idM[1]][idM[2]].v= ""+mainMatches[idM[1]][idM[2]].shooterA.id===v ? mainMatches[idM[1]][idM[2]].shooterA : mainMatches[idM[1]][idM[2]].shooterB;
            mainMatches[idM[1]][idM[2]].d= ""+mainMatches[idM[1]][idM[2]].shooterA.id===v ? mainMatches[idM[1]][idM[2]].shooterB : mainMatches[idM[1]][idM[2]].shooterA;
            saveDivision();
        }
    }else{
        if(recapMatches[idM[1]][idM[2]].shooterA.id!==null&&recapMatches[idM[1]][idM[2]].shooterB.id!==null){
            recapMatches[idM[1]][idM[2]].v= ""+recapMatches[idM[1]][idM[2]].shooterA.id===v ? recapMatches[idM[1]][idM[2]].shooterA : recapMatches[idM[1]][idM[2]].shooterB;
            recapMatches[idM[1]][idM[2]].d= ""+recapMatches[idM[1]][idM[2]].shooterA.id===v ? recapMatches[idM[1]][idM[2]].shooterB : recapMatches[idM[1]][idM[2]].shooterA;
            saveDivision();
        }

    }

    updateAllMatches(mainMatches, recapMatches, categ);
    

}

function addLevels(mainMatches, recapMatches, categ){
    // console.log("addLevels. categ="+categ);
    let div_levels= document.getElementById(categ+'Levels');

    let levels="";

    let count= mainMatches.length;
    let col_matches= "col-matches";
    // "col-matches-final-1"
    for(let i=0;i<count;i++){
        if(i+1===count){
            col_matches= "col-matches-final-1"
        };
    levels+= `<div id="${categ}LevelM${i}" class="col-5 ${col_matches}">
            </div>
            <div class="col-5 col-matches-rule" id="${categ}RuleLevelM${i}">
                
            </div>`;
    }

    console.log('Erro aqui 1? categ='+categ+'Levels');
    div_levels.innerHTML=levels;
    console.log('Não erro aqui 1')

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
        console.log('Erro aqui 2?');
        div_levels.innerHTML+=levels;
        console.log('Nao Erro aqui 2');
}

function addMainMatches(mainMatches, recapMatches, categ){
    
    let matches="";

    let levelSpace= [];
    let space=["",""];
    
    //finding out if has preliminares or not
    let has4plays= 1;
    if(mainMatches.length>0 && mainMatches[0].length>0&&mainMatches[1].length>0&&
        mainMatches[0].length/mainMatches[1].length!==2 &&
        (mainMatches[0].length!==4&&mainMatches[0].length!==8&&mainMatches[0].length!==16&&mainMatches[0].length!==32&&mainMatches[0].length!==64)
        ){
        has4plays=2;
        }

    for(let l=0;l<mainMatches.length;l++){

        for(let i=0;i<mainMatches[l].length;i++){
            checkedA= mainMatches[l][i].v.id!==null&&mainMatches[l][i].v.id===mainMatches[l][i].shooterA.id?"checked":"";
            checkedB= mainMatches[l][i].v.id!==null&&mainMatches[l][i].v.id===mainMatches[l][i].shooterB.id?"checked":"";
            
            space=["",""];
            
            let s="";
            if(l>=has4plays){
                s= `
                    <div class="ps-8">
                    </div>`;
                for(let k=0;k<=(l-has4plays)*2;k++){
                    s+= `
                    <div class="ps-50">
                    </div>`;
                }
                space[0]=s;
            }
            

            matches+= s+`
            <div class="card mb-3 card-block ">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match ">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${mainMatches[l][i].shooterA.name}</h10>
                        <p class="card-text"><small class="text-body-secondary text-small">${mainMatches[l][i].shooterA.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${mainMatches[l][i].id}" value="${mainMatches[l][i].shooterA.id}"    onClick="javascript:updateMatch('${mainMatches[l][i].id}', this.value,  '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>`;
        
            let iB=i;

            matches+= `<!---->
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  style="height:50px" src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${mainMatches[l][iB].shooterB.name}</h10>
                        <p class="card-text"><small class="text-body-secondary text-small">${mainMatches[l][iB].shooterB.gun}</small></p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${mainMatches[l][iB].id}" value="${mainMatches[l][iB].shooterB.id}"  onClick="javascript:updateMatch('${mainMatches[l][iB].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!--fim Partida-->
            <p class="ps-8"></p>
            <p class="ps-8"></p>`;

            
            s="";
            if(l>=has4plays){
                s+= `
                    <div class="ps-8">
                    </div>`;
                for(let k=0;k<=(l-has4plays)*(2+(l-has4plays));k++){
                    s+= `
                    <div class="ps-50">
                    </div>`;
                }
                matches+=s;
                space[1]=s;
                levelSpace.push(space);
            }
            
            
        } 
        console.log('Erro aqui 3?');
        document.getElementById(categ+'LevelM'+l).innerHTML= matches;
        console.log('Nao Erro aqui 2.');
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
    // levelSpace.push(space);
    let ls=0;
    for(let l=recapMatches.length-1;l>=0;l--){

        for(let i=0;i<recapMatches[l].length;i++){
            checkedA= recapMatches[l][i].v.id!==null&&recapMatches[l][i].v.id===recapMatches[l][i].shooterA.id?"checked":"";
            checkedB= recapMatches[l][i].v.id!==null&&recapMatches[l][i].v.id===recapMatches[l][i].shooterB.id?"checked":"";
            
            ls++;
            if(levelSpace.length-ls>=0){
                matches+= levelSpace[levelSpace.length-ls][0];
                console.log(`levelSpace[${levelSpace.length-ls}][0]=${levelSpace[levelSpace.length-ls][0]}`)
            }
            matches+= `
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  src="img/generic-avatar-human-male-head-silhouette-vector-40402253.jpg" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate">${recapMatches[l][i].shooterA.name}</h10>
                        <p class="card-text"><small class="text-body-secondary text-small">${recapMatches[l][i].shooterA.gun}</small></p>
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
                        <p class="card-text"><small class="text-body-secondary text-small">${recapMatches[l][i].shooterB.gun}</small></p>
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
            if(levelSpace.length-ls>=0){
                matches+= levelSpace[levelSpace.length-ls][1];
            }
        } 
        console.log('Erro aqui X?');
        document.getElementById(categ+'LevelR'+l).innerHTML= matches;
        console.log('Nao Erro aqui X');
        matches="";
    }

}

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// const event_id = params.event_id;

// // const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
// const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId="+event_id)
//     .then(r=>r.json())
//     .then(data => {
//     return data;
// });

// const promiseOfPlayers = fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
//     .then(r=>r.json())
//     .then(data => {
//     return data;
// });

// let mainMatches=[];
// let recapMatches=[];
// const promiseKOs = fetch("/.netlify/functions/build_matches?eventId=6578ad76e53c8b23971032c4&divisionId=6578a6dae53c8b23971032c1", {
//     method: "PUT",
//     headers: {"Content-type": "application/json; charset=UTF-8"}
//     }).then(r=>r.json())
//     .then(data => {
//     return data;
// });


let KOs;

function deleteKos(){
    if(!confirm('Tem certeza que deseja recriar as chaves? Todos os resultados anteriores serão perdidos.')) {
        return 0;
    }
    applySpinners(true);
    const selectDivisions= document.getElementById('selectDivision');
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${selectDivisions.value}`, {
        method: "DELETE",
        // body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
            //location.reload(true);
            // alert('Partidas Salvas');
            changeDivision(selectDivisions);
        })
        .catch(err => console.log(`Error deleting matches. Error: ${err}`))
        .finally(()=> applySpinners(false));

}

function saveDivision(){
    applySpinners(true);
    const selectDivisions= document.getElementById('selectDivision');
        // KOs.advancedDoubleKOs
        // KOs.overallDoubleKOs
        // KOs.opticDoubleKOs
        // KOs.seniorDoubleKOs
        // KOs.ladyDoubleKOs

        const body= {"eventId":eventConfig._id, "divisionId":selectDivisions.value
                   ,"advancedDoubleKOs":KOs.advancedDoubleKOs
                   ,"overallDoubleKOs":KOs.overallDoubleKOs
                   ,"opticDoubleKOs":KOs.opticDoubleKOs
                   ,"seniorDoubleKOs":KOs.seniorDoubleKOs
                   ,"ladyDoubleKOs":KOs.ladyDoubleKOs};
        
        fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${selectDivisions.value}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                //location.reload(true);
                // alert('Partidas Salvas');
            })
            .catch(err => console.log(`Error updating matches. Error: ${err}`))
            .finally(()=> applySpinners(false));
}

function changeDivision(selectDivision){
    
    if(selectDivision.value==='')
        return 0;

    applySpinners(true);
    document.getElementById('liAdvance').style.display='none';
    // document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    const triggerEl = document.querySelector('#nav-tab button[data-bs-target="#nav-liOverall"]')
    bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name
    
    const idDivision= selectDivision.value;
    // selectDivision.disabled=true;
    
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${idDivision}`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(r=>r.json())
        .then(kos=>{

            KOs = kos;
            
            if(KOs.advancedDoubleKOs !==null && KOs.advancedDoubleKOs.length>0 &&  KOs.advancedDoubleKOs[0]!==null && KOs.advancedDoubleKOs[0].length>0){
                addLevels(KOs.advancedDoubleKOs[0], KOs.advancedDoubleKOs[1],'advance');
                
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
    disableInputs();
};

function hrefQualify(){
    window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}


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

netlifyIdentity.on('close', () => {
loadPage();
});

window.onload = async () => {

    // if(netlifyIdentity.currentUser()){
    //     applySpinners(true);
    //     fetch('/.netlify/functions/shooters?logged', {
    //         method: "GET",
    //         headers: {
    //                     "Content-type": "application/json; charset=UTF-8"
    //                     ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
    //                 }
    //         }).then(response => response.json()
    //         ).then(json => {
    //             if(json.length>0){
    //                 console.log(`User logged`);
    //                 // document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/"+json[0]._id;
    //             }
    //         })
    //         .catch(err => console.log(`Error getting, logged user: ${err}`))
    //         .finally(()=> applySpinners(false));
    // }

    loadPage();
    
    document.getElementById('btn-reset').style.display='';
    document.getElementById('nav-matches').classList.add('active');
    document.getElementById('liAdvance').style.display='none';
    document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    
    // applySpinners(true);
    // eventConfig = await promiseOfEventConfig;
    // document.getElementById('eventTitle').innerHTML= eventConfig.name;

    // loggedUser= netlifyIdentity.currentUser();
        
    // applySpinners(true);
    // eventConfig = await promiseOfSessionEventConfig(null,loggedUser);
    // applySpinners(false);

    document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate"  href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    buildDivisions(eventConfig.divisions);
    // changeDivision(selectDivision);
    changeDivision(document.getElementById('selectDivision'));
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
            ||btn.getAttribute('class').includes("btn-warning")
            ||btn.getAttribute('class').includes("btn-primary"))) {

            if(onoff)
                btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
            else
                btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
        }
    });

    let _radio = document.querySelectorAll('input[type="radio"]');
    [].forEach.call(_radio,rdo=>{
        rdo.disabled=onoff;
    });
    disableInputs();
}

function disableInputs(){

    onoff=false;
    const user= netlifyIdentity.currentUser();
    let isAdmin= (user&&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    
    if(eventConfig===undefined||user===null||(!isAdmin&&(eventConfig.owners.indexOf(user.email)<0))){
        onoff= true;
    }

    // document.getElementById('selectDivision').disabled=onoff;

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
    
    if((["btn-close","btn-secondary","btn btn-secondary","accordion-button","collapsed","accordion-button collapsed"].indexOf(btn.getAttribute('class'))<0)&&
    (["bdNavbar"].indexOf(btn.getAttribute('aria-controls'))<0)&&
    (["Close"].indexOf(btn.getAttribute('aria-label'))<0)&&
    (["bt_clock","bt_matches","loginAvatar","bt_share"].indexOf(btn.getAttribute('id')))<0){
        btn.disabled=onoff;
    }
    
    });

    let _radio = document.querySelectorAll('input[type="radio"]');
    [].forEach.call(_radio,rdo=>{
        rdo.disabled=onoff;
    });
}

history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};