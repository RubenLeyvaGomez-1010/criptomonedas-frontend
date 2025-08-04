import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import useCryptoWebSocket from '../hooks/UseCryptoWebSocket';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const CryptoSelector = () => {
  const [selectedCryptoId, setSelectedCryptoId] = useState<number>(1); 
  const { historial, loading } = useCryptoWebSocket(selectedCryptoId);
  const chartRef = useRef<ChartJS | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [selectedCryptoId]);


  useEffect(() => {
    if (loading || !canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx || !historial.length) return;

    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: historial.map(item => new Date(item.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [{
            label: `Precio (MXN) - ${getCryptoName(selectedCryptoId)}`,
            data: historial.map(item => item.precio),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            borderWidth: 2,
            segment: {
                borderColor: ctx => {
                const { p0, p1 } = ctx;
                return p1.y < p0.y ? 'green' : 'red';
                }
            },
            // pointRadius: 0 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        scales: {
          x: { 
            ticks: { maxRotation: 45 },
            grid: { display: false }
          },
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0, 0, 0, 0.1)' }
          }
        }
      }
    });

  }, [historial, loading, selectedCryptoId]);

  const getCryptoName = (id: number) => {
    const cryptos = {
      1: 'Bitcoin (BTC)',
      2: 'Ethereum (ETH)',
      3: 'XRP (XRP)',
      4: 'Tether USDt (USDT)',
      5: 'BNB (BNB)',
      6: 'Solana (SOL)',
      7: 'USDC (USDC)',
      8: 'Dogecoin (DOGE)',
      9: 'TRON (TRX)',
      10: 'Cardano (ADA)'
    };
    return cryptos[id] || `Cripto ID: ${id}`;
  };

  if (loading) return <div className="loading-spinner">Cargando datos...</div>;

  return (
    <div className="crypto-dashboard">
      <div className="crypto-selector">
        <label htmlFor="crypto-select">Selecciona Criptomoneda: </label>
        <select
          id="crypto-select"
          value={selectedCryptoId}
          onChange={(e) => setSelectedCryptoId(Number(e.target.value))}
          className="select-dropdown"
        >
          <option value={1}>Bitcoin (BTC)</option>
          <option value={2}>Ethereum (ETH)</option>
          <option value={4}>XRP (XRP)</option>
          <option value={4}>Tether USDt (USDT)</option>
          <option value={5}>BNB (BNB)</option>
          <option value={6}>Solana (SOL)</option>
          <option value={7}>USDC (USDC)</option>
          <option value={8}>Dogecoin (DOGE)</option>
          <option value={9}>TRON (TRX)</option>
          <option value={10}>Cardano (ADA)</option>
          
        </select>
      </div>

      <div className="chart-container">
        <canvas 
          ref={canvasRef} 
          width={800}
          height={400}
          aria-label={`Gráfico de precios de ${getCryptoName(selectedCryptoId)}`}
        />
      </div>

        <div className="chart-legend">
            <p>Gráfico de precios en tiempo real de {getCryptoName(selectedCryptoId)}</p>
            <p>Último precio: {historial[0]?.precio || 0} MXN</p>
            <p>Porcentaje: {historial[0].porcentaje}%</p>
            <p>Volumen: {historial[0].volumen}</p>
        </div>
    </div>
  );
};

export default CryptoSelector;