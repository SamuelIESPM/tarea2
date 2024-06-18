import React, { Fragment, useState } from "react";
import useUserContext from "../hooks/useUserContext";
import "./form.css";

const Login = () => {
  const { loginUser, situation } = useUserContext();
  const defaultFormData = {
    email: "",
    password: "",
  };

  const [loginFormData, setLoginFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    loginUser(loginFormData);
  };

  return (
    <Fragment>
      <h2>Login</h2>
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
            type="button"
            value="Iniciar sesión"
            onClick={() => {
              handleLogin();
            }}
          />
          {situation && situation}
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
