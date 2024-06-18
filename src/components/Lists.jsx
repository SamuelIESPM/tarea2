import React, { Fragment, useEffect, useState } from "react";
import List from "./List.jsx";
import ModalList from "./ModalList.jsx";
import useListContext from "../hooks/useListContext.jsx";
import useProductsContext from "../hooks/useProductsContext.jsx";
import InListProduct from "./InListProduct.jsx";
import "./Lists.css";

const Lists = (props) => {
  const {
    listsList,
    situation,
    list,
    selectList,
    initialListValue,
    setList,
    getProductsFromList,
    addProductToList,
    editProductQuantity,
    productsOnList,
    removeProductFromList,
    deleteList,
  } = useListContext();

  const { productsList } = useProductsContext();
  const [showModal, setShowModal] = useState(false);

  const editList = async (e) => {
    await selectList(e.target.id);
    await getProductsFromList(e.target.id);
    setShowModal(true);
  };

  const addProduct = async (e) => {
    const newProduct = {
      product_id: e.target.id,
      list_id: list[0].id,
      quantity: 1,
      name: e.target.title,
    };
    await addProductToList(newProduct);
    getProductsFromList(list[0].id);
  };

  const editQuantity = async (e) => {
    const newQuantity = {
      product_id: e.target.id,
      list_id: list[0].id,
      quantity: e.target.value,
    };
    await editProductQuantity(newQuantity);
  };

  const removeFromList = async (e) => {
    const removeProduct = {
      product_id: e.target.id,
      list_id: list[0].id,
    };
    await removeProductFromList(removeProduct);
  };

  const finishEdit = () => {
    setList(initialListValue);
    setShowModal(false);
  };

  const removeList = async (e) => {
    deleteList(list[0].id);
    setList(initialListValue);
    setShowModal(false);
  };

  return (
    <Fragment>
      {props.children}
      <div
        id="contentList"
        onClick={(e) => {
          e.target.className == "userList" ? editList(e) : "";
        }}
      >
        {listsList.length
          ? listsList.map((value) => {
              return <List key={value.id} data={value} />;
            })
          : situation}
      </div>
      {showModal && (
        <ModalList
          listName={list[0].name}
          products={
            <div
              className="modalProducts"
              onClick={(e) => {
                addProduct(e);
              }}
            >
              {productsList.length
                ? productsList.map((value) => {
                    return (
                      <p
                        id={value.id}
                        key={value.id}
                        className="listedProduct"
                        title={value.name}
                      >
                        {value.maker} {value.name}
                      </p>
                    );
                  })
                : situation}
            </div>
          }
          listedProducts={
            <div className="modalProducts">
              {productsOnList.length
                ? productsOnList.map((value) => {
                    return (
                      <InListProduct
                        key={value.product_id}
                        data={value}
                        onQuantityChange={editQuantity}
                        onRemove={removeFromList}
                      />
                    );
                  })
                : "No hay productos en esta lista"}
            </div>
          }
          onFinishEdit={finishEdit}
          onDelete={removeList}
        />
      )}
    </Fragment>
  );
};

export default Lists;
