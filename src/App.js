import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";
import MainPage from "./pages/MainPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route Component={LoginPage} path="/login" />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<MainPage />} />
        </Route>
        <Route Component={RegisterPage} path="/register" />
        <Route Component={AddProductPage} path="/add" />
        <Route Component={EditProductPage} path="/edit/:productId" />
      </Routes>
    </div>
  );
}

export default App;
