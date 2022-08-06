import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
        <div>
        <Link to="/">Home</Link>
      </div>
        <div>
        <Link to="/register">Cadastrar</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Rotas;
