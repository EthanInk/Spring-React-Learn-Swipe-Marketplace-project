import { createContext, useContext, useState } from "react";
import { exeJWTAuth, regesterNewUser } from "../fetch/ApiAuth";
import { addAuthToken, removeAuthToken } from "../fetch/ApiClient";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const localStorageUserData = JSON.parse(localStorage.getItem("userData"));
  const loadUserData = localStorageUserData
    ? localStorageUserData
    : { email: "", token: "" };
  addAuthToken(loadUserData.token);
  const [userData, setUserData] = useState(loadUserData);
  const [isAuthed, setIsAuthed] = useState(loadUserData.email !== "");

  async function login(email, password) {
    try {
      const response = await exeJWTAuth(email, password);
      if (response.status === 200) {
        const token = "Bearer " + response.data.token;
        console.log(token);
        setIsAuthed(true);
        userData.email = email;
        userData.token = token;
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        addAuthToken(token);
        return Promise.resolve("Logged in");
      } else if (response.status === 401) {
        resetUserData();
        removeAuthToken();
        Navigate({
          pathname: "/login",
        });
      }
      setIsAuthed(false);
      return Promise.reject("Loggin failed");
    } catch (error) {
      resetUserData()
      removeAuthToken();
      return Promise.reject("Loggin failed");
    }
  }
  async function register(email, name, surname, password) {
    try {
      const response = await regesterNewUser(email, name, surname, password);
      if (response.status === 201) {
        return Promise.resolve("Registaration success");
      }
      return Promise.reject("Registaration failed");
    } catch (error) {
      return Promise.reject("Registaration failed");
    }
  }

  function logout() {
    resetUserData();
    removeAuthToken();
  }

  function resetUserData(){
    setIsAuthed(false);
    const userData = { email: "", token: "" };
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider
      value={{ isAuthed, userData, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
