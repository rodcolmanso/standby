// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// const event_id = params.event_id;
//6578ad76e53c8b23971032c4

let loggedUser;   
let eventConfig=null;
let shooterDivisions;

function hrefQualify(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}

//  netlifyIdentity.on('logout', () => {
//     window.location.href = window.location="/index.html";
// });


const subscribeModal = document.getElementById('exampleModal')
const myInput = document.getElementById('myInput')

subscribeModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()

    loggedUser= netlifyIdentity.currentUser();
    if(!loggedUser){
        
        Array.from(document.getElementsByClassName('closeModalBtn')).forEach(function(element){element.click();})

        if(confirm('Voce precisa estar logado para participar desse evento. Fazer cadastro ou login agora?')) {
            netlifyIdentity.open('signup');
        }else{
            //buildDivisions
            // window.location.href = window.location="/index.html";
            document.getElementById("subscrive-close-btn").click();
        }
    }else{

    // if(!netlifyIdentity.currentUser()){
    //     netlifyIdentity.open('login');
    // }else{
        let isAdmin= (loggedUser && loggedUser.app_metadata.roles!==undefined &&!(loggedUser.app_metadata.roles.indexOf("admin")<0));
        if(loggedUser&&(isAdmin||(eventConfig.owners.indexOf(loggedUser.email))>-1)){
            document.getElementById('subscribe-email').disabled=false;
            // document.getElementById('subscribe-name').disabled=false;
        }else{
            document.getElementById('subscribe-email').disabled=true;
        }
        getFullShooterDivision(eventConfig, loggedUser.email );
    }

})


window.onload = async () => {
    
    // loggedUser= netlifyIdentity.currentUser();
    // if(!netlifyIdentity.currentUser()){
    //     netlifyIdentity.open('login');
    // }else{
        loadPage();
    // }
}

async function loadPage(){
    // if(!netlifyIdentity.currentUser()){
     
    //     if(confirm('Voce precisa estar logado para participar desse evento. Fazer cadastro ou login agora?')) {
    //         netlifyIdentity.open('signup');
    //     }else{
    //         //buildDivisions
    //         window.location.href = window.location="/index.html";
    //     }
    // }else{
        loggedUser= netlifyIdentity.currentUser();
        
        applySpinners(true);
        eventConfig = await promiseOfSessionEventConfig(null,loggedUser);
        applySpinners(false);

        if(eventConfig===null){
            alert(`Evento não encontrado`);
            window.location.href = window.location="/index.html";
        }

        buildPage(eventConfig);
        // getFullShooterDivision(eventConfig, loggedUser.email );

    // }
}

netlifyIdentity.on('close', () => {
    loadPage();
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
            getFullShooterDivision(eventConfig, this.value);
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

function updatePicOrName(){

    // nShooters_divisions._id=document.getElementById("subscribe-shooterId").value;;
    shooterDivisions.name= document.getElementById("subscribe-name").value;
    // shooterDivisions.category= 

    if(shooterDivisions.name.trim()!==""){
        let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
        uptShooterDiv.shooters_divisions=[];
        putShooterDivisions(uptShooterDiv);
    }
    
}

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
    shooterDivisions.shooters_divisions[idx].gun= document.getElementById("subscribe-gun-"+id).value;
    shooterDivisions.shooters_divisions[idx].optics= document.getElementById("subscribe-optic-"+id).checked;
    shooterDivisions.shooters_divisions[idx].clock= document.getElementById("subscribe-check-clock-"+id).checked;
    shooterDivisions.shooters_divisions[idx].duel= document.getElementById("subscribe-check-duel-"+id).checked;

    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(shooterDivisions.shooters_divisions[idx]);

    putShooterDivisions(uptShooterDiv);

}

function deleteSub(id, idx){


    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(shooterDivisions.shooters_divisions[idx]);

    if(uptShooterDiv.shooters_divisions[0]._id!==id){
        console.log(`Error deleting inscription. shooter_dicision not match!`);
        return 0;
    }

    if( confirm(`Desinscrever ${shooterDivisions.shooters_divisions[idx].gun} da divisão ${getDivisionName(shooterDivisions.shooters_divisions[idx].divisionId)}?
(tempos registrados anteriormente serão excluídos)`)){
                applySpinners(true);
                fetch('/.netlify/functions/shooters_divisions_v2?eventId='+eventConfig._id, {
                    method: "DELETE",
                    body: JSON.stringify(uptShooterDiv),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                       ,"Authorization":`Bearer ${loggedUser.token.access_token}`
                    }
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        console.log(JSON.stringify(json, null, 2));
                        alert(`Inscrição (${getDivisionName(uptShooterDiv.shooters_divisions[0].divisionId)}/${uptShooterDiv.shooters_divisions[0].gun}) apagada!`);
                        getFullShooterDivision(eventConfig, uptShooterDiv.email);
                    })
                    .catch(err => console.log(`Error subscribing, error: ${err.toString()}`))
                    .finally(()=> applySpinners(false));
            }

}

// buildShooterDivision
function getFullShooterDivision(eventConfig, userEmail){

    applySpinners(true);
    fetch(`/.netlify/functions/shooters_divisions_v2?eventId=${eventConfig._id}&email=${userEmail}`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                if(json!==null&&json.length!==null&json.length>0){
                    shooterDivisions= json[0];
                    // document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/"+shooterDivisions._id;
                    buildSubscriptionModal(eventConfig, shooterDivisions);
                    buildSubscriptionModalTable(eventConfig, shooterDivisions);

                }else{
                    // alert(`Novo atirador.`);
                    shooterDivisions._id="";
                    shooterDivisions.name= "";
                    // document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/nonononono";
                    document.getElementById("subscribe-name").value="";
                    shooterDivisions.email= userEmail.toString().toLowerCase().trim();
                    shooterDivisions.category= 0;
                    shooterDivisions.shooterId= ""
                    shooterDivisions.eventId= eventConfig._id;
                    shooterDivisions.shooters_divisions= [];
                    buildSubscriptionModal(eventConfig, shooterDivisions);
                    buildSubscriptionModalTable(eventConfig, shooterDivisions);
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
    
    const date= new Date();
    let param= date.getMilliseconds()+date.toISOString();
    param= param.replaceAll(":","ü").replaceAll(".","ë").replaceAll("-","ñ");
    // const uri= "https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_131,w_88/profile/"+shooterDivisions.shooterId+"?"+param;
    const uri= "https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,w_88,h_131/profile/"+shooterDivisions.shooterId+"?"+param;
    
    const encoded = encodeURI(uri);
    
    if (shooterDivisions.shooterId!==""){
        document.getElementById('shooter-img').src= encoded;
    } else {
        document.getElementById('shooter-img').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_131,w_88/defaults/generic_avatar.jpg";
    }

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
        // <td class="text-start d-none d-sm-table-cell">
        // <img class="img-fluid rounded-circle mx-auto mx-lg-0 h-100 col-8 col-sm-6 col-md-4 col-lg-2 my-auto" style="margin-bottom: 1px !important;" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/${shooterDivisions.shooterId}?${encodeURI((new Date()).toISOString())}"  alt="..." />
        // </td>
        // <td class="text-start d-none d-sm-table-cell">
        //     <small>${shooterDivisions.name}</small>
        // </td>
        row+=
        `<tr>
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
    
    // nShooters_divisions._id=document.getElementById("subscribe-shooterId").value;;
    nShooters_divisions._id=""; // NEW row!
    nShooters_divisions.shooterId=shooterDivisions.shooterId;
    nShooters_divisions.divisionId= document.getElementById("select-subscribe-division").value;
    nShooters_divisions.eventId=eventConfig._id;
    nShooters_divisions.gun= document.getElementById("subscribe-gun").value;
    nShooters_divisions.optics= document.getElementById("subscribe-optic").checked;
    nShooters_divisions.clock= document.getElementById("subscribe-check-clock").checked;
    nShooters_divisions.duel= document.getElementById("subscribe-check-duel").checked;

    shooterDivisions.name= document.getElementById("subscribe-name").value;
    // shooterDivisions.category= 

    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(nShooters_divisions);

    document.getElementById("select-subscribe-division").value="";
    document.getElementById("subscribe-gun").value="";

    putShooterDivisions(uptShooterDiv);

}

function putShooterDivisions(sD){

    // sD.img=eventConfig.img;
    // sD.imgChanged= eventConfig.imgChanged;

    applySpinners(true);
    fetch('/.netlify/functions/shooters_divisions_v2?eventId='+eventConfig._id, {
        method: "PUT",
        body: JSON.stringify(sD),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
           ,"Authorization":`Bearer ${loggedUser.token.access_token}`
        }
        })
        // .then(response => response.json())
        .then(function(response) {
            console.log(response.status); // Will show you the status

            if (!response.ok) {
                if(response.status===409){
                    alert(`A arma ${sD.shooters_divisions[0].gun} não pode ser inscrita mais de uma vez na divisão ${getDivisionName(sD.shooters_divisions[0].divisionId)}.`);
                }

                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(json => {


            console.log(JSON.stringify(json, null, 2));
            getFullShooterDivision(eventConfig, sD.email);
            // location.reload(true);
        })
        .catch(err => console.log(`Error subscribing, error: ${err.toString()} `))
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

}

function applySpinners(onoff){

    if(onoff){
        document.getElementById("btnInscrever").innerHTML= `<div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>`;
    }else{
        document.getElementById("btnInscrever").innerHTML= `Inscriver <i class="fa-solid fa-angle-down"></i>`;
    }

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        btn.disabled=onoff;
        // document.getElementById('selectDivision').disabled=onoff;

        if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-warning")
            ||btn.getAttribute('class').includes("btn-secondary")
            ||btn.getAttribute('class').includes("btn-success")
            ||btn.getAttribute('class').includes("btn-danger")
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
        });
    });

    let _input = document.querySelectorAll('input');
    [].forEach.call(_input,rdo=>{
        if(rdo.id!=='subscribe-email'){
            rdo.disabled=onoff;
        }
    });
    // let _checkbox = document.querySelectorAll('input[type="checkbox"]');
    // [].forEach.call(_checkbox,rdo=>{
    //     rdo.disabled=onoff;
    // });
}
function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            // eventConfig.img= selectedImage.src;
            shooterDivisions.img= selectedImage.src;
            // eventConfig.imgChanged=true;
            shooterDivisions.imgChanged=true;
            updatePicOrName();
        };

        reader.readAsDataURL(fileInput.files[0]);
        
    }
}