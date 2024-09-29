class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
      <div class= "spinner-wrapper">
        <div class="spinner-border spinner-border-bg text-warning" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
        <symbol id="check2" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </symbol>
        <symbol id="circle-half" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
        </symbol>
        <symbol id="moon-stars-fill" viewBox="0 0 16 16">
          <path
            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          <path
            d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </symbol>
        <symbol id="sun-fill" viewBox="0 0 16 16">
          <path
            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </symbol>
      </svg>
<!-- Modal -->
      <div class="modal fade" id="modalDocnum" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Informe o seu CPF</h1>
              <button type="button" class="btn-close nodisable" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input type="text" class="form-control nodisable" required id="input-modalDocnum" placeholder="000.000.001-91" onkeypress="$(this).mask('000.000.000-00');" >
                <label for="modalEmail">CPF</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary nodisable" id="btnCloseDocnum" value="Fechar">Fechar</button> <!--data-bs-dismiss="modal"-->
              <button type="button" class="btn btn-primary nodisable" id="btnSaveDocnum" value="Salvar">Salvar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="modalDocnum" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Informe o seu CPF</h1>
              <button type="button" class="btn-close nodisable" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input type="text" class="form-control nodisable" required id="input-modalDocnum" placeholder="000.000.001-91" onkeypress="$(this).mask('000.000.000-00');" >
                <label for="modalEmail">CPF</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary nodisable" id="btnCloseDocnum" value="Fechar">Fechar</button> <!--data-bs-dismiss="modal"-->
              <button type="button" class="btn btn-primary nodisable" id="btnSaveDocnum" value="Salvar">Salvar</button>
            </div>
          </div>
        </div>
      </div>



      <header class="navbar navbar-expand-lg bd-navbar nav-bg-primary" data-bs-theme="light">
        <nav class="container-fluid bd-gutter" aria-label="Main navigation" >
          
          <div class="bd-navbar-toggle">
            <button class="navbar-toggler p-2 nodisable" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
              </svg>
              <span class="d-none fs-6 pe-1">Browse</span>
            </button>
          </div>
          
            
          <div class="text-truncate " >
            <h6 class=" text-small text-truncate" id="eventTitle" style="max-width: 170px;"></h6>
          </div>
          
          
          <div class="offcanvas-lg offcanvas-start flex-grow-1" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel" data-bs-scroll="false">
            <div class="offcanvas-header px-4 pb-0">
              <a data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"><h5 class="offcanvas-title" id="bdNavbarOffcanvasLabel">T.P.M. Online</h5><a>
              <a data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"><h5><i class="bi bi-x"></i></h5></a>
            </div>
            <div class="offcanvas-body p-4 pt-0 p-lg-0">
              <hr class=" text-white-50" />
              <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" id="nav-events" href="/" onclick="">Eventos</a>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" id="nav-qualify" aria-current="true" onclick="hrefQualify();"  rel="noopener">Contra o Relógio</a>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" id="nav-matches" onclick="hrefMatches();" rel="noopener">Duelos</a>
                </li>
                <!--<li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" id="nav-ranking" href="/ranking.html" rel="noopener">Rankings</a>
                </li>-->
              </ul>

              <hr class=" text-white-50" />

              <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
              <!--<li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" href="https://github.com/rodcolmanso" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="navbar-nav-svg" viewBox="0 0 512 499.36" role="img"><title>GitHub</title><path fill="currentColor" fill-rule="evenodd" d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path></svg>
                    <small class=" ms-2">GitHub</small>
                  </a>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" href="https://twitter.com/rodrigocolmanso" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="navbar-nav-svg" viewBox="0 0 512 416.32" role="img"><title>Twitter</title><path fill="currentColor" d="M160.83 416.32c193.2 0 298.92-160.22 298.92-298.92 0-4.51 0-9-.2-13.52A214 214 0 0 0 512 49.38a212.93 212.93 0 0 1-60.44 16.6 105.7 105.7 0 0 0 46.3-58.19 209 209 0 0 1-66.79 25.37 105.09 105.09 0 0 0-181.73 71.91 116.12 116.12 0 0 0 2.66 24c-87.28-4.3-164.73-46.3-216.56-109.82A105.48 105.48 0 0 0 68 159.6a106.27 106.27 0 0 1-47.53-13.11v1.43a105.28 105.28 0 0 0 84.21 103.06 105.67 105.67 0 0 1-47.33 1.84 105.06 105.06 0 0 0 98.14 72.94A210.72 210.72 0 0 1 25 370.84a202.17 202.17 0 0 1-25-1.43 298.85 298.85 0 0 0 160.83 46.92"></path></svg>
                    <small class=" ms-2">Twitter</small>
                  </a>
                </li>-->
                <li class="nav-item col-6 col-lg-auto">
                  <a class="nav-link py-2 px-0 px-lg-2" href="mailto:rodrigo.manso@gmail.com?subject=[TPM Online] Contato">
                    <i class="bi bi-envelope-fill"></i><title>Email</title>
                    <small class=" ms-2">Email</small>
                  </a>
                </li>
                
                <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                  <div class="vr d-none d-lg-flex h-100 mx-lg-2 "></div>
                  <hr class=" my-2 text-white-50" />
                </li>

                <li class="nav-item dropdown">
                  <button class="nodisable btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme (auto)">
                    <svg class="bi my-1 theme-icon-active"><use href="#circle-half"></use></svg>
                    <span class=" ms-2" id="bd-theme-text"></span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                    <li>
                      <button type="button" class="nodisable dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                        <svg class="bi me-2 opacity-50 theme-icon"><use href="#sun-fill"></use></svg>
                        Light
                        <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="nodisable dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                        <svg class="bi me-2 opacity-50 theme-icon"><use href="#moon-stars-fill"></use></svg>
                        Dark
                        <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="nodisable dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                        <svg class="bi me-2 opacity-50 theme-icon"><use href="#circle-half"></use></svg>
                        Auto
                        <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>


          <div class="nav-item dropdown">
            <button type="button" name="loginAvatar" id="loginAvatar" class="btn dropdown-toggle nodisable" data-bs-toggle="dropdown" aria-expanded="true">
              <img id="header-avatar-pic" class="small-profile-avatar-pic rounded-circle" alt="..." onerror="this.src='https://res.cloudinary.com/duk7tmek7/image/upload/c_crop,g_face/defaults/generic_avatar_old'" src="...">  
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <div id="loggedin" style="display: none">
                <a class="nav-link py-2 px-0 px-lg-2" id="nav-home" href="/shooter.html" onclick="">
                  <span id=avatarUserName>Perfil</span>
                  <br/><span>_____________________</span>
                  <i class="bi bi-pencil-square"></i><span>Meu Perfil</span>
                </a>
                <a class="nav-link py-2 px-0 px-lg-2" id="nav-logout" href="javascript:netlifyIdentity.logout()" onclick="">
                  <i class="bi bi-box-arrow-in-left"></i> <span id=avatarUserName_>Logout</span>
                </a>
              </div>
              <div id="loginout">
                <a class="nav-link py-2 px-0 px-lg-2" id="nav-home" href="javascript:netlifyIdentity.open('login')" onclick="">
                  <i class="bi bi-box-arrow-in-right"></i> Entrar
                </a>
                <a class="nav-link py-2 px-0 px-lg-2" id="nav-home_signup" href="javascript:netlifyIdentity.open('signup')" onclick="">
                  <i class="bi bi-pencil-square"></i> Registrar-se
                </a>
              </div>
              <!-- Button trigger modal 
              <div >
                <button type="button" class="btn btn-sm btn-primary nodisable" data-bs-toggle="modal" data-bs-target="#modalDocnum">
                  Launch static backdrop modal
                </button>
              </div>-->

            </ul>
          </div>
        </nav>
      </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);