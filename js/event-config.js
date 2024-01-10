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

const promiseOfEventConfig = fetch("/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
    .then(r=>r.json())
    .then(data => {
    return data;
});

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig;

window.onload = async () => {
    
    applySpinners(true);
    eventConfig = await promiseOfEventConfig;
    document.getElementById('eventTitle').innerHTML= eventConfig.name;
    document.getElementById('event-name').value= eventConfig.name;
    document.getElementById('event-date').value= eventConfig.date;


    buildDivisionTable(eventConfig);
    applySpinners(false);
    
    
}

function updateEventConfig(){

    eventConfig.name= document.getElementById('event-name').value;    
    eventConfig.date= document.getElementById('event-date').value;

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

    alert('Submetando a alteração');
    applySpinners(true);
            fetch('/.netlify/functions/eventconfig?eventId='+eventConfig._id, {
                    method: "PATCH",
                    body: JSON.stringify(eventConfig),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        console.log(`Evento alterado com sucesso= ${json.toString}`);
                
                        // if(idShooter===null || idShooter==''){
                        //     alert(document.getElementById('modalName').value+' se juntou ao evento!');
                        //     document.getElementById('modalShooterId').value= json.shooterId;

                        // }else{
                        //     alert(document.getElementById('modalName').value+' atualizado');
                        // }
                        // modalChanged=true;
                        alert('Evento alterado com sucesso!');
                        location.reload(true);
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
          <button onClick="deleteDivision('${eventConfig.divisions[i]._id}')" type="button" class="btn btn-danger btn-circle btn-xl" value="-">-</button>
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