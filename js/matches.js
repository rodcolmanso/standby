
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
    let has4play= 1;
    if(mainMatches.length>0 && mainMatches[0].length>0&&mainMatches[1].length>0&&
        mainMatches[0].length/mainMatches[1].length!==2 &&
        (mainMatches[0].length!==4&&mainMatches[0].length!==8&&mainMatches[0].length!==16&&mainMatches[0].length!==32&&mainMatches[0].length!==64)
        ){
            has4play=2;
        }

    for(let round=0;round<mainMatches.length;round++){
        
        if(has4play>1 && round===0){
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>Preliminares</b></div><br><br><br>`;
        }else if (mainMatches.length-round===1){
            matches+=`<div class="row no-gutters justify-content-md-center text-center" style='color:black'> <i class="bi bi-trophy-fill"></i><div>
            <div class="row no-gutters justify-content-md-center text-center" style='color:black'><b>GRANDE FINAL</b></div>
            <div class="row no-gutters justify-content-md-center text-center" style='color:black'>1º Colocado:</div><br><br>`;
        }else if (mainMatches.length-round===2){
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>Semi-finais:</b></div><br><br><br>`;
        }else if (mainMatches.length-round===3){
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>Quartas-de-final:</b></div><br><br><br>`;
        }else if (mainMatches.length-round===4){
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>Oitavas-de-final:</b></div><br><br><br>`;
        }else
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>${mainMatches.length-round+1}º Rodata</b></div>`;

        for(let match=0;match<mainMatches[round].length;match++){
            checkedA= mainMatches[round][match].v.id!==null&&mainMatches[round][match].v.id===mainMatches[round][match].shooterA.id?"checked":"";
            checkedB= mainMatches[round][match].v.id!==null&&mainMatches[round][match].v.id===mainMatches[round][match].shooterB.id?"checked":"";
            
            space=["",""];
            
            let s="";
            if(round>=has4play){
                s= `
                    <div class="ps-8">
                    </div>`;
                for(let k=0;k<=(round-has4play)*2;k++){
                    s+= `
                    <div class="ps-50">
                    </div>`;
                }
                space[0]=s;
            }
            
            _rd= mainMatches[round][match].shooterA.optics?`<i class="bi bi-dot" style="color:red !important;"></i>`:"";
            matches+= s+`
            <div class="card mb-3 card-block ">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <a href="#" onClick="goToSubscription('${mainMatches[round][match].shooterA.email}')" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop">
                            <img  src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${mainMatches[round][match].shooterA.shooterId}.jpg?code=''" class="img-fluid rounded-start small-avatar-pic" alt="...">
                        </a>
                    </div>
                    <div class="col-md-6 col-card-match ">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate"><b>
                        ${mainMatches[round][match].shooterA.name}
                        </b></h10>
                        <p class="card-text"><span class="badge rounded-pill text-bg-secondary">${mainMatches[round][match].shooterA.gun}</span> ${_rd}</p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${mainMatches[round][match].id}" value="${mainMatches[round][match].shooterA.id}"    onClick="javascript:updateMatch('${mainMatches[round][match].id}', this.value,  '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>`;
        
            let iB=match;

            _rd= mainMatches[round][iB].shooterB.optics?`<i class="bi bi-dot" style="color:red !important;"></i>`:"";
            matches+= `<!---->
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                    <a href="#" onClick="goToSubscription('${mainMatches[round][iB].shooterB.email}')" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop">
                        <img  style="height:50px" 
                            src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${mainMatches[round][match].shooterB.shooterId}.jpg?code=''" class="img-fluid rounded-start small-avatar-pic" alt="...">
                        </a>
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate"><b>
                        
                        ${mainMatches[round][iB].shooterB.name}
                        
                        </b></h10>
                        <p class="card-text"><span class="badge rounded-pill text-bg-secondary">${mainMatches[round][iB].shooterB.gun}</span> ${_rd}</p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${mainMatches[round][iB].id}" value="${mainMatches[round][iB].shooterB.id}"  onClick="javascript:updateMatch('${mainMatches[round][iB].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!--fim Partida-->
            <p class="ps-8"></p>
            <p class="ps-8"></p>`;

            
            s="";
            if(round>=has4play){
                s+= `
                    <div class="ps-8">
                    </div>`;
                for(let k=0;k<=(round-has4play)*(2+(round-has4play));k++){
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
        document.getElementById(categ+'LevelM'+round).innerHTML= matches;
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
    for(let round=recapMatches.length-1;round>=0;round--){

        if ((round+1)===recapMatches.length){
            matches+=`<div style='color:black' class="row no-gutters justify-content-md-center text-center"><i class="bi bi-trophy"></i></div>
                    <div style='color:black' class="row no-gutters justify-content-md-center text-center"><b>FINAL de repescagem</b><br></div>
                    <div style='color:black' class="row no-gutters justify-content-md-center text-center">2º e 3º Colocados:</div><br><br>`;
        // }else if(round===0){
        //     matches+=`<div class="row no-gutters justify-content-md-center text-center">REPESCAGEM</div><br><br><br>`;
        // }else if (recapMatches.length-round===2){
        //     matches+=`<div class="row no-gutters justify-content-md-center text-center">Semi-de-repescagem:</div><br><br><br>`;
        // }else if (recapMatches.length-round===3){
        //     matches+=`<div class="row no-gutters justify-content-md-center text-center">Quartas-de-repescagem:</div><br><br><br>`;
        // }else if (recapMatches.length-round===4){
        //     matches+=`<div class="row no-gutters justify-content-md-center text-center">Oitavas-de-repescagem:</div><br><br><br>`;
        }else
            matches+=`<div class="row no-gutters justify-content-md-center text-center"><b>${round+1}º Rodata de repescagem</b></div><br><br>`;

        for(let match=0;match<recapMatches[round].length;match++){
            checkedA= recapMatches[round][match].v.id!==null&&recapMatches[round][match].v.id===recapMatches[round][match].shooterA.id?"checked":"";
            checkedB= recapMatches[round][match].v.id!==null&&recapMatches[round][match].v.id===recapMatches[round][match].shooterB.id?"checked":"";
            
            ls++;
            if(levelSpace.length-ls>=0){
                matches+= levelSpace[levelSpace.length-ls][0];
                console.log(`levelSpace[${levelSpace.length-ls}][0]=${levelSpace[levelSpace.length-ls][0]}`)
            }
            _rdA= recapMatches[round][match].shooterA.optics?`<i class="bi bi-dot" style="color:red !important;"></i>`:"";
            _rdB= recapMatches[round][match].shooterB.optics?`<i class="bi bi-dot" style="color:red !important;"></i>`:"";
            matches+= `
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${recapMatches[round][match].shooterA.shooterId}.jpg?code=''" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate"><b>${recapMatches[round][match].shooterA.name}</b></h10>
                        <p class="card-text"><span class="badge rounded-pill text-bg-secondary">${recapMatches[round][match].shooterA.gun}</span> ${_rdA}</p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedA} name="${categ}flexRadioMatch${recapMatches[round][match].id}" value="${recapMatches[round][match].shooterA.id}"  onClick="javascript:updateMatch('${recapMatches[round][match].id}', this.value, '${categ}')" >
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <div class="card mb-3 card-block">
                <div class="row g-0">
                    <div class="col-md-4 small-avatar-pic" >
                        <img  style="height:50px" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${recapMatches[round][match].shooterB.shooterId}.jpg?code=''" class="img-fluid rounded-start small-avatar-pic" alt="...">
                    </div>
                    <div class="col-md-6 col-card-match">
                        <div class="card-header-2" >
                        <h10 class="card-title text-truncate"><b>${recapMatches[round][match].shooterB.name}</b></h10>
                        <p class="card-text"><span class="badge rounded-pill text-bg-secondary">${recapMatches[round][match].shooterB.gun}</span> ${_rdB}</p>
                        </div>
                    </div>
                    <div class="row align-items-center col-card-check">
                        <div class="form-check">
                        <input class="form-check-input big-checkbox" type="radio" ${checkedB} name="${categ}flexRadioMatch${recapMatches[round][match].id}" value="${recapMatches[round][match].shooterB.id}"  onClick="javascript:updateMatch('${recapMatches[round][match].id}', this.value, '${categ}')" >
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
        document.getElementById(categ+'LevelR'+round).innerHTML= matches;
        console.log('Nao Erro aqui X');
        matches="";
    }

}

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
    var textDivision = selectDivision.options[selectDivision.selectedIndex].innerHTML;
    // selectDivision.disabled=true;
    
    fetch(`/.netlify/functions/build_matches?eventId=${eventConfig._id}&divisionId=${idDivision}`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        // .then(r=>r.json())
        .then(function(response) {
            console.log(response.status); // Will show you the status

            if (!response.ok) {
                if(response.status===410){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Damas]. Elimine essa categoria ou inscreva mais participantes.`);
                } else if(response.status===411){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Seniores]. Elimine essa categoria ou inscreva mais participantes.`);
                }if(response.status===412){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Optics]. Elimine essa categoria ou inscreva mais participantes.`);
                }if(response.status===413){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Overall/Sport]. Elimine essa categoria ou inscreva mais participantes.`);
                }if(response.status===414){
                    alert(`Não é possível gerar duelos com menos de 3 atiradores.\n[${textDivision} - Avançados]. Elimine essa categoria ou inscreva mais participantes.`);
                }

                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
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

function goToSubscription(email){
    console.log("Going To Subscribe");
    if(email!==undefined && email!==''){
        email= '&email='+email;
    }else email='';
    window.location="/event-details.html?inscription=duel&selected_division="+document.getElementById('selectDivision').value+email;
}


window.onload = async () => {

    await loadPage();
    document.getElementById('eventTitleSelect').innerHTML=`<h5>Duelos - <span class="text-small">${eventConfig.name}</span></h5>`;
    
    document.getElementById('btn-reset').style.display='';
    document.getElementById('btnAddShooter').style.display='';
    document.getElementById('nav-matches').classList.add('active');
    document.getElementById('liAdvance').style.display='none';
    document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    
    document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate"  href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    buildDivisions(eventConfig.divisions);
    // changeDivision(selectDivision);
    if(params.selected_division!==undefined){
        document.getElementById('selectDivision').value=params.selected_division;
    }
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
    
    if(eventConfig===undefined || eventConfig===null||user===null||(!isAdmin&&(eventConfig.owners.indexOf(user.email)<0))){
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