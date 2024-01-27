function advanceClick(div_adv_check){

    if(!div_adv_check.checked){
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = 'none';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = 'none';
    }else{
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = '';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = '';
    }
}

const promiseOfEvents = fetch("/.netlify/functions/events")
    .then(r=>r.json())
    .then(data => {
    return data;
});

    // location.reload(true);
netlifyIdentity.on('login', user => {
    buildEventsTable(events);
    console.log('login', user);
});

netlifyIdentity.on('logout', () => {
    buildEventsTable(events);
    console.log('Logged out');
});

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let events;

window.onload = async () => {
    
    // applySpinners(true);
    document.getElementById('nav-events').classList.add('active');
    events = await promiseOfEvents;
    // document.getElementById('eventTitle').innerHTML= eventConfig.name;
    // document.getElementById('event-name').value= eventConfig.name;
    // document.getElementById('event-date').value= eventConfig.date;


    buildEventsTable(events);
    // applySpinners(false);
    
    
}


function exlcuir(id, name){
    if(confirm('Tem certeza que deseja escluir o evento '+name+'?')){
    applySpinners(true);
    fetch('/.netlify/functions/eventconfig?eventId='+id, {
            method: "DELETE",
            // body: JSON.stringify(events),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            // .then(response => response.json()) 
            .then(r => {
                alert(`Evento ${name} excluído com sucesso`);
                location.reload(true);
            })
            .catch(err => console.log(`Error deleting event: ${err}`))
            .finally(()=> applySpinners(false));
        }

}


function buildEventsTable(events){
    if(events===undefined){
        return 0;
    }

    let row= ``;
    
    document.getElementById('events-table').innerHTML='';
    
    const user = netlifyIdentity.currentUser();

    // console.log(`user= ${user.user_metadata.full_name}`);
    let readOnly=`class="dropdown-item disabled" aria-disabled="true"`;
    if(user){
        readOnly=`class="dropdown-item"`;
    }
    
    
    for(let i=0;i<events.length;i++ ){
        
        // if(eventConfig.divisions[i].delete===undefined)
        //     eventConfig.divisions[i].delete=false;

        //<i class="bi bi-bullseye"></i>
        
        row=`<div class="col">
        <div class="card h-100">
          <a data-toggle="modal" data-target="#exampleModal" href="./event-config.html?event_id=${events[i]._id}" >
            <img src="${events[i].img}" class="card-img-top" alt="...">
            </a>
            <div class="card-body" >
              <div class="d-inline-block d-flex justify-content-between">
                <div> <h5 class="card-title">${events[i].name}</h5></div>
                <div class="dropup-center dropup">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">      
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/qualify.html?event_id=${events[i]._id}"><i class="bi bi-stopwatch"></i> Contra o Relógio</a></li>
                        <li><a class="dropdown-item" href="/matches.html?event_id=${events[i]._id}"><i class="bi bi-play-circle"></i> Partidas</a></li>
                        <li><a class="dropdown-item" href="./event-config.html?event_id=${events[i]._id}"><i class="bi bi-pencil-square"></i> Editar</a></li>
                        <li><a ${readOnly} href="javascript:exlcuir('${events[i]._id}','${events[i].name}')"><i class="bi bi-trash"></i> Excluir</a></li>
                    </ul>
                </div>
              </div>
              <p class="card-text">Local: ${events[i].local}</p>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Quando: ${events[i].date.replace(/T.*/,'').split('-').reverse().join('-').replaceAll('-','/')} as ${events[i].date.substring(events[i].date.indexOf("T") + 1).substring(0,5) }</small>
            </div>
          
        </div>
          `;
       document.getElementById('events-table').innerHTML+= row;
    }

    let newEvent= `<div class="col">
                        <div class="card h-100">
                        <a data-toggle="modal" data-target="#exampleModal" href="javascript:newEvent()" ><img src="/img/shooters_lineupNovo.png" class="card-img-top" alt="..."></a>
                        <div class="card-body">
                            <h5 class="card-title"><i>Novo Evento</i></h5>
                            <p class="card-text"><i>click na imagem para adicionar um novo evento.</i></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary"></small>
                        </div>
                        </div>
                    </div>`;
    document.getElementById('events-table').innerHTML+= newEvent;

}

function newEvent(){
    if(netlifyIdentity.currentUser()){
        window.location.href = window.location="/event-config.html?event_id=0";
    }else{
        netlifyIdentity.open();
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