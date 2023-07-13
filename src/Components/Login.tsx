import React from 'react';
import './Login.css'
import {useFormik} from "formik";
import {validate} from "../Utils/formikvalidate";
import {loginTC} from "../Reducers/AuthRedicer";

import {RootType, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
export type FormikValuesType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggenIn = useSelector<RootType, boolean>(state => state.auth.isLoggedIn)
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
            loginForm.resetForm()
        }
    })
    if (!isLoggenIn) return <Navigate to = {'/'} />

    return (
        <section>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <form className="form" onSubmit={loginForm.handleSubmit}>
                        <div className="inputBox">
                            <input type="text"  id={'email'} name={'email'} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.email}/> <i>e-mail</i>
                        </div>
                        {loginForm.touched.email && loginForm.errors.email && <div className ='error'>{loginForm.errors.email}</div>}
                        <div className="inputBox">
                            <input type="password" id={'password'} {...loginForm.getFieldProps('password')} /> <i>Password</i>
                        </div>
                        {loginForm.touched.email && loginForm.errors.password && <div className ='error'>{loginForm.errors.password}</div>}
                        <div className="rememberMe">
                            <input type="checkbox" id={'rememberMe'} checked = {loginForm.values.rememberMe} {...loginForm.getFieldProps('rememberMe')} /> <i>Remember me</i>
                        </div>
                        <div className={!loginForm.errors.password && !loginForm.errors.email ? 'inputBox' : 'inputBox disable'} >
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

