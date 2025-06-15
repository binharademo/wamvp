/**
 * WinAudio - Cadastro de Acompanhamentos
 * Script para gerenciar a funcionalidade da página de cadastro de acompanhamentos
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
  
  // Botão de novo acompanhamento
  const btnNovoAcompanhamento = document.getElementById('btn-novo-acompanhamento');
  if (btnNovoAcompanhamento) {
    btnNovoAcompanhamento.addEventListener('click', function() {
      // Limpar o formulário
      document.getElementById('sigla').value = '';
      document.getElementById('descricao').value = '';
      
      // Notificar os campos do Material Design para atualizar
      textFields.forEach(textField => {
        const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
        mdcTextField.layout();
      });
      
      // Mostrar mensagem
      snackbar.labelText = 'Formulário limpo para cadastro de novo acompanhamento';
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
  const acompanhamentosExemplo = [
    { sigla: 'ORL', descricao: 'Otorrinolaringologista' },
    { sigla: 'FON', descricao: 'Fonoaudiólogo' },
    { sigla: 'PSI', descricao: 'Psicólogo' },
    { sigla: 'MED', descricao: 'Médico do Trabalho' }
  ];
  
  let indiceAtual = 0;
  
  // Função para carregar dados do acompanhamento
  function carregarAcompanhamento(indice) {
    const acompanhamento = acompanhamentosExemplo[indice];
    document.getElementById('sigla').value = acompanhamento.sigla;
    document.getElementById('descricao').value = acompanhamento.descricao;
    
    // Atualizar os campos do Material Design
    textFields.forEach(textField => {
      const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
      mdcTextField.layout();
    });
    
    indiceAtual = indice;
  }
  
  // Carregar o primeiro acompanhamento ao iniciar
  carregarAcompanhamento(0);
  
  // Configurar eventos dos botões de navegação
  if (btnFirst) {
    btnFirst.addEventListener('click', function() {
      carregarAcompanhamento(0);
    });
  }
  
  if (btnPrev) {
    btnPrev.addEventListener('click', function() {
      if (indiceAtual > 0) {
        carregarAcompanhamento(indiceAtual - 1);
      }
    });
  }
  
  if (btnNext) {
    btnNext.addEventListener('click', function() {
      if (indiceAtual < acompanhamentosExemplo.length - 1) {
        carregarAcompanhamento(indiceAtual + 1);
      }
    });
  }
  
  if (btnLast) {
    btnLast.addEventListener('click', function() {
      carregarAcompanhamento(acompanhamentosExemplo.length - 1);
    });
  }
});
