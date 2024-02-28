import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const TableRowWithButtons = (content) => {
  const [isHovered, setIsHovered] = useState(false);
  let { deleteProduct } = useContext(AuthContext);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td>{content.id}</td>
      <td style={{ position: "relative", maxWidth: "100px" }}>
        {content.nome}
      </td>
      <td style={{ position: "relative", maxWidth: "200px" }}>
        {content.descricao}
      </td>
      <td>
        {content.preco.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td style={{ position: "relative" }}>
        {isHovered && (
          <div
            className="btn-group"
            role="group"
            aria-label="Ações"
            style={{ position: "absolute", right: "0" }}
          >
            <Link
              to={`/edit/${content.id}`}
              className="btn btn-outline-warning btn-sm"
            >
              Editar
            </Link>
            <button
              onClick={() => handleDelete(content.id)}
              className="btn btn-outline-danger btn-sm"
            >
              Excluir
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRowWithButtons;
