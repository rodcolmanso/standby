class HeaderProfile extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <header class="masthead_session" id="div-sub-header-title">
        <div class="align-items-center justify-content-between">
       
          
          <div>
            <div class="text-center">
              <h2 class="text-center" name="sessionTitle">Perfil do atirador</h2>
            </div>
            <h5 class="text-center text-truncate" name="sessionSubTitle">
              Atirador
            </h5>
          </div>  
         
        </div>  
      </header>
      <div>
        <ul class="nav nav-pills nav-fill bg-body-tertiary">
          <li id="nav-item_tab_0" class="nav-item border ">
            <a id="nav-link_0" class="nav-link nav-link_sub " onClick="goToPage('shooter','');" >
            <span class="d-none d-sm-block"><i class="fa-solid fa-id-card"></i> Dados Pessoais</span>
            <span class="d-block d-sm-none "><i class="fa-solid fa-id-card"></i> <span class="text-small"></span></span>
            </a>
          </li>
          <li id="nav-item_tab_1" class="nav-item border ">
            <a id="nav-link_1" class="nav-link nav-link_sub " onClick="goToPage('shooter-acervo','');" >
            <span class="d-none d-sm-block"><i class="fa-solid fa-person-rifle"></i> Acervo</span>
            <span class="d-block d-sm-none"><i class="fa-solid fa-person-rifle"></i> <span class="text-small">Acervo</span></span>
            </a>
          </li>
          <li id="nav-item_tab_2" class="nav-item border hixdeAll">
            <a id="nav-link_2" class="nav-link nav-link_sub " aria-current="page" onClick="" >
            <span class="d-none d-sm-block"><i class="fa-solid fa-certificate"></i> Filiação</span>
            <span class="d-block d-sm-none "><i class="fa-solid fa-certificate"></i> <span class="text-small">Filiação</span></span>
            </a>
          </li>
          <li id="nav-item_tab_3" class="nav-item border hixdeAll">
            <a id="nav-link_3" class="nav-link nav-link_sub " onClick="">
              <span class="d-none d-sm-block"><i class="fa-solid fa-stamp"></i> Declarações</span>
              <span class="d-block d-sm-none "><i class="fa-solid fa-stamp"></i> <span class="text-small">Declarações</span></span>
            </a>
          </li>
        </ul>
      </div>
      <br/>
      
      
    </div>
    
    <!-- Modal -->
<div class="modal fade" id="staticBackdropShooterGun" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel"> -->
          <div class="row text-start nput-group " id="staticBackdropLabel">
            <div class="col-3" style="max-width: 40px !important;">
                <img id="mondalShooterImg" src="https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/d_defaults:generic_avatar.jpg/profile/aPlayers.jpg" class="small-profile-avatar-pic rounded-circle" alt="...">
            </div>
            <div class="d-inline-block ">
                <h4 id="mondalShooterName"><h4>
            </div>
           
        </div>
        <!-- </h1> -->
        <button type="button" class="btn-close nodisable" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h5 id="mondalDivisionName"></h5>
        <div class="col-auto" >
          <div class="input-group">
            <div class="form-floating " > <!--col-md-2-->
              <input type="hidden" id="mondalShooterDivisionId" /> 
              <select id="mondalShooterGun" class="form-select form-control form-select-sm nodisable" required id="select-subscribe-gun" aria-label="Floating label select example">
                
              </select>
              <label for="select-subscribe-gun">Arma</label>
            </div>
            <div class="p-2" style="width: 70px; padding-right: 1px !important;">
              <div>
                <label for="subscribe-optic"><small class="d-none d-xl-block text-muted">Red dot?</small><small class="d-xl-none text-muted">Red dot?</small></label>
              </div>
              
              <div class="form-check form-check-inline text-wrap" style="margin-right: 1px !important;">
                <input id="mondalShooterGunOptic" class="form-check-input bg-reddot nodisable" type="checkbox" name="subscribe-opticNane" checked id="subscribe-optic" value="1" 
                  onchange="this.style.backgroundColor=this.checked?'red':'';"> 
              </div>
            </div>
            <!-- ----------- -->
          </div>
           <div class="form-floating text-center d-none" id="div-mondalGunOther">
            <input type="text" class="form-control form-control-sm nodisable" id="mondalGunOther">
             <label for="mondalGunOther" id="subscribe-gun-label" >Outra Arma</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="modalGunClose" class="btn btn-secondary nodisable" data-bs-dismiss="modal">Fechar</button>
        <button type="button" id="modalGunSave" class="btn btn-primary nodisable">Salvar</button>
      </div>
    </div>
  </div>
</div>
      `;
    }
  }
  
  customElements.define('header-profile-component', HeaderProfile);
