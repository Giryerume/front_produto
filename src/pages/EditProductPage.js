import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EditProductPage = () => {
  const { productId } = useParams();
  const { authTokens, getProducts } = useContext(AuthContext);
  const [product, setProduct] = useState({
    id: "",
    nome: "",
    descricao: "",
    preco: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:5000/produtos/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access_token),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Erro ao buscar os dados do produto");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do produto:", error);
      }
    }

    fetchProduct();
  }, [productId, authTokens]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Tem certeza de que deseja salvar as alterações?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/produtos/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access_token),
            },
            body: JSON.stringify({
              nome: e.target.nome.value,
              descricao: e.target.descricao.value,
              preco: e.target.preco.value,
            }),
          }
        );

        if (response.ok) {
          console.log("Dados do produto atualizados com sucesso");
          navigate("/");
          getProducts();
        } else {
          console.error("Erro ao atualizar os dados do produto");
        }
      } catch (error) {
        console.error("Erro ao atualizar os dados do produto:", error);
      }
    }
  };

  return (
    <div className="container text-center col-1 col-md-3 p-3">
      <legend>Editar produto {product.id}</legend>
      <form onSubmit={handleSubmit}>
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
              value={product.nome}
              onChange={handleChange}
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
              value={product.descricao}
              onChange={handleChange}
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
              value={product.preco}
              onChange={handleChange}
            />
          </div>
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Salvar alterações"
        />
      </form>
    </div>
  );
};

export default EditProductPage;
