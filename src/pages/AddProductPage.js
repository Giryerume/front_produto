import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const AddProductPage = () => {
  let { addProduct } = useContext(AuthContext);

  return (
    <div className="container text-center col-1 col-md-3 p-3">
      <legend>Adicionar produto</legend>
      <form onSubmit={addProduct}>
        <div className="row mb-3">
          <label htmlFor="nome" className="col-sm-2 col-form-label">
            Nome
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              maxLength={100}
              className="form-control"
              name="nome"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="descricao" className="col-sm-2 col-form-label">
            Descrição
          </label>
          <div className="col-sm-10">
            <textarea
              type="text"
              maxLength={255}
              className="form-control"
              name="descricao"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="preco" className="col-sm-2 col-form-label">
            Preço
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              name="preco"
              step="0.01"
            />
          </div>
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Adicionar Produto"
        />
      </form>
    </div>
  );
};

export default AddProductPage;
