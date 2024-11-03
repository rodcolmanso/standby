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

function naiveRound(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
}


// const zeroPad = (num, places) => String(num).padStart(places, '0');
function buildClassiication(rank){

    let badg=""
    let row="";


    for(let i=0; i<rank.length;i++){
        if(rank[i].divisionName==="Pistola"){
            rank[i].divisionCode="1111111111111111"+ zeroPad(rank[i].position,4);
        }else if(rank[i].divisionName==="Revolver"){
            rank[i].divisionCode="2222222222222222"+ zeroPad(rank[i].position,4);
        }else{
            rank[i].divisionCode="3333333333333333"+ zeroPad(rank[i].position,4);
        }
    }

    rank= rank.sort((a, b) => {
        // if (a.divisionCode < b.divisionCode) {
        if (a.position < b.position) {
          return -1;
        }
      });
    for(let i=0; i<rank.length;i++){

        if(rank[i].optics){
            // badg=`<i class="bi bi-dot" style="color:red !important;"></i></span>`;
            // badg_rd=`<span class="text-danger">⦿<span>`;
            badg_rd=`⦿`; //⨀
            badg_rd_sm=`⦿`;
        }else{
            badg_rd="";
            badg_rd_sm=``;
        }

        let _penal="";
        if(rank[i].bestTime>9999.99){ 
                    
            _timee= parseFloat(rank[i].bestTime.toString().slice(1)); 
            _penall= rank[i].bestTime.toString().slice(0,1);
            sScore=_timee +" +"+_penall;
            _penal="+"+rank[i].bestTime.toString().slice(0,1);
            _time= naiveRound(parseFloat(rank[i].bestTime.toString().slice(1)),2).toFixed(2);
            

        }else{
            _timee= rank[i].bestTime;
            sScore= ''+_timee;
            _penal="";
            _time= naiveRound(parseFloat(rank[i].bestTime),2).toFixed(2);
        }
 
        row+= `<tr>
              <td class="text-small text-sm-start nowrap d-none d-xl-block text-truncate"><b>${rank[i].divisionName}</b></td>
              <td class="text-start nowrap text-small">
                <p class="d-none d-xl-block" style="margin-bottom: 0 !important;">
                <span class="badge text-bg-secondary">${rank[i].gun}
                    <span class="position-absolute translate-middle badge bg-danger rounded-pill">${badg_rd}</span>
                </span>
                </p>
                <p class="d-xl-none" style="margin-bottom: 0 !important;">
                <span class="badge text-bg-secondary">${rank[i].model} ${rank[i].caliber}
                    <span class="position-absolute translate-middle badge bg-danger rounded-pill">${badg_rd_sm}</span>
                </span>
                </p>
              </td>
              <td class="text-end text-small">
                <p style="margin-bottom: 0 !important;">
                  <span class="badge text-bg-warning" >${_time}
                    <span class="position-absolute translate-middle badge bg-danger rounded-pill">${_penal}</span>
                  </span>
                </p>
              </td>
              <td class="text-end text-small">${rank[i].position}º</td>
              <!--<td class="text-truncate text-start d-none d-xl-block"><a class="text-small" href="/qualify.html?event_id=${rank[i].eventId}&selected_division=${rank[i].divisionId}">${rank[i].eventName}</a></td>-->
              <td class="text-small text-sm-center"><a class="text-small" href="/qualify.html?event_id=${rank[i].eventId}&selected_division=${rank[i].divisionId}">${(new Date(rank[i].clockDate)).toLocaleDateString()}</a></td>
            </tr>`;
    }

    document.getElementById("table-classification").innerHTML= row;

}

function listAcerto(acervo){

    let row='';

    for(let i=0; i<acervo.length;i++){
        row+= `<tr class="">
                  <td class="clickable-row" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${i}" class="item-align-middle text-start" > ${acervo[i].gun}</td>
                  <td class="clickable-row" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${i}">${acervo[i].serialNum}</td>
                  <td class="clickable-row" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${i}">${acervo[i].regNum}</td>
                  <td scope="col" class="d-none  d-lg-table-cell clickable-row" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${i}" >${acervo[i].regExpirationDate===null?"":(new Date(acervo[i].regExpirationDate)).toLocaleDateString()}</td>
                  <td scope="col" class="d-none  d-lg-table-cell clickable-row" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${i}" >${acervo[i].active===false?"Inativa":"Ativa"}</td>
                  <td class="" >
                    <button type="button" class="btn btn-sm btn-danger rounded-circle disableshooter" value="xxxx" onclick="deleteAcervo(${i});">-</button>
                  </td>
               </tr>`;
    }

    document.getElementById("division-table").innerHTML= row;
}

window.onload = async () => {

    await loadPage();
    
    applySpinners(true);
    let loggedUser= getSessionDbUser();
    const user= netlifyIdentity.currentUser();

    // console.log('==================NetlifyIdentity======================');
    // console.log(JSON.stringify(user,null,2));
    // console.log('=======================================================');

    applySpinners(false);

    updater= (user&&user.app_metadata&&user.app_metadata.roles&&(user.app_metadata.roles.indexOf("admin")>=0||user.app_metadata.roles.indexOf("super")>=0)
             ||(user && user.email && eventConfig!==null && eventConfig.owners && eventConfig.owners.length>0 && eventConfig.owners.indexOf(user.email.toLowerCase().trim())>-1 ) );
    disableShooterFields(updater);

    let _headers= {"Content-type": "application/json; charset=UTF-8"} ;
    if(user&&user.token&&user.token.access_token){
        _headers.Authorization= `Bearer ${user.token.access_token}` ;
    }

    if(loggedUser===null&&(!params.id||params.id==='')){
        netlifyIdentity.open('login');
    }else if(params.id&&params.id!==''&&(loggedUser===null||params.id!==loggedUser._id)){
        
        applySpinners(true);

        await fetch('/.netlify/functions/shooters_v2?id='+params.id, {
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

    // =============Classification ===================
    applySpinners(false);
    disableShooterFields(updater);

    let _shooterId=params.id;
    if(!_shooterId)
        _shooterId= loggedUser._id;


    if(updater){
        applySpinners(true);
        acervo= await promiseOfGunCollection(_shooterId, user);
        listAcerto(acervo);
        let _userDb= getSessionDbUser();
        gunList= await promiseOfGetGunList(_userDb?_userDb._id:null,null);
        gunList= gunList.sort((a, b) => {
            if (a.type < b.type) {
            return -1;
            }
        });

        dropDown= document.getElementById("gunId");

        for(let j=0;j<gunList.length;j++){
            newOption = new Option("["+gunList[j].type +"] "+gunList[j].alias, gunList[j]._id);
            if(gunList[j]._id!== gunOthers._id)
                dropDown.add(newOption);
        }
        newOption = new Option("OUTRA (Especificar)", gunOthers._id);
        dropDown.add(newOption);
    }

    fetch('/.netlify/functions/time-records?rank=2&shooterId='+ _shooterId , {
        method: "GET",
        headers: _headers
        }
    ).then(response => response.json()
    ).then(json => {
            if(json.length>0){
                buildClassiication(json );
            }else{ 
            console.log(`Ranking não encontrado. `);
            // alert(`Rank do atirador não encontrado.`);
             }
        }
    ).catch(err => {console.log(`Error getting user rank: ${err}`); alert(`Erro ao localizar ranking.`); }
    ).finally(()=> {applySpinners(false);disableShooterFields(updater);});
    //================================================

    
    applySpinners(false);

    disableShooterFields(updater);
};

let acervo;

document.getElementById('docnum').addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = formatCpf(value,true);
    e.target.value = cpfPattern;
  });

document.getElementById("btn-new-acervo").addEventListener('change', function(e) {
    var value = e.target.value;
    var cpfPattern = formatCpf(value,true);
    e.target.value = cpfPattern;
});

function saveShooter(){
    let _UshooterData={};
    _UshooterData._id= document.getElementById('_id').value;
    document.getElementById('modalEmail').value= document.getElementById('modalEmail').value.toLowerCase().trim().replaceAll('"','').replaceAll("'","").replaceAll('`','');
    _UshooterData.email= document.getElementById('modalEmail').value.toLowerCase().trim();
    _UshooterData.docnum= document.getElementById('docnum').value.replaceAll('.','').replaceAll('-','');

    
    if (!updater && !validaCPF(_UshooterData.docnum)) {
      alert('CPF inválido. Verifique o número digitado.');
      document.getElementById('docnum').focus();
      return 0;
    }

    document.getElementById('modalName').value= document.getElementById('modalName').value.replaceAll('"','').replaceAll("'","").replaceAll('`','');
    _UshooterData.name= document.getElementById('modalName').value;

    if(document.getElementById('modalOption2').checked)
        _UshooterData.category=2;

    else if(document.getElementById('modalOption5').checked)
        _UshooterData.category=5;

    else //(document.getElementById('modalOption0').checked)
    _UshooterData.category=0;
  

    _UshooterData.img= document.getElementById('pic-profile').src;
    _UshooterData.imgChanged= (document.getElementById('imgChanged').value||document.getElementById('imgChanged').value==='true');
    _UshooterData.fullName = document.getElementById('fullName').value;
    _UshooterData.birthday = new Date(document.getElementById('birthday').value);
    _UshooterData.sex      = document.getElementById('sexo').value;
    _UshooterData.cr       = document.getElementById('cr').value;
    _UshooterData.crEndDate= document.getElementById('cr_validade').value !== ""? new Date(document.getElementById('cr_validade').value) :null;

    if(eventConfig!==null){
        if(eventConfig._id!==null){
           _UshooterData.eventId=eventConfig._id;
        }
        if(eventConfig.owners!==null){
            _UshooterData.eventOwners=eventConfig.owners;
         }
    }

    // alert(JSON.stringify(_UshooterData,null,2));
    applySpinners(true);
    fetch('/.netlify/functions/shooters_v2?id='+_UshooterData._id, {
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
                }else if(response.status===408){
                    alert(`ERRO! Email já cadastrado para outro Atirador.`);
                    document.getElementById('modalEmail').value= shooterData.email.toLowerCase().trim();
                }else if(response.status===401){
                    alert(`ERRO! Você não tem permissão para executar essa ação.`);
                } else{
                    alert(`ERRO! Algo deu errado na atualização do atirador. Tente novamente mais tarde.`);
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

            if(netlifyIdentity.currentUser().email.toLowerCase().trim()===json.email.toLowerCase().trim()){
                setSessionDbUser(_UshooterData);
                loadingUserSession(netlifyIdentity.currentUser());
                // buildShooterForm();
            }
            alert('Atirador'+_a+' '+json.name+' atualizad'+_oa+' com sucesso.');
            disableShooterFields(updater);
            
        })
        .catch(err => console.log(`Error updating atirador, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});
}

function buildShooterForm(){

    const _shooterid= shooterData===null?'.jpg'+(Math.random()*1000000).toString():shooterData._id;
        document.getElementById('pic-profile').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+_shooterid+".jpg?"+uuidv4();

        document.getElementById('imgChanged').value=false;

        document.getElementById('_id').value= shooterData._id;
        document.getElementById('modalEmail').value= shooterData.email.toLowerCase().trim();
        document.getElementById('modalEmail').disabled=true;
        document.getElementById('docnum').value= formatCpf(shooterData.docnum,false);
        document.getElementById('modalName').value= shooterData.name;

        document.getElementById('fullName').value= shooterData.fullName?shooterData.fullName:"";
        document.getElementById('birthday').value= (shooterData.birthday?shooterData.birthday.substring(0,10):"");
        document.getElementById('sexo').value= shooterData.sex?shooterData.sex:"";
        document.getElementById('cr').value= shooterData.cr?shooterData.cr:"";
        document.getElementById('cr_validade').value= shooterData.crEndDate?shooterData.crEndDate.substring(0,10):"";

        if(!shooterData.category|| shooterData.category===null)
            shooterData.category=0;

        document.getElementById('modalOption0').checked = (shooterData.category===0);
        document.getElementById('modalOption2').checked = (shooterData.category===2);
        document.getElementById('modalOption5').checked = (shooterData.category===5);

}

document.getElementById('modalOption2').addEventListener('click', e => {
    var _checked = e.target.checked;
    if(_checked){
        document.getElementById('sexo').value= "F";
    }
  });

  document.getElementById('modalOption0').addEventListener('click', e => {
    var _checked = e.target.checked;
    if(_checked){
        document.getElementById('sexo').value= "M";
    }
  });

  document.getElementById('modalOption5').addEventListener('click', e => {
    var _checked = e.target.checked;
    if(_checked){
        document.getElementById('sexo').value= "M";
    }
  });

  document.getElementById('sexo').addEventListener('change', e => {
    var _value = e.target.value;
    if(_value==="F"){
        document.getElementById('modalOption2').checked = true;
        document.getElementById('modalOption0').checked = false;
        document.getElementById('modalOption5').checked = false;
    }else if(_value==="M" && document.getElementById('modalOption2').checked){
        document.getElementById('modalOption2').checked = false;

        _bday= document.getElementById('birthday').value;
        _age= _bday===""? null: getAge(new Date(_bday));

        if(_age!==null && _age > SENIOR_AGE ){
            document.getElementById('modalOption0').checked = false;
            document.getElementById('modalOption5').checked = true;
        }else{
            document.getElementById('modalOption0').checked = true;
            document.getElementById('modalOption5').checked = false;
        }

    }
  });

  function getAge(_d){
    return  moment().diff(moment(_d), 'year');
  }

  document.getElementById('birthday').addEventListener('change', e => {
    var _value = e.target.value;

    if( !document.getElementById('modalOption2').checked && _value!==""){

        var _age= getAge(new Date(_value));

        if (_age > SENIOR_AGE){
            document.getElementById('modalOption0').checked = false;
            document.getElementById('modalOption2').checked = true;
            document.getElementById('modalOption5').checked = true;
        }else{
            document.getElementById('modalOption0').checked = true;
            document.getElementById('modalOption2').checked = false;
            document.getElementById('modalOption5').checked = false;
        }
    }
  });


const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
        type: blob.type,
    });
};

// Get the selected file from the file input
const input = document.getElementById('pic-profile');
input.addEventListener('change', async (e) => {
    // Get the files
    if(document.getElementById('imgChanged').value||document.getElementById('imgChanged').value===true){
    const { files } = e.target;

    // No files selected
    if (!files.length) return;

    // We'll store the files in this data transfer object
    const dataTransfer = new DataTransfer();

    // For every file in the files list
    for (const file of files) {
        // We don't have to compress files that aren't images
        if (!file.type.startsWith('image')) {
            // Ignore this file, but do add it to our result
            dataTransfer.items.add(file);
            continue;
        }

        // We compress the file by 50%
        const compressedFile = await compressImage(file, {
            quality: 0.5,
            type: 'image/jpeg',
        });

        // Save back the compressed file instead of the original file
        dataTransfer.items.add(compressedFile);
    }

    // Set value of the file input to our new files list
    e.target.files = dataTransfer.files;
    }
});

async function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);

    // ------------------
const { files } = event.target;
// We'll store the files in this data transfer object
const dataTransfer = new DataTransfer();

// For every file in the files list
for (const file of files) {
    // We don't have to compress files that aren't images
    if (!file.type.startsWith('image')) {
        // Ignore this file, but do add it to our result
        dataTransfer.items.add(file);
        continue;
    }

    // We compress the file by 25%
    const compressedFile = await compressImage(file, {
        quality: 0.15,
        type: 'image/jpeg',
    });

    // Save back the compressed file instead of the original file
    dataTransfer.items.add(compressedFile);
}

// Set value of the file input to our new files list
event   .target.files = dataTransfer.files;
    // ----------------------

    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
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

function hrefQualify(){
    window.location.href = window.location="/qualify.html";
}

function hrefMatches(){
    window.location.href = window.location="/matches.html";
}
let eventConfig;
async function loadPage(){
    
    // loggedUser= netlifyIdentity.currentUser();
    
    applySpinners(true);
    // document.getElementById('nav-shooter').classList.add('active');
    eventConfig = await promiseOfSessionEventConfig(null,netlifyIdentity.currentUser());
    // if(eventConfig){
    //     document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none" href="/event-details.html?event_id=${eventConfig._id}">${eventConfig.name}</a>`;
    //     document.getElementById('nav-matches').disabled=false;
    //     document.getElementById('nav-qualify').disabled=false;
    // }else{
    //     document.getElementById('nav-matches').style.display='none';
    //     document.getElementById('nav-qualify').style.display='none';
    // }

    applySpinners(false);
    disableShooterFields(updater);

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
            if(updater)
                elem.style.display = ''//'visible'; //'hidden'
            else
                elem.style.display = 'none'//'visible'; //'hidden'
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

    document.getElementById('modalEmail').disabled=true;
    if(document.getElementById('docnum').value.indexOf('**')>-1){
        document.getElementById('docnum').disabled==true;
    }

    let _select = document.querySelectorAll("select");
    [].forEach.call(_select,btn=>{
        if(btn.getAttribute('class').indexOf('disableshooter')>=0)
            btn.disabled=!updater;
    });

}

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const idx = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.

    if(idx==="-1" || idx===-1 || idx<0){

        document.getElementById("gunCollectionId").value= null;

        let _shooterId=params.id;
        if(!_shooterId)
            _shooterId= getSessionDbUser()._id;
        document.getElementById("shooterId").value= _shooterId;
        document.getElementById("gunId").value= "";
        document.getElementById("acervoIdx").value= -1;
        $("#div-gun").addClass('d-none');
        $("#gun").removeAttr('required');
        document.getElementById("gun").value= "";
        document.getElementById("serialNum").value= "";
        document.getElementById("regType").value= "";
        document.getElementById("regNum").value= "";
        document.getElementById("regExpirationDate").value= "";
        document.getElementById("gunOwner").value= "";
        document.getElementById("acerveFolder").value= "1";
        document.getElementById("active").checked= true;

    }else{

        document.getElementById("gunCollectionId").value= acervo[idx]._id;
        document.getElementById("shooterId").value= acervo[idx].shooterId;
        document.getElementById("gunId").value= acervo[idx].gunId;
        document.getElementById("acervoIdx").value= idx;

        if(document.getElementById("gunId").value===gunOthers._id){
            $("#div-gun").removeClass('d-none');
            $("#gun").attr('required', '');
        }else{
            $("#div-gun").addClass('d-none');
            $("#gun").removeAttr('required');
        }

        document.getElementById("gun").value= acervo[idx].gun;
        document.getElementById("serialNum").value= acervo[idx].serialNum;
        document.getElementById("regType").value= acervo[idx].regType;
        document.getElementById("regNum").value= acervo[idx].regNum;
        document.getElementById("regExpirationDate").value= acervo[idx].regExpirationDate===null?"":acervo[idx].regExpirationDate.substring(0,10);
        document.getElementById("gunOwner").value= acervo[idx].gunOwner;
        document.getElementById("acerveFolder").value= acervo[idx].note;
        document.getElementById("active").checked= acervo[idx].active;
    }

  })
}

document.getElementById("gunId").addEventListener('change', function(e) {
    
    if(e.target.value===gunOthers._id){
        $("#div-gun").removeClass('d-none');
        // $("gun").attr('required', true);
        document.getElementById("gun").required= true;
    }else{
        $("#div-gun").addClass('d-none');
        // $("#gun").removeAttr('required');
        document.getElementById("gun").required= false;
    }
    
});

function submitAcerto(){
    return 0;
}
//Save (new) gun
document.getElementById("form_acervo").addEventListener('submit', function(e) {

    e.stopPropagation();
    let gunData={};
    gunData._id                 = document.getElementById("gunCollectionId").value;
    gunData.shooterId           = document.getElementById("shooterId").value;
    gunData.gunId               = document.getElementById("gunId").value;
    gunData.gun                 = document.getElementById("gun").value;
    gunData.serialNum           = document.getElementById("serialNum").value;
    gunData.regType             = document.getElementById("regType").value;
    gunData.regNum              = document.getElementById("regNum").value;
    let exDate= document.getElementById("regExpirationDate").value
    gunData.regExpirationDate   = exDate===""?null:new Date(exDate);
    gunData.gunOwner            = document.getElementById("gunOwner").value;
    gunData.acerveFolder        = document.getElementById("acerveFolder").value;
    gunData.active              = document.getElementById("active").checked;
    gunData.note                = document.getElementById("note").value;


    if(gunData.gunId!==gunOthers._id){
        let gIdx= getGunIdxById(gunData.gunId);
        gunData.gun= gunList[gIdx].factory+" "+gunList[gIdx].model+" ("+gunList[gIdx].caliber+")";
    }
    
    e.stopPropagation();

    applySpinners(true);
    fetch('/.netlify/functions/gun_collection', {
        method: "POST",
        body: JSON.stringify(gunData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
           ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
        }
        })
        // .then(response => response.json())
        .then(function(response) {
            console.log(response.status); // Will show you the status

            if (!response.ok) {
                if(response.status===401){
                    alert(`ERRO! Não autorizado.`);
                }else if(response.status===404){
                    alert(`ERRO! Acervo não encontrado.`);
                }
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(json => {

            let updacervoIdx=  document.getElementById("acervoIdx").value;
            if(updacervoIdx>=0){
                acervo[updacervoIdx]= json;
            }else{
                acervo.push(json);
                document.getElementById("acervoIdx").value= acervo.length-1;
                updacervoIdx=  document.getElementById("acervoIdx").value;
                document.getElementById("btn-close-modal-acervo").click();
            }
            
            document.getElementById("gunCollectionId").value= json._id.toString();

            listAcerto(acervo);

            // alert('Acervo atualizado com sucesso.');
            
        })
        .catch(err => console.log(`Error updating acervo, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
});

function getGunIdxById(id){

    for(let i=0;i<gunList.length;i++){
        if(id===gunList[i]._id){
            return i;
        }
    }

    return -1;

}

function deleteAcervo(idx){

    if(!confirm("Excluir "+acervo[idx].gun+" de seu acervo?")){
        return 0;
    }

    applySpinners(true);
    fetch('/.netlify/functions/gun_collection', {
        method: "DELETE",
        body: JSON.stringify(acervo[idx]),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
           ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
        }
        })
        // .then(response => response.json())
        .then(function(response) {
            console.log(response.status); // Will show you the status

            if (!response.ok) {
                if(response.status===401){
                    alert(`ERRO! Não autorizado.`);
                }else if(response.status===404){
                    alert(`ERRO! Acervo não encontrado.`);
                }
                throw new Error("HTTP status " + response.status);
            }
            const fistP= acervo.slice(0, idx);
            const lastP= acervo.slice(idx + 1);
            acervo= fistP.concat(lastP);

            listAcerto(acervo);

            // alert('Acervo excluido com sucesso.');
            
        })
        .catch(err => console.log(`Error updating acervo, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});

    
}