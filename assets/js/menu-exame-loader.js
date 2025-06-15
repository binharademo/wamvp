/**
 * Carregador do menu de exames - WinAudio
 * Carrega dinamicamente o componente de menu lateral para exames
 */

document.addEventListener('DOMContentLoaded', function() {
  loadExameMenu();
});

/**
 * Carrega o menu lateral de exames
 */
function loadExameMenu() {
  const menuExameContainer = document.getElementById('menu-exame-container');
  if (!menuExameContainer) {
    console.error('Menu de exames container não encontrado. Adicione uma div com id="menu-exame-container" à sua página.');
    return;
  }
  
  // Calcula o caminho relativo para o componente
  const path = getRelativePath();
  
  fetch(path + 'components/menu_exame.html')
    .then(response => {
      if (!response.ok) throw new Error('Falha ao carregar o componente de menu de exames: ' + response.status);
      return response.text();
    })
    .then(html => {
      menuExameContainer.innerHTML = html;
      setupExameMenuEvents();
    })
    .catch(error => {
      menuExameContainer.innerHTML = '<p>Erro ao carregar menu de exames: ' + error.message + '</p>';
    });
}

/**
 * Configura os eventos para o menu de exames
 */
function setupExameMenuEvents() {
  // Adicionar classe active ao item de menu clicado
  const menuItems = document.querySelectorAll('.sidebar-icon');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove a classe active de todos os itens
      menuItems.forEach(i => i.classList.remove('active'));
      // Adiciona a classe active apenas ao item clicado
      this.classList.add('active');
    });
  });
}

/**
 * Calcula o caminho relativo para os componentes com base na URL atual
 * @returns {string} O caminho relativo para a pasta de componentes
 */
function getRelativePath() {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
  
  // Para URLs como /pages/exames/cadastro.html precisamos voltar 2 níveis
  // Para URLs como /index.html não precisamos voltar nível algum
  let path = '';
  if (pathSegments.length > 0) {
    path = '../'.repeat(pathSegments.length - 1);
  }
  
  return path;
}
