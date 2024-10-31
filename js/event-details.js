// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// const event_id = params.event_id;
//6578ad76e53c8b23971032c4

let loggedUser;
let eventConfig=null;
let shooterDivisions=null;
let allShootersDivisions=null;
let gunsOfShooterDivisions=[];
let _tb= null;

const gunOthers= {
    _id: '66cfb8ee0badeb112d52d3c1'
    ,type: "Outras"
    ,factory: "Outras"
    ,model: "Outras"
    ,caliber: "."
    ,operation: "Outras"
    };

const MODAL_TABLE_SUB_ID= 'subscribe-table';
const MODAL_TABLE_ALL_SUBS_ID= 'subscribe-table-subs';

function hrefQualify(){
    if(eventConfig._id!=0){

        let paramDiv='';
        if(params.selected_division!==undefined){
            paramDiv= '&selected_division='+params.selected_division;
        }

        const _cat= params.cat?"&cat="+params.cat:"";

        const _tbord= params.tbord?"&tbord="+params.tbord:"";
        
        window.location.href = window.location="/qualify.html?event_id="+eventConfig._id+paramDiv+_cat+_tbord;
    }
}

function hrefMatches(){
    if(eventConfig._id!=0){
        let paramDiv='';
        if(params.selected_division!==undefined){
            paramDiv= '&selected_division='+params.selected_division;
        }
        const _cat= params.cat?"&cat="+params.cat:"";
        window.location.href = window.location="/matches.html?event_id="+eventConfig._id+paramDiv+ _cat;

    }
}

//  netlifyIdentity.on('logout', () => {
//     window.location.href = window.location="/index.html";
// });
function enableShooterFields(){
    
    if(loggedUser && document.getElementById('subscribe-email').value===loggedUser.email.toLowerCase().trim()){
        
        document.getElementById('subscribe-gun').classList.add('nodisable');
        document.getElementById('subscribe-gun').disabled=false;

        // document.getElementById('select-subscribe-division').classList.add('nodisable');
        // document.getElementById('select-subscribe-division').disabled=false;

        document.getElementById('subscribe-name').classList.add('nodisable');
        document.getElementById('subscribe-name').disabled=false;

        document.getElementById('subscribe-check-clock').classList.add('nodisable');
        document.getElementById('subscribe-check-clock').disabled=false;

        document.getElementById('subscribe-check-duel').classList.add('nodisable');
        document.getElementById('subscribe-check-duel').disabled=false;

        document.getElementById('subscribe-optic').classList.add('nodisable');
        document.getElementById('subscribe-optic').disabled=false;

        document.getElementById('btn-add').classList.add('nodisable');
        document.getElementById('btn-add').disabled=false;


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
}


const subscribeModal = document.getElementById('exampleModal');
const subscribeModalAll = document.getElementById('subscriptionsModal');
const myInput = document.getElementById('myInput')
let _reload=true;
subscribeModal.addEventListener('hidden.bs.modal', function (event) {
    // loadPage();

    if(_reload&&params.inscription!==undefined && params.inscription==="clock"){
        hrefQualify();
    }else if(_reload&&params.inscription!==undefined && params.inscription==="duel"){
        hrefMatches();
    }else if(_reload&&params.inscription!==undefined && params.inscription==="sublist"){
        document.getElementById(`subscrive-close-btn`).click();
        document.getElementById(`btn-subscriptionsModal`).click();
    }else if(_reload){
        
        // ->>promiseOfSessionEventConfig(params.event_id, netlifyIdentity.currentUser());
        // -->  window.location.href = window.location="/event-details.html?event_id="+eventConfig._id;
        console.log('will refreshed');
        silentRefreshPage();
    }
    
  })

  async function silentRefreshPage(){
    console.log('will refreshed async');
    clearSessionEventConfig();
    _reload=true;
    eventConfig= await promiseOfSessionEventConfig(params.event_id, netlifyIdentity.currentUser());
    buildEventDetailsPage(eventConfig);
    console.log('page refreshed');
    }

subscribeModalAll.addEventListener('hidden.bs.modal', function (event) {
    // shooterDivisions=[];
    // clearSessionEventConfig();
    
    if(params.allInscriptions!==undefined && params.allInscriptions==="clock"){
        hrefQualify();
    }else if(params.allInscriptions!==undefined && params.allInscriptions==="duel"){
        hrefMatches();
    }else if(_reload){
        clearSessionEventConfig();
        // location.reload(true);
        // window.location="/event-details.html?event_id="+eventConfig._id;
        console.log('will refreshed');
        silentRefreshPage();
    }
    
})


subscribeModalAll.addEventListener('shown.bs.modal', () => {
    _reload=true;
    if(allShootersDivisions===null){
        promiseOfGetShootersDivisions(eventConfig._id, null, MODAL_TABLE_ALL_SUBS_ID);
        // promiseOfGetGunList("");
    }else{
        populateSubscriptionModalTable(eventConfig, allShootersDivisions, document.getElementById(MODAL_TABLE_ALL_SUBS_ID));
        // promiseOfGetGunList("");
    }
});


 document.getElementById('subscribe-docnum').addEventListener('input', function(e) {
    var value = e.target.value;
    // var cpfPattern = formatCpf(value,true);
    var cpfPattern = value; 
    if(cpfPattern.length>10)
        cpfPattern= cpfPattern.substring(0,11);
    e.target.value = cpfPattern;
    });

subscribeModal.addEventListener('shown.bs.modal', () => {

    loggedUser= netlifyIdentity.currentUser();

    let _dbUser= getSessionDbUser();
    
    
    if(!loggedUser){
        
        Array.from(document.getElementsByClassName('closeModalBtn')).forEach(function(element){element.click();})

        if(confirm('Você precisa estar logado para participar desse evento. Fazer cadastro ou login agora?')) {
            _reload=false;
            document.getElementById("subscrive-close-btn").click();
            netlifyIdentity.open('signup');
        }else{
            // document.getElementById("subscrive-close-btn").click();
            //--> window.location.href = window.location="/event-details.html?event_id="+eventConfig._id;
        }
    }else{

        if( !eventConfig || eventConfig===null || !eventConfig._id || eventConfig._id===null || !_dbUser || _dbUser===null || !_dbUser.docnum || _dbUser.docnum===null){
            location.reload();
        }

        let isAdmin= (loggedUser && loggedUser.app_metadata.roles!==undefined &&!(loggedUser.app_metadata.roles.indexOf("admin")<0));
        if(loggedUser&&(isAdmin||(eventConfig.owners.indexOf(loggedUser.email.toLowerCase().trim()))>-1)){
            // document.getElementById('subscribe-email').disabled=false;
            document.getElementById('subscribe-docnum').disabled=false;
            document.getElementById('subscribe-name').disabled=false;
            // document.getElementById('select-subscribe-division').disabled=false;
            
            // document.getElementById('subscribe-name').disabled=false;
        }else{
            document.getElementById('subscribe-email').disabled=true;
            document.getElementById('subscribe-docnum').disabled=true;
            // document.getElementById('select-subscribe-division').disabled=true;
        }
        
        if(params.selected_division!==undefined){
            document.getElementById('select-subscribe-division').value= params.selected_division;
            var event = new Event('change');
            document.getElementById('select-subscribe-division').dispatchEvent(event);
        }

        console.log('1');
        
        //-> if(params.docnum&&params.docnum!=='' && validaCPF(params.docnum)){ //editing inscription
        if(params.docnum&&params.docnum!=='' ){ //editing inscription
            //-> document.getElementById('subscribe-docnum').value= formatCpf(params.ducnum,false);
            document.getElementById('subscribe-docnum').value= params.ducnum,false;
            document.getElementById('subscribe-docnum').dispatchEvent(new Event("change"));
        }else if(params.email&&params.email!==''){ //editing inscription
            document.getElementById('subscribe-email').value= params.email.toLowerCase().trim();
            document.getElementById('subscribe-email').dispatchEvent(new Event("change"));
        }else if(params.shooterId&&params.shooterId!==''){ //editing inscription
            document.getElementById('subscribe-shooterId').value= params.shooterId;
            promiseOfGetShootersDivisions(eventConfig._id, params.shooterId, MODAL_TABLE_SUB_ID);
        }else{
            console.log('shooterDivisions.lenght', shooterDivisions?shooterDivisions.length:'null');
            if(shooterDivisions!==null && shooterDivisions.length>0){
                popupSubscriptionModal(shooterDivisions[0]);
            }else if(params.selected_division===undefined){
                // promiseOfGetShootersDivisions(eventConfig._id, loggedUser.email, MODAL_TABLE_SUB_ID);
                _dbUser= getSessionDbUser();

                promiseOfGetShootersDivisions(eventConfig._id, _dbUser.docnum, MODAL_TABLE_SUB_ID);
            }
        }
    }

});

const qrcode = new QRCode("qrcode");
window.onload = async () => {
    // const sUrl= ""+window.location.toString();
    _reload=true;
    await loadPage();

    // if(params.inscription!==undefined && params.inscription==="clock"){
    if(params.inscription!==undefined ){
        document.getElementById(`btn-modal-inscrevase`).click();
    }

    if(params.allInscriptions!==undefined ){
        document.getElementById(`btn-subscriptionsModal`).click();
    }
}


function myFunction() {
    // Get the text field
    var copyText = document.getElementById("eventShortURL");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    // alert("Copied the text: " + copyText.value);
    document.getElementById("btn_copy").innerHTML= `Copiado! <i class="bi bi-clipboard-check-fill"></i>`;
    new Promise(() => {
        window.setTimeout(() => {
            document.getElementById("btn_copy").innerHTML= `Copiar <i class="bi bi-clipboard"></i>`;
        }, 3000);
    });
    // <button class="btn btn-secondary" id="btn_copy" onclick="myFunction()">Copiado! <i class="bi bi-clipboard-check-fill"></i></button>
  }

let gunList=[];
let acervoList=[];
async function loadPage(){
    
        loggedUser= netlifyIdentity.currentUser();
        
        applySpinners(true);
        eventConfig= await promiseOfSessionEventConfig(null,loggedUser);
        let _userDb= getSessionDbUser();
        gunList= await promiseOfGetGunList(_userDb?_userDb._id:null,null, '&hec=no');
        if(_userDb && _userDb._id)
            acervoList= await promiseOfGunCollection(_userDb?_userDb._id:null,loggedUser);
        
        applySpinners(false);
        enableShooterFields();

        if(eventConfig===null){
            alert(`Evento não encontrado`);
            window.location.href = window.location="/index.html";
        }

        buildEventDetailsPage(eventConfig);
        buildDivisions(eventConfig); 
}

netlifyIdentity.on('close', () => {
    loadPage();
});

$(function() {
    // $("#subscribe-email").change(function() {
    $("#subscribe-docnum").focusout(async function() {
        
        if(this.value===""){
            document.getElementById('subscribe-name').value="";
            document.getElementById("search-button-name").style.display="none";
            // document.getElementById("search-button-name").style.visibility="hidden";
            document.getElementById('subscribe-email').value="";
            document.getElementById('subscribe-shooterId').value="";
            document.getElementById('shooter-img').src="none";
            document.getElementById('shooter-img2').src="none";
            acervoList=[];
        }

        // if(!this.checkValidity()){
        if (this.value!=="" && !validaCPF(this.value)) {
            // alert('CPF inválido');
            // document.getElementById('subscribe-name').value="";
            document.getElementById("search-button-name").style.display="none";
            // document.getElementById("search-button-name").style.visibility="hidden";
            document.getElementById('subscribe-email').value="";
            document.getElementById('subscribe-shooterId').value="";
            document.getElementById('shooter-img').src="none";
            document.getElementById('shooter-img2').src="none";
            acervoList=[];

            // this.focus();
        }else if (this.value!=="") {
            // alert('Vai submeter busca de shooter');
            // getFullShooterDivision(eventConfig, this.value);
            document.getElementById('shooter-img').src="none";
            document.getElementById('shooter-img2').src="none";
            document.getElementById("search-button-name").style.display='none';
            // document.getElementById("search-button-name").style.visibility="hidden";
            promiseOfGetShootersDivisions(eventConfig._id, this.value.replace(/\D+/g, ''), MODAL_TABLE_SUB_ID);
            
            
        }
  
    });
});

$(function() {
    $("#subscribe-email").change(function() {
        if(this.value===""){
            this.value= this.placeholder;
        }

        // if(!this.checkValidity()){
        //     alert('Por favor, informe um email válido.');
        //     this.focus();
        // }else{
            // alert('Vai submeter busca de shooter');
            // getFullShooterDivision(eventConfig, this.value);
            promiseOfGetShootersDivisions(eventConfig._id, this.value, MODAL_TABLE_SUB_ID);
        // }
  
    });
});

function updatePicOrName(){

    // nShooters_divisions._id=document.getElementById("subscribe-shooterId").value;;
    document.getElementById("subscribe-name").value= document.getElementById("subscribe-name").value.replaceAll('"','').replaceAll("'","").replaceAll('`','');
    shooterDivisions[0].name= document.getElementById("subscribe-name").value;
    // shooterDivisions.category= 

    if(shooterDivisions[0].name.trim()!==""){
        let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions[0]));
        uptShooterDiv.shooters_divisions=[];
        _reload=true;
        promiseOfPutShootersDivisions(eventConfig._id, uptShooterDiv.email, uptShooterDiv, MODAL_TABLE_SUB_ID);
    }
    
}

function changeSub(id, ldx ,idx, elem, _subs){
    
    if(!eventConfig.clock || !eventConfig.duel){
        document.getElementById("subscribe-check-clock-"+id+_subs).checked= eventConfig.clock;
        document.getElementById("subscribe-check-duel-"+id+_subs).checked= eventConfig.duel;
        if(!eventConfig.duel){
            document.getElementById("subscribe-check-duel-"+id+_subs).style='background-color:';
        }
    }

    if (!document.getElementById("subscribe-check-clock-"+id+_subs).checked &&
        !document.getElementById("subscribe-check-duel-"+id+_subs).checked){
            if(elem.id==="subscribe-check-clock-"+id+_subs){
                document.getElementById("subscribe-check-duel-"+id+_subs).checked= true;
                document.getElementById("subscribe-check-duel-"+id+_subs).style='background-color:goldenrod';
            }else{
                document.getElementById("subscribe-check-clock-"+id+_subs).checked= true;
            }
        }

    if(elem.id.indexOf("subscribe-check-duel")>-1){
        if(elem.checked) elem.style='background-color:goldenrod'; else elem.style='background-color:';
    }

    if(elem.id.indexOf("subscribe-optic")>-1){
        if(elem.checked) elem.style='background-color:red'; else elem.style='background-color:';
    }

    if(document.getElementById("subscribe-gun-"+id+_subs).value!==gunOthers._id){
        document.getElementById("other-subscribe-gun-"+id+_subs).value  = document.getElementById("subscribe-gun-"+id+_subs).options[document.getElementById("subscribe-gun-"+id+_subs).selectedIndex].text;
    }

    if(elem.id.substring(0,14)==="subscribe-gun-"){
        if(elem.value!==gunOthers._id){
            document.getElementById("other-subscribe-gun-"+id+_subs).style.display='none';
        }else{
            document.getElementById("other-subscribe-gun-"+id+_subs).value='';
            document.getElementById("other-subscribe-gun-"+id+_subs).style.display='';
            document.getElementById("other-subscribe-gun-"+id+_subs).focus();
            return 0;
        }
    }

    let _sD=[];
    let _tableId="";
    if(_subs!==null && _subs===""){
        _sD= shooterDivisions;
        _tableId= MODAL_TABLE_SUB_ID;
    }else{
        _sD= allShootersDivisions;
        _tableId= MODAL_TABLE_ALL_SUBS_ID;
    }

    // document.getElementById("subscribe-gun-"+id+_subs).value= document.getElementById("subscribe-gun-"+id+_subs).value.replaceAll('"','').replaceAll("'","").replaceAll('`','');
    if(document.getElementById("subscribe-gun-"+id+_subs).value===gunOthers._id
       && document.getElementById("other-subscribe-gun-"+id+_subs).value === "" ){
        alert('Informe a arma.');
        document.getElementById("other-subscribe-gun-"+id+_subs).focus();
        return 0;
    }
    
    _sD[ldx].shooters_divisions[idx].gun  = document.getElementById("other-subscribe-gun-"+id+_subs).value;
    _sD[ldx].shooters_divisions[idx].gunId= document.getElementById("subscribe-gun-"+id+_subs).value;
    _sD[ldx].shooters_divisions[idx].optics= document.getElementById("subscribe-optic-"+id+_subs).checked;
    _sD[ldx].shooters_divisions[idx].clock= document.getElementById("subscribe-check-clock-"+id+_subs).checked;
    _sD[ldx].shooters_divisions[idx].duel= document.getElementById("subscribe-check-duel-"+id+_subs).checked;

    let uptShooterDiv= JSON.parse(JSON.stringify(_sD[ldx]));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(_sD[ldx].shooters_divisions[idx]);
    _reload=true;
    promiseOfPutShootersDivisions(eventConfig._id, uptShooterDiv.email, uptShooterDiv, _tableId);

}

// function deleteSub(id, ldx, idx){
const promiseOfDeleteSub = (id, ldx, idx, _tableId)=>{

    let _sD=null;
    if(_tableId=== MODAL_TABLE_ALL_SUBS_ID)
        _sD=allShootersDivisions;
    else
        _sD=shooterDivisions;

    let uptShooterDiv= JSON.parse(JSON.stringify(_sD[ldx]));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(_sD[ldx].shooters_divisions[idx]);

    if(uptShooterDiv.shooters_divisions[0]._id!==id){
        console.log(`Error deleting inscription. shooter_dicision not match!`);
        return 0;
    }

    if( confirm(`Desinscrever ${_sD[ldx].shooters_divisions[idx].gun} da divisão ${getDivisionName(_sD[ldx].shooters_divisions[idx].divisionId)}?`)){
                applySpinners(true);
                 fetch('/.netlify/functions/shooters_divisions_v2?eventId='+eventConfig._id, {
                    method: "DELETE",
                    body: JSON.stringify(uptShooterDiv),
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
                                alert(`Não é possível deletar inscrição com tempos registrados. Apague os tempo dessa inscrição e tente novamente.`);
                            }
                            throw new Error("HTTP status " + response.status);
                        }
                        return response.json();
                    })

                    .then(json => {
                        // console.log(JSON.stringify(json, null, 2));

                        _sD[ldx].shooters_divisions.splice(idx,1);

                        populateSubscriptionModalTable(eventConfig, _sD, document.getElementById(_tableId));

                        // alert(`Inscrição (${getDivisionName(uptShooterDiv.shooters_divisions[0].divisionId)}/${uptShooterDiv.shooters_divisions[0].gun}) apagada!`);
                        // getFullShooterDivision(eventConfig, uptShooterDiv.email);
                        // getFullEventShootersDivision(eventConfig);
                    })
                    .catch(err => console.log(`Error subscribing, error: ${err.toString()}`))
                    .finally(()=> {applySpinners(false);enableShooterFields();});
            }
}

const promiseOfGetShootersDivisions = (_eventId, _email, modalId)=>{

    if(_email===null || _email.trim()==="")
      _email="all";

    let filterEmal= '';

    if(!isNaN(Number(_email))){
        filterEmal= `&docnum=${_email}`;
    }else if(_email.indexOf('@')>-1){ //docnum
        filterEmal= `&email=${_email}`;
    }else if(_email!=='all'){
        filterEmal= `&shooterId=${_email}`;
    }else{
        filterEmal= `&email=${_email}`;
    }

    let _header= {"Content-type": "application/json; charset=UTF-8"}
    if(loggedUser && loggedUser.token && loggedUser.token.access_token){
        _header.Authorization= `Bearer ${loggedUser.token.access_token}`;
    }
    
    applySpinners(true);
    fetch(`/.netlify/functions/shooters_divisions_v2?eventId=${_eventId}${filterEmal}`, {
            method: "GET"
            ,headers: _header})
            .then(response => response.json()) 
            .then(async json => {
                if(modalId===MODAL_TABLE_SUB_ID){
                    shooterDivisions= json;
                    if(shooterDivisions!==null && shooterDivisions.length>0){
                        popupSubscriptionModal(shooterDivisions[0]);
                        populateSubscriptionModalTable(eventConfig, shooterDivisions, document.getElementById(MODAL_TABLE_SUB_ID));
                        acervoList= await promiseOfGunCollection(shooterDivisions[0].shooterId,loggedUser);
                        document.getElementById("select-subscribe-division").dispatchEvent(new Event('change'));
                    }else{
                        populateNewShooter(_email);
                    }
                }else{
                    allShootersDivisions= json;
                    populateSubscriptionModalTable(eventConfig, allShootersDivisions, document.getElementById(MODAL_TABLE_ALL_SUBS_ID));
                }

                return json;
            })
            .catch(err => console.log(`Error getting shooter from email: ${err}`))
            .finally(()=> {applySpinners(false);enableShooterFields();});

}

function populateGunDropdown(shooterDivisions, _subs){

    // populateGunDropdown(`subscribe-gun-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}`, shooterDivisions[l].shooters_divisions[i].gun_det[0]._id);
    let dropDown;
    let value;
    let divisionName;
    let newOption = new Option('','');
    if(gunList){

        for(let l=0 ; l<shooterDivisions.length;l++){
            
            for(let i=0 ; i<shooterDivisions[l].shooters_divisions.length;i++){

                dropDown= document.getElementById(`subscribe-gun-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}`);
                value= shooterDivisions[l].shooters_divisions[i].gunId?shooterDivisions[l].shooters_divisions[i].gunId:shooterDivisions[l].shooters_divisions[i].gun_det[0]._id;
                divisionName= getDivisionName(shooterDivisions[l].shooters_divisions[i].divisionId).toLocaleLowerCase().trim();
                newOption = new Option('','');

                if(divisionName==="força livre"){
                    for(let j=0;j<gunList.length;j++){
                        newOption = new Option(gunList[j].alias,gunList[j]._id);
                        if(gunList[j]._id===value)
                            newOption.selected= true;
                        
                        if(gunList[j]._id!==gunOthers._id && divisionName==="força livre"&&(gunList[j].type.toLocaleLowerCase().trim()==="carabina"||gunList[j].type.toLocaleLowerCase().trim()==="espingarda"))
                            dropDown.add(newOption);
                    }
            
                    
                        newOption = new Option("_______________","");
                        dropDown.add(newOption);
                }

                for(let j=0;j<gunList.length;j++){
                    newOption = new Option(gunList[j].alias,gunList[j]._id);
                    
                    if(gunList[j]._id===value)
                        newOption.selected= true;

                    if(gunList[j]._id!==gunOthers._id && ((divisionName==="força livre"&&(gunList[j].type.toLocaleLowerCase().trim()!=="carabina"&&gunList[j].type.toLocaleLowerCase().trim()!=="espingarda")))
                        ||(divisionName!=="força livre"&&divisionName!=="revolver"&&divisionName!=="pistola"&&divisionName!=="armas curtas" )
                        ||divisionName===gunList[j].type.toLocaleLowerCase().trim()
                        ||(divisionName==="armas curtas"
                            &&(gunList[j].type.toLocaleLowerCase().trim()==="revolver"
                               ||gunList[j].type.toLocaleLowerCase().trim()==="pistola" ) )){
                            dropDown.add(newOption);
                    }
                }
                newOption = new Option(gunOthers.model,gunOthers._id);    
                if(gunOthers._id===value)
                    newOption.selected= true;
                dropDown.add(newOption);
                
            }

        }

    }

}

// function getFullShooterDivision(eventConfig, userEmail){
function popupSubscriptionModal(shooterDivisions){

    console.log('popupSubscriptionModal 1');

    document.getElementById('subscribe-shooterId').value= shooterDivisions.shooterId;
    document.getElementById('subscribe-email').value= shooterDivisions.email;
    document.getElementById('subscribe-email').placeholder= loggedUser.email.toLowerCase().trim();
    //-> document.getElementById('subscribe-docnum').value= formatCpf(shooterDivisions.docnum,false);
    document.getElementById('subscribe-docnum').value= shooterDivisions.docnum;

    
    document.getElementById('subscribe-name').value= shooterDivisions.name;
    document.getElementById("search-button-name").style.display="none";
    // document.getElementById("search-button-name").style.visibility="hidden";

    if(shooterDivisions.email.toLowerCase().trim()!==loggedUser.email.toLowerCase().trim()){
        console.log('popupSubscriptionModal 2');
        enableShooterFields();

        //-> if(shooterDivisions.name!==""){
        //->     document.getElementById('subscribe-name').disabled=true;
        //-> }

        // document.getElementById('input-shooter-img').disabled=true;

    }
    // else{
        //-> document.getElementById('subscribe-name').disabled=false;
        // document.getElementById('input-shooter-img').disabled=true;
    // }
    
    const uri= `https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,w_9${getRandomInt(0,5)},h_14${getRandomInt(0,5)}/d_defaults:generic_avatar.jpg/profile/${shooterDivisions.shooterId}.jpg?${uuidv4()}`;
    // const uri= `https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,w_95,h_145/d_defaults:generic_avatar.jpg/profile/${shooterDivisions.shooterId}.jpg?`;
    const uri2= `https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${shooterDivisions.shooterId}.jpg?${uuidv4()}`;
    document.getElementById('shooter-img').src= uri;
    document.getElementById('shooter-img2').src= uri2;
    
    console.log('Before populateSubscriptionModalTable');
    populateSubscriptionModalTable(eventConfig, shooterDivisions,document.getElementById(MODAL_TABLE_SUB_ID));
    // new DataTable('#subscribe-table-subs-head');

}  //popupSubscriptionModal(shooterDivisions){}

function populateNewShooter(_docnum){
    // alert(`Novo atirador.`);
    shooterDivisions=[{}];
    shooterDivisions[0]._id="";
    // shooterDivisions[0].email= _docnum.toString().toLowerCase().trim();
    shooterDivisions[0].email= _docnum.replace(/\D+/g, '').trim()+'@tpmonline.com.br';
    shooterDivisions[0].docnum= _docnum.replace(/\D+/g, '').trim();
    shooterDivisions[0].name= loggedUser.email.toLowerCase().trim()===shooterDivisions[0].email.toLowerCase().trim()?loggedUser.user_metadata.full_name:document.getElementById("subscribe-name").value;//"";
    // document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/nonononono";
    document.getElementById("subscribe-name").value=shooterDivisions[0].name;
    document.getElementById("search-button-name").style.display="none";
    // document.getElementById("search-button-name").style.visibility="hidden";

    document.getElementById("subscribe-email").value=shooterDivisions[0].email;
    //-> document.getElementById("subscribe-docnum").value=formatCpf(shooterDivisions[0].docnum,false);
    document.getElementById("subscribe-docnum").value=shooterDivisions[0].docnum;
    document.getElementById("subscribe-shooterId").value=shooterDivisions[0]._id;

    document.getElementById("subscribe-check-clock").checked= eventConfig.clock;
    document.getElementById("subscribe-check-duel").checked= eventConfig.duel;

    document.getElementById("subscribe-check-clock").disabled= (!eventConfig.clock||!eventConfig.duel);
    document.getElementById("subscribe-check-duel").disabled= (!eventConfig.clock||!eventConfig.duel);

    const uri= `https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,w_85,h_135/defaults/generic_avatar.jpg`;
    const uri2= `https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/defaults/generic_avatar.jpg`;
    document.getElementById('shooter-img').src= uri;
    document.getElementById('shooter-img2').src= uri2;
    

    shooterDivisions[0].category= null;
    shooterDivisions[0].shooterId= ""
    shooterDivisions[0].eventId= eventConfig._id;
    shooterDivisions[0].shooters_divisions= [];
    console.log('will populateSubscriptionModalTable');
    populateSubscriptionModalTable(eventConfig, shooterDivisions,document.getElementById(MODAL_TABLE_SUB_ID));
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

function getChecked(b, color){
    if(b) 
        return ` checked style="background-color:${color}" `;
     else return ' style="background-color:" ';
}

function exitOtherGun(el){
    if(el.value.trim()===''){
        alert('Informe a arma!');
        // el.focus();
        return 0;
    }

}

function populateSubscriptionModalTable(eventConfig, shooterDivisions, tb){

    if(shooterDivisions && !shooterDivisions.length){
        shooterDivisions= [shooterDivisions];
    }

    let row='';
    let _subs="";
    let _disabled="";
    let isAdmin=true;
    
    isAdmin= (loggedUser && loggedUser.app_metadata.roles!==undefined &&!(loggedUser.app_metadata.roles.indexOf("admin")<0));
    isAdmin= (loggedUser&&(isAdmin||(eventConfig.owners.indexOf(loggedUser.email.toLowerCase().trim()))>-1));

    gunsOfShooterDivisions=[];

    for(let l=0;l<shooterDivisions.length;l++){
        for(let i=0;i<shooterDivisions[l].shooters_divisions.length;i++){
            // gunsOfShooterDivisions.push(shooterDivisions[l]._id+shooterDivisions[l].divisionId+shooterDivisions[l].shooters_divisions[i].gun.toLowerCase().replaceAll(" ","").replaceAll(".","").replaceAll("-","").replaceAll("_","").replaceAll(",","").replaceAll(";",""));
            
            if(isAdmin||(loggedUser&&loggedUser.email.toLowerCase().trim()===shooterDivisions[l].email.toLowerCase().trim()))
                nodisableClass='nodisable"';
            else
                nodisableClass='" disabled ';

            row+=`<tr>`;

            let classGunSmall='';
            let classGunLarge='';
            let hiddeGunsmall=`style="display:none"`;
            
            if(tb.id=== MODAL_TABLE_ALL_SUBS_ID){

                classGunSmall='d-xl-none';
                classGunLarge='d-none d-xl-block';
                hiddeGunsmall=`style="display:"`;

                _subs='-subs';
                row+=
                `
                <td class="text-start text-truncate align-middle">
                <div class="input-group align-middle">
                  <div style="margin-right:8px !important;" class="d-none d-sm-block align-middle text-start">
                    <a href="./shooter.html?id=${shooterDivisions[l].shooterId}" target="_new">
                    <img src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${shooterDivisions[l].shooterId}.jpg?" class="small-profile-avatar-pic rounded-circle" alt="...">
                    </a>
                  </div>
                  <div>
                    <a  href="#" onClick="goToSubscription('${shooterDivisions[l].shooterId}')" >
                        <small >${shooterDivisions[l].name}</small>
                    </a>
                  </div>
                </div></td>`
            }

            // testing if neets to show other guns 
            let otherGunDisplay='none';
            if (shooterDivisions[l].shooters_divisions[i].gunId === gunOthers._id){
                otherGunDisplay='';
            }

            row+=
            `<td class="text-start">
                <small>${getDivisionName(shooterDivisions[l].shooters_divisions[i].divisionId)}</small>
            </td>
            `;
            row+=
            `<td class="text-start">
                <div class="form-check form-switch">
                    <input class="form-check-input ${nodisableClass} type="checkbox" role="switch" id="subscribe-check-clock-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}" ${getChecked(shooterDivisions[l].shooters_divisions[i].clock, '')}  onChange="changeSub('${shooterDivisions[l].shooters_divisions[i]._id}', ${l} , ${i}, this,'${_subs}')" >
                    <label class="form-check-label" for="subscribe-check-clock-${shooterDivisions[l].shooters_divisions[i]._id}"><i class="d-xl-none bi bi-stopwatch"></i><small class="d-none d-xl-block text-muted">Contra-Relógio</small></label>
                </div>
            `;
            row+=
            `   <div class="form-check form-switch">
                    <input class="form-check-input ${nodisableClass} type="checkbox" role="switch" id="subscribe-check-duel-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}" ${getChecked(shooterDivisions[l].shooters_divisions[i].duel  , 'goldenrod')};" onChange="changeSub('${shooterDivisions[l].shooters_divisions[i]._id}', ${l}, ${i}, this, '${_subs}')" > 
                    <label class="form-check-label" for="subscribe-check-duel-${shooterDivisions[l].shooters_divisions[i]._id}"><i class="d-xl-none fas fa-holly-berry"></i><small class="d-none d-xl-block text-muted">Duelo</small></label>
                </div>
            </td>
            `;
            row+=
            `<td class="text-start text-truncate">
                <select class="${classGunLarge} form-select form-select-sm ${nodisableClass} id="subscribe-gun-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}" value="${shooterDivisions[l].shooters_divisions[i].gunId?shooterDivisions[l].shooters_divisions[i].gunId:shooterDivisions[l].shooters_divisions[i].gun_det[0]._id}" onChange="changeSub('${shooterDivisions[l].shooters_divisions[i]._id}', ${l}, ${i}, this,'${_subs}')"> 
                </select>
                
                `;
            row+=
            `<div class="${classGunLarge}">
                <input style="display:${otherGunDisplay}" type="text" class="form-control form-control-sm ${nodisableClass} id="other-subscribe-gun-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}" value="${shooterDivisions[l].shooters_divisions[i].gun?shooterDivisions[l].shooters_divisions[i].gun:shooterDivisions[l].shooters_divisions[i].gun_det[0].model}" onChange="changeSub('${shooterDivisions[l].shooters_divisions[i]._id}', ${l}, ${i}, this,'${_subs}')"
                onfocusout="exitOtherGun(this)" > 
            `;
            
            let _shortTextGun= shooterDivisions[l].shooters_divisions[i].gunModel+' ('+shooterDivisions[l].shooters_divisions[i].gunCaliber+')';
            if(shooterDivisions[l].shooters_divisions[i].gunId===gunOthers._id){
                _shortTextGun= shooterDivisions[l].shooters_divisions[i].gun;
            }

            row+=
            `</div>
                <small ${hiddeGunsmall} class="${classGunSmall} text-truncate ">${_shortTextGun}</small>
            </td>
            `;
            row+=
            `<td class="text-start">
                <div class="" class="form-check"> 
                    <input class="form-check-input ${nodisableClass} type="checkbox" id="subscribe-optic-${shooterDivisions[l].shooters_divisions[i]._id}${_subs}" value="" aria-label="..." ${getChecked(shooterDivisions[l].shooters_divisions[i].optics, 'red')} onChange="changeSub('${shooterDivisions[l].shooters_divisions[i]._id}', ${l}, ${i}, this, '${_subs}')">
                </div>
            </td>
            <td class="text-end">`;
            if(isAdmin||(loggedUser&&loggedUser.email.toLowerCase().trim()===shooterDivisions[l].email.toLowerCase().trim())){
                row+=`
                <button onClick="promiseOfDeleteSub('${shooterDivisions[l].shooters_divisions[i]._id}',${l} ,${i},'${tb.id}')" class="btn btn-sm btn-danger rounded-circle ${nodisableClass} value="${shooterDivisions[l].shooters_divisions[i]._id}">-</button> `;
            }
            row+=`</td></tr>`;
            // tb.innerHTML+= row;   
        }
    }

    if(tb.id=== MODAL_TABLE_ALL_SUBS_ID){
        if(_tb!==null){
            _tb.destroy();
            // _tb.empty();
            _tb===null;
        }
    }
    tb.innerHTML= row;
    populateGunDropdown(shooterDivisions, _subs);
    let _ord=[[0, 'asc']];
    if(tb.id=== MODAL_TABLE_ALL_SUBS_ID){
        _tb= new DataTable('#subscribe-table-subs-head', 
            { order: _ord
            , paging: false
            ,responsive: false
            ,oLanguage: {sSearch: "Buscar:"}
            });
        _tb.draw(false);
    
    }

}

function subscribeNew(){

    if(document.getElementById('select-subscribe-gun').value.split('|')[0].trim()==""){

        alert('informe uma arma');
        document.getElementById('select-subscribe-gun').focus();
        return 0
        
    }


    if(!validaCPF(document.getElementById('subscribe-docnum').value)){

        alert('Cpf inválido');
        document.getElementById('subscribe-docnum').focus();
        return 0

    }

    if(document.getElementById("select-subscribe-gun").value.split('|')[0]===gunOthers._id && document.getElementById('subscribe-gun').value===''){
        alert('Informe a arma');
        document.getElementById('subscribe-gun').focus();
        return 0
    }

    document.getElementById("subscribe-gun").value

    let nShooters_divisions= {};
    
    // nShooters_divisions._id=document.getElementById("subscribe-shooterId").value;
    nShooters_divisions._id=""; // NEW row!
    nShooters_divisions.shooterId= shooterDivisions!==undefined&&shooterDivisions[0].shooterId!==undefined&&shooterDivisions[0].shooterId!==null?shooterDivisions[0].shooterId:"";
    nShooters_divisions.divisionId= document.getElementById("select-subscribe-division").value;
    nShooters_divisions.eventId=eventConfig._id;
    document.getElementById("subscribe-gun").value= document.getElementById("subscribe-gun").value.replaceAll('"','').replaceAll("'","").replaceAll('`','');
    nShooters_divisions.gun= document.getElementById("subscribe-gun").value;
    nShooters_divisions.gunId= document.getElementById("select-subscribe-gun").value.split('|')[0];
    nShooters_divisions.gunRegNum= document.getElementById("select-subscribe-gun").value.split('|')[1];
    nShooters_divisions.optics= document.getElementById("subscribe-optic").checked;
    nShooters_divisions.clock= document.getElementById("subscribe-check-clock").checked;
    nShooters_divisions.duel= document.getElementById("subscribe-check-duel").checked;
    nShooters_divisions.docnum= document.getElementById('subscribe-docnum').value
    
    if(!nShooters_divisions.gun){
        nShooters_divisions.gun= document.getElementById("select-subscribe-gun").options[document.getElementById("select-subscribe-gun").selectedIndex].text;
    }

    document.getElementById("subscribe-name").value= document.getElementById("subscribe-name").value.replaceAll('"','').replaceAll("'","").replaceAll('`','');
    shooterDivisions[0].name= document.getElementById("subscribe-name").value;
    document.getElementById("search-button-name").style.display="none";
    // document.getElementById("search-button-name").style.visibility="hidden";

    shooterDivisions[0].category= null;

    let uptShooterDiv= JSON.parse(JSON.stringify(shooterDivisions[0]));
    uptShooterDiv.shooters_divisions=[];
    uptShooterDiv.shooters_divisions.push(nShooters_divisions);

    // document.getElementById("select-subscribe-division").value="";
    document.getElementById("subscribe-gun").value="";
    document.getElementById("select-subscribe-gun").value="|";
    document.getElementById("subscribe-opticN").checked=false;
    document.getElementById("subscribe-optic").checked=false;

    promiseOfPutShootersDivisions(eventConfig._id, uptShooterDiv.email, uptShooterDiv, MODAL_TABLE_SUB_ID);
    _reload=true;

}

// function putShooterDivisions(sD, ){
const promiseOfPutShootersDivisions = (_eventId, _email, sD, modalId)=>{

    sD.eventId=_eventId;
    
    // if(sD.shooters_divisions[0]._id==="" && gunsOfShooterDivisions.find((gun) => gun === sD.shooters_divisions[0]._id+sD.shooters_divisions[0].divisionId+ sD.shooters_divisions[0].gun.toLowerCase().replaceAll(" ","").replaceAll(".","").replaceAll("-","").replaceAll("_","").replaceAll(",","").replaceAll(";","").replaceAll('"','').replaceAll("'","").replaceAll('`',''))!==undefined){
    //     alert(`A arma ${sD.shooters_divisions[0].gun} não pode ser inscrita mais de uma vez na divisão ${getDivisionName(sD.shooters_divisions[0].divisionId)}.`);
    //     return 0;
    // }

    applySpinners(true);
    fetch('/.netlify/functions/shooters_divisions_v2?eventId='+_eventId, {
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
            if(modalId===MODAL_TABLE_ALL_SUBS_ID){
                // document.getElementById(`btn-subscriptionsModal`).click();
                shooterDivisions= null;
                // allShootersDivisions= null;
            }else{
                
                shooterDivisions[0]._id=json._id;
                shooterDivisions[0].email=json.email;
                shooterDivisions[0].docnum=json.docnum;
                shooterDivisions[0].name=json.name;
                shooterDivisions[0].category=json.category;
                shooterDivisions[0].shooterId=json.shooterId;
                
                if(sD.shooters_divisions[0]._id===null || sD.shooters_divisions[0]._id==="")
                    shooterDivisions[0].shooters_divisions.unshift(json.shooters_divisions[0]);
                
                popupSubscriptionModal(shooterDivisions[0]);

                populateSubscriptionModalTable(eventConfig, shooterDivisions,document.getElementById(MODAL_TABLE_SUB_ID));
                allShootersDivisions= null;
            }
            
        })
        .catch(err => console.log(`Error subscribing, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);enableShooterFields();});
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
    
function buildEventDetailsPage(eventConfig){
    document.getElementById('nav-events').classList.add('active');

    if(eventConfig._id!==null && eventConfig._id!==undefined&& eventConfig._id!==0&& eventConfig._id!=="0"){
        document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate text-nowrap"  href="/event-config.html?event_id=${eventConfig._id}"><i class="bi bi-gear-fill"></i><span class="text-decoration-none text-nowrap">${eventConfig.name}</span></a>`;
    }else{
        document.getElementById('eventTitle').innerHTML= `Novo evento`;
    }
    
    document.getElementById('event-name').innerHTML= eventConfig.name;
    document.getElementById('masthead-event-name').innerHTML= eventConfig.name;
    document.getElementById('event-name-subs').innerHTML= eventConfig.name;


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
    
    document.getElementById('event-bg-img').style.backgroundImage="url('https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_450,w_600/d_defaults:header-bg.jpg/"+eventConfig._id+"xxxx')" ;
    
    document.getElementById('event-public').checked= eventConfig.public;

    // let iHtmSubs ='<ul class="list-group">';
    // let iHtmTimes ='<ul class="list-group">';
    let iHtmSubs ='';
    let iHtmTimes ='';

    for(let i=0; i<eventConfig.divisions.length;i++){
        
        let divisionbadge=`<span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden">Você ainda não está aqui</span>
                        </span>`;
        if(shooterDivisions===null||shooterDivisions===undefined||shooterDivisions[0]===undefined){
            divisionbadge="";
        }else{
            for(j=0;j<shooterDivisions[0].shooters_divisions.length;j++){
                if( eventConfig.divisions[i]._id===shooterDivisions[0].shooters_divisions[j].divisionId){
                divisionbadge=`<span class="position-absolute top-0 start-100 translate-middle badge text-bg-success rounded-pill"><i class="fas fa-check"></i>
                            <span class="visually-hidden">Você está aqui</span>
                            </span>`;
                }
            }
        }

        iHtmSubs +=`<p class="text-muted">
                    ${eventConfig.divisions[i].name} 
                    <span class="badge text-bg-info">${eventConfig.divisions[i].subscribers===undefined?"0":eventConfig.divisions[i].subscribers} 
                        ${divisionbadge}
                    </span>
                </p>`;
                // </li>`;
        
        let time= "N/A";
        let penals= "";
        if(eventConfig.divisions[i].best_score!==undefined){

            if(eventConfig.divisions[i].best_score<1000){
                time=eventConfig.divisions[i].best_score.toFixed(2);
                penals="";
            }else{
                penals=" +"+eventConfig.divisions[i].best_score.toString().slice(0,1);
                time=parseFloat(eventConfig.divisions[i].best_score.toString().slice(1)).toFixed(2);
            }
            time= time.replaceAll(".",",")+"s";
        }

        // iHtmTimes +=`<li class="list-group-item d-flex justify-content-between align-items-center">
        iHtmTimes +=`<p class="text-muted">
            ${eventConfig.divisions[i].name} 
            <span class="badge text-bg-purple" >${time}
            <span class="position-absolute top-0 start-100 translate-middle badge text-bg-warning rounded-pill">${penals}</span>
            </span>
            </p>`;
            // </li>`;
    }

    // iHtmSubs +="</ul>";
    // iHtmTimes +="</ul>";

    document.getElementById('display-subscribers').innerHTML=iHtmSubs;
    document.getElementById('display-best-times').innerHTML= iHtmTimes;

    const sUrl = 'https://'+window.location.host+'?'+eventConfig.short_id;
    document.getElementById('eventShortURL').value= sUrl;
    qrcode.makeCode(sUrl);

    if(eventConfig.owners!==undefined)
        document.getElementById('event-owners').value= eventConfig.owners.join("; ");

}

function displaySelectedImage(event, elementId) {
    return 0;
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            // eventConfig.img= selectedImage.src;
            shooterDivisions[0].img= selectedImage.src;
            // eventConfig.imgChanged=true;
            shooterDivisions[0].imgChanged=true;
            updatePicOrName();
        };

        reader.readAsDataURL(fileInput.files[0]);
        
    }
}

function goToSubscription(parms){
    if(parms!==undefined && parms!==''){
        parms= '&shooterId='+parms;
    }else parms='';
    window.location="/event-details.html?event_id="+eventConfig._id+"&inscription=sublist"+parms;
}

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

document.getElementById("select-subscribe-gun").addEventListener('change', function (ev) {
    if(ev.target.value.split('|')[0]===gunOthers._id){
        if(ev.target.selectedOptions[0].innerText!== 'Outras'){
            document.getElementById('subscribe-gun').value= ev.target.selectedOptions[0].innerText;
            // ev.target.selectedOptions[0].innerText= 'Outras'
        }else{
            document.getElementById('subscribe-gun').style.display='';
            document.getElementById('subscribe-gun-label').style.display='';
        }

    }else{
        document.getElementById('subscribe-gun').style.display='none';
        document.getElementById('subscribe-gun-label').style.display='none';
        document.getElementById('subscribe-gun').value='';
    }
});

document.getElementById("select-subscribe-division").addEventListener('change', function (ev) {

    document.getElementById('subscribe-gun').style.display='none';
    document.getElementById('subscribe-gun-label').style.display='none';
    document.getElementById('subscribe-gun').value='';
    document.getElementById("subscribe-opticN").checked=false;
    document.getElementById("subscribe-optic").checked=false;
    
    let divisionName = "";
    for(let i=0; i<ev.target.options.length;i++){
        if(ev.target.options[i].selected)
            divisionName= ev.target.options[i].text.toLocaleLowerCase().trim();
    }

    let shooterId= document.getElementById('subscribe-shooterId').value;

    if(divisionName!=="" && gunList){
        dropDown= document.getElementById(`select-subscribe-gun`);

        while (dropDown.options.length > 0)
            dropDown.remove(0);

        let newOption = new Option("","|");
        dropDown.add(newOption);

        if(acervoList.length>0){
            
            for(let ac=0;ac<acervoList.length;ac++){
                
                if(divisionName=== 'força livre'
                  || acervoList[ac].gun_det[0].type.toLocaleLowerCase().trim()===divisionName
                  || (divisionName=== 'armas curtas'
                      &&(acervoList[ac].gun_det[0].type.toLocaleLowerCase().trim()==='pistola'
                         ||acervoList[ac].gun_det[0].type.toLocaleLowerCase().trim()==='revolver')
                  ) ){
                    
                    if(dropDown.length===1){
                        newOption = new Option("____[ACERVO]_____","|");
                        dropDown.add(newOption);
                    }

                    newOption = new Option(acervoList[ac].gun,acervoList[ac].gunId+"|"+acervoList[ac].regNum);
                    dropDown.add(newOption);
                    }

            }

            if(dropDown.length>1){
                newOption = new Option("_______________","|");
                dropDown.add(newOption);
            }
        }


        if(divisionName==="força livre"){
            for(let j=0;j<gunList.length;j++){
                let newOption = new Option(gunList[j].alias, gunList[j]._id+"|");
                
                if(gunList[j]._id!==gunOthers._id && divisionName==="força livre"&&(gunList[j].type.toLocaleLowerCase().trim()==="carabina"||gunList[j].type.toLocaleLowerCase().trim()==="espingarda"))
                    dropDown.add(newOption);
            }
        
            let newOption = new Option("_______________","|");
            dropDown.add(newOption);
        }

        for(let j=0;j<gunList.length;j++){
            newOption = new Option(gunList[j].alias, gunList[j]._id+"|");

            if(gunList[j]._id!==gunOthers._id &&((divisionName==="força livre"&&(gunList[j].type.toLocaleLowerCase().trim()!=="carabina"&&gunList[j].type.toLocaleLowerCase().trim()!=="espingarda")))
                ||(divisionName!=="força livre"&&divisionName!=="revolver"&&divisionName!=="pistola"&&divisionName!=="armas curtas" )
                ||divisionName===gunList[j].type.toLocaleLowerCase().trim()
                ||(divisionName==="armas curtas"
                    &&(gunList[j].type.toLocaleLowerCase().trim()==="revolver"
                       ||gunList[j].type.toLocaleLowerCase().trim()==="pistola" ) )){
                dropDown.add(newOption);
            }
        }
        newOption = new Option(gunOthers.model, gunOthers._id+"|");
        dropDown.add(newOption);
    }
  });

document.getElementById("search-button-name").addEventListener('click', function (ev) {
    
    const _dataList= document.getElementById("shooter-list");

    let _headers= {"Content-type": "application/json; charset=UTF-8"} ;

    const user= netlifyIdentity.currentUser();

    if(user&&user.token&&user.token.access_token){
        _headers.Authorization= `Bearer ${user.token.access_token}` ;
    }
    applySpinners(true);

    fetch('/.netlify/functions/shooters_v2?regex=1&name='+document.getElementById("subscribe-name").value+'&eventId='+eventConfig._id, {
        method: "GET",
        headers: _headers
        }
    ).then(response => response.json()
    ).then(json => {
        _dataList.innerHTML="";

        if(json.length>1){
            json.sort(function(a, b) {
                return compareStrings(a.name, b.name);
              });
        }
        
        for(let i=0; i<json.length;i++){
            // _dataList.appendChild(new Option(formatCpf(json[i].docnum,false),json[i].name));
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(json[i].name));
            
            if(json[i].email.indexOf('@tpm')<0){
            
                var span = document.createElement("p");
                span.setAttribute("class", "text-small");
                span.setAttribute("style", "margin-bottom: 1px !important;");
                span.appendChild(document.createTextNode(json[i].email));
                li.appendChild(span);
            }

            li.setAttribute("value", formatCpf(json[i].docnum,false) ); // added line
            li.setAttribute("href", "" ); // added line
            li.setAttribute("onClick", `selectShooter('${json[i].docnum}','${json[i].name}')` ); // added line
            _dataList.appendChild(li);
        }
        
        
        
    }
    ).catch(err => {console.log(`Error getting user: ${err}`); alert(`Erro ao localizar atirador.`); }
    ).finally(()=> {
        applySpinners(false);
    });

});

document.getElementById("subscribe-name").addEventListener('keyup', function (ev) {

    const _isAdmin= (loggedUser && loggedUser.app_metadata&& loggedUser.app_metadata.roles && loggedUser.app_metadata.roles.indexOf("admin")>=0);
    const _isEventAdmin= (loggedUser&&loggedUser.email&&eventConfig.owners&&eventConfig.owners.indexOf(loggedUser.email.toLowerCase().trim())>=0);

    if(!_isAdmin && !_isEventAdmin){
        return 0;
    }
    
    if($(this).val().length>2){
        document.getElementById("search-button-name").style.display="";
        // document.getElementById("search-button-name").style.visibility="visible";
    }else {
        document.getElementById("search-button-name").style.display="none";
        // document.getElementById("search-button-name").style.visibility="hidden";
    }

});

function selectShooter(_docnum, _name){
    try{
        document.getElementById("subscribe-docnum").value= (""+_docnum).replaceAll(".","").replaceAll("-",'').trim();
    }catch(e){
        document.getElementById("subscribe-docnum").value= "";
    }
    
    document.getElementById("search-button-name").style.display='none';
    // document.getElementById("search-button-name").style.visibility="hidden";
    document.getElementById('shooter-img').src="none";    
    document.getElementById('shooter-img2').src="none";    
    promiseOfGetShootersDivisions(eventConfig._id, document.getElementById("subscribe-docnum").value.replace(/\D+/g, ''), MODAL_TABLE_SUB_ID);

}