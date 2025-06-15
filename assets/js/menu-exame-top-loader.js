/**
 * Carregador da barra de ferramentas de exames - WinAudio
 * Carrega dinamicamente o componente da barra de ferramentas para exames
 */

document.addEventListener('DOMContentLoaded', function() {
  loadExameTopMenu();
});

/**
 * Carrega a barra de ferramentas de exames
 */
function loadExameTopMenu() {
  const menuExameTopContainer = document.getElementById('menu-exame-top-container');
  if (!menuExameTopContainer) {
    console.error('Container da barra de ferramentas de exames não encontrado. Adicione uma div com id="menu-exame-top-container" à sua página.');
    return;
  }
  
  // Calcula o caminho relativo para o componente
  const path = getRelativePath();
  
  fetch(path + 'components/menu_exame_top.html')
    .then(response => {
      if (!response.ok) throw new Error('Falha ao carregar o componente de barra de ferramentas de exames: ' + response.status);
      return response.text();
    })
    .then(html => {
      menuExameTopContainer.innerHTML = html;
      setupExameTopMenuEvents();
    })
    .catch(error => {
      menuExameTopContainer.innerHTML = '<p>Erro ao carregar barra de ferramentas de exames: ' + error.message + '</p>';
    });
}

/**
 * Configura os eventos para a barra de ferramentas de exames
 */
function setupExameTopMenuEvents() {
  // Configurar eventos para os botões da barra de ferramentas
  const toolbarButtons = document.querySelectorAll('.exam-toolbar button');
  
  toolbarButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent;
      console.log(`Botão "${buttonText}" clicado`);
      
      // Implementar ações para cada botão conforme necessário
      switch(buttonText) {
        case 'Novo':
          // Lógica para criar novo exame
          alert('Novo exame será criado');
          break;
        case 'Alterar':
          // Lógica para alterar exame
          alert('Alteração de exame');
          break;
        case 'Excluir':
          // Lógica para excluir exame
          if(confirm('Tem certeza que deseja excluir este exame?')) {
            alert('Exame excluído');
          }
          break;
        case 'Imprimir':
          // Lógica para imprimir
          alert('Preparando impressão...');
          break;
        case 'Gerar PDF':
          // Lógica para gerar PDF
          alert('Gerando PDF do exame...');
          break;
        // Casos para os demais botões...
        default:
          // Ação genérica para outros botões
          alert(`Funcionalidade "${buttonText}" será implementada em breve.`);
      }
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
