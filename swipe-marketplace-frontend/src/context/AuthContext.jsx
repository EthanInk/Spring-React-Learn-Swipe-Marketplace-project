import { createContext, useContext, useState } from "react";
import { exeJWTAuth, regesterNewUser, chechAuth, getOwnDetails, updateOwnDetails } from "../fetch/ApiAuth";
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
  const [isAuthed, setIsAuthed] = useState(loadUserData.email);

  async function login(email, password) {
    try {
      const response = await exeJWTAuth(email, password);
      if (response.status === 200) {
        const token = "Bearer " + response.data.token;
        console.log(token);
        userData.email = email;
        userData.token = token;
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        addAuthToken(token);
        setIsAuthed(true);
        return Promise.resolve("Logged in");
      } else if (response.status === 401) {
        logout();
        Navigate("/login");
      }
      return Promise.reject("Loggin failed");
    } catch (error) {
      logout();
      return Promise.reject("Loggin failed");
    }
  }

  async function isAuthedUpdate() {
    try {
      const response = await chechAuth();
      if (response.status === 200) {
        setIsAuthed(true);
      }
      logout();
    } catch (error) {
      logout();
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

  async function getUserDetails() {
    try {
      const response = await getOwnDetails();
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get user data failed");
    } catch (error) {
      return Promise.reject("Get user data failed");
    }
  }
  async function postUserDetails(name,surname) {
    try {
      const response = await updateOwnDetails(name,surname);
      if (response.status === 201) {
        return Promise.resolve("Registaration success");
      }
      return Promise.reject("Registaration failed");
    } catch (error) {
      return Promise.reject("Registaration failed");
    }
  }

  function logout() {
    console.log("Logging out");
    setIsAuthed(false);
    resetUserData();
    removeAuthToken();
  }

  function resetUserData() {
    const userData = { email: "", token: "" };
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider
      value={{ isAuthed, isAuthedUpdate, userData, login, logout, register, getUserDetails, postUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
