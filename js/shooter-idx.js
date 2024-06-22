let updater=false;
let shooterData=null;

netlifyIdentity.on('close', () => {
    
    if(!netlifyIdentity.currentUser()){

        if(!params.id)
            window.location.href = window.location="/";
        else
            location.reload();
    }else{
        location.reload();
        // disableShooterFields(updater);
    }
});

window.onload = async () => {

    await loadPage();
    
    applySpinners(true);
    let loggedUser= getSessionDbUser();
    const user= netlifyIdentity.currentUser();
    applySpinners(false);

    if(loggedUser===null&&(!params.id||params.id==='')){
        netlifyIdentity.open('login');
    }else if(params.id&&params.id!==''&&(loggedUser===null||params.id!==loggedUser._id)){
        updater= (user&&user.app_metadata.roles&&user.app_metadata.roles.indexOf("admin")>=0);

        let _headers= {"Content-type": "application/json; charset=UTF-8"} ;
        if(user&&user.token&&user.token.access_token){
            _headers.Authorization= `Bearer ${user.token.access_token}` ;
        }
        applySpinners(true);

        await fetch('/.netlify/functions/shooters?id='+params.id, {
            method: "GET",
            headers: _headers
            }
        ).then(response => response.json()
        ).then(json => {
                if(json.length>0){
                    dbUser= json[0];
                    shooterData= dbUser;
                    buildShooterForm();
                }else{ console.log(`Usuário não encontrado. id:${params.id}`);
                alert(`Atirador não encontrado.`); window.location.href = window.location="/";}
            }
        ).catch(err => {console.log(`Error getting user: ${err}`); alert(`Erro ao localizar atirador.`); window.location.href = window.location="/";}
        ).finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
    }else{
        //sessionUser
        updater= true;
        shooterData= loggedUser;
        buildShooterForm();
    }

    disableShooterFields(updater);
};
document.getElementById('docnum').addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = formatCpf(value,true);
    e.target.value = cpfPattern;
  });

function saveShooter(){
    let _UshooterData={};
    _UshooterData._id= document.getElementById('_id').value;
    _UshooterData.email= document.getElementById('modalEmail').value;
    _UshooterData.docnum= document.getElementById('docnum').value.replaceAll('.','').replaceAll('-','');

    
    if (!validaCPF(_UshooterData.docnum)) {
      alert('CPF inválido. Verifique o número digitado.');
      document.getElementById('docnum').focus();
      return 0;
    }

    _UshooterData.name= document.getElementById('modalName').value;

    if(document.getElementById('modalOption2').checked)
        _UshooterData.category=2;

    else if(document.getElementById('modalOption5').checked)
        _UshooterData.category=5;

    else //(document.getElementById('modalOption0').checked)
    _UshooterData.category=0;
  

    _UshooterData.img= document.getElementById('pic-profile').src;
    _UshooterData.imgChanged= (document.getElementById('imgChanged').value||document.getElementById('imgChanged').value==='true');

    // alert(JSON.stringify(_UshooterData,null,2));
    applySpinners(true);
    fetch('/.netlify/functions/shooters?id='+_UshooterData._id, {
        method: "PATCH",
        body: JSON.stringify(_UshooterData),
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

            if(netlifyIdentity.currentUser().email===json.email){
                setSessionDbUser(_UshooterData);
                loadingUserSession(netlifyIdentity.currentUser());
                // buildShooterForm();
            }
            alert('Atirador'+_a+' '+json.name+' atualizad'+_oa+' com sucesso.');
            
        })
        .catch(err => console.log(`Error updating atirador, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater)});
}

function buildShooterForm(){

    const _shooterid= shooterData===null?'.jpg'+(Math.random()*1000000).toString():shooterData._id;
        document.getElementById('pic-profile').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+_shooterid;

        document.getElementById('imgChanged').value=false;

        document.getElementById('_id').value= shooterData._id;
        document.getElementById('modalEmail').value= shooterData.email;
        document.getElementById('modalEmail').disabled=true;
        document.getElementById('docnum').value= formatCpf(shooterData.docnum,false);
        document.getElementById('modalName').value= shooterData.name;
        
        document.getElementById('modalOption0').checked = (shooterData.category===0);
        document.getElementById('modalOption2').checked = (shooterData.category===2);
        document.getElementById('modalOption5').checked = (shooterData.category===5);

}

function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            // eventConfig.img= selectedImage.src;
            // shooterDivisions[0].img= selectedImage.src;
            // eventConfig.imgChanged=true;
            // shooterDivisions[0].imgChanged=true;
            document.getElementById('imgChanged').value=true;
        };

        reader.readAsDataURL(fileInput.files[0]);
        
    }
}

netlifyIdentity.on('logout', () => {
    console.log('got logout on SHOOTER');
    if(!params.id)
        window.location.href = window.location="/";
    else location.reload();
});


async function loadPage(){
    
    loggedUser= netlifyIdentity.currentUser();
    
    applySpinners(true);
    eventConfig = await promiseOfSessionEventConfig(null,loggedUser);
    if(eventConfig)
        document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    applySpinners(false);

    // if(eventConfig===null){
    //     alert(`Evento não encontrado`);
    //     window.location.href = window.location="/index.html";
    // }

    // buildEventDetailsPage(eventConfig);
    // buildDivisions(eventConfig); 
}

function disableShooterFields(updater){

    let _button = document.querySelectorAll("button");
    [].forEach.call(_button,btn=>{
        
        if(
        (btn.getAttribute('class')&&btn.getAttribute('class').indexOf('disableshooter')>=0)
        // &&(btn.getAttribute('class')&&btn.getAttribute('class').indexOf('nodisable')<0)
        // &&(btn.getAttribute('type')&&btn.getAttribute('type').indexOf('search')<0)
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
                btn.style.visibility = 'visible'//'visible'; //'hidden'
            else
                btn.style.visibility = 'hidden'//'visible'; //'hidden'
        }

    });

    let _div = document.querySelectorAll("div");
    [].forEach.call(_div,elem=>{
        
        if((elem.getAttribute('class')&&elem.getAttribute('class').indexOf('hideshooter')>=0)){
            if(updater)
                elem.style.visibility = 'visible'//'visible'; //'hidden'
            else
                elem.style.visibility = 'hidden'//'visible'; //'hidden'
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
                    rdo.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    rdo.style.visibility = 'hidden'//'visible'; //'hidden'
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
                    btn.style.visibility = 'visible'//'visible'; //'hidden'
                else
                    btn.style.visibility = 'hidden'//'visible'; //'hidden'
            }
        });
        document.getElementById('modalEmail').disabled=true;
}