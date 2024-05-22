/********
 * To be included in every page.
 * 
 * Functions
 * 1. show or hide user avatar on loading* and after login/logout
 * 2. Hide speficics not autorized inputs (use a specific class to identify?)
 * 3. Disable speficics not autorized inputs (use a specific class to identify?)
 */

// const { parse } = require("dotenv");

const SESSION_DBUSER="tpm-session-dbuser";
const SESSION_EVENT_CONFIG="tpm-session-event-config";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const s_event_id = params.event_id!==undefined?params.event_id:(params.eventId!==undefined?params.eventId:(params.s_event_id!==undefined?params.s_event_id:null));

function getRandomInt(min, max) {
    // Use Math.floor to round down to the nearest whole number
    // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range (max - min + 1) to cover the entire range
    // Add the minimum value to shift the range to [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const promiseOfSessionEventConfig = (_eventId, _identityUser)=>{

    _eventId= _eventId!==null?_eventId:s_event_id;
    const ec= getSessionEventConfig();
    if(ec!==null && (_eventId===null || ec._id===_eventId) ){ //nao tem query/method parameter
        return ec
    }else{    
        clearSessionEventConfig();
        if(_eventId===null) return null;

        let _headers;
        if(_identityUser!==null){
            _headers= {"Content-type": "application/json; charset=UTF-8"
                    ,"Authorization":`Bearer ${_identityUser.token.access_token}`}
        }else{
            _headers= {"Content-type": "application/json; charset=UTF-8"}
        }
        return fetch("/.netlify/functions/events?event_id="+_eventId, {
        method: "GET",
        // body: JSON.stringify(eventConfig),
        headers: _headers}).then(r=>r.json())
        .then(data => {
            if(data.length>0){
                setSessionEventConfig(data[0]);
                return getSessionEventConfig();
            }
            return null;
        })
    }
    };


let dbUser={};
// let loggedUser={};

async function loadingUserSession(user){
    // loggedUser= netlifyIdentity.currentUser();
    if(user!==null){ //usuário logado
        let exipre_compare= ((new Date()).getTime()-Math.round(user.token.expires_in/4) );
        if(user.token.expires_at< exipre_compare){
            await netlifyIdentity.refresh().then((jwt)=>console.log(`Token refreshed ${jwt}`));
        }

        let sdbu=getSessionDbUser();
        if(sdbu===null||sdbu.email!==user.email){ //sem _id no cookie
            await fetch('/.netlify/functions/shooters?logged', {
                method: "GET",
                headers: {"Content-type": "application/json; charset=UTF-8"
                        ,"Authorization":`Bearer ${user.token.access_token}` }
                }
            ).then(response => response.json()
            ).then(json => {
                    if(json.length>0){
                        dbUser= json[0];
                        console.log(`DbUser logged. Name:${dbUser._id}`);
                        setSessionDbUser(dbUser);
                    }else console.log(`Identity user has no DbUser yet. User email:${user.email}`);
                    setAvatarPic();
                    
                }
            ).catch(err => console.log(`Error getting, logged user: ${err}`)
            ).finally(()=> {});
        }else{
            setAvatarPic();
        }
        
    }else setAvatarPic();
}

netlifyIdentity.on('login', user => {
    loadingUserSession(user);
    configPermissions(true);
    //display fields
});

netlifyIdentity.on('logout', () => {
    clearSessionDbUser();
    clearSessionEventConfig()
    configPermissions(false);

});

function configPermissions(onoff){

    // let _button = document.querySelectorAll("button");
    // [].forEach.call(_button,btn=>{
    //     btn.disabled=onoff;
    //     // document.getElementById('selectDivision').disabled=onoff;

    //     if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-warning")
    //         ||btn.getAttribute('class').includes("btn-secondary")
    //         ||btn.getAttribute('class').includes("btn-success")
    //         ||btn.getAttribute('class').includes("btn-danger")
    //         ||btn.getAttribute('class').includes("btn-primary"))) {
    //         if(onoff)
    //             btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
    //         else
    //             btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
    //     }

    //     spans= btn.querySelectorAll("span");
    //     [].forEach.call(spans,span=>{
    //         if(span.getAttribute('class').includes("spinner")){
    //             if(onoff){
    //                 span.style.visibility = 'visible'//'visible'; //'hidden'
    //             }else{
    //                 span.style.visibility = 'hidden'//'visible'; //'hidden'
    //             }
    //         }
    //     });
    // });

    // let _input = document.querySelectorAll('input');
    // [].forEach.call(_input,rdo=>{
    //     if(rdo.id!=='subscribe-email'){
    //         rdo.disabled=onoff;
    //     }
    // });
    
    // let _checkbox = document.querySelectorAll('input[type="checkbox"]');
    // [].forEach.call(_checkbox,rdo=>{
    //     rdo.disabled=onoff;
    // });
}

function clearSessionDbUser(){
    setCookie(SESSION_DBUSER, null, 0.006);
    setAvatarPic();
}

function clearSessionEventConfig(){
    setCookie(SESSION_EVENT_CONFIG, null, 0.006);
}

function setSessionDbUser(dbUserJson){
    setCookie(SESSION_DBUSER, JSON.stringify(dbUserJson), 1);
}
function getSessionDbUser(){
    let dbu= getCookie(SESSION_DBUSER);
    if(dbu===null || dbu===undefined ||dbu===""){
        return null;
    }else{
        return JSON.parse(dbu);
    }
}


function base64encode(str) {
    let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) => String.fromCharCode(parseInt($1, 16)))
    return btoa(encode)
  }
  function base64decode(str) {
    let decode = atob(str).replace(/[\x80-\uffff]/g, (m) => `%${m.charCodeAt(0).toString(16).padStart(2, '0')}`)
    return decodeURIComponent(decode)
  }

function setSessionEventConfig(ec){
    // setCookie(SESSION_EVENT_CONFIG, JSON.stringify(ec), 1);

    stringifyEc= JSON.stringify(ec);
    b64ec= base64encode(stringifyEc);
    setCookie(SESSION_EVENT_CONFIG, b64ec, 1);
}
function getSessionEventConfig(){
    let ec= getCookie(SESSION_EVENT_CONFIG);
    if(ec===null || ec===undefined ||ec===""){
        return null;
    }else{
        try{
            // ec= JSON.parse(ec);
            decodedEc= base64decode(ec);
            parsedEc= JSON.parse(decodedEc);
            ec= parsedEc;
        }catch(error){
            console.log('Error parsing EventConfig from session: '+error)
            ec=null;
            clearSessionEventConfig();
        }

        return ec;
        
    }
}

function uuidv4() {
    try{
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }catch(e){
        return (Math.random()*1000000).toString();
    }
  }

function setAvatarPic(){
    const _id= getSessionDbUser()===null?(Math.random()*1000000).toString():getSessionDbUser()._id;
    document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/"+_id+".jpg?code="+uuidv4();
    document.getElementById("loginout").innerHTML= '<i class="bi bi-box-arrow-in-left"></i> ';
    document.getElementById("loginout").innerHTML+= (netlifyIdentity.currentUser()===null?'Login':'Logout');
    document.getElementById("avatarUserName").innerHTML= (netlifyIdentity.currentUser()===null?'Perfil':netlifyIdentity.currentUser().user_metadata.full_name);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }