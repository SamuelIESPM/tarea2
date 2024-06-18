import React, { Fragment, useState } from "react";
import useListContext from "../hooks/useListContext.jsx";
import useUserContext from "../hooks/useUserContext.jsx";
import ModalConfirmation from "./ModalConfirmation.jsx";

const NewList = () => {
  const { initialListValue, createList } = useListContext();
  const { user } = useUserContext();

  const [newList, setNewList] = useState(initialListValue);
  const [showModal, setShowModal] = useState(false);

  const newValue = (e) => {
    const { name, value } = e.target;
    setNewList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewList((prevList) => ({
      ...prevList,
      id: crypto.randomUUID(),
      creator: user.id,
    }));
    setShowModal(true);
  };

  const confirm = async () => {
    await createList(newList);
    setShowModal(false);
  };

  const cancel = () => {
    setNewList(initialListValue);
    setShowModal(false);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la nueva lista:{" "}
          <input
            type="text"
            name="name"
            onChange={(e) => {
              newValue(e);
            }}
            required
          />{" "}
          <button type="submit">Crear</button>
        </label>
      </form>
      {showModal && (
        <ModalConfirmation
          message={`Estás a punto de crear la lista ${newList.name}`}
          onAccept={confirm}
          onCancel={cancel}
        />
      )}
    </Fragment>
  );
};

export default NewList;
