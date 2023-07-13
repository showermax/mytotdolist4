import React from 'react';
import './Login.css'
import {useFormik} from "formik";
import {validate} from "../Utils/formikvalidate";
export type FormikValuesType = {
    mail?: string,
    pass?: string,
    rememberMe?: boolean
}

export const Login = () => {
    const loginForm = useFormik({
        initialValues: {
            mail: '',
            pass: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            loginForm.resetForm()
        }
    })
    return (
        <section>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <form className="form" onSubmit={loginForm.handleSubmit}>
                        <div className="inputBox">
                            <input type="text"  id={'mail'} name={'mail'} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.mail}/> <i>e-mail</i>
                        </div>
                        {loginForm.touched.mail && loginForm.errors.mail && <div className ='error'>{loginForm.errors.mail}</div>}
                        <div className="inputBox">
                            <input type="password" id={'pass'} {...loginForm.getFieldProps('pass')} /> <i>Password</i>
                        </div>
                        {loginForm.touched.mail && loginForm.errors.pass && <div className ='error'>{loginForm.errors.pass}</div>}
                        <div className="rememberMe">
                            <input type="checkbox" id={'rememberMe'} checked = {loginForm.values.rememberMe} {...loginForm.getFieldProps('rememberMe')} /> <i>Remember me</i>
                        </div>
                        <div className={!loginForm.errors.pass && !loginForm.errors.mail ? 'inputBox' : 'inputBox disable'} >
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

