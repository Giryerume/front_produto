import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AUTH_URL = "http://localhost:5000";

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let tokens = localStorage.getItem("authTokens");
  let [authTokens, setAuthTokens] = useState(() =>
    tokens ? JSON.parse(tokens) : null
  );
  let [loading, setLoading] = useState(true);
  let [products, setProducts] = useState([]);

  const navigate = useNavigate();

  let register = async (e) => {
    e.preventDefault();

    let response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: e.target.nome.value,
        senha: e.target.senha.value,
      }),
    });
    if (response.status === 201) {
      navigate("/login");
    } else {
      alert("Something went wrong!");
    }
  };

  let login = async (e) => {
    e.preventDefault();

    let response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: e.target.nome.value,
        senha: e.target.senha.value,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let logout = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let refresh = async () => {
    if (authTokens) {
      let response = await fetch(`${AUTH_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.refresh_token),
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log("Token atualizado!");
        let new_authToken = authTokens;
        new_authToken.access_token = data.access_token;
        setAuthTokens(new_authToken);
        localStorage.setItem("authTokens", JSON.stringify(new_authToken));
        navigate("/");
      } else {
        logout();
      }
    }

    if (loading) {
      setLoading(false);
    }
  };

  let getProducts = async () => {
    let response = await fetch(`${AUTH_URL}/produtos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access_token),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setProducts(data);
    } else {
      alert("Algo deu errado!");
    }
  };

  let addProduct = async (e) => {
    e.preventDefault();

    let response = await fetch(`${AUTH_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access_token),
      },
      body: JSON.stringify({
        nome: e.target.nome.value,
        descricao: e.target.descricao.value,
        preco: e.target.preco.value,
      }),
    });
    if (response.status === 201) {
      alert("Produto adicionado com sucesso!");
    } else {
      alert("Algo deu errado!");
    }
  };

  let deleteProduct = async (product_id) => {
    if (window.confirm("Tem certeza de que deseja excluir este produto?")) {
      let response = await fetch(`${AUTH_URL}/produtos/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access_token),
        },
      });
      if (response.status === 200) {
        alert("Produto excluído com sucesso!");
        getProducts();
      } else {
        alert("Algo deu errado!");
      }
    }
  };

  let contextData = {
    authTokens: authTokens,
    login: login,
    logout: logout,
    register: register,
    products: products,
    getProducts: getProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
  };

  useEffect(() => {
    if (loading) {
      refresh();
    }

    let tenMinutes = 1000 * 60 * 10;
    let interval = setInterval(() => {
      if (authTokens) {
        refresh();
      }
    }, tenMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
