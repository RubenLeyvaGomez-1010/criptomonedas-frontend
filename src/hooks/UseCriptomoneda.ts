import { useEffect, useState } from 'react';
import axios from 'axios';

interface Criptomoneda {
  id: number;
  nombre: string;
  simbolo: string;
}

const useAllCriptomonedas = () => {
  const [criptomonedas, setCriptomonedas] = useState<Criptomoneda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCriptomonedas = async () => {
      try {
        const response = await axios.get<Criptomoneda[]>('http://localhost:3080/criptomoneda/all');
        setCriptomonedas(response.data);
      } catch (err: any) {
        console.error('Error al obtener criptomonedas:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchCriptomonedas();
  }, []);

  return { criptomonedas, loading, error };
};

export default useAllCriptomonedas;
