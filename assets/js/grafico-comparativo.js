/**
 * Gráfico Comparativo de Audiometria
 * Implementação usando Chart.js
 */

// Variáveis globais para armazenar as referências dos gráficos
let chartComparativoOD = null;
let chartComparativoOE = null;

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

  // Função auxiliar para gerar linhas de grade predefinidas
  function gerarLinhasDeGrade() {
    return [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000, 12000, 16000];
  }

  // Frequências para o eixo X
  const frequencias = gerarLinhasDeGrade();

  // Dados para Orelha Direita (Exame 1 e 2)
  const dadosOD = {
    datasets: [
      {
        // Exame 1 - Via Aérea
        label: 'Exame 1 - OD',
        data: [
          { x: 125, y: 30 },
          { x: 250, y: 30 },
          { x: 500, y: 40 },
          { x: 1000, y: 50 },
          { x: 2000, y: 60 },
          { x: 4000, y: 65 },
          { x: 8000, y: 70 },
          { x: 12000, y: 90 }
        ],
        borderColor: '#ff0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 7,
        pointStyle: 'circle',
        tension: 0.3,
        fill: false,
        showLine: true
      }
    ]
  };

  // Dados para Orelha Esquerda (Exame 1 e 2)
  const dadosOE = {
    datasets: [
      {
        // Exame 1 - Via Aérea
        label: 'Exame 1 - OE',
        data: [
          { x: 125, y: 25 },
          { x: 250, y: 25 },
          { x: 500, y: 30 },
          { x: 1000, y: 45 },
          { x: 2000, y: 55 },
          { x: 4000, y: 65 },
          { x: 8000, y: 70 },
          { x: 12000, y: 70 }
        ],
        borderColor: '#ff00ff',
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        borderWidth: 2,
        pointRadius: 7,
        pointStyle: 'star',
        tension: 0.3,
        fill: false,
        showLine: true
      }
    ]
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
        enabled: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} dB`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'logarithmic',
        position: 'top',
        min: 125,
        max: 16000,
        border: {
          display: true,
          width: 1
        },
        title: {
          display: false
        },
        ticks: {
          callback: function(value) {
            return frequencias.includes(value) ? value : '';
          },
          font: {
            size: 10
          }
        },
        grid: gridOptions
      },
      y: {
        min: -10,
        max: 120,
        reverse: true, // Importante: invertendo a escala para o gráfico audiométrico
        border: {
          display: true,
          width: 1
        },
        title: {
          display: true,
          text: 'dB',
          font: fontOptions,
          padding: 0
        },
        ticks: {
          stepSize: 10,
          font: {
            size: 10
          }
        },
        grid: gridOptions
      }
    }
  };

  // Preparar e criar gráficos
  const canvasOD = prepararCanvas('comparativoOD');
  const canvasOE = prepararCanvas('comparativoOE');
  
  if (canvasOD && canvasOE) {
    chartComparativoOD = new Chart(canvasOD, {
      type: 'line',
      data: dadosOD,
      options: options
    });
    
    chartComparativoOE = new Chart(canvasOE, {
      type: 'line',
      data: dadosOE,
      options: options
    });
  }
  
  // Configurar eventos de clique
  configurarEventos();
}

// Função para limpar gráficos existentes
function limparGraficosExistentes() {
  if (chartComparativoOD) {
    chartComparativoOD.destroy();
    chartComparativoOD = null;
  }
  
  if (chartComparativoOE) {
    chartComparativoOE.destroy();
    chartComparativoOE = null;
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

// Função para configurar eventos
function configurarEventos() {
  // Configurar botões de seleção de orelha
  document.querySelectorAll('.ear-btn').forEach(botao => {
    botao.removeEventListener('click', toggleOrelha);
    botao.addEventListener('click', toggleOrelha);
    botao.addEventListener('click', atualizarGraficos); // Atualizar imediatamente ao selecionar
  });
  
  // Configurar checkbox para via aérea e óssea - atualizar gráfico imediatamente
  document.getElementById('via-aerea')?.addEventListener('change', atualizarGraficos);
  document.getElementById('via-ossea')?.addEventListener('change', atualizarGraficos);
}

// Função para alternar seleção de orelha
function toggleOrelha() {
  this.classList.toggle('selected');
  // Não atualizamos o gráfico imediatamente, esperamos pelo botão de Visualizar
}

// Função para atualizar os gráficos com base nas seleções
function atualizarGraficos() {
  // Em uma implementação completa, aqui buscaríamos os dados dos exames
  // selecionados e atualizaríamos os gráficos. No mockup, apenas recriamos.
  inicializarGraficos();
}

// Adicionar segunda curva para o exame comparativo (simulação)
function adicionarSegundoExame() {
  // Esta função seria chamada para atualizar o gráfico com dados do segundo exame
  if (chartComparativoOD) {
    chartComparativoOD.data.datasets.push({
      label: 'Exame 2 - OD',
      data: [
        { x: 125, y: 35 },
        { x: 250, y: 35 },
        { x: 500, y: 45 },
        { x: 1000, y: 55 },
        { x: 2000, y: 65 },
        { x: 4000, y: 70 },
        { x: 8000, y: 75 }
      ],
      borderColor: '#990000',
      borderDash: [5, 5],
      backgroundColor: 'rgba(153, 0, 0, 0.1)',
      borderWidth: 2,
      pointRadius: 7,
      pointStyle: 'triangle',
      tension: 0.3,
      fill: false,
      showLine: true
    });
    chartComparativoOD.update();
  }
  
  if (chartComparativoOE) {
    chartComparativoOE.data.datasets.push({
      label: 'Exame 2 - OE',
      data: [
        { x: 125, y: 30 },
        { x: 250, y: 30 },
        { x: 500, y: 35 },
        { x: 1000, y: 50 },
        { x: 2000, y: 60 },
        { x: 4000, y: 70 },
        { x: 8000, y: 75 }
      ],
      borderColor: '#9900ff',
      borderDash: [5, 5],
      backgroundColor: 'rgba(153, 0, 255, 0.1)',
      borderWidth: 2,
      pointRadius: 7,
      pointStyle: 'rectRot',
      tension: 0.3,
      fill: false,
      showLine: true
    });
    chartComparativoOE.update();
  }
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  inicializarGraficos();
  
  // Simulação: adicionar segundo exame após 1 segundo
  setTimeout(adicionarSegundoExame, 1000);
});

// Adicionar evento para redimensionamento da janela
window.addEventListener('resize', function() {
  inicializarGraficos();
});
