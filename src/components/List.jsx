import React, { Fragment } from "react";
import "./List.css";

const List = (props) => {
  const { name, id } = props.data;
  return (
    <Fragment>
      <h2 id={id} className="userList" name={name}>
        {name}
      </h2>
    </Fragment>
  );
};

export default List;
