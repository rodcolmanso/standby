class Division extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <!--h6 class="" id="eventTitleX"></h6-->
      <div class=" row flex-nowrap"><!-- flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom-->
        <div class="w-80 input-group">
            <span class="input-group-text">Divisão:</span>
            <select class="form-control form-select form-select-sm align-middle" id="selectDivision" onchange="javascript:changeDivision(this)">
            </select>
        </div>
        <div class="w-20">
           <button type="button" class="btn btn-warning rounded-circle" onclick="deleteKos();"         data-bs-dismiss="modal" id="btn-reset"     style="display:none" value="Reset"><i class="bi bi-backspace-reverse-fill"></i></button>
           <button id="btnAddShooter" type="button" class="btn btn-primary btn-block rounded-circle" disabled
            data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop" onclick="clearShooterModal()" style="display:none" value="Incluir Atirador">
            <i class="bi bi-person-fill-add"></i>
          </button>
           <!--<button type="button" class="btn btn-success btn-sm" onclick="clearShooterModal();" data-bs-dismiss="modal" id="btnAddShooter" style="display:none" data-bs-target="#exampleModal" aria-controls="offcanvasTop" value="add">add</button>
           <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>-->
        </div>
      </div>
      
      <nav class="navbar-fixed-top">
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link text-small"        id="liAdvance" data-bs-toggle="tab" data-bs-target="#nav-liAdvance" type="button" role="tab" aria-controls="nav-liAdvance" aria-selected="false">Avançado</button>
            <button class="nav-link text-small active" id="liOverall" data-bs-toggle="tab" data-bs-target="#nav-liOverall" type="button" role="tab" aria-controls="nav-liOverall" aria-selected="true">Overall</button>
            <button class="nav-link text-small"        id="liLadies" data-bs-toggle="tab" data-bs-target="#nav-liLadies" type="button" role="tab" aria-controls="nav-liLadies" aria-selected="false">Damas</button>
            <button class="nav-link text-small"        id="liOptics" data-bs-toggle="tab" data-bs-target="#nav-liOptics" type="button" role="tab" aria-controls="nav-liOptics" aria-selected="false">Optics</button>
            <button class="nav-link text-small"        id="liSeniors" data-bs-toggle="tab" data-bs-target="#nav-liSeniors" type="button" role="tab" aria-controls="nav-liSeniors" aria-selected="false">Seniors</button>
          </div>
        </nav>
        
      `;
    }
  }
  
  customElements.define('division-component', Division);
