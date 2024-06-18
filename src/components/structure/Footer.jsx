"use strict";
import React from "react";
import { Fragment } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <p>Samuel Bautista Valera &copy;</p>
        <div id="links">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
