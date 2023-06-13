import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export default validationSchema;
// [^A-Za-z0-9]+