let updater= false;

netlifyIdentity.on('close', () => {
    
    if(!netlifyIdentity.currentUser()){

        if(!params.id)
            window.location.href = window.location="/";
        else
            location.reload();
    }else{
        location.reload();
    }
});

function naiveRound(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
}

function listPayments(acervo){

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

    applySpinners(true);
    let loggedUser= getSessionDbUser();
    const user= netlifyIdentity.currentUser();
    applySpinners(false);

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
                    
                }else{ console.log(`Usuário não encontrado. id:${params.id}`);
                alert(`Atirador não encontrado.`); window.location.href = window.location="/";}
            }
        ).catch(err => {console.log(`Error getting user: ${err}`); alert(`Erro ao localizar atirador.`); window.location.href = window.location="/";}
        ).finally(()=> {applySpinners(false);disableShooterFields(updater);});        
    
    }else{

        updater= true;
        shooterData= loggedUser;
    }

    updater= (user&&user.app_metadata&&user.app_metadata.roles&&(user.app_metadata.roles.indexOf("admin")>=0 /*||user.app_metadata.roles.indexOf("super")>=0*/)
            || (shooterData && shooterData.email && user && user.email && user.email.toLowerCase().trim() === shooterData.email.toLowerCase().trim())
            //  ||(user && user.email && eventConfig!==null && eventConfig.owners && eventConfig.owners.length>0 && eventConfig.owners.indexOf(user.email.toLowerCase().trim())>-1 ) 
            );

    loadPageProfile(2);
    document.getElementById("nav-item_tab_2").style.display='';
    
    // =============Get Guns ===================
    applySpinners(true);
    
    let _shooterId=params.id;
    if(!_shooterId)
        _shooterId= loggedUser._id;

    if(updater){
        // applySpinners(true);
        // acervo= await promiseOfGunCollection(_shooterId, user);
        // listAcerto(acervo);
        // let _userDb= getSessionDbUser();
        // gunList= await promiseOfGetGunList(_userDb?_userDb._id:null,null);
        // gunList= gunList.sort((a, b) => {
        //     if (a.type < b.type) {
        //     return -1;
        //     }
        // });

        // dropDown= document.getElementById("gunId");

        // for(let j=0;j<gunList.length;j++){
        //     newOption = new Option("["+gunList[j].type +"] "+gunList[j].alias, gunList[j]._id);
        //     if(gunList[j]._id!== gunOthers._id)
        //         dropDown.add(newOption);
        // }
        // newOption = new Option("OUTRA (Especificar)", gunOthers._id);
        // dropDown.add(newOption);
    }

    //================================================

        
    applySpinners(false);

    disableShooterFields(updater);
};

let acervo;

document.getElementById("btn-new-acervo").addEventListener('change', function(e) {
    var value = e.target.value;
    var cpfPattern = formatCpf(value,true);
    e.target.value = cpfPattern;
});

netlifyIdentity.on('logout', () => {
    console.log('got logout on SHOOTER');
    if(!params.id)
        window.location.href = window.location="/";
    else location.reload();
});


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

function submitAcerto(){
    return 0;
}
//Save (new) gun
// document.getElementById("form_acervo").addEventListener('submit', function(e) {

//     e.stopPropagation();
//     let gunData={};
//     gunData._id                 = document.getElementById("gunCollectionId").value;
//     gunData.shooterId           = document.getElementById("shooterId").value;
//     gunData.gunId               = document.getElementById("gunId").value;
//     gunData.gun                 = document.getElementById("gun").value;
//     gunData.serialNum           = document.getElementById("serialNum").value;
//     gunData.regType             = document.getElementById("regType").value;
//     gunData.regNum              = document.getElementById("regNum").value;
//     let exDate= document.getElementById("regExpirationDate").value
//     gunData.regExpirationDate   = exDate===""?null:new Date(exDate);
//     gunData.gunOwner            = document.getElementById("gunOwner").value;
//     gunData.acerveFolder        = document.getElementById("acerveFolder").value;
//     gunData.active              = document.getElementById("active").checked;
//     gunData.note                = document.getElementById("note").value;


//     if(gunData.gunId!==gunOthers._id){
//         let gIdx= getGunIdxById(gunData.gunId);
//         gunData.gun= gunList[gIdx].factory+" "+gunList[gIdx].model+" ("+gunList[gIdx].caliber+")";
//     }
    
//     e.stopPropagation();

//     applySpinners(true);
//     fetch('/.netlify/functions/gun_collection', {
//         method: "POST",
//         body: JSON.stringify(gunData),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//            ,"Authorization":`Bearer ${netlifyIdentity.currentUser().token.access_token}`
//         }
//         })
//         // .then(response => response.json())
//         .then(function(response) {
//             console.log(response.status); // Will show you the status

//             if (!response.ok) {
//                 if(response.status===401){
//                     alert(`ERRO! Não autorizado.`);
//                 }else if(response.status===404){
//                     alert(`ERRO! Acervo não encontrado.`);
//                 }
//                 throw new Error("HTTP status " + response.status);
//             }
//             return response.json();
//         })
//         .then(json => {

//             let updacervoIdx=  document.getElementById("acervoIdx").value;
//             if(updacervoIdx>=0){
//                 acervo[updacervoIdx]= json;
//             }else{
//                 acervo.push(json);
//                 document.getElementById("acervoIdx").value= acervo.length-1;
//                 updacervoIdx=  document.getElementById("acervoIdx").value;
//                 document.getElementById("btn-close-modal-acervo").click();
//             }
            
//             document.getElementById("gunCollectionId").value= json._id.toString();

//             listAcerto(acervo);

//             // alert('Acervo atualizado com sucesso.');
            
//         })
//         .catch(err => console.log(`Error updating acervo, error: ${err.toString()} `))
//         .finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
// });

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