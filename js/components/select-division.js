class Division extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <h6 class="" id="eventTitle"></h6>
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
      `;
    }
  }
  
  customElements.define('division-component', Division);
