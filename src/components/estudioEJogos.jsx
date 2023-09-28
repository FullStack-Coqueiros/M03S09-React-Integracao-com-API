/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CATEGORIAS } from "../constants";

// subistitui por chamadas a API
const estudios = [
  {
    id: 1,
    nome: "Nintendo",
    endereco: "Rua X",
    dataCriacao: "2023-09-28T06:37:36.772Z"
  },
];
const jogos = [
  {
    id: 1,
    nome: "Age II",
    dataLancamento: "2023-09-27T23:07:48.707861-03:00",
    categoria: 2,
    estudioId: 1
  }
];

export default function EstudioEJogos() {
  const navigate = useNavigate();
  const [idDoEstudioClicado, setIdDoEstudioClicado] = useState(undefined);

  const handleDeleteEstudio = async (e, estudioId) => {
    e.preventDefault();

    console.log(estudioId);
  };

  const handleEditEstudio = async (e, estudioToEdit) => {
    e.preventDefault();

    navigate(`/estudio/${estudioToEdit.id}`);
  };

  const handleDeleteJogo = async (e, jogoId) => {
    e.preventDefault();
    console.log(jogoId);
  };

  const handleEditJogo = async (e, jogoToEdit) => {
    e.preventDefault();

    navigate(`/jogo/${jogoToEdit.id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <button onClick={() => navigate("/estudio")}>Adicionar estúdio</button>
        <button onClick={() => navigate("/jogo")}>Adicionar jogo</button>
      </div>

      <h2>Estúdios e jogos</h2>

      {estudios.map((estudio, index) => (
        <React.Fragment key={`${estudio.id}-${index}`}>
          <div
            style={{
              width: "100%",
              minWidth: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{estudio.nome}</h3>
            {jogos.some((jogo) => jogo.estudioId === estudio.id) && (
              <button
                style={
                  idDoEstudioClicado === estudio.id
                    ? { backgroundColor: "red", color: "white" }
                    : { backgroundColor: "green", color: "white" }
                }
                onClick={() => {
                  if (idDoEstudioClicado === estudio.id) {
                    setIdDoEstudioClicado("");
                  } else {
                    setIdDoEstudioClicado(estudio.id);
                  }
                }}
              >
                {idDoEstudioClicado === estudio.id ? (
                  "Fechar"
                ) : (
                  <>
                    Ver jogos
                    <span style={{ marginLeft: 10 }}>
                      (
                      {
                        jogos.filter((jogo) => jogo.estudioId === estudio.id)
                          .length
                      }
                      )
                    </span>
                  </>
                )}
              </button>
            )}
            <div>
              <button
                onClick={(e) => handleEditEstudio(e, estudio)}
                style={{ marginRight: 10 }}
              >
                Editar
              </button>
              <button onClick={(e) => handleDeleteEstudio(e, estudio.id)}>
                Excluir
              </button>
            </div>
          </div>

          {idDoEstudioClicado === estudio.id && (
            <table>
              <thead>
                <tr>
                  <th>Jogo</th>
                  <th>Data de lançamento</th>
                  <th>Categoria</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {jogos
                  .filter((jogo) => jogo.estudioId === estudio.id)
                  .map((jogo, index) => (
                    <tr key={`${jogo.id}-${index}`} className="jogo">
                      <td>{jogo.nome}</td>
                      <td>
                        {jogo.dataLancamento
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td>
                        {
                          CATEGORIAS.find(
                            (categoria) => categoria.id === jogo.categoria
                          ).nome
                        }
                      </td>
                      <td onClick={(e) => handleEditJogo(e, jogo)}>Editar</td>
                      <td onClick={(e) => handleDeleteJogo(e, jogo.id)}>
                        Excluir
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
