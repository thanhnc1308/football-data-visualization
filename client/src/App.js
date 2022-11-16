import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Footfall Visualization',
    },
  },
};

function App() {
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });
  const loadData = async () => {
    const response = await axios.get('http://localhost:3001/footfall');
    if (response.status === 200) {
      const footfallData = response.data.data;
      const labels = footfallData.map((footfallItem) => footfallItem.Time.slice(0, 10));
      const datasetItem = {
        label: 'Number of People by Day',
        data: footfallData.map((footfallItem) => footfallItem.Value),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      };
      setBarChartData({
        labels,
        datasets: [datasetItem],
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="App">
      <Bar options={barChartOptions} data={barChartData} />
    </div>
  );
}

export default App;
