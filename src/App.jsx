import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsContext from "./contexts/ProductsContext.jsx";
import ListContext from "./contexts/ListContext.jsx";
import ProductsList from "./components/ProductsList.jsx";
import Footer from "./components/structure/Footer.jsx";
import Header from "./components/structure/Header.jsx";
import Menu from "./components/structure/Menu.jsx";
import NewList from "./components/NewList.jsx";
import AddProducts from "./components/AddProducts.jsx";
import UserContext from "./contexts/UserContext.jsx";
import Lists from "./components/Lists.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Start from "./components/Start.jsx";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <UserContext>
          <Menu />
          <ProductsContext>
            <ListContext>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="products" element={<ProductsList />} />
                <Route
                  path="lists"
                  element={
                    <Lists>
                      <NewList />
                    </Lists>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="add" element={<AddProducts />} />
              </Routes>
            </ListContext>
          </ProductsContext>
        </UserContext>
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
