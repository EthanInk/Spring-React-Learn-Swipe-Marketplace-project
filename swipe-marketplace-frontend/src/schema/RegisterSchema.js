import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Invalid email address").required("Email address Required"),
  name: Yup.string().required("Name Required"),
  surname: Yup.string().required("Surname Required"),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});
