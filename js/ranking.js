
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
    buildTables(await promiseOfRanking());
    applySpinners(false);
    return 0;
}

async function loadPage(){
    loggedUser= netlifyIdentity.currentUser();
    applySpinners(true);
    document.getElementById('mesSelect').value= (new Date()).getMonth()+1;
    document.getElementById('anoSelect').value= (new Date()).getFullYear();
}

window.onload = async () => {

    await loadPage();
    document.getElementById('nav-ranking').classList.add('active');

    ranking= await promiseOfRanking();
    buildTables(ranking);
    
    let isAdmin= (loggedUser&&loggedUser.app_metadata.roles!==undefined&&loggedUser.app_metadata.roles!==""&&!(loggedUser.app_metadata.roles.indexOf("admin")<0));

    applySpinners(true);

    // playersArray= await promiseOfPlayers(eventConfig._id);
    applySpinners(false);
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    

};

let _tbP;
let _tbR;
let _tbFL;

function buildTables(ranking){

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
                <td class="text-end text-small w-05">${_posS}º</td>
                <td class="text-start">
                    <div class="row  text-start">
                            <img src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/${ranking[i].shooterId}.jpg?${getCodeImg()}" class="small-profile-avatar-pic rounded-circle" style="max-height: 30px !important;" alt="...">
                            ${ranking[i].shooterName}
                    </div>
                </td>
                <td class="text-start" ><span class="badge ${_gbColor}">${time}
                <span class="position-absolute translate-middle badge bg-danger rounded-pill">${penal}</span>
                </span></td>
                <td class="text-start">${ranking[i].factory} ${ranking[i].model} <span class="text-small">(${ranking[i].caliber})</span>  <span class="text-danger">${badg_rd}</span></td>
                <td class="text-center text-small"><a href="/qualify.html?eventId=${ranking[i].eventId}&selected_division=${ranking[i].divisionId}"> ${(new Date(ranking[i].clockDate)).toLocaleDateString().substring(0,5)}</a></td>
                <td class="text-start text-small">${ranking[i].local}</td>              
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
        _tbP.responsive.rebuild();
        _tbP.responsive.recalc();

    }else if(division==='R'){
        document.getElementById('pistolTabTable').style.display= 'none';
        document.getElementById('revolverTabTable').style.display= '';
        document.getElementById('forcaLivreTabTable').style.display= 'none';

        document.getElementById('nav-rev').classList.add("active");
        _tbR.responsive.rebuild();
        _tbR.responsive.recalc();

    }else{
        document.getElementById('pistolTabTable').style.display= 'none';
        document.getElementById('revolverTabTable').style.display= 'none';
        document.getElementById('forcaLivreTabTable').style.display= '';

        document.getElementById('nav-fl').classList.add("active");
        _tbFL.responsive.rebuild();
        _tbFL.responsive.recalc();

    }

}