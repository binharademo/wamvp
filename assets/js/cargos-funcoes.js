/**
 * Gerenciamento de Cargos e Funções - WinAudio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa os componentes do Material Design
  initMaterialComponents();
  
  // Configura eventos do menu
  setupMenuEvents();
  
  // Setup eventos dos botões
  setupButtonEvents();
  
  // Setup formulário
  setupForm();
});

/**
 * Inicializa componentes Material Design
 */
function initMaterialComponents() {
  // Inicializar drawer (menu lateral)
  const drawer = document.querySelector('.mdc-drawer');
  if (drawer) {
    const drawerInstance = mdc.drawer.MDCDrawer.attachTo(drawer);
    
    // Toggle do drawer no botão de menu
    const menuButton = document.querySelector('.mdc-top-app-bar__navigation-icon');
    if (menuButton) {
      menuButton.addEventListener('click', () => {
        drawerInstance.open = !drawerInstance.open;
      });
    }
  }
  
  // Inicializar top app bar
  const topAppBar = document.querySelector('.mdc-top-app-bar');
  if (topAppBar) {
    mdc.topAppBar.MDCTopAppBar.attachTo(topAppBar);
  }
  
  // Inicializa todos os campos de texto
  const textFields = document.querySelectorAll('.mdc-text-field');
  textFields.forEach(textField => {
    new mdc.textField.MDCTextField(textField);
  });
  
  // Inicializa selects
  const selects = document.querySelectorAll('.mdc-select');
  selects.forEach(select => {
    new mdc.select.MDCSelect(select);
  });
  
  // Inicializa botões com ripple
  const buttons = document.querySelectorAll('.mdc-button');
  buttons.forEach(button => {
    new mdc.ripple.MDCRipple(button);
  });
  
  // Inicializa icon buttons
  const iconButtons = document.querySelectorAll('.mdc-icon-button');
  iconButtons.forEach(iconButton => {
    const ripple = new mdc.ripple.MDCRipple(iconButton);
    ripple.unbounded = true;
  });
  
  // Inicializa snackbar
  const snackbar = document.querySelector('.mdc-snackbar');
  if (snackbar) {
    window.mdcSnackbar = new mdc.snackbar.MDCSnackbar(snackbar);
  }
}

/**
 * Configurar eventos do menu de navegação
 */
function setupMenuEvents() {
  // Expandir/colapsar submenus
  const menuItems = document.querySelectorAll('.has-submenu');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle da classe 'open' no submenu
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('open');
        
        // Rotacionar ícone de expansão
        const expandIcon = this.querySelector('.menu-expand-icon');
        if (expandIcon) {
          expandIcon.textContent = submenu.classList.contains('open') ? 'expand_less' : 'expand_more';
        }
      }
    });
  });
}

/**
 * Configuração de eventos para botões
 */
function setupButtonEvents() {
  // Botão Novo Cargo
  const btnNovoCargo = document.getElementById('btn-novo-cargo');
  if (btnNovoCargo) {
    btnNovoCargo.addEventListener('click', function() {
      // Limpa formulário e mostra para cadastro
      document.getElementById('form-cargos').reset();
      document.getElementById('cargos-form').style.display = 'block';
    });
  }
  
  // Botão Fechar
  const btnFechar = document.getElementById('btn-fechar');
  if (btnFechar) {
    btnFechar.addEventListener('click', function() {
      document.getElementById('cargos-form').style.display = 'none';
    });
  }
  
  // Botão Fechar (X no cabeçalho)
  const btnFecharHeader = document.querySelector('.card-header .mdc-icon-button');
  if (btnFecharHeader) {
    btnFecharHeader.addEventListener('click', function() {
      document.getElementById('cargos-form').style.display = 'none';
    });
  }
  
  // Botões de navegação
  const navButtons = document.querySelectorAll('.navigation-buttons .mdc-button');
  navButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Simulação de navegação entre registros
      // Em um ambiente real, isso buscaria dados do servidor
      let message = '';
      
      switch(index) {
        case 0: message = 'Primeiro registro'; break;
        case 1: message = 'Registro anterior'; break;
        case 2: message = 'Próximo registro'; break;
        case 3: message = 'Último registro'; break;
      }
      
      showMessage(message);
    });
  });
}

/**
 * Configuração do formulário
 */
function setupForm() {
  const form = document.getElementById('form-cargos');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Em um ambiente real, aqui seriam validados os dados e enviados ao servidor
      // Simulação de salvamento bem-sucedido
      showMessage('Cargo/Função salvo com sucesso!');
    });
  }
  
  // Configura o formulário para iniciar oculto
  const formContainer = document.getElementById('cargos-form');
  if (formContainer) {
    formContainer.style.display = 'none';
  }
}

/**
 * Mostra uma mensagem na snackbar
 * @param {string} message - A mensagem a ser exibida
 */
function showMessage(message) {
  if (window.mdcSnackbar) {
    window.mdcSnackbar.labelText = message;
    window.mdcSnackbar.open();
  } else {
    alert(message);
  }
}
