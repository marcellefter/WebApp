import axios from "axios";
import React, { useRef, useState } from "react";
// import { useMutation } from "react-query";
import { useHistory } from "react-router";
import classes from "./Login.module.css";
import { UserInterface } from "./../interface/interface";

const Login = () => {
  // const mutation = useMutation<UserInterface, UserInterface>((newUser) => {
  //   return axios.post("/users", newUser);
  // });

  const [isLogin, setIsLogin] = useState(true);
  const [userStatus, setUserStatus] = useState<string | null>(null); 
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordRetypeError, setIsPasswordRetypeError] = useState(false);

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputPasswordRetypeRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const toggleLoginStateHandler = () => {
    setIsLogin(!isLogin);
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsPasswordRetypeError(false);

    // inputEmailRef.current!.value = '';
    // inputPasswordRef.current!.value = '';
    // if (inputPasswordRetypeRef && inputPasswordRetypeRef.current) inputPasswordRetypeRef.current!.value = '';
  };

  const resetEmailErrorHandler = () => {
    setIsEmailError(false);
  };
  const resetPasswordErrorHandler = () => {
    setIsPasswordError(false);
  };
  const resetPasswordRetypeErrorHandler = () => {
    setIsPasswordRetypeError(false);
  };

  const formHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailInput = inputEmailRef.current?.value.trim();
    const passwordInput = inputPasswordRef.current?.value.trim();
    const passwordRetypeInput = inputPasswordRetypeRef.current?.value.trim();

    if (emailInput === "") {
      setIsEmailError(true);
    }
    if (passwordInput && passwordInput.length < 5) {
      setIsPasswordError(true);
    }
    if (passwordInput !== passwordRetypeInput) {
      setIsPasswordRetypeError(true);
    }

    console.log(emailInput);
    console.log(passwordInput);
    console.log(passwordRetypeInput);

    if (isLogin) {
      if (isEmailError || isPasswordError) return;
      // check if user exist
      console.log("login");
      axios
        .get<UserInterface>(`http://localhost:3001/users?q=${emailInput}`)
        .then((res) => {
          if(res.data === null) {
            setUserStatus('not exist')
          }
          if(res.data.password === passwordInput) {
            setUserStatus('exist')
        } else {
          setUserStatus('invalid password');
        }
        )
        .catch((error) => console.log(error));
    } else {
      if (isEmailError || isPasswordError || isPasswordRetypeError) return;
      //create user
      console.log("inregistrare");

      axios
        .post("http://localhost:3001/users", {
          name: emailInput,
          email: emailInput,
          password: passwordRetypeInput,
        })
        .then((res) => console.log(res))
        .then((error) => console.log(error));
    }
    localStorage.setItem("user", emailInput!);
    history.push("/users");
  };

  const classNameOfEmailInput = isEmailError ? classes["input-error"] : "";
  const classNameOfPasswordInput = isPasswordError
    ? classes["input-error"]
    : "";
  const classNameOfPasswordRetypeInput = isPasswordRetypeError
    ? classes["input-error"]
    : "";

  return (
    <div className={classes.overLay}>
      <form className={classes.form} onSubmit={formHandler}>
        {isLogin && <h2 className={classes.title}>Logare</h2>}
        {!isLogin && <h2 className={classes.title}>Inregistrare</h2>}

        <label className={classes.label}>
          Email
          <input
            type="email"
            onChange={() => resetEmailErrorHandler()}
            ref={inputEmailRef}
            className={classNameOfEmailInput}
          />
          {isEmailError && (
            <span className={classes["span-error"]}>
              Format de email invalid!
            </span>
          )}
        </label>

        <label className={classes.label}>
          Parola
          <input
            type="password"
            onChange={() => resetPasswordErrorHandler()}
            ref={inputPasswordRef}
            className={classNameOfPasswordInput}
          />
          {isPasswordError && (
            <span className={classes["span-error"]}>
              Parola prea scurta! (min 5 caractere)
            </span>
          )}
        </label>

        {!isLogin && (
          <label className={classes.label}>
            Repetati parola
            <input
              type="password"
              onChange={() => resetPasswordRetypeErrorHandler()}
              ref={inputPasswordRetypeRef}
              className={classNameOfPasswordRetypeInput}
            />
            {isPasswordRetypeError && (
              <span className={classes["span-error"]}>
                Parolele nu coincid!
              </span>
            )}
          </label>
        )}

        <div className={classes.group}>
          {isLogin && (
            <>
              <button className={classes.btn}>Logare</button>
              <button
                className={classes.link}
                onClick={toggleLoginStateHandler}
              >
                Nu ai cont? Inregistreazate.
              </button>
            </>
          )}
          {!isLogin && (
            <>
              <button className={classes.btn}>Inregistrare</button>
              <button
                className={classes.link}
                onClick={toggleLoginStateHandler}
              >
                Deja ai cont? Logheazate.
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
