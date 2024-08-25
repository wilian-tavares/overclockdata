import { useState, useEffect } from 'react'

import './App.css'

function App() {


  const [cpu, setCpu] = useState("Processador");
  const [voltagem, setVoltagem] = useState("");
  const [clock, setClock] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [success, setSuccess] = useState("");


  const [perfil, setPerfil] = useState({
    cpu: '',
    voltagem: '',
    clock: '',
    temperatura: '',
    success: '',

  })

  interface Perfil {
    cpu: string;
    voltagem: string;
    clock: string;
    temperatura: string;
    success: string;
  }

  // const [allPerfil, setAllPerfil] = useState([]);
  const [allPerfil, setAllPerfil] = useState<Perfil[]>([]);




  function handlePerfil(cpu: string, voltagem: string, clock: string, temperatura: string, success: string) {

    const newPerfil: Perfil = { cpu, voltagem, clock, temperatura, success };
    setAllPerfil(perfils => [...perfils, newPerfil]);

    setCpu("");
    setVoltagem("");
    setClock("");
    setTemperatura("");
    setSuccess("");

    console.log(allPerfil)
  }

  return (
    <div className='container'>
      <header>Overclock</header>

      <main>
        <h2 className='title'>Configuração Overclock</h2>
        <div className='area-cadastro'>

          <input className='input-text' type='input' value={cpu} onChange={(cpu) => setCpu(cpu.target.value)} placeholder='Informe Processador' />
          <input className='input-text' type='input' value={voltagem} onChange={(voltagem) => setVoltagem(voltagem.target.value)} placeholder='Informe Voltagem' />
          <input className='input-text' type='input' value={clock} onChange={(clock) => setClock(clock.target.value)} placeholder='Informe Clock Atual' />
          <input className='input-text' type='input' value={temperatura} onChange={(temperatura) => setTemperatura(temperatura.target.value)} placeholder='Informe Temperatura Máxima' />


            <p>O Overclock ficous estável?</p>
          <div className='shield-radio'>
            <label >
              SIM
              <input className='input-radio' type='radio' value="SIM" checked={success === 'SIM'} onChange={() => setSuccess("SIM")} placeholder='Informe Processador' />
            </label>

            <label>
              NÃO
              <input className='input-radio' type='radio' value="NÃO" checked={success === 'NÃO'} onChange={() => setSuccess("NÃO")} placeholder='Informe Processador' />
            </label>

          </div>
          <button className='button-cadastrar' onClick={() => handlePerfil(cpu, voltagem, clock, temperatura, success)}>Cadastrar</button>


        </div>

        {allPerfil.map((perfil, index) => (
          <article key={index} className='lista-perfil'>
            <p>{`CPU: ${perfil.cpu}`} | </p>
            <p>{`Volts: ${perfil.voltagem} | `}</p>
            <p>{`Clock: ${perfil.clock}Mhz | `}</p>
            <p>{`temperatura: ${perfil.temperatura} | `}</p>
            <p>{`Estável: ${perfil.success} | `}</p>
          </article>
        ))}



      </main>

    </div>
  )
}

export default App
