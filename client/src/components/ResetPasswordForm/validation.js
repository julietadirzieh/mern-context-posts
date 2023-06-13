import * as Yup from 'yup';

const alphaNumericRegex = /^[a-zA-Z0-9_]+$/;

const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('Password is required').min(
        8,
        'password must contain 8 or more characters'
    ).max(
        16,
        'password must contain max 16 characters'
    ).matches(alphaNumericRegex, 'Letters and numbers only'),
    confirmNewPassword: Yup.string().required("Please, confirm new password")
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

export default validationSchema;
// [^A-Za-z0-9]+