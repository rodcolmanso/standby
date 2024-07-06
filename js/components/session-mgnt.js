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
                        // window.$('#modalDocnum').modal();
                    }else{ 
                        console.log(`Identity user has no DbUser yet. User email:${user.email}`);
                    };
                    if(!dbUser|| !dbUser.docnum ||!validaCPF(dbUser.docnum)){   
                        jQuery.noConflict();
                        (function( $ ) {
                        $(function() {
                            $('#modalDocnum').modal('show');
                        });
                        })(jQuery);
                    }
                    setAvatarPic();
                    
                }
            ).catch(err => console.log(`Error getting, logged user: ${err}`)
            ).finally(()=> {});
        }else{
            setAvatarPic();
        }
        
    }else setAvatarPic();
    
}

netlifyIdentity.on('open', function() {
    var iframe = document.getElementById("netlify-identity-widget");
    if (iframe) {
      var iOSfix = iframe.contentWindow.document.createElement("style");
      iOSfix.innerText = "input { font-size: 16px!important }";
      iframe.contentWindow.document.body.appendChild(iOSfix);
    }

  });

function formatCpf(cpf, valid){

    if(valid)
        cpf= cpf.replace(/\D/g, '') // Remove qualquer coisa que não seja número

    return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona traço após o nono dígito
    .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
}

function formattime(time, valid){
    let ret= time;
    if(valid)
        ret= time.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    
    if(Number(ret).toString().length==1)
        return "0.0"+Number(ret).toString();
    else
    if(Number(ret).toString().length==2)
        return "0."+Number(ret).toString();
    else
    if(Number(time)>100){
        return 100;
    }
    if(Number(ret).toString().length>2){
        var str = Number(ret).toString();
        var len = str.length;
        return str.substring(0, len-2) + "." + str.substring(len-2);
    }else return time;
}

function formatpenal(time, valid){
    let ret= time;
    if(valid)
        ret= time.replace(/\D/g, '') // Remove qualquer coisa que não seja número
    
    if(Number(time)>4){
        return 4;
    }else return time;
}

const modalDocnum = document.getElementById('modalDocnum');
modalDocnum.addEventListener('hidden.bs.modal', function (event) {

    // location.reload(true);
    
  });

  const btnCloseDocnum = document.getElementById('btnCloseDocnum');
  btnCloseDocnum.addEventListener('click', function(e) {

    // if(!confirm('O CPF é necessário para registrar suas competições, esses dados não serão compartilhados com mais ninguém. Inserir CPF agora?')){
    if(!confirm('Você não poderá se inscrever nas competições sem o seu CPF. Informar CPF agora?')){
        clearSessionDbUser();
        netlifyIdentity.logout();
        jQuery.noConflict();
        (function( $ ) {
        $(function() {
            $('#modalDocnum').modal('hide');
        });
        })(jQuery);
    }
  });
  

const btnSaveDocnum = document.getElementById('btnSaveDocnum');
btnSaveDocnum.addEventListener('click', function(e) {
    var _docnum = document.getElementById('input-modalDocnum').value;
    if (!validaCPF(_docnum)) {
      e.preventDefault(); // Impede o envio do formulário
      alert('CPF inválido. Verifique o número digitado.');
      document.getElementById('input-modalDocnum').focus(); // Foca no campo de CPF após o erro
      return 0;
    }
    
    let _userDb= getSessionDbUser();
    if(!_userDb){
        _userDb={};
        _userDb.email= netlifyIdentity.currentUser().email;
        _userDb.name= netlifyIdentity.currentUser().user_metadata.full_name;
        _userDb.category=0;
    }
    _userDb.docnum= _docnum.replace(/\D+/g, '');

    applySpinners(true);
    document.getElementById('btnCloseDocnum').disabled=true
    document.getElementById('btnSaveDocnum').disabled=true
    document.getElementById('btnSaveDocnum').innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
    document.getElementById('btnCloseDocnum').innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
    fetch('/.netlify/functions/shooters?replace=1', {
        method: "PATCH",
        body: JSON.stringify(_userDb),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
           ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
        }
        })
        // .then(response => response.json())
        .then(function(response) {
            console.log(response.status); // Will show you the status

            if (!response.ok) {
                if(response.status===409){
                    alert(`ERRO! CPF já cadastrado para outro Atirador.`);
                    document.getElementById('docnum').value= shooterData.docnum;
                }
                if(response.status===408){
                    alert(`ERRO! Email já cadastrado para outro Atirador.`);
                    document.getElementById('modalEmail').value= shooterData.email;
                }
                if(response.status===401){
                    alert(`ERRO! Você não tem permissão para executar essa ação.`);
                }
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(json => {
            let _a='';
            let _oa='o';
            if(json.category===2){
                _a='a';
                _oa='a';
            }
            _userDb._id= json._id;
            // if(netlifyIdentity.currentUser().email===json.email){
                setSessionDbUser(_userDb);
                loadingUserSession(netlifyIdentity.currentUser());
                // buildShooterForm();
            // }
            alert('Atirador'+_a+' '+json.name+' atualizad'+_oa+' com sucesso.');
            jQuery.noConflict();
            (function( $ ) {
            $(function() {
                $('#modalDocnum').modal('hide');
            });
            })(jQuery);
            
        })
        .catch(err => {
            console.log(`Error updating atirador, error: ${err.toString()} `);
            alert('Erro atualizando cpf do atirador: '+ err.toString());
            clearSessionDbUser();
            netlifyIdentity.logout();
    })
        .finally(()=> {
            document.getElementById('btnCloseDocnum').disabled=false;
            document.getElementById('btnSaveDocnum').disabled=false;

            document.getElementById('btnCloseDocnum').innerHTML= `<span>${document.getElementById('btnCloseDocnum').getAttribute('value')}</span>`;
            document.getElementById('btnSaveDocnum').innerHTML= `<span>${document.getElementById('btnSaveDocnum').getAttribute('value')}</span>`;

            applySpinners(false);
        });

  });

  document.getElementById('input-modalDocnum').addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                          .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                          .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
  });

netlifyIdentity.setLocale('pt');
netlifyIdentity.on('login', user => {
    
    //display fields
    var iframe = document.getElementById("netlify-identity-widget");
    if (iframe) {
        var btnClose = iframe.contentWindow.document.querySelector(".btnClose");
        btnClose.click();
    }
    applySpinners(true);
    loadingUserSession(user);
    configPermissions(true);
    applySpinners(false);
    // console.log(`user.app_metadata.roles= ${user.app_metadata.roles}`);
    // console.log(`user.user_metadata.admin_events= ${user.user_metadata.admin_events}`);

});

netlifyIdentity.on('logout', () => {
    clearSessionDbUser();
    clearSessionEventConfig()
    configPermissions(false);
    console.log('got logout on SESSION-MGNT');

});

function configPermissions(onoff){

}

function clearSessionDbUser(){
    setCookie(SESSION_DBUSER, null, 0.006);
    setAvatarPic();
}

function clearSessionEventConfig(){
    setCookie(SESSION_EVENT_CONFIG, null, 0.006);
}

function setSessionDbUser(dbUserJson){
    if(dbUserJson.img)
        dbUserJson.img="none";
    setCookie(SESSION_DBUSER, JSON.stringify(dbUserJson), 1);
}

function getSessionDbUser(){
    let dbu= getCookie(SESSION_DBUSER);
    if(dbu===null || dbu===undefined ||dbu===""){
        return null;
    }else{
        if(dbu.img && dbu.img!=="none")
                    dbu.img="none"
        let jr=null;

        try{
            jr= JSON.parse(dbu);
        }catch(error){
            console.log(error);
            clearSessionDbUser();
        }
        

        return jr;
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
    const _dbUser= getSessionDbUser();
    const _id= _dbUser===null?(Math.random()*1000000).toString():_dbUser._id;
    document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/"+_id+".jpg?"+uuidv4();
    // document.getElementById("loginout").innerHTML= '<i class="bi bi-box-arrow-in-left"></i> ';

    document.getElementById("loggedin").style.display =  (netlifyIdentity.currentUser()===null?'none':'');
    document.getElementById("loginout").style.display =  (netlifyIdentity.currentUser()===null?'':'none');

    // document.getElementById("loginout").innerHTML+= (netlifyIdentity.currentUser()===null?'Login':'Logout');
    document.getElementById("avatarUserName").innerHTML= (netlifyIdentity.currentUser()===null?'Perfil':(_dbUser?_dbUser.name:netlifyIdentity.currentUser().user_metadata.full_name));
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

  function disableInputs(){
    onoff=false;
    const _eventConfig= getSessionEventConfig();
    const user= netlifyIdentity.currentUser();
    let isAdmin= (user&&user.app_metadata.roles!==undefined&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    if(!_eventConfig||!_eventConfig.owners||!user||(!isAdmin&&(_eventConfig.owners.indexOf(user.email)<0))){
    // if(!isAdmin||!user||user.user_metadata.admin_events.indexOf(user.email)<0){
        onoff= true;
    }

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        
    if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0)
        &&(btn.getAttribute('type')&&btn.getAttribute('type').indexOf('search')<0)
        ){
            btn.disabled=onoff;
        }

        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.visibility = 'visible'//'visible'; //'hidden'
            else
                btn.style.visibility = 'hidden'//'visible'; //'hidden'
        }
    });
    

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
            && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
            btn.disabled= onoff;
        
        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.visibility = 'visible'//'visible'; //'hidden'
            else
                btn.style.visibility = 'hidden'//'visible'; //'hidden'
        }

    });

    let _div = document.querySelectorAll("div");
    [].forEach.call(_div,elem=>{

        if(elem.getAttribute('class')&&elem.getAttribute('class').indexOf('nodisable')<0
            && onoff)
            elem.draggable= !onoff;
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                elem.style.visibility = 'visible'//'visible'; //'hidden'
            else
                elem.style.visibility = 'hidden'//'visible'; //'hidden'
        }

    });

    let _radio = document.querySelectorAll('input[type="radio"]');
        [].forEach.call(_radio,rdo=>{
            if(rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('nodisable')<0
               && rdo.getAttribute('type') && rdo.getAttribute('type').indexOf('search')<0)
                rdo.disabled= onoff;
            
            if((rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('hide')>=0)){
                if(!onoff)
                    rdo.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    rdo.style.visibility = 'hidden'//'visible'; //'hidden'
            }
        });

    let _textarea = document.querySelectorAll("textarea");
        [].forEach.call(_textarea,btn=>{
            if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
                && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
                btn.disabled=onoff;

            if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
                if(!onoff)
                    btn.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    btn.style.visibility = 'hidden'//'visible'; //'hidden'
            }
        });

        _input = document.querySelectorAll("select");
    [].forEach.call(_input,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
            && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
            btn.disabled= onoff;
        
        
        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.visibility = 'visible'//'visible'; //'hidden'
            else
                btn.style.visibility = 'hidden'//'visible'; //'hidden'
        }

    });
}

function applySpinners(onoff){

    if(onoff){
        // Set the cursor ASAP to "Wait"
        document.body.style.cursor='wait';
    }else{// When the window has finished loading, set it back to default...
        document.body.style.cursor='default';
    }

    let _spinner= document.getElementById('spinner');
    if(_spinner){
        _spinner.visibility=onoff;
        if(onoff)
            _spinner.style.visibility = 'visible'//'visible'; //'hidden'
        else
            _spinner.style.visibility = 'hidden'//'visible'; //'hidden'           
    }

    if(onoff && document.getElementById("btnInscrever")){
        document.getElementById("btnInscrever").innerHTML= `<div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>`;
    }else if(document.getElementById("btnInscrever")){
        document.getElementById("btnInscrever").innerHTML= `Inscrever <i class="fa-solid fa-angle-down"></i>`;
    }

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        if(onoff&&btn.getAttribute('class').indexOf('nodisable')<0)
            btn.disabled=onoff;

        if(btn.getAttribute('class'!=null)&&(btn.getAttribute('class').includes("btn-danger")
            ||btn.getAttribute('class').includes("btn-secondary")
            ||btn.getAttribute('class').includes("btn-success")
            ||btn.getAttribute('class').includes("btn-primary"))) {

            if(onoff)
                btn.innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
            else
                btn.innerHTML= `<span>${btn.getAttribute('value')}</span>`;
        }

        spans= btn.querySelectorAll("span");
        [].forEach.call(spans,span=>{
            if(span.getAttribute('class')&&span.getAttribute('class').includes("spinner")){
                if(onoff)
                    span.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    span.style.visibility = 'hidden'//'visible'; //'hidden'
                }
            }
        );
    });

    let _select = document.querySelectorAll("select");
    [].forEach.call(_select,btn=>{
        if(onoff&&btn.getAttribute('class').indexOf('nodisable')<0)
            btn.disabled=onoff;
    });

    // let _input = document.querySelectorAll('input');
    // [].forEach.call(_input,rdo=>{                                
    //     // if(rdo.id!=='subscribe-email'&& !rdo.classList.contains("Inputdisabled")
    //     if(rdo.id!=='subscribe-docnum'&& !rdo.classList.contains("Inputdisabled")
    //     ){
    //         rdo.disabled= onoff;    
    //     }
    // });

    disableInputs();
    
}

function validaCPF(cpf) {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) return false;
  
    let soma = 0;
    let resto;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica sequências iguais
  
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
    return true;
  }