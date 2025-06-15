// Funções principais para o mockup do WinAudio

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes do Material Design
  initMaterialComponents();
  
  // Configurar eventos do menu
  setupMenuEvents();
  
  // Inicializar dashboard se estiver na página inicial
  if (document.querySelector('.dashboard-grid')) {
    initDashboard();
  }
});

// Inicialização de componentes do Material Design
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
  
  // Inicializar ripple em botões
  const buttons = document.querySelectorAll('.mdc-button, .mdc-fab, .mdc-icon-button');
  buttons.forEach(button => {
    mdc.ripple.MDCRipple.attachTo(button);
  });
  
  // Inicializar ripple em itens de lista
  const listItems = document.querySelectorAll('.mdc-list-item');
  listItems.forEach(item => {
    mdc.ripple.MDCRipple.attachTo(item);
  });
}

// Configurar eventos do menu de navegação
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
  
  // Marcar item de menu ativo com base na URL atual
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.mdc-list-item');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '#' && href !== '/') {
      link.classList.add('mdc-list-item--activated');
      
      // Se for um submenu, abrir o menu pai
      const parentSubmenu = link.closest('.submenu');
      if (parentSubmenu) {
        parentSubmenu.classList.add('open');
        const parentMenuItem = parentSubmenu.previousElementSibling;
        if (parentMenuItem) {
          const expandIcon = parentMenuItem.querySelector('.menu-expand-icon');
          if (expandIcon) {
            expandIcon.textContent = 'expand_less';
          }
        }
      }
    }
  });
}

// Inicializar dashboard com dados de exemplo
function initDashboard() {
  // Aqui poderia haver código para carregar dados reais via API
  // Para o mockup, usamos dados estáticos
  
  // Exemplo: Atualizar contadores
  updateCounter('pacientes-total', 1248);
  updateCounter('exames-mes', 87);
  updateCounter('exames-hoje', 12);
  updateCounter('exames-pendentes', 34);
  
  // Exemplo: Inicializar gráficos se a biblioteca estiver disponível
  if (typeof Chart !== 'undefined') {
    initExamesChart();
  }
}

// Atualizar contador com animação
function updateCounter(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  
  let current = 0;
  const increment = value / 30; // Dividir a animação em 30 passos
  const timer = setInterval(() => {
    current += increment;
    if (current >= value) {
      current = value;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 30);
}

// Inicializar gráfico de exames
function initExamesChart() {
  const ctx = document.getElementById('exames-chart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Exames Realizados',
        data: [65, 78, 52, 91, 85, 87],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Função para navegação entre páginas
function navigateTo(url) {
  window.location.href = url;
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
  const snackbar = document.querySelector('.mdc-snackbar');
  if (!snackbar) return;
  
  const mdcSnackbar = mdc.snackbar.MDCSnackbar.attachTo(snackbar);
  const label = snackbar.querySelector('.mdc-snackbar__label');
  
  // Definir a mensagem
  label.textContent = message;
  
  // Adicionar classe de cor baseada no tipo
  snackbar.classList.remove('info', 'success', 'warning', 'error');
  snackbar.classList.add(type);
  
  // Mostrar a notificação
  mdcSnackbar.open();
}
