import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useCryptoWebSocket = (criptoId: number) => {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let socket: any;

    const fetchInitialData = async () => {
      const response = await fetch(`http://localhost:3080/historial/findOne/${criptoId}`);
      const data = await response.json();
      setHistorial(data.reverse());
      setLoading(false);
    };

    fetchInitialData();

    socket = io('http://localhost:3080');

    const eventName = `historial-update-${criptoId}`;

    socket.on(eventName, (data: { criptoId: number; nuevoRegistro: any }) => {
      setHistorial(prev => [data.nuevoRegistro, ...prev]);
    });

    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [criptoId]);

  return { historial, loading };
};


export default useCryptoWebSocket; 