import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className={classes.header}>
      <div>
        <NavLink to="/posts" activeClassName={classes.active}>
          Posts
        </NavLink>
        <NavLink to="/users" activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  );
};

export default Header;
