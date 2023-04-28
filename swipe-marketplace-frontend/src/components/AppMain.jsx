import Login from "./page/Login";
import PropTypes from "prop-types";
import AuthProvider, { useAuth } from "../context/AuthContext";
import Error from "./page/Error";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./common/Header";
import Register from "./page/Register";
import Welcom from "./page/Welcome";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthed) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
};

function AppMain() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/logout" element={<Register></Register>}></Route>
            <Route path="/welcome" element={<Welcom></Welcom>}></Route>
{/* 
            <Route
              path="/welcome"
              element={
                <AuthenticatedRoute>
                  <Welcom></Welcom>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos></ListTodos>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/todos/:id"
              element={
                <AuthenticatedRoute>
                  <Todo></Todo>
                </AuthenticatedRoute>
              }
            ></Route> */}

            {/* <Route path="/logout" element={<Logout></Logout>}></Route> */}
            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default AppMain;