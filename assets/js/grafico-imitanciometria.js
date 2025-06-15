/**
 * Gráfico de Imitanciometria
 * Implementação usando Chart.js
 */

// Variáveis globais para armazenar as referências dos gráficos
let chartOD = null;
let chartOE = null;

// Função principal executada na inicialização
function inicializarGraficos() {
  limparGraficosExistentes();
  
  // Configurações comuns para ambos os gráficos
  const gridOptions = {
    color: 'rgba(0, 0, 0, 0.1)',
    drawTicks: false,
    drawBorder: true,
    lineWidth: 1
  };

  const fontOptions = {
    family: 'Roboto, Arial, sans-serif',
    size: 11,
    weight: 'normal'
  };

  // Dados para Orelha Direita (curva tipo A)
  const dadosOD = {
    datasets: [{
      label: 'Orelha Direita',
      data: [
        { x: -600, y: 0.3 },
        { x: -500, y: 0.3 },
        { x: -400, y: 0.4 },
        { x: -300, y: 0.7 },
        { x: -200, y: 1.1 },
        { x: -100, y: 1.5 },
        { x: 0, y: 1.5 },
        { x: 100, y: 0.9 },
        { x: 200, y: 0.5 }
      ],
      borderColor: '#ff0000',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.3,
      fill: false
    }]
  };

  // Dados para Orelha Esquerda (curva tipo B - plana)
  const dadosOE = {
    datasets: [{
      label: 'Orelha Esquerda',
      data: [
        { x: -600, y: 0.35 },
        { x: -500, y: 0.35 },
        { x: -400, y: 0.38 },
        { x: -300, y: 0.40 },
        { x: -200, y: 0.40 },
        { x: -100, y: 0.42 },
        { x: 0, y: 0.42 },
        { x: 100, y: 0.42 },
        { x: 200, y: 0.40 }
      ],
      borderColor: '#0000ff',
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.3,
      fill: false
    }]
  };

  // Opções comuns para os gráficos
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 1,
    animation: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: -600,
        max: 200,
        border: {
          display: true,
          width: 1
        },
        title: {
          display: true,
          text: 'daPa',
          font: fontOptions,
          padding: 0
        },
        ticks: {
          stepSize: 100,
          font: {
            size: 10
          }
        },
        grid: gridOptions
      },
      y: {
        min: 0,
        max: 2.5,
        border: {
          display: true,
          width: 1
        },
        title: {
          display: true,
          text: 'ml',
          font: fontOptions,
          padding: 0
        },
        ticks: {
          stepSize: 0.5,
          font: {
            size: 10
          }
        },
        grid: gridOptions,
        position: 'right'
      }
    }
  };

  // Preparar e criar gráficos
  const canvasOD = prepararCanvas('imitanciaOD');
  const canvasOE = prepararCanvas('imitanciaOE');
  
  if (canvasOD && canvasOE) {
    chartOD = new Chart(canvasOD, {
      type: 'line',
      data: dadosOD,
      options: options
    });
    
    chartOE = new Chart(canvasOE, {
      type: 'line',
      data: dadosOE,
      options: options
    });
  }
  
  // Configurar eventos de clique
  configurarEventosClique();
}

// Função para limpar gráficos existentes
function limparGraficosExistentes() {
  if (chartOD) {
    chartOD.destroy();
    chartOD = null;
  }
  
  if (chartOE) {
    chartOE.destroy();
    chartOE = null;
  }
}

// Função para preparar um canvas para receber um gráfico
function prepararCanvas(id) {
  const container = document.querySelector(`#${id}`).parentElement;
  const canvas = document.querySelector(`#${id}`);
  
  if (container && canvas) {
    // Remover canvas antigo
    container.removeChild(canvas);
    
    // Criar novo canvas
    const novoCanvas = document.createElement('canvas');
    novoCanvas.id = id;
    novoCanvas.style.width = '100%';
    novoCanvas.style.height = '100%';
    novoCanvas.width = container.clientWidth;
    novoCanvas.height = container.clientHeight;
    container.appendChild(novoCanvas);
    
    return novoCanvas;
  }
  
  return null;
}

// Função para configurar eventos de clique nos botões
function configurarEventosClique() {
  document.querySelectorAll('.tipo-botao').forEach(botao => {
    // Limpar eventos existentes
    botao.removeEventListener('click', selecionarCurva);
    // Adicionar novo evento
    botao.addEventListener('click', selecionarCurva);
  });
}

// Função para selecionar tipo de curva
function selecionarCurva() {
  const container = this.closest('.tipo-curva');
  
  if (container) {
    container.querySelectorAll('.tipo-botao').forEach(b => {
      b.classList.remove('selecionado');
    });
    
    this.classList.add('selecionado');
  }
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarGraficos);

// Adicionar evento para redimensionamento da janela
window.addEventListener('resize', function() {
  inicializarGraficos();
});
