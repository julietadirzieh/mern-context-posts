import * as Yup from 'yup';

const alphaNumericRegex = /^[a-zA-Z0-9_]+$/;

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(
        8,
        'password must contain 8 or more characters'
    ).max(
        16,
        'password must contain max 16 characters'
    ).matches(alphaNumericRegex, 'Letters and numbers only'),
    confirmPassword: Yup.string().required("Please, confirm password")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default validationSchema;
// [^A-Za-z0-9]+