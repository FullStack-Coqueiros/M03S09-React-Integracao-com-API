import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CATEGORIAS } from "../constants";
import { apiClient } from "../service";

export default function FormJogo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogo, setJogo] = useState({});
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    apiClient
      .get("/Estudios")
      .then((resposta) => setEstudios(resposta.data))
      .catch((erro) => console.error(erro));
  }, []);

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/Jogos/${id}`)
        .then((resposta) => setJogo(resposta.data))
        .catch((erro) => console.error(erro));
    }
  }, [id]);

  const handleAddJogo = async (e) => {
    e.preventDefault();

    const data = {
      ...jogo,
      categoria: parseInt(jogo.categoria),
    };

    apiClient
      .post("/Jogos", data)
      .then(() => {
        window.alert("Jogo adicionado com sucesso!");
        navigate("/");
      })
      .catch((erro) => console.error(erro));
  };

  const handleEditJogo = async (e) => {
    e.preventDefault();

    window.confirm("Tem certeza que deseja editar o jogo?") &&
      apiClient
        .put(`/Jogos/${id}`, jogo)
        .then(() => {
          window.alert("Jogo editado com sucesso!");
          navigate("/");
        })
        .catch((erro) => console.error(erro));
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>&lt; Voltar</button>
      <br />
      <br />

      <h2>{id ? "Editar" : "Adicionar"} Jogo</h2>
      <form onSubmit={id ? handleEditJogo : handleAddJogo}>
        <label htmlFor="estudio">Estúdio</label>
        <br />
        <select
          required
          onChange={(e) => {
            setJogo({ ...jogo, estudioId: e.target.value });
          }}
          value={jogo.estudioId || ""}
        >
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Escolha um estúdio
          </option>
          {estudios.map((estudio, index) => {
            return (
              <option value={estudio.id} key={index}>
                {estudio.nome}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <label htmlFor="nome">Nome</label>
        <br />
        <input
          required
          type="text"
          placeholder="Nome do jogo"
          value={jogo.nome}
          onChange={(e) => {
            setJogo({ ...jogo, nome: e.target.value });
          }}
        />
        <br />
        <br />

        <label htmlFor="dataLancamento">Data de lançamento</label>
        <br />
        <input
          type="date"
          value={jogo.dataLancamento ? jogo.dataLancamento.split("T")[0] : ""}
          onChange={(e) => {
            const data = new Date(e.target.value).toISOString();
            setJogo({ ...jogo, dataLancamento: data });
          }}
        />
        <br />
        <br />

        <label htmlFor="categoria">Categoria</label>
        <br />
        <select
          onChange={(e) => {
            setJogo({ ...jogo, categoria: e.target.value });
          }}
          value={jogo.categoria || ""}
        >
          <option value="" style={{ display: "none" }}>
            Escolha uma categoria
          </option>
          {CATEGORIAS.map((categoria, index) => (
            <option value={categoria.id} key={index}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button type="submit">{id ? "Editar" : "Adicionar"}</button>
      </form>
    </div>
  );
}
