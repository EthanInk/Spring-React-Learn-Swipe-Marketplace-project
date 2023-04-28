import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Typography, Alert } from "@material-tailwind/react";
import { useState } from "react";
import LoginSchema from "../../schema/LoginSchema";
export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const email = "Ethan@gmail.com";
  const password = "Ethan";
  const navigate = useNavigate();
  const authContext = useAuth();

  async function onSubmitForm(values) {
    const { email, password } = values;
    await authContext
      .login(email, password)
      .then(() => {
        navigate("/LOGGEDIN");
      })
      .catch(() => {
        setErrorMessage("Incorrect log in details.");
      });
  }

  return (
    <div className={"Login w-72 m-auto"}>
      <Typography variant="h2" className="py-4">
        Login
      </Typography>
      <Formik
        initialValues={{ email, password }}
        enableReinitialize={true}
        onSubmit={onSubmitForm}
        validationSchema={LoginSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {() => (
          <Form>
            <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
              <div className="mb-4 flex flex-col gap-6">
                <fieldset className="relative h-11 w-full min-w-[200px]">
                  <Field
                    type="text"
                    name="email"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </fieldset>
                <fieldset className="relative h-11 w-full min-w-[200px]">
                  <Field
                    type="password"
                    name="password"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </fieldset>
              </div>
              <button
                className="mb-2 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                data-ripple-light="true"
              >
                Login
              </button>
            </div>
            <ErrorMessage name="email" component={"div"}>
              {(msg) => <Alert color="red">{msg}</Alert>}
            </ErrorMessage>
            <ErrorMessage name="password" component={"div"}>
              {(msg) => <Alert color="red">{msg}</Alert>}
            </ErrorMessage>
          </Form>
        )}
      </Formik>
      <div className={`${errorMessage ? "" : "hidden"} my-4`}>
        <Alert color="red">{errorMessage}</Alert>
      </div>
      <span>Don&apos;t have an account? <Link to="/register" className="text-blue-500">Register here.</Link></span>
    </div>
  );
}
