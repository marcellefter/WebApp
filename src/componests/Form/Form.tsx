import axios from "axios";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import { UserInterface } from "./../../interface/interface";
import classes from "./Form.module.css";

const Form: React.FC<{ user: UserInterface | null; onClose: () => void }> = (
  props
) => {
  const history = useHistory();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const permitionRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  console.log("permitionRef", permitionRef.current?.value);

  const checkFunction = () => {
    console.log("permitionRef", permitionRef.current?.checked);
  };
  const closeHandler = () => {
    console.log("close");
    props.onClose();
  };

  const onSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .patch(`http://localhost:3001/users/${props.user?.id}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        isAdmin: permitionRef.current?.checked,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    history.go(0);
  };

  return (
    <form className={classes.form} onSubmit={(event) => onSubmitHandler(event)}>
      <button
        type="button"
        onClick={() => closeHandler()}
        className={classes.close}
      ></button>
      <label className={classes.label}>
        Email
        <input
          ref={emailRef}
          className={classes.input}
          type="text"
          defaultValue={props.user?.email}
        />
      </label>
      <label className={classes.label}>
        Name
        <input
          ref={nameRef}
          className={classes.input}
          type="text"
          defaultValue={props.user?.name}
        />
      </label>
      <label className={classes["checkbox-label"]}>
        Permition of admin
        <input
          onChange={() => checkFunction}
          ref={permitionRef}
          className={classes.input}
          type="checkbox"
          defaultChecked={props.user?.isAdmin}
        />
      </label>
      <label className={classes.label}>
        Password
        <input
          ref={passwordRef}
          className={classes.input}
          type="text"
          defaultValue={props.user?.password}
        />
      </label>
      <button className={classes.btn}>Submit</button>
    </form>
  );
};

export default Form;
