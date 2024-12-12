let updater= false;

const descPayStatus=['pago', 'aguardando pagto','vencido']
const descMemberStatus=['ativa', 'não filiado','expirada','cancelada', 'suspensa']

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

var options = { style: 'currency', currency: 'BRL' };
var formatter = new Intl.NumberFormat('pt-BR', options);

function listPayments(shooter){

    let row='';
    let bgStatus= 'bg-success'


    for(let i=0; i<shooter[0].payments.length;i++){
    bgStatus= 'bg-success'
    if(shooter[0].payments[i].status===1){
        bgStatus= 'text-dark bg-warning';
    }else if (shooter[0].payments[i].status===2){
        bgStatus= 'bg-danger';
    }

    row+= `<tr>
            <th scope="col" class="item-align-middle text-start">${shooter[0].payments[i].referringTo} ${(new Date(shooter[0].payments[i].termIni)).toLocaleDateString()} - ${(new Date(shooter[0].payments[i].termEnd)).toLocaleDateString()}</th>
            <td scope="col" class="d-none  d-lg-table-cell" >${(new Date(shooter[0].payments[i].dueDate)).toLocaleDateString()}</td>
            <td scope="col" class="d-none  d-lg-table-cell" >${formatter.format(shooter[0].payments[i].value)}</td>
            <td scope="col" class="" ><span class="badge ${bgStatus}">${descPayStatus[shooter[0].payments[i].status]}</span></td>
            <td scope="col" class="" ><i class=" btn fa-solid fa-qrcode"></i>${shooter[0].payments[i].bankTxId}</td>
           </tr>`;
    }

    document.getElementById("payment-table").innerHTML= row;

    document.getElementById("membershipStart").innerText= shooter[0].membershipStart? (new Date(shooter[0].membershipStart)).toLocaleDateString():'';
    document.getElementById("membershipEnd").innerText= shooter[0].membershipEnd?(new Date(shooter[0].membershipEnd)).toLocaleDateString():"";
    
    document.getElementById("membershipStatus").innerText= descMemberStatus[shooter[0].membershipStatus!==undefined?shooter[0].membershipStatus:1];

    if(shooter[0].membershipStatus === 0){
        addClass(document.getElementById("membershipStatus"),"bg-success");
    }else if(shooter[0].membershipStatus === 1){
        addClass(document.getElementById("membershipStatus"),"bg-secondary");
    }else{
        addClass(document.getElementById("membershipStatus"),"bg-danger");
    }

    document.getElementById("membershipNumber").innerText= shooter[0].membershipNumber?shooter[0].membershipNumber:"";
    document.getElementById("shooter-pic").src= "https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+shooter[0]._id+".jpg?";
    document.getElementById("shooterName").innerText= shooter[0].name;
    document.getElementById("shooterCr").innerText= shooter[0].cr?shooter[0].cr:""; 

}


window.onload = async () => {

    applySpinners(true);
    shooterData= getSessionDbUser();
    const user= netlifyIdentity.currentUser();
    applySpinners(false);


    if(user && user!==null){
        //netlifyIdentity.open('login');
        document.getElementById("freeRegistration").disabled=true;
        document.getElementById("freeRegistration").innerText='Já cadastrado';
    }


    let _headers= {"Content-type": "application/json; charset=UTF-8"} ;
    if(user&&user.token&&user.token.access_token){
        _headers.Authorization= `Bearer ${user.token.access_token}`;
    }
    
    if(shooterData==null && user && user!==null){
        
        applySpinners(true);

        await fetch('/.netlify/functions/shooters_v2?email='+user.email, {
            method: "GET",
            headers: _headers
            }
        ).then(response => response.json()
        ).then(json => {
                if(json.length>0){
                    shooterData= json[0];
                    
                }else{ console.log(`Usuário não encontrado. id:${params.id}`);
                alert(`Atirador não encontrado.`); window.location.href = window.location="/";}
            }
        ).catch(err => {console.log(`Error getting user: ${err}`); alert(`Erro ao localizar atirador.`); window.location.href = window.location="/";}
        ).finally(()=> {applySpinners(false);disableShooterFields(updater);});        
    
    }else{

        updater= true;
        
    }

    updater= (user&&user.app_metadata&&user.app_metadata.roles&&(user.app_metadata.roles.indexOf("admin")>=0 /*||user.app_metadata.roles.indexOf("super")>=0*/)
            // || (shooterData && shooterData.email && user && user.email && user.email.toLowerCase().trim() === shooterData.email.toLowerCase().trim())
            //  ||(user && user.email && eventConfig!==null && eventConfig.owners && eventConfig.owners.length>0 && eventConfig.owners.indexOf(user.email.toLowerCase().trim())>-1 ) 
            );

    loadPageProfile(2);
    document.getElementById("nav-item_tab_2").style.display='';
    
    // =============Get Payments ===================
    applySpinners(true);
    
    let _shooterId=params.id;
    if(!_shooterId)
        _shooterId= shooterData._id;
    
    if(!updater && shooterData && _shooterId!==shooterData._id){
        _shooterId= shooterData._id;
    }

    if(user && shooterData && shooterData.docnum && shooterData.docnum!==null){
        // applySpinners(true);
        promiseGetMembershipPayments(_shooterId, user);

    }

    //================================================

};

let shooterPayments;

document.getElementById("newMembershipStart").addEventListener('change', function(e) {
     var value = e.target.value;
    
    if(value==="" || (new Date(value)).getTime()<(new Date(e.target.min)).getTime()){
        e.target.value=e.target.min;
    }

    if((new Date(value)).getTime()>(new Date(e.target.max)).getTime()){
        e.target.value=e.target.max;
    }

    document.getElementById("newMembershipEnd").value= addDays(new Date(e.target.value),Number(document.getElementById("mDays").value)).toISOString().split('T')[0];

    let paymentData={};
    paymentData._id                 = document.getElementById("membership_payments_id").value;
    // paymentData.shooterId           = shooterPayments[0]._id;
    // paymentData.rangeId             = '';
    // paymentData.referringTo         = 'membership';
    paymentData.termIni             = new Date(document.getElementById("newMembershipStart").value);
    paymentData.termEnd             = new Date(document.getElementById("newMembershipEnd").value);
    // paymentData.issueDate           = new Date((new Date()).toDateString());
    // paymentData.dueDate             = addDays(new Date(),3);
    
    // paymentData.bankTxId            = document.getElementById("bankTxId").value;
    // paymentData.bankTxId            = uuidv4();
    // paymentData.status              = 1;
    paymentData.value               = parseFloat(document.getElementById("newMembershipValue").innerText.replaceAll('R$','').replaceAll(' ','').replaceAll(',','.')).toFixed(2);
    paymentData.pixqrcode           = 'QRCODE QRCODE QRCODE '+paymentData.bankTxId+ ' QRCODE QRCODE';
    paymentData.pixcode             = 'PIXCODE PIXCODE PIXCODE '+paymentData.bankTxId+ ' PIXCODE PIXCODE';

    submitPayment(paymentData);

});

netlifyIdentity.on('logout', () => {
    console.log('got logout on SHOOTER');
    if(!params.id)
        window.location.href = window.location="/";
    else location.reload();
});

function submitPayment(paymentData){
    
//Save payment
    
    addClass(document.getElementById('cardPix'),'d-none');
    applySpinners(true);
    fetch('/.netlify/functions/membership-payments', {
        method: "POST",
        body: JSON.stringify(paymentData),
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
                    alert(`ERRO! Pagamento não encontrado.`);
                }
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(json => {


            qrcode.clear();
            qrcode.makeCode(json.pixqrcode);
            document.getElementById("pixcode").innerText= json.pixcode;
            document.getElementById("btnCopyPixCode").value= json.pixcode;
            document.getElementById("membership_payments_id").value= json._id;
            removeClass(document.getElementById('cardPix'),'d-none');

            
        })
        .catch(err => console.log(`Error updating payment, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
};


function deletePayment(idx){

    if(!confirm("Excluir "+acervo[idx].gun+" de seu acervo?")){
        return 0;
    }

    applySpinners(true);
    fetch('/.netlify/functions/membership-payments', {
        method: "DELETE",
        body: JSON.stringify(shooterPayments[idx]),
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
            const fistP= shooterPayments.slice(0, idx);
            const lastP= shooterPayments.slice(idx + 1);
            shooterPayments= fistP.concat(lastP);

            listPayments(shooterPayments);

            // alert('Payment excluido com sucesso.');
            
        })
        .catch(err => console.log(`Error updating acervo, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
}


const promiseGetMembershipPayments = (_shooterId, _identityUser)=>{

    let _headers;
    if(_identityUser!==null){
        _headers= {"Content-type": "application/json; charset=UTF-8"
                ,"Authorization":`Bearer ${_identityUser.token.access_token}`}
    }else{
        return []; //_headers= {"Content-type": "application/json; charset=UTF-8"}
    }
    return fetch("/.netlify/functions/membership-payments?shooterId="+_shooterId , { //+ '&termDate=2024-05-20'
    method: "GET",
    headers: _headers})
    .then(r=>r.json())
    .then(data => {

        shooterPayments= data;
        listPayments(shooterPayments);

        return shooterPayments;
    }).finally(()=>{
        applySpinners(false);
        disableShooterFields(updater);
    });

};

function myFunction(elem) {
    // Get the text field
    let savedTex = elem.innerText;
      
     // Copy the text inside the text field
    navigator.clipboard.writeText(elem.value);

    elem.innerText= `Copiado`;
    new Promise(() => {
        window.setTimeout(() => {
            elem.innerText= savedTex;
        }, 3000);
    });

  }

  document.getElementById("btn-new-membershipOne").addEventListener('click', function(e) {

    if(!netlifyIdentity.currentUser()){
        netlifyIdentity.open('signup')
    }else{
        addMembershipPayment("anual", 366, 102.17);
        document.getElementById("btn-open-modal").click();
    }

  });

  document.getElementById("btn-new-membershipTwo").addEventListener('click', function(e) {
    if(!netlifyIdentity.currentUser()){
        netlifyIdentity.open('signup')
    }else{
        addMembershipPayment("2 anos", 731, 193.71);
        document.getElementById("btn-open-modal").click();
    }
  });

  function addMembershipPayment(year, mDays, value){
    
    document.getElementById("mDays").value= mDays;

    document.getElementById("lableModalMembership").innerText= 'Filiação '+year;

    let valueNewMembershipStart= "";
    let minNewMembershipStart= "";
    let maxNewMembershipStart= "";
    let hoje= new Date();
    let hojePusString= addDays(hoje,3).toISOString().split('T')[0];
    let hojeMinString= addDays(hoje,-30).toISOString().split('T')[0];

    if(!shooterPayments[0].membershipEnd || shooterPayments[0].membershipEnd===null){ //not a member yet
    
        if(shooterPayments[0].time_records.length>0){ //has habitualidades

            valueNewMembershipStart= shooterPayments[0].time_records[0].y.split('T')[0];
            maxNewMembershipStart= hojePusString;
            minNewMembershipStart= valueNewMembershipStart;

            document.getElementById("passedHabitualityCount").innerText= shooterPayments[0].time_records.length;
            document.getElementById("passedHabitualityDate").innerText= new Date(shooterPayments[0].time_records[0].y).toLocaleDateString();
            removeClass(document.getElementById("obsHabit"),"d-none");

        }else{ //does not have abitualidate
            valueNewMembershipStart= hoje.toISOString().split('T')[0];
            maxNewMembershipStart= hojePusString;
            minNewMembershipStart= hojeMinString;
        }


    }else{  // it is a member alredy - extend
        valueNewMembershipStart= shooterPayments[0].membershipEnd.split('T')[0];
        minNewMembershipStart= shooterPayments[0].membershipEnd.split('T')[0];

        maxNewMembershipStart= (new Date(shooterPayments[0].membershipEnd)).getTime() > hoje.getTime()?
                //payments[0].membershipEnd.split('T')[0]:
                addDays(new Date(shooterPayments[0].membershipEnd),2).toISOString().split('T')[0]:
                hojePusString;
    }

    
    //TODO: Criar QRCode com o Banco ou criar Webhook com o banco

    document.getElementById("newMembershipStart").min= minNewMembershipStart;
    document.getElementById("newMembershipStart").value= valueNewMembershipStart;
    document.getElementById("newMembershipStart").max= maxNewMembershipStart;

    document.getElementById("newMembershipExpirationDate").innerText= addDays(hoje,3).toLocaleDateString();
    document.getElementById("newMembershipValue").innerText= 'R$'+formatter.format(value);
    
    document.getElementById("newMembershipStatus").innerHTML= `<span class="badge bg-warning text-dark text-truncate" id="newMembershipStatus">aguardando pagto.</span>`;
    document.getElementById("newMembershipPgtoDate").innerText= '';

    document.getElementById("newMembershipEnd").value= addDays(valueNewMembershipStart,mDays).toISOString().split('T')[0];

    let paymentData={};
    // paymentData._id                 = document.getElementById("membership_payments_id").value;
    // paymentData._id                 = '';
    paymentData.shooterId           = shooterPayments[0]._id;
    paymentData.rangeId             = '';
    paymentData.referringTo         = 'membership';
    paymentData.termIni             = new Date(document.getElementById("newMembershipStart").value);
    paymentData.termEnd             = new Date(document.getElementById("newMembershipEnd").value);
    paymentData.issueDate           = new Date((new Date()).toDateString());
    paymentData.dueDate             = addDays(new Date(),3);
    
    // paymentData.bankTxId            = document.getElementById("bankTxId").value;
    paymentData.bankTxId            = uuidv4();
    paymentData.status              = 1;
    paymentData.value               = parseFloat(document.getElementById("newMembershipValue").innerText.replaceAll('R$','').replaceAll(' ','').replaceAll(',','.')).toFixed(2);
    paymentData.pixqrcode           = 'QRCODE QRCODE QRCODE '+paymentData.bankTxId+ ' QRCODE QRCODE';
    paymentData.pixcode             = 'PIXCODE PIXCODE PIXCODE '+paymentData.bankTxId+ ' PIXCODE PIXCODE';

    submitPayment(paymentData);
    
    //TODO: Insert or update transaction into DB

  }

  const qrcode = new QRCode("qrcode");


  document.getElementById('staticBackdrop').addEventListener('hidden.bs.modal', function (event) {

    promiseGetMembershipPayments(shooterPayments[0]._id, netlifyIdentity.currentUser());

    ///reload list of payments
  });