import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export function StatChart({ type, data, title }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: title,
      data: Object.values(data),
      backgroundColor: [
        'rgba(16, 185, 129, 0.7)',    // Emerald
        'rgba(6, 182, 212, 0.7)',     // Cyan
        'rgba(139, 92, 246, 0.7)',    // Purple
        'rgba(245, 158, 11, 0.7)',    // Amber
        'rgba(239, 68, 68, 0.7)',     // Red
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(6, 182, 212, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', font: { size: 12 } },
      },
      title: {
        display: true,
        text: title,
        color: '#fff',
        font: { size: 14, weight: 'bold' },
      },
    },
  };

  return (
    <div className="bg-card backdrop-blur-md border border-white/5 rounded-3xl p-6 h-80">
      {type === 'doughnut' ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
