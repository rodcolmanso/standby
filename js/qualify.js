
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

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

const event_id = params.event_id;

// ----------------
document.getElementById('timeRecordTime').addEventListener('input', function(e) {
    var value = e.target.value;
    var numPattern = formattime(value,true);
    e.target.value = numPattern;
    });

    document.getElementById('timeRecordPenalty').addEventListener('input', function(e) {
        var value = e.target.value;
        var numPattern = formatpenal(value,true);
        e.target.value = numPattern;
        e.target.select();
        // e.target.setSelectionRange(0, 99999); // For mobile devices
        });
// ----------------

// const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
const promiseOfEventConfig = (id) => {return fetch("/.netlify/functions/eventconfig?clock_duel=clock&eventId="+id)
    .then(r=>r.json())
    .then(data => {
    return data;
})};

// const promiseOfPlayers = fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
const promiseOfPlayers = (id) => { return fetch("/.netlify/functions/shooters_divisions_v2?clock_duel=clock&eventId="+id)
    .then(r=>r.json())
    .then(data => {
    return data;
})};

function hrefQualify(){
    window.location.href = "/qualify.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value;//->+getActiveCat();
}

function hrefMatches(){
    window.location.href = "/matches.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value;//->+getActiveCat();
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
    const _link = 'https://'+window.location.host+"/qualify.html?event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value;//->+getActiveCat();
     // Copy the text inside the text field
     navigator.clipboard.writeText(_link);
}

function editInscriptions(){
    window.location.href = "/event-details.html?allInscriptions=clock&event_id="+eventConfig._id+"&selected_division="+document.getElementById('selectDivision').value;//->+getActiveCat();
}

async function loadPage(){
    loggedUser= netlifyIdentity.currentUser();
    applySpinners(true);
    eventConfig = await promiseOfSessionEventConfig(null,loggedUser);
    applySpinners(false);

    // document.getElementById('eventTitleSelect').innerHTML=`<h5>Contra o Relógio - <span class="text-small">${eventConfig.name}</span></h5>`;
    document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    applySpinners(false);

    if(eventConfig===null){
        alert(`Evento não encontrado`);
        window.location.href = window.location="/index.html";
    }
}



window.onload = async () => {

    await loadPage();

    document.getElementById('btnAddShooter').style.display='';
    document.getElementById('btnOptDuel').style.display='';
    document.getElementById('nav-qualify').classList.add('active');

    const user= netlifyIdentity.currentUser();
    const _eventConfig= getSessionEventConfig();
    
    let isAdmin= (user&&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    let isEventAdmin=  (user&&user.email&&_eventConfig&&_eventConfig.owners&&_eventConfig.owners.indexOf(user.email)>=0);
    
    if(isAdmin || isEventAdmin){
        document.getElementById('btnRelPassadas').style.display='';
    }else{
        document.getElementById('btnRelPassadas').style.display='none';
    }

    if(_eventConfig.duel)
        document.getElementById('btnOptDuel').style.display='';
    else
        document.getElementById('btnOptDuel').style.display='none';

    applySpinners(true);

    // eventConfig = await promiseOfEventConfig;
    playersArray= await promiseOfPlayers(eventConfig._id);
    applySpinners(false);
    // document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    
    buildDivisions(eventConfig.divisions);
    modalChanged=false;
    
    const selectDivisions= document.getElementById('selectDivision');
    if(params.selected_division!==undefined){
        selectDivisions.value=params.selected_division;
    }

    changeDivision(selectDivision);
    applySpinners(false);
    disableInputs();

    if(params.cat){
        document.getElementById('liOverall').classList.remove('active');
        document.getElementById(params.cat).classList.add('active');
    }

    if(params.rl){
        window.setTimeout( function() {
            window.location.reload();
          }, params.rl*1000);
    }

    // document.getElementById('liOverall').classList.add('active')

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
    //-> buildCategory2(eventConfig, selectDivision.value);
    
    
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
                players[i].registered[j].score=9999;
                players[i].registered[j].tries=0;
                players[i].registered[j].datetime="2099-01-01T00:00:00.000Z";
            }

            score_idx= zeroPad((""+(Math.round(players[i].registered[j].score*1000))),7);
            // "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}
            // score_idx= zeroPad((""+(Math.round(players[i].score*100))),7);

            sort_idx= ''+score_idx+zeroPad(players[i].registered[j].tries,4)+players[i].registered[j].datetime;
            
            
            aRow= {'email':players[i].email,'division':players[i].registered[j].divisionId,'shooter_division':players[i].registered[j].shooterDivisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'shooterIdId':players[i].shooterId,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries,'penalties':players[i].registered[j].penalties, 'sort_idx':sort_idx, 'datetime':players[i].registered[j].datetime };
            
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

function naiveRound(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
}

// let _tbAdvance;
// let _tbOverall;
// let _Ladies;
// let _Optics;
// let _Seniors;
let _tb;
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
    let _time;
    let _penal;
    let sTries;
    let _gbColor;

    if(_tb)
        _tb.destroy();

    document.getElementById('tableLadies').innerHTML='';
    document.getElementById('tableOptics').innerHTML='';
    document.getElementById('tableAdvance').innerHTML='';
    document.getElementById('tableOverall').innerHTML='';
        
        for(let i=0; i< aPlayers.length; i++){
            
            if(aPlayers[i].division == selectDivision){
                //->
                if(1==0&&aPlayers[i].category==cLadies){
                    
                    if(eventConfig.divisions[divisionIndex].categories.ladies){
                        
                        table= document.getElementById('tableLadies');
                        actualLadiesCount++;
                        position= actualLadiesCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(1==0&eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<1000&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
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

                if(1==0&&aPlayers[i].category==cSeniors){
                    if(eventConfig.divisions[divisionIndex].categories.seniors){
                        table= document.getElementById('tableSeniors');
                        actualSeniorsCount++;
                        position= actualSeniorsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(1==0&eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<1000&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
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

                if(1==1||aPlayers[i].category==cOverall){
                    if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++
                        position= actualOpticsCount;//-->
                    }else if(1==0&eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<1000&&aPlayers[i].score<eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
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
                let _timee=0;
                let _penall=0;
                if(aPlayers[i].score===undefined || aPlayers[i].score===null || aPlayers[i].score>9998){ 
                    // aPlayers[i].score='NA';
                    sScore='N/A';
                    _time=sScore;
                    _penal="";
                }else if(aPlayers[i].score===undefined || aPlayers[i].score===null || aPlayers[i].score>999){ 
                    
                    _timee= parseFloat(aPlayers[i].score.toString().slice(1)); 
                    _penall= aPlayers[i].score.toString().slice(0,1);
                    sScore=_timee +" +"+_penall;
                    _penal="+"+aPlayers[i].score.toString().slice(0,1);
                    _time= naiveRound(parseFloat(aPlayers[i].score.toString().slice(1)),2).toFixed(2);
                    

                }else{
                    _timee= aPlayers[i].score;
                    sScore= ''+_timee;
                    _penal="";
                    _time= naiveRound(parseFloat(aPlayers[i].score),2).toFixed(2);
                }

                _time=_time.replaceAll(".",",");

                if(aPlayers[i].tries===undefined||aPlayers[i].tries===null||aPlayers[i].tries<1){  
                    // aPlayers[i].tries=0;
                    sTries=''; 
                    aPlayers[i].tries=0;                   
                }
                sTries=`<span class="text-small">${aPlayers[i].tries.toString()}</span>`;
                

                if(position<2&&aPlayers[i].tries>0)
                    // trophy=`<i class="bi bi-trophy"></i>`;
                _gbColor=`text-bg-purple text-lg-start`;
                else
                    _gbColor=`bg-warning text-dark`;

                _rd= aPlayers[i].optics?`<i class="bi bi-dot" style="color:red !important;"></i>`:"";

                row= `<tr>
                    <td class="align-middle text-small">${zeroPad(position,2)}º</td>
                    <td class="align-middle text-start">
                    <div class="row">
                        <div class="col align-middle align-items-center" style="max-width: 40px !important;">
                        <a href="./shooter.html?id=${aPlayers[i].id}" target="_new">
                            <img src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${aPlayers[i].id}.jpg?${getCodeImg()}" class="small-profile-avatar-pic rounded-circle" alt="...">
                        </a>
                        </div>
                    <!--</td>
                    <td class="align-middle text-start">-->
                    <!--<a href="#" onClick="editShooter('${aPlayers[i].id}')" >-->
                    <!--<a href="./shooter.html?id=${aPlayers[i].id}" target="_new">--> 
                    <div class="col text-truncate">`;

                    if(netlifyIdentity.currentUser()&&netlifyIdentity.currentUser().email&&
                    ((netlifyIdentity.currentUser().app_metadata&&netlifyIdentity.currentUser().app_metadata.roles&&netlifyIdentity.currentUser().app_metadata.roles!==""&&netlifyIdentity.currentUser().app_metadata.roles.indexOf("admin")>=0)
                     || (eventConfig&&eventConfig.owners&&eventConfig.owners!==''&&eventConfig.owners.indexOf(netlifyIdentity.currentUser().email)>=0))){
                        row+= `<a href="#" onClick="goToSubscription('${aPlayers[i].id}')" >
                                ${aPlayers[i].name}
                               </a>
                                <p style="margin-bottom: 0 !important;"><span class="badge rounded-pill text-bg-secondary">${aPlayers[i].gun}</span>${_rd}</p>
                               `
                    }else{
                        row+= `${aPlayers[i].name}<p style="margin-bottom: 0 !important;"><span class="badge rounded-pill text-bg-secondary">${aPlayers[i].gun}</span>${_rd}</p>`
                    }

                    row+= `
                     </td>
                    <!--<td class="align-middle d-none d-sm-table-cell" >${aPlayers[i].gun}</td>-->
                    <td class="align-middle text-start">
                        <span class="badge ${_gbColor}">${_time}
                            <span class="position-absolute translate-middle badge bg-danger rounded-pill">${_penal}</span>
                        </span>
                    </td>
                    <td class="align-middle align-items-center align-items-center">
                      <div class="row">
                        <div class="align-middle col" style="max-width: 10px !important; margin-bottom:0;">
                          ${sTries} <span style="display:none">${aPlayers[i].datetime}</span>
                        </div>
                        <!--</td><td class="align-middle">-->
                        <div class="col">
                         <button onClick="timeTrack('${aPlayers[i].id}', '${aPlayers[i].name}', '${aPlayers[i].gun}', '${sScore}', '${aPlayers[i].shooter_division}', ${_timee}, ${_penall})" class="btn btn-success nodisable" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-stopwatch"></i>
                         </button>
                        </div>
                     </div>
                    </td>
                </tr>`;
                table.innerHTML+= row;
                
            }
        }

        let _ord=0;
        if(netlifyIdentity.currentUser()&&netlifyIdentity.currentUser().email&&
        ((netlifyIdentity.currentUser().app_metadata&&netlifyIdentity.currentUser().app_metadata.roles&&netlifyIdentity.currentUser().app_metadata.roles!==""&&netlifyIdentity.currentUser().app_metadata.roles.indexOf("admin")>=0)
         || (eventConfig&&eventConfig.owners&&eventConfig.owners!==''&&eventConfig.owners.indexOf(netlifyIdentity.currentUser().email)>=0))){
            _ord=3;
         }

         if(table){
            _tb= new DataTable(table.parentNode, 
                { order: [[_ord, 'asc']]
                , paging: false
                ,responsive: false
                ,oLanguage: {sSearch: "Buscar:"}
                }
            );
            _tb.draw(false);
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

    // const triggerEl = document.querySelector('#nav-tab button[data-bs-target="#nav-liOverall"]')
    // bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name


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

    

}


function uuidv4_() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i]._id == divisionID){
            return eventDivisions[i];
        }
    }
}

function goToSubscription(parms){
    if(parms!==undefined && parms!==''){
        parms= '&shooterId='+parms;
    }else parms='';
       window.location="/event-details.html?inscription=clock&selected_division="+document.getElementById('selectDivision').value+parms; //->+getActiveCat();
}

function timeTrack(idShooter, nameShooter, gunShooter, bestScore,idShooterDivision, vlTime, vlPenal ){
    const selectedDivision= selectDivision= document.getElementById('selectDivision').value;

     
    document.getElementById('timeRecordTime').value= '';
    document.getElementById('timeRecordPenalty').value= '';
    
    document.getElementById('timeRecordShooterId').value= idShooter;
    document.getElementById('timeRecordDivision').value= selectedDivision;
    document.getElementById('timeRecordShooterDivision').value= idShooterDivision;

    document.getElementById('offcanvasRightLabel').innerText= 'Tempos de '+nameShooter;
    document.getElementById('timeShooterName').innerText= nameShooter;
    document.getElementById('timeShooterGun').innerText= gunShooter;
    
    if(vlTime===0){
        vlTime='NA';
        vlPenal='';
    }

    if(vlPenal>0){
        vlPenal='+'+vlPenal;
    }else{
        vlPenal='';
    }

    // document.getElementById('timeBestScore').innerText= bestScore;
    document.getElementById('img-time-track').src= `https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${idShooter}.jpg?${getCodeImg()}`
    document.getElementById('timeBestScore').innerText= vlTime;
    document.getElementById('timeBestScorePenal').innerText= vlPenal;

    document.getElementById('timeDivision').innerText= getDivision(eventConfig.divisions, selectedDivision).name;    


    buildTimeTable(idShooter,selectedDivision, idShooterDivision);
    // disableInputs();
    
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
    let vScore= Math.round(((vTime + vPenalties) + Number.EPSILON) * 1000) / 1000;


    
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

            if(bestScore=='NA' || Number(bestScore) >vScore){
                document.getElementById('timeBestScore').innerText=vScore;
               
            }else console.log(`Not applied new score ${vScore}`);
            
            buildTimeTable(idShooter,idDivision, idShooterDivision);
            
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

            let _bestScore=0;
            if(records.length>0){
                _bestScore= records[0].score;
            }

            records= records.sort((a, b) => {
                if (a.datetime < b.datetime) {
                  return -1;
                }
              });

            let row='';

            let ord=1;
            let dt; 
            for(let i=0; i< records.length ; i++){
                

                // <span class="badge bg-info text-dark">${_time}</span>
                //     <span class="badge bg-warning text-dark rounded-pill">${_penal}</span>

                let _sBS='bg-warning text-dark';
                if(_bestScore=== records[i].score)
                    _sBS='text-bg-purple text-lg-start';

                let _penal=""
                if(records[i].penalties>0)
                    _penal="+"+records[i].penalties;

                

                dt= new Date(records[i].datetime.toString());
                
                
                row+= `<tr>
                    <th scope="row">${ord++}</th>
                    <td>${dt.getHours()}:${zeroPad(dt.getMinutes(), 2)}</td>
                    <td class="text-end"><span class="badge ${_sBS}">${records[i].sTime}</span></td>
                    <td class="text-start"><span class="badge bg-danger rounded-pill">${_penal}</span></td>
                    <td><button onClick="deleteTime('${records[i]._id}', '${idShooter}', '${idDivision}', '${idShooterDivision}')" type="button" class="btn btn-danger btn-circle btn-xl hide" value="-">-</button>
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
    let score =9999;
    let tries= 0;
    for(i=0;i<timeRecords.length;i++){
        if(timeRecords[i].shooterId==idShooter && timeRecords[i].division== idDivision){
            tries++;
            // scoreAux= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 1000) / 1000
            scoreAux= timeRecords[i].penalties*1000 + timeRecords[i].sTime;
            if(scoreAux <score)
                score= scoreAux;
        }
    }
    return [score, tries];

}

function deleteTime(idTimeRecord, idShooter, idDivision, idShooterDivision){

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
                
            })
            .catch(err => console.log(`Error deleting time: ${err}`))
            .finally(()=> applySpinners(false));
    }


}

function scoreCal(){

    for(let i=0;i<timeRecords.length;i++){

        
        //timeRecords[i].score= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 100) / 100
        timeRecords[i].score= timeRecords[i].penalties*1000 + timeRecords[i].sTime;
    }

    timeRecords= timeRecords.sort((a, b) => {
        if (a.score < b.score) {
          return -1;
        }
      });


    for(let i=0;i<playersArray.length;i++){

        
        for(let j=0; j < playersArray[i].registered.length;j++){

            playersArray[i].registered[j].score=9999;
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

function updateShootersList(){
    // fetch("/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
    fetch("/.netlify/functions/shooters_divisions_v2?clock_duel=clock&eventId="+eventConfig._id)
            .then(r=>r.json())
            .then(data=>{
                spinner.style.visibility = 'visible'//'visible'; //'hidden'
                playersArray= data;
                
                changeDivision(document.getElementById("selectDivision"));
                spinner.style.visibility = 'hidden'//'visible'; //'hidden'
                
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
