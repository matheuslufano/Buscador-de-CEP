import { FiSearch } from "react-icons/fi";
import "./style.css";
import { useState } from "react";
import api from "./services/api";

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});



  async function handleSearch() {
    // https://viacep.com.br/ws/77600000/json/

    if (input === "") {
      alert("Preencha com algum cep");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("")

    } catch {
      alert("Ops, erro ao buscar CEP!");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          className="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <span className="cep">CEP: {cep.cep || "não tem dado"} / código de area: {cep.ddd}</span>
          <h2>{cep.estado || "não tem dado"}</h2>
          <span>{cep.localidade ? `${cep.localidade} - ${cep.uf}` : "não dado"}</span>

          <span>logradouro: {cep.logradouro || "Sem dado"}</span>
          <span>Complemento: {cep.complemento || "Sem dado"}</span>
          <span>Bairro:{cep.bairro || "Sem dado"}</span>
        </main>
      )}
    </div>
  );
}

export default App;
