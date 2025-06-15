/**
 * WinAudio - Cadastro de Patologias
 * Script para gerenciar a funcionalidade da página de cadastro de patologias
 */

document.addEventListener('DOMContentLoaded', function() {
  // Carregar o menu dinâmico
  loadMenu();
  
  // Inicializar componentes Material Design
  const textFields = document.querySelectorAll('.mdc-text-field');
  textFields.forEach(textField => {
    mdc.textField.MDCTextField.attachTo(textField);
  });

  const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));

  // Botão de fechar
  const btnFechar = document.getElementById('btn-fechar');
  if (btnFechar) {
    btnFechar.addEventListener('click', function() {
      window.location.href = '../../index.html';
    });
  }
  
  // Botão de nova patologia
  const btnNovaPatologia = document.getElementById('btn-nova-patologia');
  if (btnNovaPatologia) {
    btnNovaPatologia.addEventListener('click', function() {
      // Limpar o formulário
      document.getElementById('codigo').value = '';
      document.getElementById('descricao').value = '';
      
      // Notificar os campos do Material Design para atualizar
      textFields.forEach(textField => {
        const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
        mdcTextField.layout();
      });
      
      // Mostrar mensagem
      snackbar.labelText = 'Formulário limpo para cadastro de nova patologia';
      snackbar.open();
    });
  }

  // Botão de fechar no cabeçalho
  const btnClose = document.querySelector('.card-header .mdc-icon-button');
  if (btnClose) {
    btnClose.addEventListener('click', function() {
      window.location.href = '../../index.html';
    });
  }

  // Botões de navegação
  const btnFirst = document.querySelector('button[aria-label="Primeiro"]');
  const btnPrev = document.querySelector('button[aria-label="Anterior"]');
  const btnNext = document.querySelector('button[aria-label="Próximo"]');
  const btnLast = document.querySelector('button[aria-label="Último"]');
  
  // Dados de exemplo para simular navegação
  const patologiasExemplo = [
    { codigo: '001', descricao: 'Perda Auditiva Neurossensorial' },
    { codigo: '002', descricao: 'Otite Média' },
    { codigo: '003', descricao: 'Zumbido' },
    { codigo: '004', descricao: 'Labirintite' }
  ];
  
  let indiceAtual = 0;
  
  // Função para carregar dados da patologia
  function carregarPatologia(indice) {
    const patologia = patologiasExemplo[indice];
    document.getElementById('codigo').value = patologia.codigo;
    document.getElementById('descricao').value = patologia.descricao;
    
    // Atualizar os campos do Material Design
    textFields.forEach(textField => {
      const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
      mdcTextField.layout();
    });
    
    indiceAtual = indice;
  }
  
  // Carregar a primeira patologia ao iniciar
  carregarPatologia(0);
  
  // Configurar eventos dos botões de navegação
  if (btnFirst) {
    btnFirst.addEventListener('click', function() {
      carregarPatologia(0);
    });
  }
  
  if (btnPrev) {
    btnPrev.addEventListener('click', function() {
      if (indiceAtual > 0) {
        carregarPatologia(indiceAtual - 1);
      }
    });
  }
  
  if (btnNext) {
    btnNext.addEventListener('click', function() {
      if (indiceAtual < patologiasExemplo.length - 1) {
        carregarPatologia(indiceAtual + 1);
      }
    });
  }
  
  if (btnLast) {
    btnLast.addEventListener('click', function() {
      carregarPatologia(patologiasExemplo.length - 1);
    });
  }
});
