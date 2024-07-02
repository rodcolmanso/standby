class Division extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <br>
      <div class="d-grid gap-2 d-md-block">
      <div class="" id="eventTitleSelect"></div>
      </div>
      <br>
      <div class=" row flex-nowrap"><!-- flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom-->
        <div class="w-60 input-group">
            <span class="input-group-text">Divisão:</span>
            <select class="nodisable form-control form-select form-select-sm align-middle" id="selectDivision" onchange="javascript:changeDivision(this)">
            </select>
        </div>
        <div class="w-40">
           <!--<button id="btnAddShooter" type="button" class="btn btn-primary btn-block rounded-circle" disabled
            data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop" onclick="goToSubscription('');" style="display:none" value="Incluir Atirador">
            <i class="bi bi-person-fill-add"></i>
          </button>
          <button type="button" class="btn btn-warning rounded-circle" onclick="deleteKos();" data-bs-dismiss="modal" id="btn-reset" style="display:none" value="Reset"><i class="bi bi-backspace-reverse-fill"></i></button>
          -->
          <div class="dropup-center dropdown">
            <button class="btn btn-secondary dropdown-toggle nodisable" type="button" data-bs-toggle="dropdown" aria-expanded="false">      
            Opções</button>
            <ul class="dropdown-menu">
                <li id="btnAddShooter" style="display:none" ><a class="dropdown-item" onclick="goToSubscription('');" ><i class="bi bi-person-plus-fill"></i> Adicionar Atirador</a></li>
                <li><a class="dropdown-item" onClick="editInscriptions()" ><i class="bi bi-pencil-fill"></i> Editar Inscrições</a></li>
                <li id="btn-reset" style="display:none" ><a  class="dropdown-item" onclick="deleteKos();" ><i class="bi bi-recycle"></i> Recriar Duelos</a></li>
                <li >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________</li>
                <li id="btn-sharepage" ><a  class="dropdown-item" onclick="shareEvent();" ><i class="bi bi-box-arrow-up-right"></i> Copiar Link</a></li>
                <li id="btnOptClock" style="display:none"><a class="dropdown-item" onClick="hrefQualify()" ><i class="bi bi-stopwatch"></i> Ir para Contra o Relógio</a></li>
                <li id="btnOptDuel" style="display:none"><a class="dropdown-item" onClick="hrefMatches()" ><i class="fas fa-holly-berry fa-inverse"></i> Ir para Duelos</a></li>
                <li><a class="dropdown-item" href="./event-config.html"><i class="bi bi-gear-fill"></i> Configurações do Evento</a></li>
                
            </ul>
          </div>
        </div>
      </div>
      <h4> </h4>
      <nav class="navbar-fixed-top">
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nodisable nav-link "        id="liAdvance" data-bs-toggle="tab" data-bs-target="#nav-liAdvance" type="button" role="tab" aria-controls="nav-liAdvance" aria-selected="false">Avançado</button>
            <button class="nodisable nav-link  active" id="liOverall" data-bs-toggle="tab" data-bs-target="#nav-liOverall" type="button" role="tab" aria-controls="nav-liOverall" aria-selected="true">Overall</button>
            <button class="nodisable nav-link "        id="liLadies" data-bs-toggle="tab" data-bs-target="#nav-liLadies" type="button" role="tab" aria-controls="nav-liLadies" aria-selected="false">Damas</button>
            <button class="nodisable nav-link "        id="liOptics" data-bs-toggle="tab" data-bs-target="#nav-liOptics" type="button" role="tab" aria-controls="nav-liOptics" aria-selected="false">Optics</button>
            <button class="nodisable nav-link "        id="liSeniors" data-bs-toggle="tab" data-bs-target="#nav-liSeniors" type="button" role="tab" aria-controls="nav-liSeniors" aria-selected="false">Seniors</button>
          </div>
        </nav>
        
      `;
    }
  }
  
  customElements.define('division-component', Division);
