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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const event_id = params.event_id;
let promiseOfEventConfig=null;
//6578ad76e53c8b23971032c4
if(event_id!=='0'){
    console.log(`event_id= ${event_id}`);
    promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId="+event_id)
        .then(r=>r.json())
        .then(data => {
        return data;
    });
}

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig;

function hrefQualify(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/qualify.html?event_id="+eventConfig._id;
}

function hrefMatches(){
    if(eventConfig._id!=0)
        window.location.href = window.location="/matches.html?event_id="+eventConfig._id;
}

window.onload = async () => {
    
    applySpinners(true);
    if(event_id!=='0'){
        eventConfig = await promiseOfEventConfig;
    }else{
        eventConfig= {"_id":event_id,"name":"","date":new Date().toISOString() ,"img":"/img/shooters_lineup.jpg","local":"","note":"","divisions":[]};
    }
    
    document.getElementById('nav-events').classList.add('active');
    // document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-config.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`
    document.getElementById('event-name').value= eventConfig.name;
    document.getElementById('event-date').value= eventConfig.date.slice(0,16);
    document.getElementById('event-local').value= eventConfig.local;
    document.getElementById('event-img').value= eventConfig.img;
    document.getElementById('event-note').value= eventConfig.note;

    if(eventConfig.owners!==undefined)
        document.getElementById('event-owners').value= eventConfig.owners.join("; ");

    buildDivisionTable(eventConfig);
    applySpinners(false);
    const user= netlifyIdentity.currentUser();
    let isAdmin= (user&&!(user.app_metadata.roles.indexOf("admin")<0));
    if(user===null||(!isAdmin&&(eventConfig.owners.indexOf(user.email)<0))){
        disableInputs(true);
    }
    
}

    // location.reload(true);
    netlifyIdentity.on('login', user => {

        let isAdmin= (user&&!(user.app_metadata.roles.indexOf("admin")<0));
        if(eventConfig!==undefined&&user!==null&&(isAdmin||(eventConfig.owners.indexOf(user.email)<0))){
            disableInputs(false);
        }
        console.log('login', user);
    });
    
    netlifyIdentity.on('logout', () => {
        disableInputs(true);
        console.log('Logged out');
    });
    

function updateEventConfig(){

    const user= netlifyIdentity.currentUser();
    if(!user){
        return 0;
    }

    eventConfig.name= document.getElementById('event-name').value;    
    eventConfig.date= document.getElementById('event-date').value;
    eventConfig.local= document.getElementById('event-local').value;
    eventConfig.note= document.getElementById('event-note').value;
    eventConfig.img= document.getElementById('event-img').value;
    eventConfig.owners= document.getElementById('event-owners').value.toLowerCase().replace(/\s/g, '').split(";");

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
        <th scope="row">${i+1}</th>
        <td><input type="text" aria-label="indexAdvance" class="form-control form-control-sm" id="${eventConfig.divisions[i]._id}DivisionName" value="${eventConfig.divisions[i].name}"></td>
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
            (["bt_clock","bt_matches","loginAvatar","bt_share"].indexOf(btn.getAttribute('id'))<0))
             btn.disabled=onOff;        
                    });

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        btn.disabled=onOff;        
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