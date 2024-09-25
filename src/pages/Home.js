import React from 'react';
import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'
import Botao from '../components/Botao'
import '../styles.css';

export default function Home() {
  
  const redirectDespesas = () => {
    window.location.replace('/Despesas');
}

  return (
    <div> 
      <Cabecalho titulo="Bem vindo"/>
      <br />
      <h1 className='bemvindo'> Bem vindo ao app para registro de despesas!</h1>
      <br/>
      <menu className='menuBotoes'>
        <Botao acao={redirectDespesas} className="addBtn" value="Iniciar"/>
      </menu>
      <Rodape/>
    </div>
  )
}
