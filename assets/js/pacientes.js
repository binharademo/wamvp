/**
 * WinAudio - Script para a página de cadastro de pacientes
 * Versão atualizada para o novo formulário completo
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes MDC
  mdc.autoInit();
  
  // Inicializar snackbar
  const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
  
  // Inicializar todos os campos de texto
  const textFields = document.querySelectorAll('.mdc-text-field');
  textFields.forEach(textField => {
    new mdc.textField.MDCTextField(textField);
  });
  
  // Inicializar todos os selects
  const selects = document.querySelectorAll('.mdc-select');
  const selectControls = {};
  selects.forEach((select, index) => {
    const id = select.id || `select-${index}`;
    selectControls[id] = new mdc.select.MDCSelect(select);
  });
  
  // Inicializar todos os botões
  const buttons = document.querySelectorAll('.mdc-button');
  buttons.forEach(button => {
    new mdc.ripple.MDCRipple(button);
  });
  
  // Inicializar radio buttons
  const radios = document.querySelectorAll('.mdc-radio');
  radios.forEach(radio => {
    new mdc.radio.MDCRadio(radio);
  });
  
  // Configurar máscaras para campos
  if (typeof IMask !== 'undefined') {
    // CPF
    const cpfElement = document.getElementById('cpf');
    if (cpfElement) {
      IMask(cpfElement, {
        mask: '000.000.000-00'
      });
    }
    
    // Telefones
    const telefonesElements = ['telefone', 'celular', 'telefone-contato'];
    telefonesElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        IMask(element, {
          mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }],
          dispatch: function(appended, dynamicMasked) {
            const number = (dynamicMasked.value + appended).replace(/\D/g, '');
            return dynamicMasked.compiledMasks[number.length > 10 ? 1 : 0];
          }
        });
      }
    });
    
    // CEP
    const cepElement = document.getElementById('cep');
    if (cepElement) {
      IMask(cepElement, {
        mask: '00000-000'
      });
    }
  }
  
  // Calcular idade automaticamente quando a data de nascimento for alterada
  const dataNascElement = document.getElementById('data-nascimento');
  const idadeElement = document.getElementById('idade');
  if (dataNascElement && idadeElement) {
    dataNascElement.addEventListener('change', function() {
      if (this.value) {
        const dataNasc = new Date(this.value);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
          idade--;
        }
        
        idadeElement.value = idade;
      } else {
        idadeElement.value = '';
      }
    });
  }
  
  // Mostrar/ocultar seção ocupacional com base no tipo de paciente
  const tipoClinico = document.getElementById('tipo-clinico');
  const tipoOcupacional = document.getElementById('tipo-ocupacional');
  const secaoOcupacional = document.getElementById('secao-ocupacional');
  
  if (tipoClinico && tipoOcupacional && secaoOcupacional) {
    function toggleSecaoOcupacional() {
      secaoOcupacional.style.display = tipoOcupacional.checked ? 'block' : 'none';
    }
    
    tipoClinico.addEventListener('change', toggleSecaoOcupacional);
    tipoOcupacional.addEventListener('change', toggleSecaoOcupacional);
  }
  
  // Buscar endereço pelo CEP
  const cepElement = document.getElementById('cep');
  if (cepElement) {
    cepElement.addEventListener('blur', function() {
      const cep = this.value.replace(/\D/g, '');
      
      if (cep.length === 8) {
        // Em um aplicativo real, aqui faria uma requisição para um serviço de CEP
        // Simulação de busca de CEP
        setTimeout(() => {
          if (cep === '12345678') {
            document.getElementById('logradouro').value = 'Av. Brasil';
            document.getElementById('bairro').value = 'Centro';
            document.getElementById('cidade').value = 'São Paulo';
            selectControls['estado-select'].value = 'SP';
            // Foco no campo número
            document.getElementById('numero').focus();
          } else {
            snackbar.labelText = 'CEP não encontrado. Preencha o endereço manualmente.';
            snackbar.open();
          }
        }, 500);
      }
    });
  }
  
  // Manipular envio do formulário
  const formPaciente = document.getElementById('form-paciente');
  if (formPaciente) {
    formPaciente.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar campos obrigatórios
      const nomeCompleto = document.getElementById('nome-completo');
      const cpf = document.getElementById('cpf');
      const dataNascimento = document.getElementById('data-nascimento');
      
      if (!nomeCompleto.value.trim()) {
        snackbar.labelText = 'Por favor, preencha o nome completo do paciente.';
        snackbar.open();
        nomeCompleto.focus();
        return;
      }
      
      if (!cpf.value.trim() || cpf.value.length < 14) {
        snackbar.labelText = 'Por favor, preencha o CPF corretamente.';
        snackbar.open();
        cpf.focus();
        return;
      }
      
      if (!dataNascimento.value) {
        snackbar.labelText = 'Por favor, informe a data de nascimento.';
        snackbar.open();
        dataNascimento.focus();
        return;
      }
      
      // Em um aplicativo real, aqui enviaria os dados para o servidor
      
      // Simulação de salvamento bem-sucedido
      snackbar.labelText = 'Paciente cadastrado com sucesso!';
      snackbar.open();
      
      // Limpar formulário após salvar
      setTimeout(function() {
        formPaciente.reset();
        // Resetar selects MDC
        Object.values(selectControls).forEach(select => {
          select.value = '';
        });
        // Resetar campo de idade
        if (idadeElement) idadeElement.value = '';
        // Esconder seção ocupacional
        if (secaoOcupacional) secaoOcupacional.style.display = 'none';
        if (tipoClinico) tipoClinico.checked = true;
      }, 1500);
    });
  }
  
  // Botão cancelar
  const btnCancelar = document.getElementById('btn-cancelar');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', function() {
      // Voltar para a página anterior ou para o dashboard
      window.location.href = '../dashboard/index.html';
    });
  }
  
  // Botão limpar
  const btnLimpar = document.getElementById('btn-limpar');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
      // Confirmação antes de limpar
      if (confirm('Deseja realmente limpar todos os campos do formulário?')) {
        formPaciente.reset();
        // Resetar selects MDC
        Object.values(selectControls).forEach(select => {
          select.value = '';
        });
        // Resetar campo de idade
        if (idadeElement) idadeElement.value = '';
        // Esconder seção ocupacional
        if (secaoOcupacional) secaoOcupacional.style.display = 'none';
        if (tipoClinico) tipoClinico.checked = true;
        
        snackbar.labelText = 'Formulário limpo com sucesso!';
        snackbar.open();
      }
    });
  }
});
