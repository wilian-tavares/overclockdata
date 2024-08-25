import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cpu, setCpu] = useState("Ryzen 5 3600X");
  const [voltagem, setVoltagem] = useState("1.37");
  const [clock, setClock] = useState("3.800");
  const [temperatura, setTemperatura] = useState("75");
  const [estavel, setEstavel] = useState("");

  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

    if (edit && editIndex !== null) {
      const updatedPerfils = allPerfil.map((perfil, index) => 
        index === editIndex ? newPerfil : perfil
      );
      setAllPerfil(updatedPerfils);
      setEdit(false);
      setEditIndex(null);
    } else {
      setAllPerfil(perfils => [...perfils, newPerfil]);
    }

    setCpu("Ryzen 5 3600X");
    setVoltagem("");
    setClock("");
    setTemperatura("");
    setEstavel("");
  }

  function handleEdit(index: number) {
    const updatePerfil = allPerfil[index];
    setCpu(updatePerfil.cpu);
    setVoltagem(updatePerfil.voltagem);
    setClock(updatePerfil.clock);
    setTemperatura(updatePerfil.temperatura);
    setEstavel(updatePerfil.estavel);

    setEdit(true);
    setEditIndex(index);
  }

  function handleDelete(index: number) {
    const updatedPerfil = allPerfil.filter((_, i) => i !== index);
    setAllPerfil(updatedPerfil);
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
            <label>
              SIM
              <input className='input-radio' type='radio' value="SIM" checked={estavel === 'SIM'} onChange={() => setEstavel("SIM")} />
            </label>
            <label>
              NÃO
              <input className='input-radio' type='radio' value="NÃO" checked={estavel === 'NÃO'} onChange={() => setEstavel("NÃO")} />
            </label>
          </div>
          <button className='button-cadastrar' onClick={() => handlePerfil(cpu, voltagem, clock, temperatura, estavel)}>
            {edit ? "Atualizar" : "Cadastrar"}
          </button>
        </div>

        {allPerfil.map((perfil, index) => (
          <article key={index} className='lista-perfil'>
            <p>{`CPU: ${perfil.cpu}`}</p>
            <p>{`Volts: ${perfil.voltagem}`}</p>
            <p>{`Clock: ${perfil.clock}`}</p>
            <p>{`Temperatura: ${perfil.temperatura}`}</p>
            <p>{`Estável: ${perfil.estavel}`}</p>
            <button className='button-editar' onClick={() => handleEdit(index)}>Editar</button>
            <button  className='button-apagar' onClick={() => handleDelete(index)}>Deletar</button>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
