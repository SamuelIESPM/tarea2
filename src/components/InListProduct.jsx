"use strict";
import React, { Fragment } from "react";
import "./Lists.css";

const InListProduct = (props) => {
  const { product_id, quantity, name } = props.data;

  return (
    <Fragment>
      <div className="modalProduct" id={product_id}>
        <p className="inListProduct">{name}</p>
        <input
          type="number"
          min={1}
          value={quantity}
          id={product_id}
          onChange={props.onQuantityChange}
        />
        <input
          type="button"
          onClick={props.onRemove}
          value="Eliminar"
          id={product_id}
        />
      </div>
    </Fragment>
  );
};

export default InListProduct;
