class Division extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <!--<div class=" bg-body-tertiary" id="div-sub-header-title">-->
      <header class="masthead_duel" id="div-sub-header-title">
        <div class="d-flex align-items-center justify-content-between">
            
          &nbsp;<button class=" d-none btn btn-primary nodisable hide" onclick="window.location.href='./event-config.html'" type="button" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .3rem; --bs-btn-font-size: .75rem;">
            <i class="fa-solid fa-gear"></i>
          </button>
          
          <div>
            <div class="d-flex">
              <h2 class="d-none d-sm-block" name="eventTitle"></h2>
              <h4 class="d-block d-sm-none d-inline-block text-truncate" style="max-width: 240px;" name="eventTitle"></h4>
              &nbsp;
              <h2 class="d-none d-sm-block" name="eventTitleDate"></h2>
              <h4 class="d-block d-sm-none " name="eventTitleDate"></h4>
            </div>
            <div class="text-center">
              <button class=" btn btn-warning btn-sm nodisable" onclick="goToSubscription('');" type="button">
                Inscreva-se
              </button>
            </div>
          </div>
            
          <button class="btn btn-secondary nodisable" type="button" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .3rem; --bs-btn-font-size: .75rem;">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </div>  
        
      </header>
      <div>
        <ul class="nav nav-pills nav-fill bg-body-tertiary">
          <li id="nav-item_tab_3" class="nav-item border hide">
            <a id="nav-link_3" class="nav-link nav-link_sub " href="./event-config.html">
            <span class="d-none d-sm-block">Configurações</span>
            <span class="d-block d-sm-none "><i class="fa-solid fa-gear"></i></span>
            </a>
          </li>
          <li id="nav-item_tab_0" class="nav-item border ">
            <a id="nav-link_0" class="nav-link nav-link_sub " href="./event-details.html">
            <span class="d-none d-sm-block">Informações gerais</span>
            <span class="d-block d-sm-none ">Info. gerais</span>
            </a>
          </li>
          <li id="nav-item_tab_1" class="nav-item border ">
            <a id="nav-link_1" class="nav-link nav-link_sub " aria-current="page" href="./qualify.html">
            <span class="d-none d-sm-block">Contra o relógio</span>
            <span class="d-block d-sm-none ">C. relógio</span>
            </a>
          </li>
          <li id="nav-item_tab_2" class="nav-item border ">
            <a id="nav-link_2" class="nav-link nav-link_sub " href="matches.html">
              <span class="d-none d-sm-block">Duelos</span>
              <span class="d-block d-sm-none ">Duelos</span>
            </a>
          </li>
        </ul>
      </div>
      <br/>
      <div id="division-div-select" class=" row flex-nowrap"><!-- flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom-->
        <div class="w-60 input-group">
            <span class="input-group-text">Divisão:</span>
            <select class="nodisable form-control form-select form-select-sm align-middle" id="selectDivision" onchange="javascript:changeDivision(this)">
            </select>
        </div>
        <div class="w-40">   
          <div class="dropup-center dropdown ">
            <button class="btn btn-secondary dropdown-toggle nodisable" type="button" data-bs-toggle="dropdown" aria-expanded="false">      
            Opções</button>
            <ul class="dropdown-menu">
                <!--<li id="btnAddShooter" style="display:none" ><a class="dropdown-item" onclick="goToSubscription('');" ><i class="bi bi-person-plus-fill"></i> Adicionar Inscrição</a></li>-->
                <!--<li><a class="dropdown-item" onClick="editInscriptions()" ><i class="bi bi-pencil-fill"></i> Editar Inscrições</a></li>-->
                <li id="btn-reset" style="display:none" ><a  class="dropdown-item" onclick="deleteKos();" ><i class="bi bi-recycle"></i> Recriar Duelos</a></li>
                <!--<li >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________</li>-->
                <!--<li id="btn-sharepage" ><a  class="dropdown-item" onclick="shareEvent();" ><i class="bi bi-box-arrow-up-right"></i> Copiar Link</a></li>-->
                <li id="btn-sharepage" ><a  class="dropdown-item" onclick="autoRefresh();" ><i class="bi bi-arrow-clockwise"></i> Atualizar tela a cada 20s </a></li>
                <!--<li id="btnOptClock" style="display:none"><a class="dropdown-item" onClick="hrefQualify()" ><i class="bi bi-stopwatch"></i> Contra o Relógio</a></li>
                <li id="btnOptDuel" style="display:none"><a class="dropdown-item" onClick="hrefMatches()" ><i class="fas fa-holly-berry"></i> Duelos</a></li>-->
                <li id="btnRelPassadas" style="display:none"><a class="dropdown-item" target="_new" href="./event-config.html?rel=1"><i class="bi bi-currency-dollar"></i> Relatório de Passadas</a></li>
                <!--<li><a class="dropdown-item" href="./event-config.html"><i class="bi bi-gear-fill"></i> Configurações do Evento</a></li>-->
            </ul>
          </div>
        </div>
      </div>
      
    </div>
      `;
    }
  }
  
  customElements.define('division-component', Division);
