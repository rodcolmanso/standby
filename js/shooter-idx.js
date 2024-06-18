window.onload = async () => {

    // await loadPage();
    const loggedUser= getSessionDbUser();
    if(loggedUser!==null){
        const _shooterid= loggedUser===null?'.jpg'+(Math.random()*1000000).toString():loggedUser._id;
        document.getElementById('pic-profile').src="https://res.cloudinary.com/duk7tmek7/image/upload/c_limit/d_defaults:generic_avatar.jpg/profile/"+_shooterid;

        document.getElementById('modalEmail').value= loggedUser.email;
        document.getElementById('modalEmail').disabled=true;
        document.getElementById('modalName').value= loggedUser.name;
        // document.getElementById('modalShooterId').value= loggedUser._id;

        document.getElementById('modalOption0').checked = (loggedUser.category===0);
        document.getElementById('modalOption2').checked = (loggedUser.category===2);
        document.getElementById('modalOption5').checked = (loggedUser.category===5);
    }
};

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