function advanceClick(div_adv_check){

    if(!div_adv_check.checked){
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = 'none';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = 'none';
    }else{
        document.getElementById(''+div_adv_check.value+'SelectAdvance').style.display = '';
        document.getElementById(''+div_adv_check.value+'IndexAdvance').style.display = '';
    }
}

let queryParam="";

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
let ranges=[];
let loggedUser=null;
   
let events;

let user;
let isAdmin=false;

netlifyIdentity.on('close', () => {
    search();
});

const promiseOfRanges = (_rangeId, _identityUser)=>{
    _rangeId= _rangeId!==null?'&rangeId='+_rangeId:"";
        
    let _headers;
    if(_identityUser!==null){
        _headers= {"Content-type": "application/json; charset=UTF-8"
                ,"Authorization":`Bearer ${_identityUser.token.access_token}`}
    }else{
        _headers= {"Content-type": "application/json; charset=UTF-8"}
    }
    return fetch("/.netlify/functions/range?updater=1"+_rangeId, {
        method: "GET",
        // body: JSON.stringify(eventConfig),
        headers: _headers}).then(r=>r.json())
        .then(data => {
                return data
        })
};

window.onload = async () => {

    try{
        user= netlifyIdentity.currentUser();
    }catch(error){
        console.log('Error getting netlifyIdentity',JSON.stringify(error,null,2));
        user= null;

    }

    if(user!==null){ //usuário logado
        let exipre_compare= ((new Date()).getTime()-Math.round(user.token.expires_in/4) );
        if(user.token.expires_at< exipre_compare){
             await netlifyIdentity.refresh().then((jwt)=>console.log(`Token refreshed ${jwt}`));
        }
    }
    
    if(user===null || user===undefined || user.token.access_token===null || user.token.access_token===undefined){
        user= {token:{access_token:""},email:'xxxxxxx'};

    } else{
        let exipre_compare= ((new Date()).getTime()-Math.round(user.token.expires_in/4) );
        if(user.token.expires_at< exipre_compare){
            await netlifyIdentity.refresh().then((jwt)=>console.log(`Token refreshed ${jwt}`));
        }
         isAdmin= (user&& user.app_metadata && user.app_metadata.roles &&!(user.app_metadata.roles.indexOf("admin")<0));
         applySpinners(true);
        ranges = await promiseOfRanges(null,user);
        applySpinners(false);
    }
    
    const url= window.location.toString();
    const args= url.substring(url.indexOf("?") + 1).split("&");

    if(url.indexOf("?")>-1 && args.length>0){
        if(user!==null){
            _headers= {"Content-type": "application/json; charset=UTF-8"
                    ,"Authorization":`Bearer ${user.token.access_token}`}
        }else{
            _headers= {"Content-type": "application/json; charset=UTF-8"}
        }

        applySpinners(true);

        fetch("/.netlify/functions/events?short_id="+args[0],
            {method: "GET"
            ,headers: _headers}
        ).then(r=>r.json())
            .then(data => {
            // return data;
            if(data.length>0){
                window.location.href = window.location="/event-details.html?event_id="+data[0]._id+ "&inscription=new";
            }
        }).finally( applySpinners(false));
    }


    document.getElementById('nav-events').classList.add('active');
    
    document.getElementById('nav-matches').style.display='none';
    document.getElementById('nav-qualify').style.display='none';

    const dDate= new Date();
    // dDate.setDate(0);
    dDate.setDate(dDate.getDate() - 1);
    // console.log('dDate: '+dDate)
    document.getElementById('date').value= dDate.toDateString();//.toLocaleDateString();

    search();
    
}

function search() {
    //some stuff...
    
        // DbUser
        // getSessionDbUser()
        loggedUser= netlifyIdentity.currentUser();

        if(loggedUser!==null){
            _headers= {"Content-type": "application/json; charset=UTF-8"
                    ,"Authorization":`Bearer ${loggedUser.token.access_token}`}
        }else{
            _headers= {"Content-type": "application/json; charset=UTF-8"}
        }
    
    let queryDate= document.getElementById('date').value.split('-');
    let sQuery='?order=1&p=0';

    if(queryDate.length>0){
        // sQuery= sQuery+'&date_from='+queryDate[0].substring(6,10)+'-'+queryDate[0].substring(3,5)+'-'+queryDate[0].substring(0,2);
        let d=new Date(queryDate[0]);

        console.log('d from:',d);
        if(isNaN(d) || d===null || d===undefined|| d==='Invalid Date'){
            d=new Date(); 
            console.log('d_from changed to:',d);
        }

        sQuery= sQuery+'&date_from='+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }
    if(queryDate.length>1){
        let d=new Date(queryDate[1]);
        
        console.log('d to=',d);
        if(isNaN(d) || d===null || d===undefined|| d==='Invalid Date'){
            d=new Date();
            console.log('d_to changed to:',d);
        }

        d.setDate(d.getDate() +1);
        sQuery= sQuery+'&date_to='+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    }
    applySpinners(true);
    // setCookie('nf_jwt', "", 0.6);
    fetch("/.netlify/functions/events"+sQuery,
        {method: "GET"
        ,headers: _headers}
       ).then(r=>r.json())
        .then(data => {
        // return data;
        buildEventsTable(data);
        })
        .catch((error)=>{
            console.log('error quering events. error=',error);
            window.location.href = window.location="/";
        })
        .finally( applySpinners(false));
    //some other stuff...
};   

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
                //location.reload(true);
                search();
            })
            .catch(err => console.log(`Error deleting event: ${err}`))
            .finally(()=> applySpinners(false));
        }
}

const days = ['Domingo','2ª-feira','3ª-feira','4ª-feira','5ª-feira','6ª-feira','Sábado'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// var day = days[ now.getDay() ];
// var month = months[ now.getMonth() ];

function buildEventsTable(events){
    if(events===undefined){
        return 0;
    }

    let row= ``;
    
    document.getElementById('events-table').innerHTML='';
    
    const user = netlifyIdentity.currentUser();

    let readOnly=`class="dropdown-item disabled" aria-disabled="true"`;
    if(user && isAdmin){
        readOnly=`class="dropdown-item"`;
    }
    
    let newEvent= `<div class="col" >
                        <div class="card h-100">
                        <a data-toggle="modal" data-target="#exampleModal" href="javascript:newEvent()">
                        <img src="https://res.cloudinary.com/duk7tmek7/image/upload/b_white,c_pad,h_388,w_517/shooters_lineupNovo" class="card-img-top" alt="... onerror="this.src='https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_210,w_280/shooters_lineup_gen'""></a>
                        <div class="card-body">
                            <h5 class="card-title"><i>Novo Evento</i></h5>
                            <p class="card-text"><i>click na imagem para adicionar um novo evento.</i></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary"></small>
                        </div>
                        </div>
                    </div>`;
    
    if(ranges.length>0|| (netlifyIdentity.currentUser()&&netlifyIdentity.currentUser().app_metadata.roles&&netlifyIdentity.currentUser().app_metadata.roles 
    &&(netlifyIdentity.currentUser().app_metadata.roles.indexOf("admin")>=0 || netlifyIdentity.currentUser().app_metadata.roles.indexOf("super")>=0)))
        document.getElementById('events-table').innerHTML+= newEvent;

    var utc = new Date();
    var offset = utc.getTimezoneOffset();

    for(let i=0;i<events.length;i++ ){

        // utc = new Date();
        // offset = utc.getTimezoneOffset();
        
        events[i].date= new Date((new Date(events[i].date)).getTime() - (offset * 60000) );
        events[i].hour= events[i].date.toISOString().substring(11,16);
        events[i].dateDuel= new Date((new Date(events[i].dateDuel)).getTime() - (offset * 60000) );
        events[i].hourDuel= events[i].dateDuel.toISOString().substring(11,16);
        
        // if(eventConfig.divisions[i].delete===undefined)
        //     eventConfig.divisions[i].delete=false;

        //<i class="bi bi-bullseye"></i>
        // https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_210,w_280/d_defaults:tmpyellow.jpg/

        let _hideClock= `style="display:none"`;
        let _hideDuel= `style="display:none"`;

        if(events[i].clock===true){
            _hideClock='';
        }

        if(events[i].duel===true){
            _hideDuel='';
        }


        row=`<div class="col" >
        <div class="card h-100" >
            <div class="dropup-center dropup">
            <a href="./event-details.html?event_id=${events[i]._id}" >  <!-- data-toggle="modal" data-target="#exampleModal" data-bs-toggle="dropdown" -->
            <img src="https://res.cloudinary.com/duk7tmek7/image/upload/c_pad,h_388,w_517/d_defaults:tmpyellow.jpg/${events[i]._id}.jpg?${uuidv4()}" class="card-img-top" alt="..." onerror="this.onerror=null;this.src='https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_210,w_280/defaults/tmpyellow'"></a>
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="./event-details.html?event_id=${events[i]._id}"><i class="bi bi-ticket-detailed-fill"></i> Detalhe</a></li>
                <li><a class="dropdown-item" href="/event-details.html?inscription=clockduel&event_id=${events[i]._id}" ><i class="bi bi-person-plus-fill"></i> Inscrever-se</a></li>
                <li ${_hideClock}><a class="dropdown-item" href="/qualify.html?event_id=${events[i]._id}"><i class="bi bi-stopwatch"></i> Contra o Relógio</a></li>
                <li ${_hideDuel}><a class="dropdown-item" href="/matches.html?event_id=${events[i]._id}"><i class="bi bi-play-circle"></i> Duelos</a></li>
            </ul>
            <div class="card-body" >
              <div class="d-inline-block d-flex justify-content-between">
                <div> <h5 class="card-title">${events[i].name}</h5></div>
                <div class="dropup-center dropup">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">      
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/event-details.html?inscription=clockduel&event_id=${events[i]._id}" ><i class="bi bi-person-plus-fill"></i> Inscrever-se</a></li>
                        <li ${_hideClock}><a class="dropdown-item" href="/qualify.html?event_id=${events[i]._id}"><i class="bi bi-stopwatch"></i> Contra o Relógio</a></li>
                        <li ${_hideDuel}><a class="dropdown-item" href="/matches.html?event_id=${events[i]._id}"><i class="bi bi-play-circle"></i> Duelos</a></li>
                        <li><a class="dropdown-item" href="./event-details.html?event_id=${events[i]._id}"><i class="bi bi-ticket-detailed-fill"></i> Detalhe</a></li>
                        <li><a class="dropdown-item" href="./event-config.html?event_id=${events[i]._id}"><i class="bi bi-gear-fill"></i> Configurações</a></li>
                        <li><a ${readOnly} href="javascript:exlcuir('${events[i]._id}','${events[i].name}')"><i class="bi bi-trash"></i> Excluir</a></li>
                    </ul>
                </div>
              </div>
              <p class="card-text">Local: ${events[i].local}</p>
            </div>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Quando: ${days[ events[i].date.getDay()]}, ${events[i].date.toLocaleDateString().substring(0,5)} as ${events[i].hour }h</small>
            </div>
          
        </div>
          `;
       document.getElementById('events-table').innerHTML+= row;
    }

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