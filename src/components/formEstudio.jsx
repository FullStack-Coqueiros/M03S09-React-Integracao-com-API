import { useState } from "react";
import { useParams } from "react-router-dom";


export default function FormEstudio() {
  const { id } = useParams();
  const [estudio, setEstudio] = useState({});

  const handleAddEstudio = async (e) => {
    e.preventDefault();

  };

  const handleEditEstudio = async (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <h2>{id ? "Editar " : "Cadastrar "} estúdio</h2>
      <form onSubmit={id ? handleEditEstudio : handleAddEstudio}>
        <label htmlFor="nomeDoEstudio">Nome do estúdio</label>
        <br />
        <input
          required
          type="text"
          placeholder="Nome do estúdio"
          value={estudio.nome || ""}
          onChange={(e) => {
            setEstudio({ ...estudio, nome: e.target.value });
          }}
        />
        <br />
        <br />

        <label htmlFor="dataCriacao">Data de lançamento</label>
        <br />
        <input
          type="date"
          value={estudio.dataCriacao ? estudio.dataCriacao.split("T")[0] : ""}
          onChange={(e) => {
            const data = new Date(e.target.value).toISOString();
            setEstudio({ ...estudio, dataCriacao: data });
          }}
        />
        <br />
        <br />

        <label htmlFor="endereco">Endereco</label>
        <br />
        <input
          required
          type="text"
          placeholder="Endereco"
          value={estudio.endereco || ""}
          onChange={(e) => {
            setEstudio({ ...estudio, endereco: e.target.value });
          }}
        />
        <br />
        <br />

        <button type="submit">{id ? "Editar " : "Cadastrar "}</button>
      </form>
    </div>
  );
}
