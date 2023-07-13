import {FormikValuesType} from "../Components/Login";


export const validate = (values: FormikValuesType) => {
    const errors: FormikValuesType= {};
    if (!values.pass) {
        errors.pass = 'Required';
    } else if (values.pass.length < 5) {
        errors.pass = 'Must be 5 characters or more';
    }

    if (!values.mail) {
        errors.mail = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
        errors.mail = 'Invalid email address';
    }

    return errors;
};