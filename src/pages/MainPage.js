import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TableRowWithButtons from "../components/TableRowWithButtons";

const MainPage = () => {
  let { products, getProducts } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
    const intervalId = setInterval(getProducts, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-3">
      <legend className="p-3">Catálogo de produtos</legend>
      <Link to="/add">
        <button className="btn btn-outline-success">Novo produto</button>
      </Link>
      <table className="table p-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRowWithButtons
              key={product.id}
              id={product.id}
              nome={product.nome}
              descricao={product.descricao}
              preco={product.preco}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
