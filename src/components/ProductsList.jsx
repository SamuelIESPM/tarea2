"use strict";
import React, { Fragment, useState, useEffect } from "react";
import useProductsContext from "../hooks/useProductsContext.jsx";
import useUserContext from "../hooks/useUserContext.jsx";
import ProductList from "./ProductList.jsx";
import ModalConfirmation from "./ModalConfirmation.jsx";
import "./ProductsList.css";

const ProductsList = () => {
  const {
    productsList,
    getProducts,
    situation,
    orderProducts,
    searchProduct,
    maxPrice,
    product,
    setProduct,
    initialProductValue,
    deleteProduct,
    updateProduct,
  } = useProductsContext();

  const { user } = useUserContext();

  const [selectedProduct, setSelectedProduct] = useState(initialProductValue);
  const [editMode, setEditMode] = useState(false);

  const changeData = (e) => {
    setSelectedProduct((prevSelectedProduct) => ({
      ...prevSelectedProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const [showModal, setShowModal] = useState(false);

  const confirm = () => {
    deleteProduct(product.id);
    setProduct(initialProductValue);
    setShowModal(false);
  };

  const cancel = async () => {
    await setProduct(initialProductValue);
    setEditMode(false);
    setShowModal(false);
  };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <Fragment>
      <h2>Listado de productos</h2>
      <div className="filters">
        <p>Filtrar:</p>
        <button
          onClick={() => {
            getProducts();
            setProduct(initialProductValue);
          }}
        >
          Recargar productos
        </button>
        <button
          onClick={() => {
            orderProducts(true);
            setEditMode(false);
          }}
        >
          Ordenar por nombre ascendente
        </button>
        <button
          onClick={() => {
            orderProducts(false);
          }}
        >
          Ordenar por nombre descendente
        </button>
        <input
          type="search"
          placeholder="Buscar..."
          onChange={(e) => {
            e ? searchProduct(e.target.value) : getProducts();
          }}
        />
        <input
          type="number"
          placeholder="Prexio máximo..."
          min={0}
          step="any"
          onChange={(e) => {
            e ? maxPrice(e.target.value) : getProducts();
          }}
        />
      </div>
      <div id="content">
        <div id="displayProducts">
          {productsList.length
            ? productsList.map((value) => {
                return <ProductList key={value.id} data={value} />;
              })
            : situation}
        </div>
        <div id="info">
          {product.id ? (
            <>
              {user && user.role == "page_admin" ? (
                <div>
                  <button
                    onClick={() => {
                      setEditMode(!editMode);
                      setSelectedProduct(product);
                    }}
                  >
                    {editMode ? "Cancelar" : "Editar"}
                  </button>
                </div>
              ) : (
                ""
              )}
              {editMode ? (
                <div>
                  <form id="EditProductForm">
                    <div>
                      <label htmlFor="name">Nombre: </label>
                      <input
                        type="text"
                        name="name"
                        value={selectedProduct.name ? selectedProduct.name : ""}
                        onChange={(e) => {
                          changeData(e);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Precio: </label>
                      <input
                        type="number"
                        min="0"
                        name="price"
                        step="0.01"
                        value={
                          selectedProduct.price ? selectedProduct.price : ""
                        }
                        onChange={(e) => {
                          changeData(e);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="description">Descripción</label>
                      <input
                        type="text"
                        name="description"
                        value={
                          selectedProduct.description
                            ? selectedProduct.description
                            : ""
                        }
                        onChange={(e) => {
                          changeData(e);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="weight">Peso: </label>
                      <input
                        type="number"
                        name="weight"
                        min="0"
                        value={
                          selectedProduct.weight ? selectedProduct.weight : ""
                        }
                        onChange={(e) => {
                          changeData(e);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="image">Imagen: </label>
                      <input
                        type="url"
                        name="image"
                        value={
                          selectedProduct.image ? selectedProduct.image : ""
                        }
                        onChange={(e) => {
                          changeData(e);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="button"
                        value="Aplicar modificaciones"
                        onClick={() => {
                          updateProduct(selectedProduct);
                        }}
                      />

                      <input
                        type="button"
                        value="Eliminar producto"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
                    </div>

                    {selectedProduct.image ? (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        id="editProductImage"
                      />
                    ) : (
                      <p>Imagen no encontrada</p>
                    )}
                  </form>
                </div>
              ) : (
                <>
                  <h2>{product.name}</h2>
                  <img src={product.image} alt="" />
                  <p>Precio: {product.price} €/Kg</p>
                  <p>{product.description}</p>
                </>
              )}
            </>
          ) : (
            <p>Selecciona un producto</p>
          )}
        </div>
      </div>
      {showModal && (
        <ModalConfirmation
          message="¿Estás seguro de que deseas eliminar el elemento?"
          onAccept={confirm}
          onCancel={cancel}
        />
      )}
    </Fragment>
  );
};

export default ProductsList;
