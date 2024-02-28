import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  let { createUser } = useContext(AuthContext);
  return (
    <div className="container text-center col-1 col-md-3 p-3">
      <legend className="p-3">Registro de Usuário</legend>
      <form onSubmit={createUser}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="nome"
            maxLength={100}
            placeholder="Username"
          />
          <label htmlFor="nome">Nome de Usuário</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="senha"
            maxLength={255}
            placeholder="Password"
          />
          <label htmlFor="senha">Senha</label>
        </div>
        <div className="container text-center p-3">
          <input
            className="btn btn-primary container text-center col-1 col-md-5"
            type="submit"
            value="Registrar-se"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
