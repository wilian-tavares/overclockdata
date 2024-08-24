import { useState } from 'react'

import './App.css'

function App() {
  const [cpu, setCpu] = useState("");
  const [voltagem, setVoltagem] = useState("");
  const [clock, setClock] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div className='container'>
      <header>Overclock</header>

      <main>
        <h2>Configuração Overclock</h2>

        <input className='input-text' type='input' value={cpu} onChange={(cpu) => setCpu(cpu.target.value)} placeholder='Informe Processador' />
        <input className='input-text' type='input' value={voltagem} onChange={(voltagem) => setVoltagem(voltagem.target.value)} placeholder='Informe Voltagem' />
        <input className='input-text' type='input' value={clock} onChange={(clock) => setClock(clock.target.value)} placeholder='Informe Clock Atual' />
        <input className='input-text' type='input' value={temperatura} onChange={(temperatura) => setTemperatura(temperatura.target.value)} placeholder='Informe Temperatura Máxima' />

        <input className='input-radio' type='radio' value="SIM"  checked={success === 'SIM'} onChange={() => setSuccess("SIM")} placeholder='Informe Processador' />
        <input className='input-radio' type='radio' value="NÃO"  checked={success === 'NÃO'} onChange={() => setSuccess("NÃO")} placeholder='Informe Processador' />

        <button className='button-cadastrar'>Cadastrar</button>

        <p>{`CPU: ${cpu}`}</p>
        <p>{`Volts: ${voltagem}`}</p>
        <p>{`Clock: ${clock}Mhz`}</p>
        <p>{`temperatura: ${temperatura}`}</p>
        <p>{`Success: ${success}`}</p>

      </main>

    </div>
  )
}

export default App
