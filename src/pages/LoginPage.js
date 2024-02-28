import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { login } = useContext(AuthContext);
  return (
    <div className="container text-center col-1 col-md-3 p-3">
      <legend className="p-3">Entrar com Usuário</legend>
      <form onSubmit={login}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="nome"
            placeholder="Username"
          />
          <label htmlFor="nome">Nome de Usuário</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="senha"
            placeholder="Password"
          />
          <label htmlFor="senha">Senha</label>
        </div>
        <div className="container text-center p-3">
          <input className="btn btn-primary" type="submit" value="Entrar" />
          <Link className="container text-center col-1 col-md-5" to="/register">
            Registre-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
