window.onload = async () => {
    // const sUrl= ""+window.location.toString();
    await loadPage();
    applySpinners(false);

}


async function loadPage(){
    
    loggedUser= netlifyIdentity.currentUser();
    
    applySpinners(true);
    eventConfig= await promiseOfSessionEventConfig(null,loggedUser);
    let _userDb= getSessionDbUser();
    applySpinners(false);
    
    if(eventConfig===null){
        alert(`Evento não encontrado`);
        window.location.href = window.location="/index.html";
    }

    buildEventDetailsPage(eventConfig);
    applySpinners(false);
    

}

function buildEventDetailsPage(eventConfig){
    document.getElementById('nav-events').classList.add('active');

    if(eventConfig._id!==null && eventConfig._id!==undefined&& eventConfig._id!==0&& eventConfig._id!=="0"){
        document.getElementById('eventTitle').innerHTML= `<a class="text-decoration-none text-truncate text-nowrap"  href="/event-config.html?event_id=${eventConfig._id}"><i class="bi bi-gear-fill"></i><span class="text-decoration-none text-nowrap">${eventConfig.name}</span></a>`;
    }else{
        document.getElementById('eventTitle').innerHTML= `Novo evento`;
    }
    
    document.getElementById('event-name').innerHTML= eventConfig.name;
    document.getElementById('masthead-event-name').innerHTML= eventConfig.name;
    document.getElementById('event-name-subs').innerHTML= eventConfig.name;

    document.getElementById('event-divisions-summary').innerHTML= eventConfig.divisionsSummary;
    document.getElementById('event-local').innerHTML= eventConfig.address + " "+ eventConfig.city + "/"+ eventConfig.state;
    

    document.getElementById('event-bg-img').style.backgroundImage="url('https://res.cloudinary.com/duk7tmek7/image/upload/c_fill,g_auto,h_450,w_600/d_defaults:header-bg.jpg/"+eventConfig._id+"xxxx')" ;
}