import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import FormEstudio from "./components/formEstudio";
import FormJogo from "./components/formJogo";
import EstudioEJogos from "./components/estudioEJogos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EstudioEJogos />} />

        <Route path="/estudio" element={<FormEstudio />} />
        <Route path="/estudio/:id" element={<FormEstudio />} />
        
        <Route path="/jogo" element={<FormJogo />} />
        <Route path="/jogo/:id" element={<FormJogo />} />

        <Route path="*" element={<h2>Não encontrado</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
