"use strict";
import React, { Fragment } from "react";
import useProductsContext from "../hooks/useProductsContext";
import "./ProductList.css";

const ProductList = (props) => {
  const { selectProduct } = useProductsContext();
  const { name, image, id } = props.data;
  return (
    <Fragment>
      <div className="product" id={id}>
        <img src={image} alt={name} />
        <div className="left">
          <h1>{name}</h1>
          <button
            onClick={(e) => {
              selectProduct(e.target.parentNode.parentNode.id);
            }}
          >
            Más info...
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
