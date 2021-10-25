import React, { useRef, useState } from 'react';
import classes from './Login.module.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isError, setIsError] = useState(false);

    const inputTextRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const inputPasswordRetypeRef = useRef<HTMLInputElement>(null);

    const toggleLoginStateHandler = () => {
        setIsLogin(!isLogin);
        setIsError(false);
    }

    const formHandler = (event: any) => {
        event.preventDefault();
        setIsError(false);

        if(isLogin && (inputTextRef.current?.value.trim() === '' || inputPasswordRef.current?.value.trim() === '')) {
            setIsError(true);
            return; 
        }
        if(!isLogin && (inputTextRef.current?.value.trim() === '' || inputPasswordRef.current?.value.trim() === '' || inputPasswordRetypeRef.current?.value.trim() === '')) {
            setIsError(true);
            return; 
        }

        console.log(inputTextRef.current?.value);
        console.log(inputPasswordRef.current?.value);
        console.log(inputPasswordRetypeRef.current?.value);

        fetch('http://localhost:3001/')
        .then(res=> {
            console.log('res', res); 
            if(res.ok) {
                return res.json();
            } else {
                console.log('eror');
            }
        })
        .then(data => {
            console.log(data);
            
        })

    }


    return (
        <div className={classes.overLay}>
            <form className={classes.form} onSubmit={formHandler}>
                {isError && <p className={classes.error}>Completati toate cimpurile!</p>}
                {isLogin && <h2 className={classes.title}>Logare</h2>}
                {!isLogin && <h2 className={classes.title}>Inregistrare</h2>}
                <label className={classes.label}>
                    email
                    <input type="text" ref={inputTextRef}/>
                </label>
                <label className={classes.label}>
                    parola
                    <input type="text" ref={inputPasswordRef}/>
                </label>
                {!isLogin && (
                    <label className={classes.label}>
                        repetati parola
                        <input type="text" ref={inputPasswordRetypeRef}/>
                    </label>
                )}
                <div className={classes.group}>
                    {isLogin && (
                        <>
                            <button className={classes.btn}>Logare</button>
                            <button className={classes.link} onClick={toggleLoginStateHandler}>Inregistrare</button>
                        </>
                    )}
                    {!isLogin && (
                        <>
                            <button className={classes.btn}>Inregistrare</button>
                            <button className={classes.link} onClick={toggleLoginStateHandler}>Logare</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;