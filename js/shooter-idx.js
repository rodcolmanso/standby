let updater=false;
window.onload = async () => {

    // await loadPage();
    
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
                    buildShooterForm(dbUser, updater);
                }else console.log(`Usuário não encontrado. id:${params.id}`);
            }
        ).catch(err => console.log(`Error getting user: ${err}`)
        ).finally(()=> {applySpinners(false);});
    
    }else{
        //sessionUser
        updater= true;
        buildShooterForm(loggedUser, updater);
    }
    
};

function buildShooterForm(shooterData, updater){

    const _shooterid= shooterData===null?'.jpg'+(Math.random()*1000000).toString():shooterData._id;
        document.getElementById('pic-profile').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+_shooterid;

        document.getElementById('modalEmail').value= shooterData.email;
        document.getElementById('modalEmail').disabled=!updater;
        document.getElementById('docnum').value= shooterData.docnum;
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
            shooterDivisions[0].img= selectedImage.src;
            // eventConfig.imgChanged=true;
            shooterDivisions[0].imgChanged=true;
            updatePicOrName();
        };

        reader.readAsDataURL(fileInput.files[0]);
        
    }
}
