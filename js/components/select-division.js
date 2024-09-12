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
                <li id="btnAddShooter" style="display:none" ><a class="dropdown-item" onclick="goToSubscription('');" ><i class="bi bi-person-plus-fill"></i> Adicionar Inscrição</a></li>
                <li><a class="dropdown-item" onClick="editInscriptions()" ><i class="bi bi-pencil-fill"></i> Editar Inscrições</a></li>
                <li id="btn-reset" style="display:none" ><a  class="dropdown-item" onclick="deleteKos();" ><i class="bi bi-recycle"></i> Recriar Duelos</a></li>
                <li >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________</li>
                <li id="btn-sharepage" ><a  class="dropdown-item" onclick="shareEvent();" ><i class="bi bi-box-arrow-up-right"></i> Copiar Link</a></li>
                <li id="btn-sharepage" ><a  class="dropdown-item" onclick="autoRefresh();" ><i class="bi bi-arrow-clockwise"></i> Atualização Automática</a></li>
                <li id="btnOptClock" style="display:none"><a class="dropdown-item" onClick="hrefQualify()" ><i class="bi bi-stopwatch"></i> Contra o Relógio</a></li>
                <li id="btnOptDuel" style="display:none"><a class="dropdown-item" onClick="hrefMatches()" ><i class="fas fa-holly-berry"></i> Duelos</a></li>
                <li id="btnRelPassadas" style="display:none"><a class="dropdown-item" target="_new" href="./event-config.html?rel=1"><i class="bi bi-currency-dollar"></i> Relatório de Passadas</a></li>
                <li><a class="dropdown-item" href="./event-config.html"><i class="bi bi-gear-fill"></i> Configurações do Evento</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
      `;
    }
  }
  
  customElements.define('division-component', Division);
