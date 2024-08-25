import { useState, useEffect } from 'react'

import './App.css'

function App() {


  const [cpu, setCpu] = useState("Processador");
  const [voltagem, setVoltagem] = useState("");
  const [clock, setClock] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [estavel, setEstavel] = useState("");


  const [perfil, setPerfil] = useState({
    cpu: '',
    voltagem: '',
    clock: '',
    temperatura: '',
    estavel: '',

  })

  interface Perfil {
    cpu: string;
    voltagem: string;
    clock: string;
    temperatura: string;
    estavel: string;
  }


  const [allPerfil, setAllPerfil] = useState<Perfil[]>([]);


  useEffect(() => {
    const confSalvas = localStorage.getItem("overclock");
    if (confSalvas) {
      setAllPerfil(JSON.parse(confSalvas));
    }
  }, []);
  
  useEffect(() => {
    if (allPerfil.length > 0) {
      localStorage.setItem("overclock", JSON.stringify(allPerfil));
    }
  }, [allPerfil]);



  function handlePerfil(cpu: string, voltagem: string, clock: string, temperatura: string, estavel: string) {

    const newPerfil: Perfil = { cpu, voltagem, clock, temperatura, estavel };
    if (voltagem !== "" && clock !== "" && temperatura !== "" && estavel !== "")


      setAllPerfil(perfils => [...perfils, newPerfil]);

    setCpu("");
    setVoltagem("");
    setClock("");
    setTemperatura("");
    setEstavel("");

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


          <p>O Overclock ficou estável?</p>
          <div className='shield-radio'>
            <label >
              SIM
              <input className='input-radio' type='radio' value="SIM" checked={estavel === 'SIM'} onChange={() => setEstavel("SIM")} placeholder='Informe Processador' />
            </label>

            <label>
              NÃO
              <input className='input-radio' type='radio' value="NÃO" checked={estavel === 'NÃO'} onChange={() => setEstavel("NÃO")} placeholder='Informe Processador' />
            </label>

          </div>
          <button className='button-cadastrar' onClick={() => handlePerfil(cpu, voltagem, clock, temperatura, estavel)}>Cadastrar</button>


        </div>

        {allPerfil.map((perfil, index) => (
          <article key={index} className='lista-perfil'>
            <p>{`CPU: ${perfil.cpu}`} | </p>
            <p>{`Volts: ${perfil.voltagem} | `}</p>
            <p>{`Clock: ${perfil.clock}Mhz | `}</p>
            <p>{`temperatura: ${perfil.temperatura} | `}</p>
            <p>{`Estável: ${perfil.estavel} | `}</p>
          </article>
        ))}



      </main>

    </div>
  )
}

export default App
