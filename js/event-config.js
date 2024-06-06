// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// const event_id = params.event_id;
// let promiseOfEventConfig=null;
//6578ad76e53c8b23971032c4

// if(event_id!=='0'){
//     console.log(`event_id= ${event_id}`);
//     promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId="+event_id)
//         .then(r=>r.json())
//         .then(data => {
//         return data;
//     });
// }

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig=null;

function hrefQualify(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}

async function loadPage(eId){
    loggedUser= netlifyIdentity.currentUser();

    applySpinners(true);
    eventConfig = await promiseOfSessionEventConfig(eId,loggedUser);
    applySpinners(false);

    if(eventConfig==null){ // New event
        eventConfig= {"_id":"","name":"","date":new Date().toISOString() ,"dateDuel":new Date().toISOString()
        ,"img":"","local":"","note":"","address":"","city":"", "state":"","public":"checked" , "divisions":[], "clock":true ,"duel": true, "imgChanged": false, "randomDuel":true, "vl_first_try":0, "vl_second_try":0, "vl_other_tries":0};
    }

    eventConfig.imgChanged=false;

    document.getElementById('nav-events').classList.add('active');

    if(eventConfig._id!==null && eventConfig._id!==undefined&& eventConfig._id!==0&& eventConfig._id!=="0"){
        document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate"  href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    }else{
        document.getElementById('eventTitle').innerHTML= `Novo evento`;
    }
    
    document.getElementById('event-name').value= eventConfig.name;
    if(eventConfig.dateDuel===null||eventConfig.dateDuel===undefined||eventConfig.dateDuel===''){
        eventConfig.dateDuel=eventConfig.date;
    }

    var utc = new Date();
    var offset = utc.getTimezoneOffset();

    eventConfig.date= new Date((new Date(eventConfig.date)).getTime() - (offset * 60000) );
    eventConfig.dateDuel= new Date((new Date(eventConfig.dateDuel)).getTime() - (offset * 60000) );

    
    document.getElementById('event-date').value= eventConfig.date.toISOString().slice(0,16);
    document.getElementById('event-date-duel').value= eventConfig.dateDuel.toISOString().slice(0,16);
    
    document.getElementById('check-clock').checked= eventConfig.clock;
    document.getElementById('check-duel').checked= eventConfig.duel;

    if(!eventConfig.duel){
        document.getElementById('check-duel').style='background-color:';
    }
    document.getElementById('event-date').disabled= !eventConfig.clock;
    document.getElementById('event-date-duel').disabled= !eventConfig.duel;

    document.getElementById('event-local').value= eventConfig.local;
    
    document.getElementById('selectedImage').src= 'https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_450,w_600/d_defaults:tmpyellow.jpg/'+eventConfig._id+".jpg?"+uuidv4();
    
    document.getElementById('event-note').value= eventConfig.note;

    document.getElementById('event-address').value= eventConfig.address;
    document.getElementById('event-city').value= eventConfig.city;
    document.getElementById('event-state').value= eventConfig.state;
    document.getElementById('event-public').checked= eventConfig.public;

    if(eventConfig.randomDuel)
        document.getElementById('event-random-duel1').checked=true;
    else
        document.getElementById('event-random-duel2').checked=true;
    
    document.getElementById('vl_first_try').value= eventConfig.vl_first_try= eventConfig.vl_first_try?eventConfig.vl_first_try:0;
    document.getElementById('vl_second_try').value= eventConfig.vl_second_try= eventConfig.vl_second_try?eventConfig.vl_second_try:0;
    document.getElementById('vl_other_tries').value= eventConfig.vl_other_tries= eventConfig.vl_other_tries?eventConfig.vl_other_tries:0;
    
    //document.getElementById('
    if(eventConfig.owners!==undefined)
        document.getElementById('event-owners').value= eventConfig.owners.join("; ");

    buildDivisionTable(eventConfig);
    applySpinners(false);
    const user= netlifyIdentity.currentUser();
    let isAdmin= (user&&user.app_metadata.roles!==undefined &&!(user.app_metadata.roles.indexOf("admin")<0));
    
    if(eventConfig._id!==""&&(user===null||(!isAdmin&&(eventConfig.owners.indexOf(user.email)<0)))){
        disableInputs(true);
    }
    
// }
}

document.getElementById('modalReport').addEventListener('shown.bs.modal', () => {
    loadTriesReport(eventConfig);
});

let _tb= null;
function loadTriesReport(_event){

    if(netlifyIdentity.currentUser()){
        applySpinners(true);
        fetch('/.netlify/functions/time-records?report=1&eventId='+_event._id, {
            method: "GET",
            headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
                    }
            }).then(response => response.json()
            ).then(json => {

                let event_total=0;
                document.getElementById('tb_tries').innerHTML='';
                for(let i=0;i<json.length;i++){
                    
                    let vl_1=0
                    let vl_2=0
                    let vl_others= 0;

                    if(json[i].tries>0)
                        vl_1= parseFloat(json[i]._id[3]);

                    if(json[i].tries>1)
                        vl_2= parseFloat(json[i]._id[4]);

                    if(json[i].tries>2)
                        vl_others= (json[i].tries-2)* parseFloat(json[i]._id[5]);

                    document.getElementById('tb_tries').innerHTML+=
                    `<tr>
                    <td class="text-start">${json[i]._id[2]}</td>
                    <td class="text-start">${json[i]._id[1]}</td>
                    <td class="text-end">${json[i].tries}</td>
                    <td class="text-end">R$${vl_1}</td>
                    <td class="text-end">R$${vl_2}</td>
                    <td class="text-end">R$${vl_others}</td>
                    <td class="text-end">R$${vl_1+vl_2+vl_others}</td>
                  </tr>`;
                  event_total=event_total+vl_1+vl_2+vl_others;
                }

                document.getElementById('eventTotal').innerHTML= event_total;

                if(_tb!==null){
                    // _tb.clear();
                    _tb.destroy();
                    // _tb.empty();
                    _tb=null;
                }

                _tb= new DataTable('#table_report_tries');
                _tb.draw(false);
            })
            .catch(err => console.log(`Error getting, logged user: ${err}`))
            .finally(()=> applySpinners(false));
    }
    
}

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
    //                 document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/profile/"+json[0]._id;
    //             }
    //         })
    //         .catch(err => console.log(`Error getting, logged user: ${err}`))
    //         .finally(()=> applySpinners(false));
    // }
    
    await loadPage(null);
    
}

    // location.reload(true);
    // netlifyIdentity.on('login', user => {

    //     let isAdmin= (user&&(user.app_metadata.roles!==undefined&&user.app_metadata.roles!=="")&&!(user.app_metadata.roles.indexOf("admin")<0));
    //     if(event_id!==0&&event_id!=="0"&&eventConfig!==undefined&&user!==null&&(isAdmin||(eventConfig.owners.indexOf(user.email)<0))){
    //         disableInputs(false);
    //     }
    //     console.log('login', user);
    // });
    
    // netlifyIdentity.on('logout', () => {
    //     disableInputs(true);
    //     console.log('Logged out');
    // });

    netlifyIdentity.on('close', () => {
        const user= netlifyIdentity.currentUser();

        let isAdmin= (netlifyIdentity&&(user.app_metadata.roles!==undefined&&user.app_metadata.roles!=="")&&!(user.app_metadata.roles.indexOf("admin")<0));
        
        if(eventConfig!==null && eventConfig!==undefined && user!==null && (isAdmin||(eventConfig.owners.indexOf(user.email)<0))){
            disableInputs(false);
        }else{
            disableInputs(true);
        }

        console.log('On Identity window close. login', user);

       // loadPage();
    });
    

function updateEventConfig(){

    const user= netlifyIdentity.currentUser();
    if(!user){
        return 0;
    }

    eventConfig.name= document.getElementById('event-name').value;
    
    eventConfig.clock= document.getElementById('check-clock').checked;
    eventConfig.duel= document.getElementById('check-duel').checked;

    eventConfig.date= new Date(document.getElementById('event-date').value);
    eventConfig.dateDuel= new Date(document.getElementById('event-date-duel').value);

    if(!eventConfig.clock){
        eventConfig.date= eventConfig.dateDuel;
    }

    if(!eventConfig.duel){
        eventConfig.dateDuel= eventConfig.date;
    }
    
    eventConfig.local= document.getElementById('event-local').value;
    eventConfig.note= document.getElementById('event-note').value;
    // eventConfig.img= document.getElementById('event-img').value;
    eventConfig.owners= document.getElementById('event-owners').value.toLowerCase().replace(/\s/g, '').split(";");

    eventConfig.address= document.getElementById('event-address').value;
    eventConfig.city= document.getElementById('event-city').value;
    eventConfig.state= document.getElementById('event-state').value;
    eventConfig.public= document.getElementById('event-public').checked;
    eventConfig.randomDuel= document.getElementById('event-random-duel1').checked;

    eventConfig.vl_first_try= document.getElementById('vl_first_try').value;
    eventConfig.vl_second_try= document.getElementById('vl_second_try').value;
    eventConfig.vl_other_tries= document.getElementById('vl_other_tries').value;

    if(eventConfig.date===''||eventConfig.date.toString()==='Invalid Date'
     ||eventConfig.dateDuel===''||eventConfig.dateDuel.toString()==='Invalid Date'){
        alert('Informe datas válidas para o evento!')
        return 0;
    }
    if(eventConfig.divisions.length<1){
        alert('Adicione ao menos uma divisão para o evento!')
        return 0;
    }

    let aDivisionName=[];
    for(let i=0; i<eventConfig.divisions.length;i++){
        if(document.getElementById(eventConfig.divisions[i]._id+'DivisionName').value===""){
            alert("Informe o nome da divisão.");
            document.getElementById(eventConfig.divisions[i]._id+'DivisionName').focus();
            return 0;
        }

        if(aDivisionName.indexOf(document.getElementById(eventConfig.divisions[i]._id+'DivisionName').value)>-1){
            alert("Divisão já cadastrada.");
            document.getElementById(eventConfig.divisions[i]._id+'DivisionName').focus();
            return 0;
        }else aDivisionName.push(document.getElementById(eventConfig.divisions[i]._id+'DivisionName').value);

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
                        clearSessionEventConfig();
                        loadPage(eventConfig._id);
                        alert(`Torneio ${eventConfig.name} criado/atualizado com sucesso!`);
                        // window.location.href = window.location.pathname+"?"+"event_id="+eventConfig._id;
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
          <select id="${eventConfig.divisions[i]._id}DivisionName" class="form-select form-control form-select-sm" required placeholder="" value="${eventConfig.divisions[i].name}" >
            <option value="${eventConfig.divisions[i].name}" selected>${eventConfig.divisions[i].name}</option>
         `;
            if(eventConfig.divisions[i].name!=='Pistola')
                row+=`<option value="Pistola">Pistola</option>`;

            if(eventConfig.divisions[i].name!=='Força livre')
                row+=`<option value="Força livre">Força livre</option>`;
            
            if(eventConfig.divisions[i].name!=='Revolver')
                row+=`<option value="Revolver">Revolver</option>`;
            
            row+=`<option value="">_____________</option>`;
            
            if(eventConfig.divisions[i].name!=='Armas curtas')
                row+=`<option value="Armas curtas">Armas curtas</option>`;
            
            if(eventConfig.divisions[i].name!=='Levers & Pumps')
                row+=`<option value="Levers & Pumps">Levers & Pumps</option>`;
            
            if(eventConfig.divisions[i].name!=='Calibres Menores')
                row+=`<option value="Calibres Menores">Calibres Menores</option>`;
            
            if(eventConfig.divisions[i].name!=='Calibres Maiores')
                row+=`<option value="Calibres Maiores">Calibres Maiores</option>`;
            row+=`</select>


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

function checkClock(bRadio){

    if(bRadio.checked){
        document.getElementById('event-date').disabled=false;
    }else{        
        document.getElementById('event-date').disabled=true;
        document.getElementById('event-date-duel').disabled=false;
        document.getElementById('check-duel').checked=true;
        document.getElementById('check-duel').style='background-color:goldenrod';
    }

}

function checkDuel(bRadio){

    if(bRadio.checked){
        document.getElementById('event-date-duel').disabled=false;
        document.getElementById('check-duel').style='background-color:goldenrod';
    }else{
        document.getElementById('check-duel').style='background-color:';
        document.getElementById('event-date-duel').disabled=true;
        document.getElementById('event-date').disabled=false;
        document.getElementById('check-clock').checked=true;
    }
    
}

function advanceClick(div_adv_check){

    if(!div_adv_check.checked){
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = 'none';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = 'none';
    }else{
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = '';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = '';
    }
    // document.getElementById(''+div_adv_check.value+'SelectAdvance').disabled= (!div_adv_check.checked);
    //     document.getElementById(''+div_adv_check.value+'IndexAdvance').disabled= (!div_adv_check.checked);
}

document.getElementById('btn-import').disabled=true;
function retriveSpreadsheet(){

    if(document.getElementById('sheetId').value===""){
        alert('Informe o ID da planilha');
        return 0;
    }
    if(document.getElementById('tabName').value===""){
        alert('Informe o nome da Tab da planilha');
        return 0;
    }
    getSheetData({
        // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
        sheetID: document.getElementById('sheetId').value,
        // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
        sheetName: document.getElementById('tabName').value,
        query: "SELECT * ",
        callback: sheetDataHandler,
      });

}

const sheetDataHandler= (sheetData)=>{
    console.log(sheetData);
    document.getElementById('textArea').value= JSON.stringify(sheetData);
}