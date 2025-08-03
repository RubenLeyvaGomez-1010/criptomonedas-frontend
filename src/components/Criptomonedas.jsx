import useAllCriptomonedas from '../hooks/UseCriptomoneda';

const Criptomoneda = () => {
  const { criptomonedas, loading, error } = useAllCriptomonedas();

  if (loading) return <p>Cargando criptomonedas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='contenedor criptos'>
        <h3 className='title'>Criptomonedas</h3>
        <ul className='lista'>
            {criptomonedas.map(cripto => (
                <li className='cripto' key={cripto.id}>
                {cripto.nombre} ({cripto.simbolo})
                </li>
            ))}
        </ul>
    </div>
    
  );
};

export default Criptomoneda;
