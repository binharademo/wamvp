/**
 * Script para o formulário de cadastro de empresas
 * WinAudio - Sistema de Gestão de Audiometria
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes MDC
  const textFields = document.querySelectorAll('.mdc-text-field');
  textFields.forEach(textField => {
    mdc.textField.MDCTextField.attachTo(textField);
  });

  const selects = document.querySelectorAll('.mdc-select');
  selects.forEach(select => {
    mdc.select.MDCSelect.attachTo(select);
  });

  // Inicializar snackbar
  const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));

  // Aplicar máscaras aos campos
  const cnpjMask = IMask(document.getElementById('cnpj'), {
    mask: '00.000.000/0000-00'
  });

  const cepMask = IMask(document.getElementById('cep'), {
    mask: '00000-000'
  });

  const telefoneMask = IMask(document.getElementById('telefone'), {
    mask: '(00) 0000-0000'
  });

  const faxMask = IMask(document.getElementById('fax'), {
    mask: '(00) 0000-0000'
  });

  const telContatoMask = IMask(document.getElementById('tel-contato'), {
    mask: '(00) 00000-0000'
  });

  // Função para formatar data
  const dataFundacaoMask = IMask(document.getElementById('data-fundacao'), {
    mask: '00/00/0000'
  });

  // Busca CEP
  document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;

    // Simulando busca de CEP (em produção, usar API de CEP)
    // Esta é uma simulação para fins de demonstração
    setTimeout(() => {
      // Dados simulados
      const endereco = {
        logradouro: 'Av. Exemplo',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP'
      };

      document.getElementById('endereco').value = endereco.logradouro;
      document.getElementById('bairro').value = endereco.bairro;
      document.getElementById('cidade').value = endereco.cidade;
      
      // Selecionar UF no select
      const ufSelect = document.querySelector('#uf-select');
      const mdcSelect = mdc.select.MDCSelect.attachTo(ufSelect);
      mdcSelect.value = endereco.uf;
    }, 500);
  });

  // Validação do formulário
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validar campos obrigatórios
    let formValido = true;
    const camposObrigatorios = [
      { id: 'razao-social', mensagem: 'Razão Social é obrigatória' },
      { id: 'cnpj', mensagem: 'CNPJ é obrigatório' }
    ];

    camposObrigatorios.forEach(campo => {
      const elemento = document.getElementById(campo.id);
      if (!elemento.value.trim()) {
        formValido = false;
        snackbar.labelText = campo.mensagem;
        snackbar.open();
        elemento.focus();
        return;
      }
    });

    // Validar CNPJ
    if (formValido && document.getElementById('cnpj').value.trim()) {
      const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
      if (!validarCNPJ(cnpj)) {
        formValido = false;
        snackbar.labelText = 'CNPJ inválido';
        snackbar.open();
        document.getElementById('cnpj').focus();
      }
    }

    // Se o formulário for válido, enviar dados
    if (formValido) {
      // Aqui seria a lógica para enviar dados para o servidor
      snackbar.labelText = 'Empresa cadastrada com sucesso!';
      snackbar.open();
      
      // Simulando sucesso (em produção, enviar para o servidor)
      console.log('Formulário enviado com sucesso');
    }
  });

  // Botão Limpar
  document.getElementById('btn-limpar').addEventListener('click', function() {
    document.querySelector('form').reset();
    
    // Limpar também os campos com máscaras
    cnpjMask.value = '';
    cepMask.value = '';
    telefoneMask.value = '';
    faxMask.value = '';
    telContatoMask.value = '';
    dataFundacaoMask.value = '';
    
    // Resetar selects MDC
    selects.forEach(select => {
      const mdcSelect = mdc.select.MDCSelect.attachTo(select);
      mdcSelect.value = '';
    });
    
    // Focar no primeiro campo
    document.getElementById('razao-social').focus();
  });

  // Botão Cancelar
  document.getElementById('btn-cancelar').addEventListener('click', function() {
    // Redirecionar para a página anterior ou para a lista de empresas
    window.location.href = '../index.html';
  });

  // Função para validar CNPJ
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;
    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (cnpj === '00000000000000' || 
        cnpj === '11111111111111' || 
        cnpj === '22222222222222' || 
        cnpj === '33333333333333' || 
        cnpj === '44444444444444' || 
        cnpj === '55555555555555' || 
        cnpj === '66666666666666' || 
        cnpj === '77777777777777' || 
        cnpj === '88888888888888' || 
        cnpj === '99999999999999')
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
});
