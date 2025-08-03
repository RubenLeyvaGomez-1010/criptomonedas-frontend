// src/components/CryptoLiveChart.tsx
import { Line } from 'react-chartjs-2';
import useCryptoWebSocket from '../hooks/UseCryptoWebSocket';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Grafica = ({ criptoId }: { criptoId: number }) => {
  const { historial, loading } = useCryptoWebSocket(criptoId);

  if (loading) return <div>Cargando...</div>;

  const precios = historial.map(item => item.precio);
  const etiquetas = historial.map(item => new Date(item.fecha).toLocaleTimeString());

  const data = {
    labels: etiquetas,
    datasets: [{
      label: 'Precio (MXN)',
      data: precios,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)', // por defecto
      segment: {
        borderColor: ctx => {
          const { p0, p1 } = ctx;
          return p1.y < p0.y ? 'green' : 'red'; // si sube → verde, si baja → rojo
        }
      },
      pointRadius: 0 
    }]
  };

  const options = {
    responsive: true,
    animation: { duration: 0 },
    scales: {
      x: {
        ticks: {
          maxRotation: 45
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2>Precio en Tiempo Real</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Grafica;
