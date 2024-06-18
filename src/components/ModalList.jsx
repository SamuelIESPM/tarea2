import React, { Fragment } from "react";
import "./ModalList.css";

const ModalList = ({
  listName,
  products,
  listedProducts,
  onFinishEdit,
  onDelete,
}) => {
  return (
    <Fragment>
      <div className="modalListOverlay">
        <div className="modalContent">
          <h2>{listName}</h2>
          <article className="productContainer">
            <div>{products}</div>
            <div>{listedProducts}</div>
          </article>
          <div>
            <input
              type="button"
              value="Terminar edición"
              onClick={onFinishEdit}
            />
            <input type="button" value="Eliminar lista" onClick={onDelete} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalList;
