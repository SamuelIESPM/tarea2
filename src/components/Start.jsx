import React, { Fragment } from "react";
import LogoPaco from "../assets/LogoPaco.png";
import "./Start.css";

const Start = () => {
  return (
    <Fragment>
      <div id="main">
        <h1>Bienvenid@ a la fruteria Paco</h1>
        <img src={LogoPaco} alt="Logo frutería paco" />
      </div>
    </Fragment>
  );
};

export default Start;
