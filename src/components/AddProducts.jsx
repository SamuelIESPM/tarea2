import useProductsContext from "../hooks/useProductsContext.jsx";
import { Fragment, useState } from "react";
import ModalConfirmation from "./ModalConfirmation.jsx";
import "./AddProducts.css";

const AddProducts = () => {
  const { initialProductValue, createProduct } = useProductsContext();
  const [newProduct, setNewProduct] = useState(initialProductValue);
  const [showModal, setShowModal] = useState(false);

  const newValue = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      id: crypto.randomUUID(),
    }));
    setShowModal(true);
  };

  const confirm = async () => {
    await createProduct(newProduct);
    setShowModal(false);
  };

  const cancel = async () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <h2>Añadir nuevos productos</h2>
      <form id="AddProductForm" onSubmit={handleSubmit}>
        <label>
          Nombre:{" "}
          <input
            type="text"
            name="name"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />
        </label>

        <label>
          Precio:{" "}
          <input
            type="number"
            min="0"
            name="price"
            step="any"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />
        </label>
        <label>
          Imagen:{" "}
          <input
            type="url"
            name="image"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />
        </label>

        <label>
          Peso:{" "}
          <input
            type="number"
            name="weight"
            step="any"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />
        </label>

        <label>
          Descripción{" "}
          <input
            type="text"
            name="description"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />
        </label>

        <button type="submit">Añadir</button>
      </form>
      {showModal && (
        <ModalConfirmation
          message="¿Deseas crear este elemento?"
          onAccept={confirm}
          onCancel={cancel}
        />
      )}
    </Fragment>
  );
};
export default AddProducts;
