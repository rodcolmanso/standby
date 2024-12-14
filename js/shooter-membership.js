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

    let hasPendingPayments=false;
    idxPendingPaymentOneYear= null;
    idxPendingPaymentTwoYears= null;

    for(let i=0; i<shooter[0].payments.length;i++){

        let _dArr= new Date().toLocaleDateString().substring(0,10).split('/');
        let _d= new Date(_dArr[2]+'-'+_dArr[1]+'-'+_dArr[0]);

        let _dueDArr= new Date(shooter[0].payments[i].dueDate).toLocaleDateString().substring(0,10).split('/');
        let _dueD= new Date(_dueDArr[2]+'-'+_dueDArr[1]+'-'+_dueDArr[0]);

        
        if(shooter[0].payments[i].status===0){
            bgStatus= 'bg-success'
        }else if (shooter[0].payments[i].status===2 || _dueD.getTime() < _d.getTime() ){
            bgStatus= 'bg-danger';
            shooter[0].payments[i].status=2;
        }else{
            bgStatus= 'text-dark bg-warning';
            hasPendingPayments= true;
            if(shooter[0].payments[i].membershipTier==="anual")
                idxPendingPaymentOneYear= i;
            else{
                idxPendingPaymentTwoYears= i;
            }
        }

        row+= `<tr class="clickable-row" onClick="showPayment(${i});">
                <th scope="col" class="item-align-middle text-start">${shooter[0].payments[i].referringTo} ${(new Date(shooter[0].payments[i].termIni)).toLocaleDateString()} - ${(new Date(shooter[0].payments[i].termEnd)).toLocaleDateString()}</th>
                <td scope="col" class="d-none  d-lg-table-cell" >${(new Date(shooter[0].payments[i].dueDate)).toLocaleDateString()}</td>
                <!--<td scope="col" class="d-none  d-lg-table-cell" >${(new Date(shooter[0].payments[i].dueDate)).toLocaleDateString()}</td>-->
                <td scope="col" class="d-none  d-lg-table-cell" >${formatter.format(shooter[0].payments[i].value)}</td>
                <td scope="col" class="" ><span class="badge ${bgStatus}">${descPayStatus[shooter[0].payments[i].status]}</span></td>
                <td scope="col" class="" ><i class=" btn fa-solid fa-qrcode"></i>${shooter[0].payments[i].bankTxId}</td>
            </tr>`;
    }

    document.getElementById("payment-table").innerHTML= row;

    if(hasPendingPayments&&!loopPaymentOn){
        checkNewPaymentList = setInterval(myTimerRefreshPaymentList, 10000);
        loopPaymentOn= true; 
    }else if(!hasPendingPayments&&loopPaymentOn){
        clearInterval(checkNewPaymentList);
        loopPaymentOn=false;
    }

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

function showPayment(idx){
    
    document.getElementById("membershipTier").value=shooterPayments[0].payments[idx].membershipTier;
    document.getElementById("bankTxId").value= shooterPayments[0].payments[idx].bankTxId;

    if(shooterPayments[0].payments[idx].membershipTier==="anual"){
        document.getElementById("mDays").value= 366
    }else if(shooterPayments[0].payments[idx].membershipTier==="2 anos"){
        document.getElementById("mDays").value= 731
    }else{
        document.getElementById("mDays").value= 0;
    }

    document.getElementById("lableModalMembership").innerText= 'Filiação '+shooterPayments[0].payments[idx].membershipTier;

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
    document.getElementById("newMembershipStart").value= new Date(shooterPayments[0].payments[idx].termIni).toISOString().split('T')[0];
    document.getElementById("newMembershipStart").max= maxNewMembershipStart;

    document.getElementById("newMembershipStart").disabled= true;
    addClass(document.getElementById("obsHabit"),"d-none");

    document.getElementById("newMembershipExpirationDate").innerText=  new Date(shooterPayments[0].payments[idx].dueDate).toLocaleDateString();
    document.getElementById("newMembershipValue").innerText= 'R$'+formatter.format(shooterPayments[0].payments[idx].value);
    
    
    let _dArr= new Date().toLocaleDateString().substring(0,10).split('/');
    let _dtHj= new Date(_dArr[2]+'-'+_dArr[1]+'-'+_dArr[0]);

    let _dueDArr= new Date(shooterPayments[0].payments[idx].dueDate).toLocaleDateString().substring(0,10).split('/');
    let _dueD= new Date(_dueDArr[2]+'-'+_dueDArr[1]+'-'+_dueDArr[0]);

    let bgStatusPgto='';
        
    if(shooterPayments[0].payments[idx].status===0){
        bgStatusPgto= `<span class="badge bg-success text-truncate" id="newMembershipStatus">pago</span>`;
    }else if (shooterPayments[0].payments[idx].status===2 || _dueD.getTime() < _dtHj.getTime() ){
        bgStatusPgto= `<span class="badge bg-danger text-truncate" id="newMembershipStatus">vencido</span>`;
    }else{
        bgStatusPgto= `<span class="badge bg-warning text-dark text-truncate" id="newMembershipStatus">aguardando pagamento</span>`;
        checkPaymentInterval = setInterval(myTimer, 2000);
    }
    
    document.getElementById("newMembershipStatus").innerHTML= bgStatusPgto;
    document.getElementById("newMembershipPgtoDate").innerText= shooterPayments[0].payments[idx].paymentDate?new Date(shooterPayments[0].payments[idx].paymentDate).toLocaleDateString():"";

    document.getElementById("newMembershipEnd").value= new Date(shooterPayments[0].payments[idx].termEnd).toISOString().split('T')[0];

    qrcode.clear();
    qrcode.makeCode(shooterPayments[0].payments[idx].pixcode);
    document.getElementById("pixcode").innerText= shooterPayments[0].payments[idx].pixcode;
    document.getElementById("btnCopyPixCode").value= shooterPayments[0].payments[idx].pixcode;
    document.getElementById("membership_payments_id").value= shooterPayments[0].payments[idx]._id;
    
    document.getElementById("btn-open-modal").click();
}


let checkNewPaymentList;
function myTimerRefreshPaymentList() {
    console.log('======looping refresh payment table =============');
    promiseGetMembershipPayments(shooterPayments[0]._id, netlifyIdentity.currentUser());
}

let checkPaymentInterval;
function myTimer() {
    console.log('======looping refresh payment modal =============');
    let idx= null;

    for(let i=0;i<shooterPayments[0].payments.length;i++){
        if(document.getElementById("bankTxId").value===shooterPayments[0].payments[i].bankTxId){
            idx=i;
            break;
        }
    }

    // console.log(' Modal Interval. idx=',idx);

    if(idx!==null){
        let _dArr= new Date().toLocaleDateString().substring(0,10).split('/');
        let _dtHj= new Date(_dArr[2]+'-'+_dArr[1]+'-'+_dArr[0]);

        let _dueDArr= new Date(shooterPayments[0].payments[idx].dueDate).toLocaleDateString().substring(0,10).split('/');
        let _dueD= new Date(_dueDArr[2]+'-'+_dueDArr[1]+'-'+_dueDArr[0]);

        let bgStatusPgto='';
            
        if(shooterPayments[0].payments[idx].status===0){
            bgStatusPgto= `<span class="badge bg-success text-truncate" id="newMembershipStatus">pago</span>`;
        }else if (shooterPayments[0].payments[idx].status===2 || _dueD.getTime() < _dtHj.getTime() ){
            bgStatusPgto= `<span class="badge bg-danger text-truncate" id="newMembershipStatus">vencido</span>`;
        }else{
            bgStatusPgto= `<span class="badge bg-warning text-dark text-truncate" id="newMembershipStatus">aguardando pagamento</span>`;
        }
        
        document.getElementById("newMembershipStatus").innerHTML= bgStatusPgto;
        document.getElementById("newMembershipPgtoDate").innerText= shooterPayments[0].payments[idx].paymentDate?new Date(shooterPayments[0].payments[idx].paymentDate).toLocaleDateString():"";
    }

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
    // paymentData.shooterId           = shooterData[0]._id;
    // paymentData.rangeId             = '';
    // paymentData.referringTo         = 'membership';
    paymentData.termIni             = new Date(document.getElementById("newMembershipStart").value);
    paymentData.termEnd             = new Date(document.getElementById("newMembershipEnd").value);
    // paymentData.issueDate           = new Date((new Date()).toDateString());
    // paymentData.dueDate             = addDays(new Date(),3);
    
    // paymentData.bankTxId            = document.getElementById("bankTxId").value;
    // paymentData.bankTxId            = uuidv4();
    // paymentData.status              = 1;
    // paymentData.value               = parseFloat(document.getElementById("newMembershipValue").innerText.replaceAll('R$','').replaceAll(' ','').replaceAll(',','.')).toFixed(2);
    // paymentData.pixcode           = '00020101021226930014BR.GOV.BCB.PIX2571spi-qrcode.bancointer.com.br/spi/pj/v2/13bebf1b25f946fe899080831b1de03252040000530398654040.115802BR5901*6013SANTANA DE PA61080651948062070503***630484DE';
    
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
    
    // addClass(document.getElementById('cardPix'),'d-none');
    applySpinners(true);
    fetch('/.netlify/functions/shooter-payments', {
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
            qrcode.makeCode(json.pixcode);
            document.getElementById("pixcode").innerText= json.pixcode;
            document.getElementById("btnCopyPixCode").value= json.pixcode;
            document.getElementById("membership_payments_id").value= json._id;
            removeClass(document.getElementById('cardPix'),'d-none');

            document.getElementById("bankTxId").value= json.bankTxId;
            checkPaymentInterval = setInterval(myTimer, 2000);

            
        })
        .catch(err => console.log(`Error updating payment, error: ${err.toString()} `))
        .finally(()=> {applySpinners(false);disableShooterFields(updater);});
    
};


function deletePayment(idx){

    if(!confirm("Excluir "+acervo[idx].gun+" de seu acervo?")){
        return 0;
    }

    applySpinners(true);
    fetch('/.netlify/functions/shooter-payments', {
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

let loopPaymentOn= false;
const promiseGetMembershipPayments = (_shooterId, _identityUser)=>{

    let _headers;
    if(_identityUser!==null){
        _headers= {"Content-type": "application/json; charset=UTF-8"
                ,"Authorization":`Bearer ${_identityUser.token.access_token}`}
    }else{
        return []; //_headers= {"Content-type": "application/json; charset=UTF-8"}
    }
    
        // var counter = 0;
    // var i = setInterval(async function () {

            console.log('==========fetching on promise==========');
            
            fetch("/.netlify/functions/shooter-payments?shooterId="+_shooterId , { //+ '&termDate=2024-05-20'
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
            
    // }, 2 * 10000);    
    
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

  let idxPendingPaymentOneYear=null;
  document.getElementById("btn-new-membershipOne").addEventListener('click', function(e) {
    
    if(idxPendingPaymentOneYear!==null){
        showPayment(idxPendingPaymentOneYear);
    }else{
    
        document.getElementById("newMembershipStart").disabled=false;
        if(!netlifyIdentity.currentUser()){
            netlifyIdentity.open('signup')
        }else{
            document.getElementById("membershipTier").value="anual";
            addMembershipPayment("anual", 366, 102.17);
            if(!loopPaymentOn){
                checkNewPaymentList = setInterval(myTimerRefreshPaymentList, 10000);
                loopPaymentOn= true; 
            }
            document.getElementById("btn-open-modal").click();
        }
    }
  });

  let idxPendingPaymentTwoYears=null;
  document.getElementById("btn-new-membershipTwo").addEventListener('click', function(e) {

    if(idxPendingPaymentTwoYears!==null){
        showPayment(idxPendingPaymentTwoYears);
    }else{
        document.getElementById("newMembershipStart").disabled=false;
        if(!netlifyIdentity.currentUser()){
            netlifyIdentity.open('signup')
        }else{
            document.getElementById("membershipTier").value="2 anos";
            addMembershipPayment("2 anos", 731, 193.71);
            if(!loopPaymentOn){
                checkNewPaymentList = setInterval(myTimerRefreshPaymentList, 10000);
                loopPaymentOn= true; 
            }
            document.getElementById("btn-open-modal").click();
        }
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
    paymentData.shooterName         = shooterPayments[0].name;
    paymentData.shooterDocnum       = shooterPayments[0].docnum;
    paymentData.membershipTier      = document.getElementById("membershipTier").value;
    paymentData.rangeId             = '';
    paymentData.referringTo         = 'membership';
    paymentData.termIni             = new Date(document.getElementById("newMembershipStart").value);
    paymentData.termEnd             = new Date(document.getElementById("newMembershipEnd").value);
    paymentData.issueDate           = new Date((new Date()).toDateString());
    
    paymentData.dueDate             = addDays(new Date(),3).toISOString().split('T')[0];
    
    // paymentData.bankTxId            = document.getElementById("bankTxId").value;
    // paymentData.bankTxId            = uuidv4();
    paymentData.status              = 1;
    paymentData.value               = parseFloat(document.getElementById("newMembershipValue").innerText.replaceAll('R$','').replaceAll(' ','').replaceAll(',','.')).toFixed(2);
    // paymentData.pixcode           = '00020101021226930014BR.GOV.BCB.PIX2571spi-qrcode.bancointer.com.br/spi/pj/v2/13bebf1b25f946fe899080831b1de03252040000530398654040.115802BR5901*6013SANTANA DE PA61080651948062070503***630484DE';

    submitPayment(paymentData);
    
    //TODO: Insert or update transaction into DB

  }

//   const qrcode = new QRCode("qrcode");
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    correctLevel : QRCode.CorrectLevel.L
});

document.getElementById('staticBackdrop').addEventListener('hidden.bs.modal', function (event) {
    clearInterval(checkPaymentInterval);
    promiseGetMembershipPayments(shooterPayments[0]._id, netlifyIdentity.currentUser());
});

