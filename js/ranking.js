
const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';


const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig;
let playersArray;
let timeRecords;
let modalChanged;
let language="pt-br"

let _ord=[[0, 'asc']];

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

const event_id = params.event_id;

const promiseOfRanking = () => {

    year= document.getElementById('anoSelect').value;
    month= document.getElementById('mesSelect').value;
    adm= document.getElementById('torneiroSelect').value;

     let query='?rank=2&year='+year;
     
     if(month!==null && month!==""){
        query=query+"&month="+month
     }

     if(adm!==null && adm!==""){
        query=query+"&rangeAdm="+adm
     }

     return fetch("/.netlify/functions/time-records"+query

     )
    .then(r=>r.json())
    .then(data => {
    return data;
})};

async function submitForm(){
    applySpinners(true);
    ranking= await promiseOfRanking(); 
    buildTables();
    applySpinners(false);
    return 0;
}

async function loadPage(){
    loggedUser= netlifyIdentity.currentUser();
    document.getElementById('mesSelect').value= (new Date()).getMonth()+1;
    document.getElementById('anoSelect').value= (new Date()).getFullYear();
}

window.onload = async () => {


    applySpinners(true);
    await loadPage();
    document.getElementById('nav-ranking').classList.add('active');

    document.getElementById('nav-matches').style.display='none';
    document.getElementById('nav-qualify').style.display='none';

    ranking= await promiseOfRanking();
    buildTables();
    
    // let isAdmin= (loggedUser&&loggedUser.app_metadata.roles!==undefined&&loggedUser.app_metadata.roles!==""&&!(loggedUser.app_metadata.roles.indexOf("admin")<0));

    applySpinners(false);
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    

};

let _tbP;
let _tbR;
let _tbFL;

function filterRank(f){
 
    if(f.checked){
        if(f.id==='btn-check-lady'){
            document.getElementById('btn-check-seniors').checked= false;
        }else if(f.id==='btn-check-seniors'){
            document.getElementById('btn-check-lady').checked = false;
        }else if(f.id==='btnCheckNotF'){
            document.getElementById('btnCheckOnlyF').checked = false;
        }else if(f.id==='btnCheckOnlyF'){
            document.getElementById('btnCheckNotF').checked = false;
        }
    }

    buildTables();
}

let ranking;

async function buildTables(_tb){

    let filterCat;
    let filterF12;
    let filterOptic;

    if(document.getElementById('btn-check-lady').checked){
        filterCat= cLadies;
    }else if(document.getElementById('btn-check-seniors').checked){
        filterCat= cSeniors;
    }else{
        filterCat= null;
    }

    if(document.getElementById('btnCheckNotF').checked){
        filterF12= false;
    }else if(document.getElementById('btnCheckOnlyF').checked){
        filterF12= true;
    }else{
        filterF12= null;
    }

    if(document.getElementById('btnCheckNoRD').checked){
        filterOptic= false;
    }else{
        filterOptic= null;
    }
    

    ranking= ranking.sort((a, b) => {
        if (a.bestTime < b.bestTime) {
          return -1;
        }
      });

    let row="";

    let posPistol=0;
    let posRevolver=0;
    let posForcaLivre=0;
    let _pos;

    _tbP?_tbP.destroy():'';
    _tbP=null;
    document.getElementById('tablePistol').innerHTML= "";
    
    _tbR?_tbR.destroy():'';
    _tbR= null;
    document.getElementById('tableRevolver').innerHTML= "";

    _tbFL?_tbFL.destroy():'';
    _tbFL=null;
    document.getElementById('tableForcaLivre').innerHTML= "";
    

    for(let i=0; i< ranking.length;i++){

        if(filterCat && filterCat!== undefined && filterCat!==null && ranking[i].shooterCategory!== filterCat){
            continue;
        }

        if(filterF12!== undefined && filterF12!==null){
            
            if( filterF12 && (ranking[i].caliber.toLowerCase().trim()!== '12ga' || ranking[i].operation.toLowerCase().trim()!=="semi-auto" ))
                continue;

            if( !filterF12 && ranking[i].caliber.toLowerCase().trim()=== '12ga' && ranking[i].operation.toLowerCase().trim()==="semi-auto" )
                continue;
        }

        if(filterOptic===false && ranking[i].optics ){
            continue;   
        }

        if(ranking[i].divisionName==='Pistola'){
            posPistol++;
            _pos= posPistol;
        }else if(ranking[i].divisionName==='Revolver'){
            posRevolver++;
            _pos= posRevolver;
        }else{
            posForcaLivre++;
            _pos= posForcaLivre;
        }

        badg_rd=''; //⨀

        if(ranking[i].optics===true || ranking[i].optics==='true'){
            badg_rd='⦿'
        }

        let penal= "999";
        let time=  "4";
        let _badgeCat='<span class="d-none d-sm-block d-sm-none d-md-block fst-italic text-muted text-small badge bg-info-subtle rounded-pill text-start" style="padding-top:0px !important; width:50px !important; max-height:10px !important;">overall</span>';
        if(ranking[i].shooterCategory===cLadies){
            _badgeCat='<span class="d-none d-sm-block fst-italic text-muted text-small badge bg-danger-subtle rounded-pill text-start" style=" padding-top:0px !important; width:45px !important; max-height:10px !important;">dama</span>';
        }else if(ranking[i].shooterCategory===cSeniors){
            _badgeCat='<span class="d-none d-sm-block d-sm-none d-md-block fst-italic text-muted text-small badge bg-success-subtle rounded-pill text-start" style="padding-top:0px !important; width:50px !important; max-height:10px !important;">senior</span>';

        }

        if(Number(ranking[i].bestTime)>999.99){
            // penal= ranking[i].bestTime.toString().substring(0,1);
            // ranking[i].bestTime= Number(ranking[i].bestTime.toString().substring(1,ranking[i].bestTime.toString().length-1)).toString();
            // ranking[i].bestTime= ranking[i].bestTime.replaceAll(".",",");

            penal="+"+ranking[i].bestTime.toString().slice(0,1);
            time= naiveRound(parseFloat(ranking[i].bestTime.toString().slice(1)),2).toFixed(2);
        }else{
            penal="";
            time= naiveRound(parseFloat(ranking[i].bestTime),2).toFixed(2);
        }

        let _gbColor;
        if(_pos===1)
            _gbColor=`text-bg-purple text-lg-start`;
        else
            _gbColor=`bg-warning text-dark`;

        let _posS= zeroPad(_pos,2);
        if(ranking.length>99)
            _posS= zeroPad(_pos,3);
        

        row= `<tr>
                <td class="text-end text-small">${_posS}º</td>
                <td class="text-start ">
                    <div class="d-flex">
                        <img src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${ranking[i].shooterId}.jpg?${getCodeImg()}" class="small-profile-avatar-pic rounded-circle d-none d-sm-block" style="max-height: 30px !important;" alt="..." />
                        <span class=" d-none d-lg-block">&nbsp;${ranking[i].shooterName}</span>
                        <span class="text-small text-truncate d-lg-none">&nbsp;${ranking[i].shooterName}&nbsp;</span>
                        ${_badgeCat}
                        </div>
                </td>
                <td class="text-start">
                    <span class="d-none d-lg-block badge ${_gbColor}" style="width:45px !important;">${time}
                        <span class="position-absolute translate-middle badge bg-danger rounded-pill">${penal}</span>
                    </span>
                    <span class="text-small d-lg-none badge ${_gbColor}" style="width:38px !important;">${time}
                        <span class="position-absolute translate-middle badge bg-danger rounded-pill">${penal}</span>
                    </span>
                </td>
                <td class="text-start text-truncate">
                    <div class="d-flex">
                        <span class="d-none d-sm-block d-sm-none d-md-block">${ranking[i].factory}&nbsp</span>
                        <span class="d-none d-lg-block">
                            ${ranking[i].model} (${ranking[i].caliber})
                            <span class="text-danger">${badg_rd}</span>
                        </span>
                        <span class="text-small d-lg-none">
                            ${ranking[i].model} (${ranking[i].caliber})
                            <span class="text-danger">${badg_rd}</span>
                        </span>
                    </div>
                </td>
                <td class="text-center text-small"><a href="/qualify.html?eventId=${ranking[i].eventId}&selected_division=${ranking[i].divisionId}"> ${(new Date(ranking[i].clockDate)).toLocaleDateString().substring(0,5)}</a></td>
                <td class="text-start text-small w-15 text-truncate">${ranking[i].local}</td>              
            </tr>`;

        if(ranking[i].divisionName==='Pistola'){
            document.getElementById('tablePistol').innerHTML+= row;
       
        }else if(ranking[i].divisionName==='Revolver'){
            document.getElementById('tableRevolver').innerHTML+= row;

        }else{
            document.getElementById('tableForcaLivre').innerHTML+= row;
        }

    }

    _tbP= new DataTable(document.getElementById('tablePistol').parentNode, 
        { paging: false
        ,responsive: false
        ,oLanguage: {sSearch: "Buscar:"}
        }
    );
    _tbP.draw(false);
    _tbP.responsive.rebuild();
    _tbP.responsive.recalc();
    applySpinners(false);
    
    _tbR= new DataTable(document.getElementById('tableRevolver').parentNode, 
        { paging: false
        ,responsive: false
        ,oLanguage: {sSearch: "Buscar:"}
        }
    );
    _tbR.draw(false);
    _tbR.responsive.rebuild();
    _tbR.responsive.recalc();

    _tbFL= new DataTable(document.getElementById('tableForcaLivre').parentNode, 
        { paging: false
        ,responsive: false
        ,oLanguage: {sSearch: "Buscar:"}
        }
    );
    _tbFL.draw(false);
    _tbFL.responsive.rebuild();
    _tbFL.responsive.recalc();

}

function changeDivision(division){

    document.getElementById('nav-pis').classList.remove("active");
    document.getElementById('nav-rev').classList.remove("active");
    document.getElementById('nav-fl').classList.remove("active");

    if(division==='P'){
        document.getElementById('pistolTabTable').style.display= '';
        document.getElementById('revolverTabTable').style.display= 'none';
        document.getElementById('forcaLivreTabTable').style.display= 'none';

        document.getElementById('nav-pis').classList.add("active");
        // _tbP.responsive.rebuild();
        // _tbP.responsive.recalc();
        _tbP.draw();

        document.getElementById('btnCheckNotF').style.display= 'none';
        document.getElementById('btnCheckOnlyF').style.display= 'none';
        document.getElementById('btnCheckNotFL').style.display= 'none';
        document.getElementById('btnCheckOnlyFL').style.display= 'none';
        document.getElementById('divF12').style.display= 'none';

    }else if(division==='R'){
        document.getElementById('pistolTabTable').style.display= 'none';
        document.getElementById('revolverTabTable').style.display= '';
        document.getElementById('forcaLivreTabTable').style.display= 'none';

        document.getElementById('nav-rev').classList.add("active");
        // _tbR.responsive.rebuild();
        // _tbR.responsive.recalc();
        _tbR.draw();

        document.getElementById('btnCheckNotF').style.display= 'none';
        document.getElementById('btnCheckOnlyF').style.display= 'none';
        document.getElementById('btnCheckNotFL').style.display= 'none';
        document.getElementById('btnCheckOnlyFL').style.display= 'none';
        document.getElementById('divF12').style.display= 'none';

    }else{
        document.getElementById('pistolTabTable').style.display= 'none';
        document.getElementById('revolverTabTable').style.display= 'none';
        document.getElementById('forcaLivreTabTable').style.display= '';
        
        document.getElementById('nav-fl').classList.add("active");
        // _tbFL.responsive.rebuild();
        // _tbFL.responsive.recalc();
        _tbFL.draw();

        document.getElementById('btnCheckNotF').style.display= '';
        document.getElementById('btnCheckOnlyF').style.display= '';
        document.getElementById('btnCheckNotFL').style.display= '';
        document.getElementById('btnCheckOnlyFL').style.display= '';
        document.getElementById('divF12').style.display= '';

    }

}