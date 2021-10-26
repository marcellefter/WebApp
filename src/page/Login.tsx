import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import classes from "./Login.module.css";
import { UserInterface } from "./../interface/interface";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import classes from "./Login.module.css";
import { UserInterface } from "./../interface/interface";
import useInput from "../hooks/use-input";

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password: string) {
  return password.trim().length > 5;
}

function validatePasswordConfirm(passConfirm: string, pass: string) {
  return passConfirm === pass;
}

const Login = () => {
  const [userStatus, setUserStatus] = useState<string>("null");
  const [isLogin, setIsLogin] = useState(true);
  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
  } = useInput(validateEmail, "nothing");

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
  } = useInput(validatePassword, "nothing");

  const {
    value: enteredPasswordConfirm,
    hasError: passwordConfirmHasError,
    valueIsValid: passwordConfirmIsValid,
    valueChangeHandler: passwordConfirmChangeHandler,
    valueInputBlurHandler: passwordConfirmInputBlurHandler,
  } = useInput(validatePasswordConfirm, enteredPassword);

  const history = useHistory();

  const toggleLoginStateHandler = () => {
    setIsLogin(!isLogin);
  };

  const formHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      //login
      console.log("login");
      if (!emailIsValid || !passwordIsValid) {
        //check if form is valid
        emailInputBlurHandler();
        passwordInputBlurHandler();
        passwordConfirmInputBlurHandler();
        return;
      }
      axios
        .get<UserInterface[]>(`http://localhost:3001/users?q=${enteredEmail}`) //search user
        .then((res) => {
          if (res.data.length === 0) {
            setUserStatus("not exist");
          } else if (res.data[0].password === enteredPassword) {
            setUserStatus("exist");
            localStorage.setItem("user", enteredEmail);
            history.push("/users");
          } else {
            setUserStatus("invalid password");
          }
        })
        .catch((error) => console.log(error));
    } else {
      //register
      console.log("inregistrare");
      if (!emailIsValid || !passwordIsValid || !passwordConfirmIsValid) {
        //check if form is valid
        emailInputBlurHandler();
        passwordInputBlurHandler();
        passwordConfirmInputBlurHandler();
        return;
      }

      axios
        .post("http://localhost:3001/users", {
          name: enteredEmail,
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((res) => console.log(res))
        .then((error) => console.log(error));
      localStorage.setItem("user", enteredEmail!);
      history.push("/users");
    }
  };

  const classNameOfEmailInput = emailHasError ? classes["input-error"] : "";
  const classNameOfPasswordInput = passwordHasError
    ? classes["input-error"]
    : "";
  const classNameOfPasswordRetypeInput = passwordConfirmHasError
    ? classes["input-error"]
    : "";

  console.log(userStatus);

  return (
    <div className={classes.overLay}>
      <form className={classes.form} onSubmit={formHandler}>
        {isLogin && <h2 className={classes.title}>Logare</h2>}
        {!isLogin && <h2 className={classes.title}>Inregistrare</h2>}

        <label className={classes.label}>
          Email
          <input
            type="email"
            onBlur={emailInputBlurHandler}
            onChange={emailChangeHandler}
            className={classNameOfEmailInput}
          />
          {emailHasError && (
            <span className={classes["span-error"]}>
              Format de email invalid!
            </span>
          )}
          {userStatus === "not exist" && (
            <span className={classes["span-error"]}>
              Asa utilizator nu exista
            </span>
          )}
        </label>

        <label className={classes.label}>
          Parola
          <input
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordInputBlurHandler}
            className={classNameOfPasswordInput}
          />
          {passwordHasError && (
            <span className={classes["span-error"]}>
              Parola prea scurta! (min 5 caractere)
            </span>
          )}
          {userStatus === "invalid password" && (
            <span className={classes["span-error"]}>Parola gresita</span>
          )}
        </label>

        {!isLogin && (
          <label className={classes.label}>
            Repetati parola
            <input
              type="password"
              onBlur={passwordConfirmInputBlurHandler}
              onChange={passwordConfirmChangeHandler}
              className={classNameOfPasswordRetypeInput}
            />
            {passwordConfirmHasError && (
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
