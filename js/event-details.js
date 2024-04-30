const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const event_id = params.event_id;
//6578ad76e53c8b23971032c4

let loggedUser;   
let eventConfig;
let shooterDivisions;

function hrefQualify(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}

 netlifyIdentity.on('logout', () => {
    window.location.href = window.location="/index.html";
});

netlifyIdentity.on('close', () => {

    if(!netlifyIdentity.currentUser()){
     
        if(confirm('Voce precisa estar logado para participar desse evento. Fazer cadastro ou login agora?')) {
            netlifyIdentity.open('signup');
        }else{buildDivisions
            window.location.href = window.location="/index.html";
        }
    }
});

$(function() {
    $("#subscribe-email").change(function() {
        if(this.value===""){
            this.value= this.placeholder;
        }

        if(!this.checkValidity()){
            alert('Por favor, informe um email válido.');
            this.focus();
        }else{
            // alert('Vai submeter busca de shooter');
            buildShooterDivision(eventConfig, this.value);
        }
  
    });
});

// $('input[type="checkbox"]').each(function(i,el){
//     $(el).html('changes');
//     alert(this.id);
// });
// $(function() {
//     $('input[type="checkbox"]').change(function(){
    
//     alert(this.id);
//     })
// });

function changeSub(id, idx, elem){

    if(!eventConfig.clock || !eventConfig.duel){
        document.getElementById("subscribe-check-clock-"+id).checked= eventConfig.clock;
        document.getElementById("subscribe-check-duel-"+id).checked= eventConfig.duel;
        if(!eventConfig.duel){
            document.getElementById("subscribe-check-duel-"+id).style='background-color:';
        }
    }

    if (!document.getElementById("subscribe-check-clock-"+id).checked &&
        !document.getElementById("subscribe-check-duel-"+id).checked){
            if(elem.id==="subscribe-check-clock-"+id){
                document.getElementById("subscribe-check-duel-"+id).checked= true;
                document.getElementById("subscribe-check-duel-"+id).style='background-color:goldenrod';
            }else{
                document.getElementById("subscribe-check-clock-"+id).checked= true;
            }
        }

    if(elem.id.indexOf("subscribe-check-duel")>-1){
        if(elem.checked) elem.style='background-color:goldenrod'; else elem.style='background-color:';
    }

    if(elem.id.indexOf("subscribe-optic")>-1){
        if(elem.checked) elem.style='background-color:red'; else elem.style='background-color:';
    }

    // if(elem.id.indexOf("subscribe-gun-")>-1){

    //     if(duplicatedGun(elem.value)){

    //     }

    // }

    shooterDivisions.shooters_divisions[idx].gun= document.getElementById("subscribe-gun-"+id).value;
    shooterDivisions.shooters_divisions[idx].optics= document.getElementById("subscribe-optic-"+id).checked;
    shooterDivisions.shooters_divisions[idx].clock= document.getElementById("subscribe-check-clock-"+id).checked;
    shooterDivisions.shooters_divisions[idx].duel= document.getElementById("subscribe-check-duel-"+id).checked;

    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(shooterDivisions.shooters_divisions[idx]);

    subscribe(uptShooterDiv);


}

function deleteSub(id){
    alert(`id= ${id} `);
}

function buildShooterDivision(eventConfig, userEmail){

    applySpinners(true);
    fetch(`/.netlify/functions/shooters_divisions_v2?eventId=${eventConfig.eventId}&email=${userEmail}`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                if(json!==null&&json.length!==null&json.length>0){
                    shooterDivisions= json[0];
                    buildSubscriptionModal(eventConfig, shooterDivisions);
                    buildSubscriptionModalTable(eventConfig, shooterDivisions)

                }else{
                    alert(`Atirador não encontrado.`);
                }

            })
            .catch(err => console.log(`Error getting shooter from email: ${err}`))
            .finally(()=> applySpinners(false));
}


function buildDivisions(eventDivisions){
    const selectDivisions= document.getElementById('select-subscribe-division');
    while (selectDivisions.options.length > 0)
        selectDivisions.remove(0);

    let newOption = new Option('','');
    selectDivisions.add(newOption,undefined);
    
    for(i=0;i<eventDivisions.divisions.length;i++){
        newOption = new Option(eventDivisions.divisions[i].name,eventDivisions.divisions[i]._id);
        selectDivisions.add(newOption,undefined);
    }
}

function buildSubscriptionModal(eventConfig, shooterDivisions){
    document.getElementById('subscribe-shooterId').value= shooterDivisions.shooterId;
    document.getElementById('subscribe-email').value= shooterDivisions.email;
    document.getElementById('subscribe-email').placeholder= loggedUser.email;
    
    document.getElementById('subscribe-name').value= shooterDivisions.name;

    if(shooterDivisions.email!==loggedUser.email){

        if(shooterDivisions.name!==""){
            document.getElementById('subscribe-name').disabled=true;
        }

        document.getElementById('input-shooter-img').disabled=true;

    }else{
        document.getElementById('subscribe-name').disabled=false;
        document.getElementById('input-shooter-img').disabled=true;
    }

    document.getElementById('shooter-img').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_131,w_88/d_defaults:generic_avatar.jpg/profile/"+shooterDivisions.shooterId;

    buildDivisions(eventConfig); 
    // 'select-subscribe-division'
    // subscribe-gun

    document.getElementById('subscribe-check-clock').disabled= !eventConfig.clock;
    document.getElementById('subscribe-check-clock').checked= eventConfig.clock;

    document.getElementById('subscribe-check-duel').disabled= !eventConfig.duel;
    document.getElementById('subscribe-check-duel').checked= eventConfig.duel;

    if(!eventConfig.duel){
        document.getElementById('subscribe-check-duel').style= 'background-color:';
    }

    if(!eventConfig.clock||!eventConfig.duel){
        document.getElementById('subscribe-check-clock').disabled= true;
        document.getElementById('subscribe-check-duel').disabled= true;
    }
}

function getChecked(b, color){
    if(b) 
        return ` checked style="background-color:${color}" `;
     else return ' style="background-color:" ';
}

function buildSubscriptionModalTable(eventConfig, shooterDivisions){

    let row='';

    for(let i=0;i<shooterDivisions.shooters_divisions.length;i++){
        row+=
        `<tr>
        <td class="text-start d-none d-sm-table-cell">
        <img class="img-fluid rounded-circle mx-auto mx-lg-0 h-100 col-8 col-sm-6 col-md-4 col-lg-2 my-auto" style="margin-bottom: 1px !important;" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${shooterDivisions.shooterId}"  alt="..." />
        </td>
        <td class="text-start d-none d-sm-table-cell">
            <small>${shooterDivisions.name}</small>
        </td>
        <td class="text-start">
            <small>${getDivisionName(shooterDivisions.shooters_divisions[i].divisionId)}</small>
        </td>
        <td class="text-start">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="subscribe-check-clock-${shooterDivisions.shooters_divisions[i]._id}" ${getChecked(shooterDivisions.shooters_divisions[i].clock, '')} onChange="changeSub('${shooterDivisions.shooters_divisions[i]._id}', ${i}, this)" >
            <label class="form-check-label" for="subscribe-check-clock-0"><small class="text-muted">Relógio</small></label>
        </div>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="subscribe-check-duel-${shooterDivisions.shooters_divisions[i]._id}" ${getChecked(shooterDivisions.shooters_divisions[i].duel  , 'goldenrod')};" onChange="changeSub('${shooterDivisions.shooters_divisions[i]._id}', ${i}, this)" > 
            <label class="form-check-label" for="subscribe-check-duel-0"><small class="text-muted">Duelo</small></label>
        </div>
        </td>
        <td class="text-end">
            <input type="text" class="form-control form-control-sm" id="subscribe-gun-${shooterDivisions.shooters_divisions[i]._id}" value="${shooterDivisions.shooters_divisions[i].gun}" onChange="changeSub('${shooterDivisions.shooters_divisions[i]._id}', ${i}, this)"> 
        </td>
        <td>
        <div class="form-check"> <!--form-switch--> <!--role="switch" -->
            <input class="form-check-input" type="checkbox" id="subscribe-optic-${shooterDivisions.shooters_divisions[i]._id}" value="" aria-label="..." ${getChecked(shooterDivisions.shooters_divisions[i].optics, 'red')} onChange="changeSub('${shooterDivisions.shooters_divisions[i]._id}', ${i}, this)" >
        </div>
        </td>
        <td class="text-end"><button onClick="deleteSub('${shooterDivisions.shooters_divisions[i]._id}',${i})" class="btn btn-sm btn-danger rounded-circle" value="${shooterDivisions.shooters_divisions[i]._id}">-</button></td>
        </tr>`;
    }

    document.getElementById('subscribe-table').innerHTML=row;

}

function subscribeNew(){

    let nShooters_divisions= {};
    
    nShooters_divisions._id="";
    nShooters_divisions.shooterId=shooterDivisions.shooterId;
    nShooters_divisions.divisionId= document.getElementById("select-subscribe-division").value;
    nShooters_divisions.eventId=eventConfig._id;
    nShooters_divisions.gun= document.getElementById("subscribe-gun").value;
    nShooters_divisions.optics= document.getElementById("subscribe-check-clock").checked;
    nShooters_divisions.clock= document.getElementById("subscribe-check-clock").checked;
    nShooters_divisions.duel= document.getElementById("subscribe-optic").checked;

    shooterDivisions.name= document.getElementById("subscribe-name").value;
    // shooterDivisions.category= 

    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(nShooters_divisions);

    document.getElementById("select-subscribe-division").value="";
    document.getElementById("subscribe-gun").value="";

    subscribe(uptShooterDiv);

    buildShooterDivision(eventConfig, shooterDivisions.email);

}

function subscribe(sD){

    applySpinners(true);
    fetch('/.netlify/functions/shooters_divisions_v2?eventId='+eventConfig._id, {
        method: "PUT",
        body: JSON.stringify(sD),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
           ,"Authorization":`Bearer ${loggedUser.token.access_token}`
        }
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(JSON.stringify(json, null, 2));
            // alert(`Inscrição realizada/atualizada com sucesso!`);
            // location.reload(true);
        })
        .catch(err => console.log(`Error subscribing, error: ${err.toString()}`))
        .finally(()=> applySpinners(false));
}

function checkClock(checkClock,checkDuel){

    if(!checkClock.checked){
        checkDuel.checked=true;
        checkDuel.style='background-color:goldenrod';
    }
}

function checkDuel(checkClock,checkDuel){

    if(!checkDuel.checked){
        checkClock.checked=true;
        checkDuel.style='background-color:';
    }else{
        checkDuel.style='background-color:goldenrod';
    }

}

function getDivisionName(divisionId){

    for(let i=0; i<eventConfig.divisions.length; i++){
        if(eventConfig.divisions[i]._id===divisionId)
            return eventConfig.divisions[i].name;
    }
    return divisionId;
}

window.onload = async () => {

    if(!netlifyIdentity.currentUser()){
        netlifyIdentity.open('login');
    }

}

netlifyIdentity.on('login', user => {
//     location.reload(true);
// });

    if(!netlifyIdentity.currentUser()){
        netlifyIdentity.open('login');
    }
    
    loggedUser= netlifyIdentity.currentUser();
    
    applySpinners(true);
    if(event_id!==null&&event_id!==undefined&&event_id!==0 && event_id!=='0'){
        
        console.log(`event_id= ${event_id}`);
        // promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId="+event_id)
        fetch("/.netlify/functions/events?event_id="+event_id, {
            method: "GET",
            // body: JSON.stringify(eventConfig),
            headers: {
               "Content-type": "application/json; charset=UTF-8"
              ,"Authorization":`Bearer ${user.token.access_token}`
            }
            })
            .then(r=>r.json())
            .then(data => {
                if(data.length>0){
                    let isAdmin= (user&&user.app_metadata.roles!==undefined &&!(user.app_metadata.roles.indexOf("admin")<0));
                    if(isAdmin||(eventConfig.owners.indexOf(user.email)>-1)){
                        document.getElementById('subscribe-email').disabled=false;
                        document.getElementById('subscribe-name').disabled=false;
                    }
                    eventConfig=data[0];
                    buildPage(eventConfig);
                    buildShooterDivision(eventConfig, user.email /*'lucca@tpm.com'*/);
                    // buildDivisionTable(eventConfig);
                }else{
                    event_id=null;
                }
            }).catch(err => {console.log(`Error loading event_id ${eventConfig._id}, updating eventConfig: ${err}`);
                            window.location.href = window.location="/index.html";})
            .finally(()=> applySpinners(false));
    }
   
    if(event_id===null||event_id===undefined||event_id===0 || event_id==='0'){
        alert(`Evento não encontrado`);
        window.location.href = window.location="/index.html";
    }

});
    
function buildPage(eventConfig){
    document.getElementById('nav-events').classList.add('active');

    if(eventConfig._id!==null && eventConfig._id!==undefined&& eventConfig._id!==0&& eventConfig._id!=="0"){
        document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate"  href="/event-config.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    }else{
        document.getElementById('eventTitle').innerHTML= `Novo evento`;
    }
    
    document.getElementById('event-name').innerHTML= eventConfig.name;
    document.getElementById('masthead-event-name').innerHTML= eventConfig.name;


    if(eventConfig.dateDuel===null||eventConfig.dateDuel===undefined||eventConfig.dateDuel===''){
        eventConfig.dateDuel=eventConfig.date;
    }

    var utc = new Date();
    var offset = utc.getTimezoneOffset();
    
    eventConfig.date= new Date((new Date(eventConfig.date)).getTime() - (offset * 60000) );
    eventConfig.hour= eventConfig.date.toISOString().substring(11,16);
    eventConfig.dateDuel= new Date((new Date(eventConfig.dateDuel)).getTime() - (offset * 60000) );
    eventConfig.hourDuel= eventConfig.dateDuel.toISOString().substring(11,16);
    
    if(eventConfig.dateDuel.toISOString().substring(0,10)!==eventConfig.date.toISOString().substring(0,10)){
        document.getElementById('event-date').innerHTML= `${eventConfig.date.toLocaleDateString().substring(0,5)} as ${eventConfig.hour}h (contra o relógio)`;
        document.getElementById('event-date-duel').innerHTML= `${eventConfig.dateDuel.toLocaleDateString().substring(0,5)} as ${eventConfig.hourDuel}h (duelos)`;
    }else{
        document.getElementById('event-date').innerHTML= `${eventConfig.date.toLocaleDateString().substring(0,5)} as ${eventConfig.hour}h`;
        document.getElementById('event-date-duel').innerHTML= "";
        document.getElementById('event-date-duel').style.display='none';
    }

    document.getElementById('event-divisions-summary').innerHTML= eventConfig.divisionsSummary;

    document.getElementById('event-local').innerHTML= eventConfig.address + " "+ eventConfig.city + "/"+ eventConfig.state;
    
    document.getElementById('event-bg-img').style.backgroundImage="url('https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_450,w_600/d_defaults:header-bg.jpg/"+eventConfig._id+"')" ;
    
    document.getElementById('event-public').checked= eventConfig.public;

    if(eventConfig.owners!==undefined)
        document.getElementById('event-owners').value= eventConfig.owners.join("; ");

        // popping up modal
}

function updateEventConfig(){

    loggedUser= netlifyIdentity.currentUser();
    if(!loggedUser){
        return 0;
    }

    eventConfig.name= document.getElementById('event-name').value;    
    eventConfig.date= new Date(document.getElementById('event-date').value);
    eventConfig.dateDuel= new Date(document.getElementById('event-date-duel').value);
    eventConfig.local= document.getElementById('event-local').value;
    eventConfig.note= document.getElementById('event-note').value;
    // eventConfig.img= document.getElementById('event-img').value;
    eventConfig.owners= document.getElementById('event-owners').value.toLowerCase().replace(/\s/g, '').split(";");

    eventConfig.address= document.getElementById('event-address').value;
    eventConfig.city= document.getElementById('event-city').value;
    eventConfig.state= document.getElementById('event-state').value;
    eventConfig.public= document.getElementById('event-public').checked;

    if(eventConfig.name.replace(/\s/g, '')===''||eventConfig.date===''||eventConfig.divisions.length<1){
        alert('Informe o nome, data e divisão do evento!')
        return 0;
    }

    for(let i=0; i<eventConfig.divisions.length;i++){
        if(eventConfig.divisions[i].delete===undefined ||!eventConfig.divisions[i].delete){
            eventConfig.divisions[i].name= document.getElementById(eventConfig.divisions[i]._id+'DivisionName').value;
            
            eventConfig.divisions[i].categories.ladies= document.getElementById(eventConfig.divisions[i]._id+'Check'+cLadies).checked;
            eventConfig.divisions[i].categories.seniors= document.getElementById(eventConfig.divisions[i]._id+'Check'+cSeniors).checked;
            eventConfig.divisions[i].categories.optics= document.getElementById(eventConfig.divisions[i]._id+'Check'+cOptics).checked;
            eventConfig.divisions[i].categories.advance= document.getElementById(eventConfig.divisions[i]._id+'Check'+cAdvance).checked;
            
            if(""+document.getElementById(eventConfig.divisions[i]._id+'SelectAdvance').value==="1"){
                eventConfig.divisions[i].advanceLimit.passingScore= document.getElementById(eventConfig.divisions[i]._id+'IndexAdvance').value;
                eventConfig.divisions[i].advanceLimit.topBestOf= -1;
            }else{
                eventConfig.divisions[i].advanceLimit.passingScore= -1;
                eventConfig.divisions[i].advanceLimit.topBestOf= document.getElementById(eventConfig.divisions[i]._id+'IndexAdvance').value;
            }
        }

    }
    // buildDivisionTable(eventConfig);

    applySpinners(true);
            fetch('/.netlify/functions/eventconfig?eventId='+eventConfig._id, {
                    method: "PATCH",
                    body: JSON.stringify(eventConfig),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                       ,"Authorization":`Bearer ${user.token.access_token}`
                    }
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        console.log(`json= ${json}`);
                        console.log(`eventConfig._id= ${eventConfig._id}`);
                        eventConfig._id=json.insertedId;
                        console.log(`[json.upsertedId] eventConfig._id= ${eventConfig._id}`);
                        alert(`Torneio ${eventConfig.name} criado com sucesso!`);
                        window.location.href = window.location.pathname+"?"+"event_id="+eventConfig._id;
                        // location.reload(true);
                    })
                    .catch(err => console.log(`Error adding, updating eventConfig: ${err}`))
                    .finally(()=> applySpinners(false));

}

function buildDivisionTable(eventConfig){
    let row= ``;
    

    let ladiesChk=' ';
    let seniorsChk=' ';
    let opticsChk=' ';
    let advanceChk=' ';
    let advFields= ' ';


    document.getElementById('division-table').innerHTML='';
    
    
    for(let i=0;i<eventConfig.divisions.length;i++ ){
        
        // if(eventConfig.divisions[i].delete===undefined)
        //     eventConfig.divisions[i].delete=false;

        ladiesChk=' ';
        seniorsChk=' ';
        opticsChk=' ';
        advanceChk=' ';
        advFields= "none";

        if(eventConfig.divisions[i].categories.ladies)
            ladiesChk=' checked ';

        if(eventConfig.divisions[i].categories.seniors)
            seniorsChk=' checked ';

        if(eventConfig.divisions[i].categories.optics)
            opticsChk=' checked ';

        if(eventConfig.divisions[i].categories.advance){
            advanceChk=' checked ';
            advFields="";
        }
        
        advanceSelectPassingScore=' ';
        advanceSelectBestOf=' ';

        if(eventConfig.divisions[i].advanceLimit.passingScore>0){
            limit_val=eventConfig.divisions[i].advanceLimit.passingScore;
            advanceSelectPassingScore=' selected ';
        }else{
            limit_val=eventConfig.divisions[i].advanceLimit.topBestOf;
            advanceSelectBestOf=' selected ';
        }

        row=`<tr>
        <!--<td scope="row">${i+1}</td>-->
        <td>
            <input type="text" aria-label="indexAdvance" class="form-control form-control-sm" id="${eventConfig.divisions[i]._id}DivisionName" value="${eventConfig.divisions[i].name}">
<!--            <input type="checkbox" class="btn-check" id="btn-check-outlined_${eventConfig.divisions[i]._id}" autocomplete="off">
            <label class="btn btn-outline-success" for="btn-check-outlined_${eventConfig.divisions[i]._id}">Inscrever-se</label><br>
            <input type="checkbox" class="btn-check" id="btn-check-outlined_2_${eventConfig.divisions[i]._id}" autocomplete="off">
            <label class="btn btn-outline-success" for="btn-check-outlined_2_${eventConfig.divisions[i]._id}">Inscrever-se</label><br>
-->
        </td>
        <td  class="text-start">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" ${ladiesChk} id="${eventConfig.divisions[i]._id}Check${cLadies}">
            <label class="form-check-label" for="flexSwitchCheckDefault">Damas</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" ${seniorsChk} id="${eventConfig.divisions[i]._id}Check${cSeniors}">
            <label class="form-check-label" for="flexSwitchCheckChecked">Seniors</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" ${opticsChk} id="${eventConfig.divisions[i]._id}Check${cOptics}">
            <label class="form-check-label" for="flexSwitchCheckDisabled">Optics</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" ${advanceChk} id="${eventConfig.divisions[i]._id}Check${cAdvance}" value='${eventConfig.divisions[i]._id}' onclick="advanceClick(this)">
            <label class="form-check-label" for="flexSwitchCheckDisabled">Avançado</label>
          </div>
        </td>
        <td>
          <div class="">
            <select class="form-select form-select-sm" aria-label=".form-select-sm example"  style="display:${advFields}" id="${eventConfig.divisions[i]._id}SelectAdvance">
              <option value="1" ${advanceSelectPassingScore}>Tempo menor que:</option>
              <option value="2" ${advanceSelectBestOf}>Atiradores até:</option>
            </select>
            <input type="text" aria-label="indexAdvance" class="form-control form-control-sm" id="${eventConfig.divisions[i]._id}IndexAdvance" style="display:${advFields}" value="${limit_val}">
          </div>
        </td>
        <td class="text-end">
          <button onClick="deleteDivision('${eventConfig.divisions[i]._id}')" type="button" class="btn btn-danger rounded-circle" value="-">-</button>
        </td>
      </tr>`;

      if(!eventConfig.divisions[i].delete){
        document.getElementById('division-table').innerHTML+= row;
      }

    }

}

function addDivision(){
    if(document.getElementById('new-division-name').value.replace(/\s/g, "")!==""){
        eventConfig.divisions.push({"_id":(eventConfig.divisions.length*-1),"eventId":eventConfig._id,"name":document.getElementById('new-division-name').value,"categories":{"overall":true,"ladies":false,"advance":false,"optics":false,"seniors":false},"advanceLimit":{"passingScore":5,"topBestOf":-1},"order":1});
        buildDivisionTable(eventConfig);
    }   
}

function deleteDivision(_idIndex){
    let newDivisionList = [];

    for (let i = 0; i < eventConfig.divisions.length; i++) {
        if (""+eventConfig.divisions[i]._id === _idIndex) {
            eventConfig.divisions[i].delete=true;
        }
    }

    for (let i = 0; i < eventConfig.divisions.length; i++) {
        if (!eventConfig.divisions[i].delete || !(eventConfig.divisions[i]._id <0)) {
            newDivisionList.push(eventConfig.divisions[i]);
        }
    }
    eventConfig.divisions= newDivisionList;
    buildDivisionTable(eventConfig);
}

function applySpinners(onoff){

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        btn.disabled=onoff;

        if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-danger")
            ||btn.getAttribute('class').includes("btn-secondary")
            // ||btn.getAttribute('class').includes("btn-info")
            ||btn.getAttribute('class').includes("btn-primary"))) {

            if(onoff)
                btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
            else
                btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
        }

        spans= btn.querySelectorAll("span");
        [].forEach.call(spans,span=>{
            if(span.getAttribute('class').includes("spinner")){
                if(onoff){
                    
                    span.style.visibility = 'visible'//'visible'; //'hidden'
                }else{
                    
                    span.style.visibility = 'hidden'//'visible'; //'hidden'
                }
            }
            }
                    );
    });

    let _input = document.querySelectorAll('input');
    [].forEach.call(_input,rdo=>{
        rdo.disabled=onoff;
    });
    // let _checkbox = document.querySelectorAll('input[type="checkbox"]');
    // [].forEach.call(_checkbox,rdo=>{
    //     rdo.disabled=onoff;
    // });
}

function disableInputs(onOff){

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        if((["bdNavbar"].indexOf(btn.getAttribute('aria-controls'))<0)&&
            (["Close"].indexOf(btn.getAttribute('aria-label'))<0)&&
            (["bt_clock","bt_matches","loginAvatar","bt_share","btn-check-outlined","btn-check-outlined_2"].indexOf(btn.getAttribute('id'))<0)
            )
             btn.disabled=onOff;        
                    });

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        if(["btn-check","btn-check btn-sm"].indexOf(btn.getAttribute('class'))<0){
            btn.disabled=onOff;
        }   
    });

    let _select = document.querySelectorAll("select");
    [].forEach.call(_select,btn=>{
        btn.disabled=onOff;        
        });

    let _textarea = document.querySelectorAll("textarea");
    [].forEach.call(_textarea,btn=>{
        btn.disabled=onOff;        
        });

}

function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            eventConfig.img= selectedImage.src;
            eventConfig.imgChanged=true;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}