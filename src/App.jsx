import Header from './components/Header.jsx'
import CryptoSelector from './components/CryptoSelector.tsx'
import Footer from './components/Footer.jsx'
import Criptomoneda from './components/Criptomonedas.jsx'
import React from 'react'
import './styles/app.scss'

function App() {
 

  return (
    <>
      <Header />
      <div className="contenedor">
        <h1>Gráfico de Criptomonedas</h1>
        <CryptoSelector />
      </div>


      <Criptomoneda />


      <Footer />
      
    </>
  )
}

export default App
