import React, { Fragment, useState } from "react";
import useUserContext from "../hooks/useUserContext";
import "./form.css";

const Register = () => {
  const { registerUser, situation } = useUserContext();
  const defaultFormData = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [registerFormData, setRegisterFormData] = useState(defaultFormData);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (registerFormData.password === registerFormData.repeatPassword) {
      registerUser(registerFormData);
    } else {
      setShowModal(true);
    }
  };

  return (
    <Fragment>
      <h2>Register</h2>
      <div className="formContainer">
        <form className="logRegistForm">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Repeat password"
            name="repeatPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="button"
            value="Registro"
            onClick={() => {
              handleRegister();
            }}
          />
          {situation && situation}
        </form>
      </div>
      {showModal ? (
        <div className="modalOverlay">
          <div className="confirmModal">
            <p>Las contraseñas no coinciden</p>
            <input
              type="button"
              value="Aceptar"
              onClick={setShowModal(false)}
            />
          </div>
        </div>
      ) : (
        <p>Hola feo</p>
      )}
    </Fragment>
  );
};

export default Register;
