import React from "react";
import { UserInterface } from "../../interface/interface";
import classes from "./User.module.css";

const User: React.FC<{
  user: UserInterface;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}> = (props) => {
  
  return (
    <>
      <li key={props.user.id} className={classes.user}>
        <p>
          Name: <span className={classes.info}>{props.user.name}</span>
        </p>
        <p>
          Email: <span className={classes.info}>{props.user.email}</span>
        </p>
        {localStorage.getItem("isAdmin") === "true" && (
          <p>
            Password:{" "}
            <span className={classes.info}>{props.user.password}</span>
          </p>
        )}
        {props.user.isAdmin && (
          <p>
            Permition: <span className={classes.info}>admin</span>
          </p>
        )}
        {!props.user.isAdmin && (
          <p>
            Permition: <span className={classes.info}>user</span>
          </p>
        )}
        {localStorage.getItem("isAdmin") === "true" && (
          <div className={classes.control}>
            <button onClick={() => props.onEdit(props.user.id)}>Edit</button>
            <button onClick={() => props.onDelete(props.user.id)}>
              Delete
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default User;
