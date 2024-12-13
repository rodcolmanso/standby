/********
 * To be included in every page.
 * 
 * Functions
 * 1. show or hide user avatar on loading* and after login/logout
 * 2. Hide speficics not autorized inputs (use a specific class to identify?)
 * 3. Disable speficics not autorized inputs (use a specific class to identify?)
 */

// const { parse } = require("dotenv");

                // document.getElementById('btnModalSpinner').click();
const SENIOR_AGE= 50;
              
const SESSION_DBUSER="tpm-session-dbuser";
const SESSION_EVENT_CONFIG="tpm-session-event-config";

let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
const s_event_id = params.event_id!==undefined?params.event_id:(params.eventId!==undefined?params.eventId:(params.s_event_id!==undefined?params.s_event_id:null));

const gunOthers= {
    _id: '66cfb8ee0badeb112d52d3c1'
    ,type: "Outras"
    ,factory: "Outras"
    ,model: "Outras"
    ,caliber: "."
    ,operation: "Outras"
    };

let gunList=[];


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

const promiseOfGetGunList = (shooterId, _divisionName, extraQuery)=>{
    // applySpinners(true);
    return fetch(`/.netlify/functions/guns?shooterId=${shooterId}&division_name=${_divisionName}${extraQuery}`, {
            method: "GET"})
            .then(response => response.json()) 
            .then(json => {
                return json;
            })
            .catch(err => console.log(`Error getting gunList: ${err}`))
            .finally(()=> {applySpinners(false)});
}

const promiseOfGunCollection = (_shooterId, _identityUser)=>{

    let _headers;
    if(_identityUser!==null){
        _headers= {"Content-type": "application/json; charset=UTF-8"
                ,"Authorization":`Bearer ${_identityUser.token.access_token}`}
    }else{
        return []; //_headers= {"Content-type": "application/json; charset=UTF-8"}
    }
    return fetch("/.netlify/functions/gun_collection?shooterId="+_shooterId, {
    method: "GET",
    // body: JSON.stringify(eventConfig),
    headers: _headers})
    // .then(function(response) {
    //     console.log(response.status); // Will show you the status

    //     if (!response.ok) {
    //         if(response.status===401){
    //             return [];
    //         } else
    //         throw new Error("HTTP status " + response.status);
    //     }
        
    // })
    .then(r=>r.json())
    .then(data => {
        return data;
    })

};

let dbUser={};
// let loggedUser={};

 async function loadingUserSession(user){
    
    user= netlifyIdentity.currentUser();
    if(user!==null){ //usuário logado
        let exipre_compare= ((new Date()).getTime()-Math.round(user.token.expires_in/4) );
        if(user.token.expires_at< exipre_compare){
             await netlifyIdentity.refresh().then((jwt)=>console.log(`Token refreshed ${jwt}`));
        }

        let sdbu=getSessionDbUser();
        // clearSessionEventConfig();
            //        setCookie('nf_jwt', "", 0.6);

        /////////////
        if(sdbu===null||sdbu.email!==netlifyIdentity.currentUser().email.toLowerCase().trim()){ //sem _id no cookie
            let responseClone; // 1
        //    await fetch('/.netlify/functions/shooters_v2?uuid='+uuidv4()+'&logged=1', {
           await fetch('/.netlify/functions/shooters_v2?logged=1', {
                method: "GET",
                headers: {"Content-Type": "application/json"
                        ,Accept: 'application/json'
                        ,Authorization:`Bearer ${netlifyIdentity.currentUser().token.access_token}` 
                    }
                }
            )
            .then( function (response) {
                console.log('response.status=',response.status); // Will show you the status
                if (!response.ok) {
                        console.log(`Não é possível consultar atirador no servidor. email= `, netlifyIdentity.currentUser().email);
                        if(response.status===500){
                            if(netlifyIdentity.currentUser().app_metadata && netlifyIdentity.currentUser().app_metadata.provider==='google'){
                                alert(`Não foi possível registrar-se com sua conta google ${netlifyIdentity.currentUser().email}. Por favor, cadastre uma senha de acesso.`);
                            }else{
                                alert(`Não foi possível registrar-se com o email ${netlifyIdentity.currentUser().email}. Por favor, informe um novo email de acesso.`);
                            }
                            netlifyIdentity.logout();
                            netlifyIdentity.open('signup');
                        }else{
                            throw new Error("HTTP status " + response.status);
                        }
                }

                 try{
                    responseClone = response.clone(); // 2
                 }catch(e){
                    console.warn('error cloning respose');
                 }
                 return response.json();
                }


            ).then( function (json){
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
                    
                }, function (rejectionReason) { // 3
                    console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
                    responseClone.text() // 5
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6
                    });
                }
            ) //.catch(e=>{console.warn(e); return null;})
            .catch(err => {
                console.warn(`Error getting, logged user: ${err}`);
                return null
            }
            ).finally(()=> {
                applySpinners(false);
            });
        }else{
            setAvatarPic();
        }
        
        let isAdmin= (user&&(user.app_metadata.roles!==undefined&&user.app_metadata.roles!=="")&&!(user.app_metadata.roles.indexOf("admin")<0));

        // if(isAdmin){
        //     addClass(document.getElementById("btn-header-filiese"),"d-none");
        //     removeClass(document.getElementById("btn-header-admin"),"d-none");
        // }else{
        //     removeClass(document.getElementById("btn-header-filiese"),"d-none");
        //     addClass(document.getElementById("btn-header-admin"),"d-none");
        // }
        
        
    }else{
        setAvatarPic();
    }
    
}

netlifyIdentity.on('open', function() {
    var iframe = document.getElementById("netlify-identity-widget");
    if (iframe) {

      var iOSfixJS = iframe.contentWindow.document.createElement("script");
      iOSfixJS.innerText = `for(let i= 0; i< document.getElementsByName('email').length;i++){document.getElementsByName('email')[i].autocomplete="username";}`;
      iframe.contentWindow.document.body.appendChild(iOSfixJS);
        
      var iOSfix = iframe.contentWindow.document.createElement("style");
      iOSfix.innerText = `input { font-size: 16px!important }input[type='email']{text-transform: lowercase;}`;
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

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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
        _userDb.email= netlifyIdentity.currentUser().email.toLowerCase().trim();
        _userDb.name= netlifyIdentity.currentUser().user_metadata.full_name;
        _userDb.category=0;
    }
    _userDb.docnum= _docnum.replace(/\D+/g, '');

    applySpinners(true);
    document.getElementById('btnCloseDocnum').disabled=true
    document.getElementById('btnSaveDocnum').disabled=true
    document.getElementById('btnSaveDocnum').innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
    document.getElementById('btnCloseDocnum').innerHTML= `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
//    setCookie('nf_jwt', "", 0.6);
    fetch('/.netlify/functions/shooters_v2?replace=1', {
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

            return response.json();
        })
        .then(json =>{
            // if (!response.ok) {
            if(json.errorCode){
                console.log(json.errorMessage);
                 
                if(json.errorCode===409){
                    alert(`ERRO! CPF já cadastrado para o email: ${json.registeredEmail} \n
Se você quiser alterar o seu email de login, entre em contato com tiroaopratometalico.com.br.`);
                    // document.getElementById('docnum').value= shooterData.docnum;
                }
                if(json.errorCode===408){
                    alert(`ERRO! Email já cadastrado para outro cpf. email: ${json.registeredEmail} \n
Se você quiser alterar o seu email de login, entre em contato com tiroaopratometalico.com.br.`);
                    // document.getElementById('modalEmail').value= shooterData.email;
                }
                if(json.errorCode===401){
                    alert(`ERRO! Você não tem permissão para executar essa ação.`);
                }
                throw new Error("alerted");
            }
            return json;
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
            if(err.toString().trim().toLowerCase().indexOf('alerted')<0){
                alert('Erro atualizando cpf do atirador: '+ err.toString());
            }

            // clearSessionDbUser();
            // netlifyIdentity.logout();
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
    applySpinners(false);
    // console.log(`user.app_metadata.roles= ${user.app_metadata.roles}`);
    // console.log(`user.user_metadata.admin_events= ${user.user_metadata.admin_events}`);

});

netlifyIdentity.on('logout', () => {
    clearSessionDbUser();
    clearSessionEventConfig()
    console.log('got logout on SESSION-MGNT');

});

function clearSessionDbUser(){
    setCookie(SESSION_DBUSER, "", 0.006);
    setAvatarPic();
}

function clearSessionEventConfig(){
    setCookie(SESSION_EVENT_CONFIG, "", 0.006);
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

const zeroPad = (num, places) => String(num).padStart(places, '0');

function naiveRound(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
}

function base64encode(str) {
    // let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) => String.fromCharCode(parseInt($1, 16)))
    let encode = str;
    return btoa(encode)
  }
  function base64decode(str) {
    // let decode = atob(str).replace(/[\x80-\uffff]/g, (m) => `%${m.charCodeAt(0).toString(16).padStart(2, '0')}`)
    let decode = atob(str);
    let decodedURIc= decode;
    // try{
    //     decodedURIc= decodeURIComponent(decode);
    // }catch(errr){
    //     console.log('Error decodingURI',errr);
    //     return  decode;
    // }
    return decodedURIc;
  }

function setSessionEventConfig(ec){
    // setCookie(SESSION_EVENT_CONFIG, JSON.stringify(ec), 1);
    
    stringifyEc= JSON.stringify(ec);
    b64ec= base64encode(stringifyEc);
    setCookie(SESSION_EVENT_CONFIG, b64ec, 1); //(1/24/60)
}
function getSessionEventConfig(){
    let ec= getCookie(SESSION_EVENT_CONFIG);
    if(ec===null || ec===undefined ||ec===""||ec==="null"){
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

function addDays(date, days) {
    const newDate = new Date(date);
    date= newDate;
    newDate.setDate(date.getDate() + days);
    return newDate;
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

function getCodeImg() {
    try{
        const d = new Date();
        let hour = ""+d.getHours()
        if(d.getMinutes()>30)
            hour += "3";
        else
            hour += "0";
        return hour;
    }catch(e){
        return (Math.random()*1000000).toString();
    }
}

function setAvatarPic(){
    const _dbUser= getSessionDbUser();
    const _id= _dbUser===null?(Math.random()*1000000).toString():_dbUser._id;
    const _date= new Date();
    
    if(!netlifyIdentity.currentUser() || netlifyIdentity.currentUser()===null){
        document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/defaults/generic_avatar_old.jpg?"+_date.getFullYear()+_date.getMonth()+_date.getHours()+(''+_date.getMinutes());   //uuidv4();
    }else{
        document.getElementById("header-avatar-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/"+_id+".jpg?"+_date.getFullYear()+_date.getMonth()+_date.getHours()+(''+_date.getMinutes());   //uuidv4();
    }
    

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
    let isAdmin= (user&&user.app_metadata&&user.app_metadata.roles&&user.app_metadata.roles!==""&&!(user.app_metadata.roles.indexOf("admin")<0));
    if(!_eventConfig||!_eventConfig.owners||!user||(!isAdmin&&(_eventConfig.owners.indexOf(user.email.toLowerCase().trim())<0))){
    // if(!isAdmin||!user||user.user_metadata.admin_events.indexOf(user.email)<0){
        onoff= true;
    }

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        
    if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0)
        &&(btn.getAttribute('type')&&btn.getAttribute('type').indexOf('search')<0)
        &&(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('dt-button')<0)
        ){
            btn.disabled=onoff;
        }

        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.display = ''//'visible'; //'hidden'
            else
                btn.style.display = 'none'//'visible'; //'hidden'
        }
    });
    

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
            && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
            btn.disabled= onoff;
        
        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.display = ''//'visible'; //'hidden'
            else
                btn.style.display = 'none'//'visible'; //'hidden'
        }

    });

    let _div = document.querySelectorAll("div");
    [].forEach.call(_div,elem=>{

        if(elem.getAttribute('class')&&elem.getAttribute('class').indexOf('nodisable')<0
            && onoff)
            elem.draggable= !onoff;
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff){
                elem.style.display = ''//'visible'; //'hidden'
                removeClass(elem,'d-none');
            }else{
                elem.style.display = 'none'//'visible'; //'hidden'
                addClass(elem,'d-none');
            }
        }

    });

    //========================
    _div = document.querySelectorAll("li");
    [].forEach.call(_div,elem=>{

        // if(elem.getAttribute('class')&&elem.getAttribute('class').indexOf('nodisable')<0
        //     && onoff)
        //     elem.draggable= !onoff;
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff){
                elem.style.display = ''//'visible'; //'hidden'
                removeClass(elem,'d-none');
            }else{
                elem.style.display = 'none'//'visible'; //'hidden'
                addClass(elem,'d-none');
            }
        }

    });
    _div = document.querySelectorAll("a");
    [].forEach.call(_div,elem=>{

        // if(elem.getAttribute('class')&&elem.getAttribute('class').indexOf('nodisable')<0
        //     && onoff)
        //     elem.draggable= !onoff;
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff){
                elem.style.display = ''//'visible'; //'hidden'
                removeClass(elem,'d-none');
            }else{
                elem.style.display = 'none'//'visible'; //'hidden'
                addClass(elem,'d-none');
            }
        }
    });
    //========================

    //================HIDE ALLL========
    _div = document.querySelectorAll("li");
    [].forEach.call(_div,elem=>{
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hixdeAll')>=0)){
            elem.style.display = 'none'//'visible'; //'hidden'
            addClass(elem,'d-none');
        }
    });
    _div = document.querySelectorAll("a");
    [].forEach.call(_div,elem=>{
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hixdeAll')>=0)){
            elem.style.display = 'none'//'visible'; //'hidden'
            addClass(elem,'d-none');
        }
    });
    _div = document.querySelectorAll("span");
    [].forEach.call(_div,elem=>{
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hixdeAll')>=0)){
            elem.style.display = 'none'//'visible'; //'hidden'
            addClass(elem,'d-none');
        }
    });
    _div = document.querySelectorAll("button");
    [].forEach.call(_div,elem=>{
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hixdeAll')>=0)){
            elem.style.display = 'none'//'visible'; //'hidden'
            addClass(elem,'d-none');
        }
    });
    //========================



    //============................


    let _radio = document.querySelectorAll('input[type="radio"]');
        [].forEach.call(_radio,rdo=>{
            if(rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('nodisable')<0
               && rdo.getAttribute('type') && rdo.getAttribute('type').indexOf('search')<0)
                rdo.disabled= onoff;
            
            if((rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('hide')>=0)){
                if(!onoff)
                    rdo.style.display = ''//'visible'; //'hidden'
                else
                    rdo.style.display = 'none'//'visible'; //'hidden'
            }
        });

    let _textarea = document.querySelectorAll("textarea");
        [].forEach.call(_textarea,btn=>{
            if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
                && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
                btn.disabled=onoff;

            if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
                if(!onoff)
                    btn.style.display = ''//'visible'; //'hidden'
                else
                    btn.style.display = 'none'//'visible'; //'hidden'
            }
        });

        _input = document.querySelectorAll("select");
    [].forEach.call(_input,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
            && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
            btn.disabled= onoff;
        
        
        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hide')>=0)){
            if(!onoff)
                btn.style.display = ''//'visible'; //'hidden'
            else
                btn.style.display = 'none'//'visible'; //'hidden'
        }

    });
}//function disableInputs(){

function pageLoading(){
    const spinnerWrapperEl= document.querySelector('.spinner-wrapper');
    spinnerWrapperEl.style.opacity=0.8;
    spinnerWrapperEl.style.display='';
}

function pageLoadingDone(){
    const spinnerWrapperEl= document.querySelector('.spinner-wrapper');
    spinnerWrapperEl.style.opacity=0;
    setTimeout(()=>{
        spinnerWrapperEl.style.display='none';
    },200);

}

function applySpinners(onoff){

    if(!onoff)
        pageLoadingDone();
    else
        pageLoading();

    let _spinner= document.getElementById('spinner');
    if(_spinner){
        _spinner.visibility=onoff;
        if(onoff)
            _spinner.style.display = ''//'visible'; //'hidden'
        else
            _spinner.style.display = 'none'//'visible'; //'hidden'           
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
                    span.style.display = ''//'visible'; //'hidden'
                else
                    span.style.display = 'none'//'visible'; //'hidden'
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
    if(onoff){
        // Set the cursor ASAP to "Wait"
        document.body.style.cursor='wait';
        // document.getElementById('btnModalSpinner').click();
    }else{// When the window has finished loading, set it back to default...
        // document.getElementById('btnCloseModalSpinner').click();
        document.body.style.cursor='default';
    }
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

  document.addEventListener('DOMContentLoaded', function() {
    // document.getElementById('btnCloseModalSpinner').click();
    // console.log('FECHANDO O SPPPIIINNNEEERRRRRR');
}, false);



function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}


function goToPage(page,oderParams){

    if(!oderParams)
        oderParams='';

    urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    
    let idP="?n=1";
    if(params&&params.id){
        idP="?id="+params.id;
    }

    window.location.href=`/${page}.html${idP}${oderParams}`;

}

let shooterData=null;
async function loadPageProfile(tab){
    
    // document.getElementById('nav-profile').classList.add('active');

    // let loggedUser= getSessionDbUser();
    
    const user= netlifyIdentity.currentUser();
    sessionTitle= document.getElementsByName("sessionTitle");
    sessionSubTitle= document.getElementsByName("sessionSubTitle");

    if(user){
        
        for(let i=0; i<sessionTitle.length; i++){
            sessionSubTitle[i].innerText= shooterData.name;
        }

        if(shooterData && shooterData.email === user.email){
            
            for(let i=0; i<sessionSubTitle.length; i++){
                sessionTitle[i].innerText= "Meu perfil";
            }
        }
    }

    removeClass(document.getElementById("nav-item_tab_0"), "border-secondary");
    removeClass(document.getElementById("nav-link_0"), "active");
    removeClass(document.getElementById("nav-link_0"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_1"), "border-secondary");
    removeClass(document.getElementById("nav-link_1"), "active");
    removeClass(document.getElementById("nav-link_1"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_2"), "border-secondary");
    removeClass(document.getElementById("nav-link_2"), "active");
    removeClass(document.getElementById("nav-link_2"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_3"), "border-secondary");
    removeClass(document.getElementById("nav-link_3"), "active");
    removeClass(document.getElementById("nav-link_3"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_"+tab), "hixdeAll");
    removeClass(document.getElementById("nav-item_tab_"+tab), "d-none");

    addClass(document.getElementById("nav-item_tab_"+tab), "border-secondary");
    addClass(document.getElementById("nav-link_"+tab), "active");
    addClass(document.getElementById("nav-link_"+tab), "active_sub")

    

    if(!params.id){
        urlSearchParams.set("id", shooterData._id);
        history.pushState(null, null, "?"+urlSearchParams.toString());
    }

}


const tab_info=0;
const tab_clock=1;
const tab_duel=2;
const tab_config=3;
async function loadPageEvent(tab){
    
    const eventConfig = getSessionEventConfig();
    
    document.getElementById('nav-events').classList.add('active');

    removeClass(document.getElementById("nav-item_tab_0"), "border-secondary");
    removeClass(document.getElementById("nav-link_0"), "active");
    removeClass(document.getElementById("nav-link_0"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_1"), "border-secondary");
    removeClass(document.getElementById("nav-link_1"), "active");
    removeClass(document.getElementById("nav-link_1"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_2"), "border-secondary");
    removeClass(document.getElementById("nav-link_2"), "active");
    removeClass(document.getElementById("nav-link_2"), "active_sub");

    removeClass(document.getElementById("nav-item_tab_3"), "border-secondary");
    removeClass(document.getElementById("nav-link_3"), "active");
    removeClass(document.getElementById("nav-link_3"), "active_sub");

    addClass(document.getElementById("nav-item_tab_"+tab), "border-secondary");
    addClass(document.getElementById("nav-link_"+tab), "active");
    addClass(document.getElementById("nav-link_"+tab), "active_sub")

    removeClass(document.getElementById("nav-item_tab_"+tab), "d-none");;
    removeClass(document.getElementById("nav-link_"+tab), "d-none");
    
    document.getElementById('div-sub-header-title').style.backgroundImage="url('https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto/defaults/header-bg.jpg')" ;

    if(tab===tab_config){

        addClass(document.getElementById("division-div-select"), "d-none");
        removeClass(document.getElementById("nav-item_tab_0"), "d-none");
        
        addClass(document.getElementById("nav-item_tab_"+tab_config), "border-secondary");
        addClass(document.getElementById("nav-link_"+tab_config), "active");
        addClass(document.getElementById("nav-link_"+tab_config), "active_sub");

        if(!eventConfig || !eventConfig._id){
            
            document.getElementById('imgHeaderEvent').src= 'https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_75/defaults/tmpyellow.jpg';

            addClass(document.getElementById("nav-item_tab_0"), "d-none");
            addClass(document.getElementById("nav-item_tab_1"), "d-none");
            addClass(document.getElementById("nav-item_tab_2"), "d-none");
            removeClass(document.getElementById("nav-item_tab_3"), "d-none");
            document.getElementById("nav-item_tab_3").style.display='';

            removeClass(document.getElementById("nav-link_3"), "d-none");
            document.getElementById("nav-link_3").style.display='';
            document.getElementById("nav-link_3").innerHTML=`
                <span class=""><i class="fa-regular fa-calendar"></i> Novo evento</span>
            `;
            
            addClass(document.getElementById("btn-subscribe-header-sm"), "d-none");
            
            return 0;
        }else{
            removeClass(document.getElementById("nav-item_tab_0"), "d-none");
            removeClass(document.getElementById("nav-item_tab_1"), "d-none");
            removeClass(document.getElementById("nav-item_tab_2"), "d-none");

        }
    }

    // document.getElementById('imgHeaderEvent').src= 'https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_75/d_defaults:tmpyellow.jpg/'+eventConfig._id;
    document.getElementById('imgHeaderEvent').src= 'https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_75/d_defaults:tmpyellow.jpg/ranges/'+eventConfig.range[0].name+'_logo';
    // document.getElementById('imgHeaderEvent').src= 'https://res.cloudinary.com/duk7tmek7/image/upload/c_limit,h_75/d_ranges:'+eventConfig.range[0].name+'_logo/'+eventConfig._id;
    eventTitles= document.getElementsByName('eventTitle');
    for(let i=0;i< eventTitles.length;i++){
        eventTitles[i].innerHTML=eventConfig.name;
    }

    eventTitleDate= document.getElementsByName('eventTitleDate');
    for(let i=0;i< eventTitleDate.length;i++){
        eventTitleDate[i].innerHTML=(new Date(eventConfig.date)).toLocaleDateString().substring(0,5);// replace('/20','/');
    }

    if(tab===tab_config){
        addClass(document.getElementById("division-div-select"),"d-none");
        removeClass(document.getElementById("nav-item_tab_"+tab_config),"d-none");
    }

    if(tab===tab_info){
        addClass(document.getElementById("div-sub-header-title"),"d-none");
        addClass(document.getElementById("division-div-select"),"d-none");
    }

    if(!eventConfig.clock){
        addClass(document.getElementById("nav-item_tab_"+tab_clock), "d-none");
    }else{
        removeClass(document.getElementById("nav-item_tab_"+tab_clock), "d-none");
    }

    if(!eventConfig.duel){
        addClass(document.getElementById("nav-item_tab_"+tab_duel), "d-none");
    }else{
        removeClass(document.getElementById("nav-item_tab_"+tab_duel), "d-none");
    }

    // document.getElementById('div-sub-header-title').style.backgroundImage="url('https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto/d_defaults:header-bg.jpg/header"+eventConfig._id+"img')" ;


}

// removeClass(document.getElementById("btn-header-filiese"),"d-none");
// addClass(document.getElementById("btn-header-filiese"),"d-none");
// addClass(document.getElementById("btn-header-admin"),"d-none");


// -----------------÷
const editShooterGunModal = document.getElementById('staticBackdropShooterGun');
if (editShooterGunModal) {
    editShooterGunModal.addEventListener('show.bs.modal', event => {

    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const shooterInfos = button.getAttribute('data-bs-whatever')
    const _shooterDivisionId= shooterInfos.split('|')[0];
    const _gundId_regNum= shooterInfos.split('|')[1].replaceAll('-undefined','-');
    const _gundId= _gundId_regNum.split('-')[0];
    const _regNum= _gundId_regNum.split('-')[1];
    const _shooterId= shooterInfos.split('|')[2];
    const _shooterName= shooterInfos.split('|')[3];
    const _shooterGunOptic= shooterInfos.split('|')[4];
    const _shooterGunOther= shooterInfos.split('|')[5];
    const _division= shooterInfos.split('|')[6];
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.

    fetch(`/.netlify/functions/guns?shooterId=${_shooterId}&hec=no&division_name=${_division}`, {
        method: "GET"})
        .then(response => response.json()) 
        .then(json => {
        // .then(_gunList => {
            _gunList= json;
            dropDown= document.getElementById("mondalShooterGun");

            while (dropDown.options.length > 0)
                dropDown.remove(0);

            if(_gunList[0].regNum){
                newOption = new Option("----[ACERVO]----", "");
                dropDown.add(newOption);
            }

            let endAcervo=false;
            for(let j=0;j<_gunList.length;j++){

                let aux_Id= _gunList[j]._id+"-";


                if(_gunList[j].regNum){
                    aux_Id+=_gunList[j].regNum;
                }else if(!endAcervo&&_gunList[0].regNum){
                    newOption = new Option("--------------", "");
                    dropDown.add(newOption);
                    endAcervo=true;
                }

                newOption = new Option(_gunList[j].alias, aux_Id);
                // if(_gunList[j]._id!== gunOthers._id)
                if(_gunList[j].alias.indexOf("Outras")<0 )
                    dropDown.add(newOption);
            }
            newOption = new Option("OUTRA (Especificar)", gunOthers._id+'-');
            dropDown.add(newOption);

            document.getElementById('mondalShooterGun').value= _gundId+'-'+_regNum;

            if(document.getElementById('mondalShooterGun').selectedOptions[0].innerText==="OUTRA (Especificar)"){
                $("#div-mondalGunOther").removeClass('d-none');
                document.getElementById("mondalGunOther").required= true;
            }else{
                $("#div-mondalGunOther").addClass('d-none');
                document.getElementById("mondalGunOther").required= false;
            }

            return _gunList;
        })
        .catch(err => console.log(`Error getting gunList For Change Gun Modal: ${err}`))
        .finally(()=> {});

    document.getElementById('mondalShooterImg').src=  `https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${_shooterId}.jpg`;
    document.getElementById('mondalShooterName').innerText= _shooterName;
    
    if(_shooterGunOptic===true || _shooterGunOptic==='true'){
        document.getElementById('mondalShooterGunOptic').checked= true;
        document.getElementById('mondalShooterGunOptic').style.backgroundColor= 'Red';
    }else{
        document.getElementById('mondalShooterGunOptic').checked= false;
        document.getElementById('mondalShooterGunOptic').style.backgroundColor= '';
    }
    document.getElementById('mondalGunOther').value= _shooterGunOther;
    document.getElementById('mondalDivisionName').innerText= _division;

    document.getElementById('mondalShooterDivisionId').value=_shooterDivisionId;

    // document.getElementById('mondalDivisionName').innerText= _gundId;
  })
}

document.getElementById('mondalShooterGun')
const mondalShooterGun = document.getElementById('mondalShooterGun');
if(mondalShooterGun){
    mondalShooterGun.addEventListener('change', e => {

        if(e.target.selectedOptions[0].innerText.indexOf("OUTRA (Es")>-1){
            $("#div-mondalGunOther").removeClass('d-none');
            document.getElementById("mondalGunOther").required= true;
            document.getElementById("mondalGunOther").value="";
        }else if(e.target.value.indexOf(gunOthers._id)>-1 ){
            $("#div-mondalGunOther").addClass('d-none');
            document.getElementById("mondalGunOther").value= e.target.selectedOptions[0].innerText;
        }else{
            $("#div-mondalGunOther").addClass('d-none');
            if(e.target.value==="")
                document.getElementById("mondalGunOther").value= "";
            else
                document.getElementById("mondalGunOther").value= e.target.selectedOptions[0].innerText;
            document.getElementById("mondalGunOther").required= false;
        }

    });
}


const modalGunSave = document.getElementById('modalGunSave');
if(modalGunSave){
    modalGunSave.addEventListener('click', event => {


        if(document.getElementById('mondalShooterGun').value.trim()===""|| document.getElementById("mondalGunOther").value.trim()===""){
            alert("Informar uma arma!");
            document.getElementById('mondalShooterGun').focus();
            return 0;
        }


    let _body= {'_id'      :  document.getElementById('mondalShooterDivisionId').value
               ,'gunId'    : document.getElementById('mondalShooterGun').value.split("-")[0]
               ,'gunRegNum': document.getElementById('mondalShooterGun').value.split("-")[1]
               ,'gun'      : document.getElementById('mondalGunOther').value
               ,'optics'   : document.getElementById('mondalShooterGunOptic').checked
    };

    console.log('_body:',JSON.stringify(_body));

    const _user= netlifyIdentity.currentUser();
    let _headers= {"Content-type": "application/json; charset=UTF-8"} ;
    if(_user&&_user.token&&_user.token.access_token){
        _headers.Authorization= `Bearer ${_user.token.access_token}` ;
    }
    applySpinners(true);
    fetch('/.netlify/functions/shooters_divisions' , {
        method: "PATCH",
        headers: _headers,
        body: JSON.stringify(_body)
        })
    .then(function(response) {
        console.log(response.status); // Will show you the status

        if (!response.ok) {
            if(response.status===409){
                alert(`A arma ${_body.gun} já está inscrita na divisão ${document.getElementById('mondalDivisionName').innerText}.`);
                // return 0;
            }
            throw new Error("HTTP status " + response.status);
        }
    
    })
    .then(json => {
        applySpinners(false);
            
            try{
                updateShootersList();
            // alert("Atualizado com sucesso!");
            document.getElementById('modalGunClose').click();
            }catch(eee_){
                window.location.reload();
            }

    }
    ).catch(err => {console.log(`Error updating gun queue: ${err}`); }
    ).finally(()=> {
        applySpinners(false);
    });
    })
}

function disableShooterFields(updater){

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        
        if(
        (btn.getAttribute('class')&&btn.getAttribute('class').indexOf('disableshooter')>=0)
        ){
            btn.disabled=!updater;
        }

        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater)
                btn.style.visibility = 'visible'//'visible'; //'hidden'
            else
                btn.style.visibility = 'hidden'//'visible'; //'hidden'
        }
    });

    let _input = document.querySelectorAll("input");
    [].forEach.call(_input,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('disableshooter')>=0
        // && btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
        // && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0)
        )
            btn.disabled= !updater;
        
        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater)
                btn.style.display = '='//'visible'; //'hidden'
            else
                btn.style.display = 'none'//'visible'; //'hidden'
        }

    });

    let _div = document.querySelectorAll("div");
    [].forEach.call(_div,elem=>{
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater){
                elem.style.display = ''//'visible'; //'hidden'
                removeClass(elem,'d-none');
            }else{
                elem.style.display = 'none'//'visible'; //'hidden'
                addClass(elem,'d-none');
            }
        }

    });

    let _label = document.querySelectorAll("label");
    [].forEach.call(_label,elem=>{
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater)
                elem.style.display = ''//'visible'; //'hidden'
            else
                elem.style.display = 'none'//'visible'; //'hidden'
        }

    });

    let _radio = document.querySelectorAll('input[type="radio"]');
        [].forEach.call(_radio,rdo=>{
            if(rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('disableshooter')>=0
            // &&rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('nodisable')<0
            // && rdo.getAttribute('type') && rdo.getAttribute('type').indexOf('search')<0
        )
                rdo.disabled= !updater;
            
            if((rdo.getAttribute('class')&&rdo.getAttribute('class').indexOf('hideshooter')>=0)){
                if(updater)
                    rdo.style.display = ''//'visible'; //'hidden'
                else
                    rdo.style.display = 'none'//'visible'; //'hidden'
            }
        });

    let _textarea = document.querySelectorAll("textarea");
    [].forEach.call(_textarea,btn=>{
        if(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('disableshooter')>=0
        // &&btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0
        //     && btn.getAttribute('type') && btn.getAttribute('type').indexOf('search')<0
        )
            btn.disabled=!updater;

        if((btn.getAttribute('class')&&btn.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater)
                btn.style.display = ''//'visible'; //'hidden'
            else
                btn.style.display = 'none'//'visible'; //'hidden'
        }
    });

    try{
        document.getElementById('modalEmail').disabled=true;
        if(document.getElementById('docnum').value.indexOf('**')>-1){
            document.getElementById('docnum').disabled==true;
    }
    }catch(e){
        
    }

    let _select = document.querySelectorAll("select");
    [].forEach.call(_select,btn=>{
        if(btn.getAttribute('class').indexOf('disableshooter')>=0)
            btn.disabled=!updater;
    });

}

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