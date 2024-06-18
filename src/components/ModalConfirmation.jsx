import React, { Fragment } from "react";
import "./ModalConfirmation.css";

const ModalConfirmation = ({ message, onAccept, onCancel }) => {
  return (
    <Fragment>
      <div className="modalOverlay">
        <div className="confirmModal">
          <p>{message}</p>
          <div>
            <input type="button" onClick={onAccept} value="Aceptar" />
            <input type="button" onClick={onCancel} value="Cancelar" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalConfirmation;
