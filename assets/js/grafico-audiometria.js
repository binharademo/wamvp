// Script para gráficos de audiometria
document.addEventListener('DOMContentLoaded', function() {
  // Configuração comum para os gráficos
  const frequencias = ['125', '250', '500', '1000', '2000', '4000', '8000', '16000'];
  const yLabels = ['-10', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120'];
  
  // Dados de exemplo para as curvas
  const dadosViaAereaOD = [10, 15, 30, 40, 50, 60, 70, 80];
  const dadosViaAereaOE = [5, 10, 20, 30, 40, 50, 55, 60];
  const dadosViaOsseaOD = [0, 5, 15, 25, 35, 45, 60, 70];
  const dadosViaOsseaOE = [-5, 0, 10, 20, 30, 40, 50, 65];
  
  // Opções comuns do Chart.js
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1, // Proporção 1:1 para deixar quadrado
    scales: {
      x: {
        position: 'top',
        grid: {
          color: '#d1d1d1',
          drawBorder: true,
          drawOnChartArea: true
        },
        ticks: {
          color: '#333'
        },
        title: {
          display: true,
          text: 'Hz'
        }
      },
      y: {
        reverse: true, // Inverte o eixo Y para valores negativos no topo
        min: -10,
        max: 120,
        grid: {
          color: '#d1d1d1',
          drawBorder: true,
          drawOnChartArea: true
        },
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value;
          },
          color: '#333'
        },
        title: {
          display: true,
          text: 'dB'
        }
      }
    },
    plugins: {
      legend: {
        display: false // Removendo a legenda para limpar o visual
      },
      tooltip: {
        enabled: true
      }
    }
  };
  
  // Função para criar um gráfico
  function criarGrafico(canvasId, dadosVA, dadosVO, titulo) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: frequencias,
        datasets: [
          {
            label: 'Via Aérea',
            data: dadosVA,
            borderColor: canvasId === 'audiogramaOD' ? 'red' : 'blue',
            backgroundColor: 'transparent',
            borderWidth: 3,
            pointRadius: 6,
            pointStyle: 'circle',
            tension: 0.4
          },
          {
            label: 'Via Óssea',
            data: dadosVO,
            borderColor: canvasId === 'audiogramaOD' ? 'red' : 'blue',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 6,
            pointStyle: 'triangle',
            tension: 0.4
          }
        ]
      },
      options: commonOptions
    });
  }
  
  // Criar os gráficos
  const graficoOD = criarGrafico('audiogramaOD', dadosViaAereaOD, dadosViaOsseaOD, 'Orelha Direita');
  const graficoOE = criarGrafico('audiogramaOE', dadosViaAereaOE, dadosViaOsseaOE, 'Orelha Esquerda');
  
  // Manipuladores para os checkboxes
  document.getElementById('va-od').addEventListener('change', function() {
    graficoOD.data.datasets[0].hidden = !this.checked;
    graficoOD.update();
  });
  
  document.getElementById('vo-od').addEventListener('change', function() {
    graficoOD.data.datasets[1].hidden = !this.checked;
    graficoOD.update();
  });
  
  document.getElementById('va-oe').addEventListener('change', function() {
    graficoOE.data.datasets[0].hidden = !this.checked;
    graficoOE.update();
  });
  
  document.getElementById('vo-oe').addEventListener('change', function() {
    graficoOE.data.datasets[1].hidden = !this.checked;
    graficoOE.update();
  });
});
