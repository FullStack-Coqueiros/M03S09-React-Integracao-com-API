import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../service";

export default function FormEstudio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudio, setEstudio] = useState({});

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/Estudios/${id}`)
        .then((resposta) => setEstudio(resposta.data))
        .catch((erro) => console.error(erro));
    }
  }, [id]);

  const handleAddEstudio = async (e) => {
    e.preventDefault();

    const data = {
      ...estudio,
      dataCriacao: new Date(),
    }

    apiClient.post("/Estudios", data)
      .then(() => navigate("/"))
      .catch((erro) => console.error(erro));
  };

  const handleEditEstudio = async (e) => {
    e.preventDefault();

    apiClient.put(`/Estudios/${id}`, estudio)
      .then(() => navigate("/"))
      .catch((erro) => console.error(erro));
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>&lt; Voltar</button>
      <br />
      <br />

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
