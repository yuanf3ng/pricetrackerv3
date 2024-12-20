import { ChartOptions } from 'chart.js';

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: 'easeInOutQuart',
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 15,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      displayColors: true,
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'MMM d',
        },
      },
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      beginAtZero: false,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        callback: (value) => `$${value}`,
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
}