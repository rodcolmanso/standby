
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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const event_id = params.event_id;

// const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId="+event_id)
    .then(r=>r.json())
    .then(data => {
    return data;
});

// const promiseOfPlayers = fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
const promiseOfPlayers = fetch("/.netlify/functions/shooters_divisions_v2?eventId="+event_id)
    .then(r=>r.json())
    .then(data => {
    return data;
});

function hrefQualify(){
    window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}

window.onload = async () => {

    if(netlifyIdentity.currentUser()){
        applySpinners(true);
        fetch('/.netlify/functions/shooters?logged', {
            method: "GET",
            headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
                    }
            }).then(response => response.json()
            ).then(json => {
                if(json.length>0){
                    console.log(`User logged`);
                    document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/"+json[0]._id;
                }
            })
            .catch(err => console.log(`Error getting, logged user: ${err}`))
            .finally(()=> applySpinners(false));
    }

    document.getElementById('btnAddShooter').style.display='';
    document.getElementById('nav-qualify').classList.add('active');
    // document.getElementById('divTAdvance').style.display='none';
    // document.getElementById('divTOverall').style.display= 'none';
    // document.getElementById('divTLadies').style.display='none';
    // document.getElementById('divTOptics').style.display='none';
    // document.getElementById('divTSeniors').style.display='none';
    // document.getElementById('EventTitle').innerHTML =``;
    applySpinners(true);

    eventConfig = await promiseOfEventConfig;
    playersArray= await promiseOfPlayers;
    // document.getElementById('eventTitle').innerHTML= eventConfig.name;
    document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    
    buildDivisions(eventConfig.divisions);
    modalChanged=false;
    const selectDivisions= document.getElementById('selectDivision');
    changeDivision(selectDivision);
    applySpinners(false);
    disableInputs();



};
  
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



function changeDivision(selectDivision){
    
    buildPlayersTables(transformRegistrer(playersArray), eventConfig, selectDivision.value);
    buildCategory2(eventConfig, selectDivision.value);
    
    
    if(selectDivision.value===null || selectDivision.value=='' || selectDivision.value<0||selectDivision.value<0){
        document.getElementById('btnAddShooter').disabled = true;
    }else{
        document.getElementById('btnAddShooter').disabled = false;
    }
    disableInputs();
};


function transformRegistrer(players){
    let registers = [];
    let rP= [];
    let aRow= '';
    for(i=0;i<players.length;i++){
        for(j=0;j<players[i].registered.length;j++){
            if(players[i].registered[j].score===undefined||players[i].registered[j].score===null||players[i].registered[j].score===''){
                players[i].registered[j].score=999;
                players[i].registered[j].tries=0;
                players[i].registered[j].datetime="2099-01-01T00:00:00.000Z";
            }

            score_idx= zeroPad((""+(Math.round(players[i].registered[j].score*100))),7);

            sort_idx= ''+score_idx+zeroPad(players[i].registered[j].tries,3)+players[i].registered[j].datetime;
            console.log(`Name:${players[i].name} , sort_idx:${sort_idx} `);
            
            aRow= {'division':players[i].registered[j].divisionId,'shooter_division':players[i].registered[j].shooterDivisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries, 'sort_idx':sort_idx };
            
            rP.push(aRow);  
        }
    }

    rP= rP.sort((a, b) => {
        if (a.sort_idx < b.sort_idx) {
          return -1;
        }
      });
    return rP;
}

function buildPlayersTables(aPlayers, eventConfig, selectDivision){
    
    var row= "";
    spinner.style.visibility = 'visible'//'visible'; //'hidden'
    document.getElementById('tableAdvance').innerHTML= row;
    document.getElementById('tableOverall').innerHTML= row;
    document.getElementById('tableLadies').innerHTML= row;
    document.getElementById('tableOptics').innerHTML= row;
    document.getElementById('tableSeniors').innerHTML= row;

    let divisionIndex=-1;
    for(let i=0; i< eventConfig.divisions.length; i++){
        if(selectDivision===eventConfig.divisions[i]._id){
            divisionIndex=i;
            i= eventConfig.divisions.length;
        }
    }
    
    let actualAdvCount=0;
    let actualOverallCount=0;
    let actualLadiesCount=0;
    let actualOpticsCount=0;
    let actualSeniorsCount=0;
    let position=0;


    let table;
    let sScore;
    let sTries;
    let trophy;

        for(let i=0; i< aPlayers.length; i++){
            
            if(aPlayers[i].division == selectDivision){
                
                if(aPlayers[i].category==cLadies){
                    
                    if(eventConfig.divisions[divisionIndex].categories.ladies){
                        
                        table= document.getElementById('tableLadies');
                        actualLadiesCount++;
                        position= actualLadiesCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position=actualAdvCount;

                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;

                    }
                }

                if(aPlayers[i].category==cSeniors){
                    if(eventConfig.divisions[divisionIndex].categories.seniors){
                        table= document.getElementById('tableSeniors');
                        actualSeniorsCount++;
                        position= actualSeniorsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position= actualAdvCount;
                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;

                    }
                }

                if(aPlayers[i].category==cOverall){
                    if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position= actualAdvCount;

                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;
                    }
                }

                if(aPlayers[i].score===undefined || aPlayers[i].score===null || aPlayers[i].score>100){ 
                    // aPlayers[i].score='NA';
                    sScore='NA';
                }
                else sScore= ''+aPlayers[i].score;

                if(aPlayers[i].tries===undefined||aPlayers[i].tries===null||aPlayers[i].tries<1){  
                    // aPlayers[i].tries=0;
                    sTries=''; 
                    aPlayers[i].tries=0;                   
                }
                else if(aPlayers[i].tries==1)sTries='|';
                else if(aPlayers[i].tries==2)sTries='||';
                // else if(aPlayers[i].tries==3)sTries='|||';
                else sTries='+||';

                if(position<2&&aPlayers[i].tries>0)
                    trophy=`<i class="bi bi-trophy"></i>`;
                else
                    trophy=``;

        //data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop"
                row= `<tr>
                    <td class="align-middle">${position}</td>
                    <td class="align-middle">
                    <a href="#" onClick="editShooter('${aPlayers[i].id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop">
                     ${aPlayers[i].name}
                        </a>&nbsp;&nbsp;&nbsp;${trophy} 
                    </td>
                    <td class="align-middle d-none d-sm-table-cell" >${aPlayers[i].gun}</td>
                    <td class="align-middle text-end">${sScore}</td>
                    <td class="align-middle text-end">${sTries}</td>
                    <td class="align-middle">
                        <button onClick="timeTrack('${aPlayers[i].id}', '${aPlayers[i].name}', '${aPlayers[i].gun}', '${sScore}', '${aPlayers[i].shooter_division}')" class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-stopwatch"></i></button>
                    </td>
                </tr>`;
                table.innerHTML+= row;
                // console.log(`row[${i}]=${row}`);

            }
        }
            // console.log(`BEFORE UNHIDDE SPINNER`);
            spinner.style.visibility = 'hidden'//'visible'; //'hidden'
                //)
}

function buildCategory2(eConfig, selectDivision){

    
    document.getElementById('liAdvance').style.display='none';
    // document.getElementById('liAdvance').classList.remove('active');
    // document.getElementById('liAdvance').ariaSelected= false;

    // document.getElementById('liOverall').style.display= 'none';
    // document.getElementById('liOverall').classList.remove('active');
    // document.getElementById('liOverall').ariaSelected= false;

    document.getElementById('liLadies').style.display='none';
    // document.getElementById('liLadies').classList.remove('active');
    // document.getElementById('liLadies').ariaSelected= false;

    document.getElementById('liOptics').style.display='none';
    // document.getElementById('liOptics').classList.remove('active');
    // document.getElementById('liOptics').ariaSelected= false;

    document.getElementById('liSeniors').style.display='none';
    // document.getElementById('liSeniors').classList.remove('active');
    // document.getElementById('liSeniors').ariaSelected= false;
    
    // document.getElementById('liOverall').classList.add('active');
    // document.getElementById('liOverall').ariaSelected= true;

    const triggerEl = document.querySelector('#nav-tab button[data-bs-target="#nav-liOverall"]')
    bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name


     let divisionIndex=-1;
     for(let i=0; i< eConfig.divisions.length; i++){
         if(selectDivision==eConfig.divisions[i]._id){
             divisionIndex=i;
            //  i= eConfig.divisions.length;
         }
     }

     if(divisionIndex>-1){
        const categories= eConfig.divisions[divisionIndex].categories;
        
        if(categories.advance){

            document.getElementById('liAdvance').style.display='';
            
        }
        
        // if(categories.overall){
        //     document.getElementById('liOverall').style.display='';
       
        // }
        if(categories.ladies){
            document.getElementById('liLadies').style.display='';
            
        }
        if(categories.optics){
            
            document.getElementById('liOptics').style.display='';
        }

        if(categories.seniors){
            
            document.getElementById('liSeniors').style.display='';
            
        }
            
    }           
}

function buildDivisions(eventDivisions){

    const selectDivisions= document.getElementById('selectDivision');

    while (selectDivisions.options.length > 0)
        selectDivisions.remove(0);

    let newOption = new Option('<<selecione>>','-1');
    //selectDivisions.add(newOption,undefined);

    for(i=0;i<eventDivisions.length;i++){
        newOption = new Option(eventDivisions[i].name,eventDivisions[i]._id);
        selectDivisions.add(newOption,undefined);

    }

    //selectDivisions.value= eventDivisions[0].id;

    clearShooterModal();

}

function clearShooterModal(){
    
    document.getElementById('modalShooterId').value='';
    document.getElementById('modalName').value='';
    document.getElementById('modalEmail').value='';
    document.getElementById('modalOption'+cLadies).checked=false;
    document.getElementById('modalOption'+cOverall).checked=false;
    document.getElementById('modalOption'+cSeniors).checked=false;
    
    
    let modalRow='';
    document.getElementById('modalShooterDivisions').innerHTML='';
    for(k=0;k<eventConfig.divisions.length;k++){

        modalRow= `
        <tr>
            <th scope="row">
                <input type="checkbox" class="btn-check" id="btnCheckDivision${eventConfig.divisions[k]._id}" autocomplete="off">
                <label class="btn btn-outline-warning" for="btnCheckDivision${eventConfig.divisions[k]._id}">${eventConfig.divisions[k].name}</label><br>
            </th>
                <td>
                    <input class="form-control form-control-sm" id="gunName${eventConfig.divisions[k]._id}" type="text" maxlength="10"
                        onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k]._id}').checked=true" placeholder="" aria-label=".form-control-sm example">
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k]._id}').checked=true" type="checkbox" role="switch" id="optic${eventConfig.divisions[k]._id}">
                    </div>
                </td>
        </tr>`;
        document.getElementById('modalShooterDivisions').innerHTML+=modalRow;

        document.getElementById('btnCheckDivision'+eventConfig.divisions[k]._id).checked=false;
        document.getElementById('gunName'+eventConfig.divisions[k]._id).value="";
        document.getElementById('optic'+eventConfig.divisions[k]._id).checked=false;

    }
}

function editShooter(idShooter){

    clearShooterModal();

    //populate modal registered
    for(i=0;i< playersArray.length;i++){

        if(idShooter== playersArray[i].shooterId){
            for(j=0;j< playersArray[i].registered.length;j++){

            
                //&& selectDivision==playersArray2[i].registered[j].division
                

                document.getElementById('modalShooterId').value= playersArray[i].shooterId;
                document.getElementById('modalName').value= playersArray[i].name;
                document.getElementById('modalEmail').value= playersArray[i].email;
                document.getElementById('modalOption'+playersArray[i].category).checked=true;

                document.getElementById('btnCheckDivision'+playersArray[i].registered[j].divisionId).checked=true;
                document.getElementById('gunName'+playersArray[i].registered[j].divisionId).value= playersArray[i].registered[j].gun;
                if(playersArray[i].registered[j].optics)
                     document.getElementById('optic'+playersArray[i].registered[j].divisionId).checked= true;
                else
                    document.getElementById('optic'+playersArray[i].registered[j].divisionId).checked= false;

            }
        }
    }
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function getShooterByEmail(eventId, shooterEmail){
applySpinners(true);
fetch("/.netlify/functions/shooters_divisions_v2?eventId="+eventId+"&email="+shooterEmail)
        .then(r=>r.json())
        .then(data=>{
            if(data.length>0){
            document.getElementById('modalName').value= data[0].name;
            document.getElementById('modalShooterId').value.data[0].name;
            }else{
                console.log(`Shooter not found.`);
            }
        })
        .catch(err => console.log(`Error adding, updating shooter: ${err}`))
        .finally(()=> applySpinners(false));
}


//////////------------UPDATES-----------------------
function addUpdateShooter(){

    
    let idShooter= document.getElementById('modalShooterId').value;
    console.log(`entro update shooter. idShooter=${idShooter}`);
    let aRegistered=[];
        
        for(let i=0; i<eventConfig.divisions.length;i++){
            if(document.getElementById('btnCheckDivision'+eventConfig.divisions[i]._id).checked){
                aRegistered.push({'divisionId':eventConfig.divisions[i]._id
                                 ,'gun':document.getElementById('gunName'+eventConfig.divisions[i]._id).value
                                 ,'optics':document.getElementById('optic'+eventConfig.divisions[i]._id).checked
                                 ,'score':9999,'tries':0 });
            }
        }

        //Validations

        document.getElementById('modalName').value= document.getElementById('modalName').value.trim();
        let idDublicated= null;
        for(let i=0; i<playersArray.length;i++){
            if(playersArray[i].name.toUpperCase()===document.getElementById('modalName').value.toUpperCase()
            && idShooter!= playersArray[i].shooterId){
                idDublicated=  playersArray[i].shooterId;
            }
        }

        //At least one Division
        if(aRegistered.length<1){
            alert('Selecione ao meno uma divisão!');
            return 0;
        }
        
        if (idDublicated!=null){
            if(confirm('O nome "'+document.getElementById('modalName').value+'" já está em uso. Gostaria de atualiza-lo?')) {
                idShooter=  idDublicated;
            }else return 0;
        }

            let categ= cOverall;

            if(document.getElementById('modalOption'+cLadies).checked)
                categ= cLadies;
            else if(document.getElementById('modalOption'+cSeniors).checked)
                categ= cSeniors;
            else{ //if(document.getElementById('modalOption'+cOverall).checked)
                document.getElementById('modalOption'+cOverall).checked= true;
                categ= cOverall;
            }
            
            document.getElementById('modalShooterId').value= idShooter;
                aEvt= [];
                aEvt.push(eventConfig._id); 
                let jShooter= {'shooterId':idShooter
                            ,'name':document.getElementById('modalName').value
                            ,'email':document.getElementById('modalEmail').value
                            ,'category': categ
                            ,'eventId': aEvt
                            // ,'event_id': eventConfig._id
                            ,'registered':aRegistered};     

            //    playersArray.push(jShooter);
            applySpinners(true);
            fetch('/.netlify/functions/shooters_divisions_v2', {
                    method: "PATCH",
                    body: JSON.stringify(jShooter),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        console.log(`Shooter added/updated= ${ JSON.stringify(json,null,2)}`);
                        applySpinners(false);
                        // console.log(`document.getElementById('modalClose').value= ${ document.getElementById('modalClose').value}`);
                        document.getElementById('modalClose').click();
                
                        if(idShooter===null || idShooter==''){
                            // alert(document.getElementById('modalName').value+' se juntou ao evento!');
                            document.getElementById('modalShooterId').value= json.shooterId;

                        }else{
                            // alert(document.getElementById('modalName').value+' atualizado');
                            // let sd= selectDivision= document.getElementById('selectDivision').value;
                            // buildPlayersTables(transformRegistrer(playersArray), eventConfig, sd);
                        }
                        modalChanged=true;
                        updateShootersList();
                        console.log(`document.getElementById('modalClose').value=`+document.getElementById('modalClose').value);
                        document.getElementById('modalClose').click();
                    })
                    .catch(err => console.log(`Error adding, updating shooter: ${err}`))
                    .finally(()=> applySpinners(false));
}
    
function deleteShooter(){
    let idShooter= document.getElementById('modalShooterId').value;
    
    if(idShooter===null ||idShooter==''){
        return 0;
    }else if(confirm('Tem certeza que deseja remover esse atirador?')) {

        let jShooter= {shooterId:''};
        jShooter.shooterId= idShooter;
        applySpinners(true);
        fetch('/.netlify/functions/shooters_divisions_v2', {
            method: "DELETE",
            body: JSON.stringify(jShooter),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                console.log(`Shooter deleted. akas: [divisions_deleted: ${json.divisions_deletedCount}, shooters_deleted:${json.shooter_deletedCount}]`);
        
                if(json.shooter_deletedCount>0){
                    alert(`Atirador removido!`);
                    document.getElementById('modalShooterId').value= "";

                }else{
                    alert(`No users seems to have been deleted.`);
                }
                modalChanged=true;
                updateShootersList();

            })
            .catch(err => console.log(`Error deleting shooter, updating shooter: ${err}`))
            .finally(()=> applySpinners(false));
        
    }
    
}

function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i]._id == divisionID){
            return eventDivisions[i];
        }
    }
}

function getUserFromEmail(userEmail){

    applySpinners(true);
    fetch(`/.netlify/functions/shooters_divisions_v2?eventId=${event_id}&email=${userEmail}`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                if(json!==null&&json.length!==null&json.length>0){
                    alert(`Atirador encontrado ${json[0].name}`);
                    document.getElementById('modalName').value= json[0].name;

                }else{
                    alert(`Aturador não encontrado.`);
                }

            })
            .catch(err => console.log(`Error getting shooter from email: ${err}`))
            .finally(()=> applySpinners(false));
}

function timeTrack(idShooter, nameShooter, gunShooter, bestScore,idShooterDivision ){
    const selectedDivision= selectDivision= document.getElementById('selectDivision').value;

     
    document.getElementById('timeRecordTime').value= '';
    document.getElementById('timeRecordPenalty').value= '';
    
    document.getElementById('timeRecordShooterId').value= idShooter;
    document.getElementById('timeRecordDivision').value= selectedDivision;
    document.getElementById('timeRecordShooterDivision').value= idShooterDivision;

    document.getElementById('offcanvasRightLabel').innerText= 'Tempos de '+nameShooter;
    document.getElementById('timeShooterName').innerText= nameShooter;
    document.getElementById('timeShooterGun').innerText= gunShooter;
    document.getElementById('timeBestScore').innerText= bestScore;    

    document.getElementById('timeDivision').innerText= getDivision(eventConfig.divisions, selectedDivision).name;    


    buildTimeTable(idShooter,selectedDivision, idShooterDivision);

}

function addTimeRecord(){

    let idShooter= document.getElementById('timeRecordShooterId').value;
    let idDivision= document.getElementById('timeRecordDivision').value;
    let idShooterDivision= document.getElementById('timeRecordShooterDivision').value;
    let vTime= Number(document.getElementById('timeRecordTime').value);
    
    document.getElementById('timeRecordTime').value="";
    let vPenalties= Number(document.getElementById('timeRecordPenalty').value);
    document.getElementById('timeRecordPenalty').value="";
    if(vPenalties===null || vPenalties==='') vPenalties=0
    let vScore= Math.round(((vTime + vPenalties) + Number.EPSILON) * 100) / 100;


    
    let newRecord={'shooterId':idShooter,'divisionId':idDivision, 'eventId':eventConfig._id ,'sTime': vTime,'penalties': vPenalties, 'shooterDivisionId':idShooterDivision};

    applySpinners(true);
    fetch('/.netlify/functions/time-records', {
        method: "POST",
        body: JSON.stringify(newRecord),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
            modalChanged=true;
            let bestScore= document.getElementById('timeBestScore').innerText;

            console.log(`document.getElementById('timeBestScore').innerText; ${bestScore}`);

            if(bestScore=='NA' || Number(bestScore) >vScore){
                document.getElementById('timeBestScore').innerText=vScore;
                console.log(`Apply new score ${vScore}`);
            }else console.log(`Not applied new score ${vScore}`);
            
            buildTimeTable(idShooter,idDivision, idShooterDivision);
            console.log(json);
        })
        // .then({
        
        //     fetch("http://localhost:8888/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
        //     .then(r=>r.json())
        //     .then(data => {
        //         playersArray=data;
        //         buildPlayersTables(transformRegistrer(playersArray), eventConfig, idDivision);
        //     })
        // })
        .catch(err => console.log(err))
        .finally(()=> applySpinners(false));

    //timeRecords.push(newRecord);

    
    
    //document.getElementById('timeBestScore').innerText= getBestScoreAndTries(idShooter, idDivision)[0]>=999?'NA':getBestScoreAndTries(idShooter, idDivision)[0];
                
}

const zeroPad = (num, places) => String(num).padStart(places, '0');

function buildTimeTable(idShooter,idDivision,idShooterDivision){
    
    document.getElementById('timeTable').innerHTML="";
    
    applySpinners(true);
    fetch(`/.netlify/functions/time-records?eventID=${eventConfig.id}&shooterId=${idShooter}&divisionId=${idDivision}&shooterDivisionId=${idShooterDivision}`)
        .then(r=>r.json())
        .then(records=>{

            let row='';

            let ord=1;
            let dt; 
            for(let i=0; i< records.length ; i++){
                
                console.log(`records[i].datetime= ${records[i].datetime}`);

                dt= new Date(records[i].datetime.toString());
                console.log(`dt ${dt}`);
                
                row+= `<tr>
                    <th scope="row">${ord++}</th>
                    <td>${dt.getHours()}:${zeroPad(dt.getMinutes(), 2)}</td>
                    <td class="text-end">${records[i].sTime}</td>
                    <td class="text-end">${records[i].penalties}</td>
                    <td><button onClick="deleteTime('${records[i]._id}', '${idShooter}', '${idDivision}', '${idShooterDivision}')" type="button" class="btn btn-danger btn-circle btn-xl" value="-">-</button>
                    </td>
                </tr>`;
                
                document.getElementById('timeTable').innerHTML=row;
            }

        } )
        .catch(err => console.log(`Error building time: ${err}`))
        .finally(()=> applySpinners(false));
    
    
}

function getBestScoreAndTries(idShooter, idDivision){
    let scoreAux;
    let score =999;
    let tries= 0;
    for(i=0;i<timeRecords.length;i++){
        if(timeRecords[i].shooterId==idShooter && timeRecords[i].division== idDivision){
            tries++;
            scoreAux= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 100) / 100
            if(scoreAux <score)
                score= scoreAux;
        }
    }
    return [score, tries];

}

function deleteTime(idTimeRecord, idShooter, idDivision, idShooterDivision){

    console.log(`idTimeRecord= ${idTimeRecord}`);

    if(idTimeRecord===null ||idTimeRecord==''){
        return 0;
    }else if(confirm('Tem certeza que deseja remover essa passagem?')) {

        applySpinners(true);
        fetch(`/.netlify/functions/time-records?timeRecordId=${idTimeRecord}`, {
            method: "DELETE",
            // body: JSON.stringify(newRecord),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            // .then(response => response.json()) 
            .then(r => {
                modalChanged=true;
                document.getElementById('timeBestScore').innerText='';
        
                buildTimeTable(idShooter,idDivision, idShooterDivision);
                console.log(r);
            })
            .catch(err => console.log(`Error deleting time: ${err}`))
            .finally(()=> applySpinners(false));
    }


}

function scoreCal(){

    for(let i=0;i<timeRecords.length;i++){

        
        timeRecords[i].score= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 100) / 100
    }

    timeRecords= timeRecords.sort((a, b) => {
        if (a.score < b.score) {
          return -1;
        }
      });


    for(let i=0;i<playersArray.length;i++){

        
        for(let j=0; j < playersArray[i].registered.length;j++){

            playersArray[i].registered[j].score=999;
            playersArray[i].registered[j].tries=0;

            for(k=0;k<timeRecords.length;k++){

                if(playersArray[i].id==timeRecords[k].shooterId && playersArray[i].registered[j].division ==timeRecords[k].division){
                    playersArray[i].registered[j].tries++;
                    if(timeRecords[k].score<playersArray[i].registered[j].score){
                        playersArray[i].registered[j].score=timeRecords[k].score;
                    }
                }

            }

        }        
    }

}

function applySpinners(onoff){

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        btn.disabled=onoff;
        document.getElementById('selectDivision').disabled=onoff;

        if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-danger")
            ||btn.getAttribute('class').includes("btn-secondary")
            ||btn.getAttribute('class').includes("btn-success")
            ||btn.getAttribute('class').includes("btn-primary"))) {

            if(onoff)
                btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
            else
                btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
        }

        spans= btn.querySelectorAll("span");
        [].forEach.call(spans,span=>{
            if(span.getAttribute('class').includes("spinner")){
                if(onoff)
                    span.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    span.style.visibility = 'hidden'//'visible'; //'hidden'
                }
            }
        );
    });
    
}

function disableInputs(){
    onoff=false;

    const user= netlifyIdentity.currentUser();
    let isAdmin= (user&&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    if(eventConfig===undefined||user===null||(!isAdmin&&(eventConfig.owners.indexOf(user.email)<0))){
        onoff= true;
    }

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        
        if(
        (["btn-close","btn-secondary","btn btn-secondary"].indexOf(btn.getAttribute('class'))<0)&&
        (["nav-link text-small","nav-link text-small active"].indexOf(btn.getAttribute('class'))<0)&&
        (["light","dark","auto"].indexOf(btn.getAttribute('data-bs-theme-value'))<0)&&
        (["bdNavbar"].indexOf(btn.getAttribute('aria-controls'))<0)&&
        (["Close"].indexOf(btn.getAttribute('aria-label'))<0)&&

        (["bt_clock","bt_matches","loginAvatar","bt_share", "bd-theme"].indexOf(btn.getAttribute('id')))<0){
            btn.disabled=onoff;
        }
        //document.getElementById('selectDivision').disabled=onoff;

    });

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        btn.disabled=onoff;        
        });
}

function updateShootersList(){
    // fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
    fetch("/.netlify/functions/shooters_divisions_v2?eventId="+event_id)
            .then(r=>r.json())
            .then(data=>{
                spinner.style.visibility = 'visible'//'visible'; //'hidden'
                playersArray= data;
                
                changeDivision(document.getElementById("selectDivision"));
                spinner.style.visibility = 'hidden'//'visible'; //'hidden'
                console.log(`Changed canvas done`);
            });
}

$("#offcanvasRight").on("hide.bs.offcanvas", function () {
   
        if(modalChanged){
            updateShootersList();
            modalChanged=false; 
        }   
});

$("#exampleModal").on("hide.bs.modal", function () {
   
    if(modalChanged){
        updateShootersList();
        modalChanged=false; 
    }   
});
