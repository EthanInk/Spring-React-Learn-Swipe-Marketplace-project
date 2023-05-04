import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Invalid email address").required("Email address Required"),
  name: Yup.string().required("Name Required"),
  surname: Yup.string().required("Surname Required"),
});
