/**
 * WinAudio - Cadastro de Setores
 * Script para gerenciar a funcionalidade da página de cadastro de setores
 */

document.addEventListener('DOMContentLoaded', function() {
  // Carregar o menu dinâmico
  loadMenu();
  
  // Inicializar componentes Material Design
  const selects = document.querySelectorAll('.mdc-select');
  selects.forEach(select => {
    mdc.select.MDCSelect.attachTo(select);
  });

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
  
  // Botão de novo setor
  const btnNovoSetor = document.getElementById('btn-novo-setor');
  if (btnNovoSetor) {
    btnNovoSetor.addEventListener('click', function() {
      // Limpar o formulário
      document.getElementById('nome-reduzido').value = '';
      document.getElementById('descricao').value = '';
      document.getElementById('prazo-consultas').value = '';
      document.getElementById('nivel-ruido').value = '';
      document.getElementById('exposicao-diaria').value = '';
      
      // Notificar os campos do Material Design para atualizar
      textFields.forEach(textField => {
        const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
        mdcTextField.layout();
      });
      
      // Mostrar mensagem
      snackbar.labelText = 'Formulário limpo para cadastro de novo setor';
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

  // Simulação de dados para navegação
  let currentIndex = 0;
  const mockData = [
    {
      empresa: 'FRIGO SERRANO',
      nomeReduzido: 'PRODUÇÃO',
      descricao: 'Setor de produção principal',
      prazoConsultas: '6',
      nivelRuido: '85',
      exposicaoDiaria: '8'
    },
    {
      empresa: 'FRIGO SERRANO',
      nomeReduzido: 'ADMIN',
      descricao: 'Setor administrativo',
      prazoConsultas: '12',
      nivelRuido: '60',
      exposicaoDiaria: '8'
    },
    {
      empresa: 'FRIGO SERRANO',
      nomeReduzido: 'MANUT',
      descricao: 'Setor de manutenção',
      prazoConsultas: '6',
      nivelRuido: '75',
      exposicaoDiaria: '6'
    }
  ];

  // Função para carregar dados do setor
  function loadSectorData(index) {
    if (index >= 0 && index < mockData.length) {
      const data = mockData[index];
      
      // Preencher os campos do formulário
      document.getElementById('nome-reduzido').value = data.nomeReduzido;
      document.getElementById('descricao').value = data.descricao;
      document.getElementById('prazo-consultas').value = data.prazoConsultas;
      document.getElementById('nivel-ruido').value = data.nivelRuido;
      document.getElementById('exposicao-diaria').value = data.exposicaoDiaria;
      
      // Notificar os campos do Material Design para atualizar
      textFields.forEach(textField => {
        const mdcTextField = mdc.textField.MDCTextField.attachTo(textField);
        mdcTextField.layout();
      });
      
      currentIndex = index;
      
      // Atualizar estado dos botões de navegação
      btnFirst.disabled = currentIndex === 0;
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === mockData.length - 1;
      btnLast.disabled = currentIndex === mockData.length - 1;
    }
  }

  // Configurar eventos para os botões de navegação
  if (btnFirst) {
    btnFirst.addEventListener('click', function() {
      loadSectorData(0);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function() {
      if (currentIndex > 0) {
        loadSectorData(currentIndex - 1);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function() {
      if (currentIndex < mockData.length - 1) {
        loadSectorData(currentIndex + 1);
      }
    });
  }

  if (btnLast) {
    btnLast.addEventListener('click', function() {
      loadSectorData(mockData.length - 1);
    });
  }

  // Carregar dados iniciais
  loadSectorData(0);
});
