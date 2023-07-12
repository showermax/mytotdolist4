import React from 'react';
import './Login.css'
import {useFormik} from "formik";

export const Login = () => {
    const loginForm = useFormik({
        initialValues: {
            mail: '',
            pass: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })
    console.log(loginForm.values)
    return (
        <section>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <form className="form" onSubmit={loginForm.handleSubmit}>
                        <div className="inputBox">
                            <input type="text"  id={'mail'} name={'mail'} onChange={loginForm.handleChange} /> <i>Username</i>
                        </div>
                        <div className="inputBox">
                            <input type="password" id={'pass'} name={'pass'} onChange={loginForm.handleChange} /> <i>Password</i>
                        </div>
                        <div className="rememberMe">
                            <input type="checkbox" id={'rememberMe'} name={'rememberMe'} onChange={loginForm.handleChange} /> <i>Remember me</i>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

