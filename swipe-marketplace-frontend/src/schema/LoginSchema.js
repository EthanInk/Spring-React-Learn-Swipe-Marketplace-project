import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Invalid email address").required("Email address Required"),
  password: Yup.string().required("Password Required"),
});
