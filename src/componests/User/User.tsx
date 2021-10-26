import React from "react";
import { UserInterface } from "../../interface/interface";
import classes from './User.module.css';

const User: React.FC<{ user: UserInterface }> = (props) => {
  return (
    <li key={props.user.id} className={classes.user}>
      <span className={classes.name}>{props.user.name}</span>
      <span className={classes.email}>{props.user.email}</span>
    </li>
  );
};

export default User;
