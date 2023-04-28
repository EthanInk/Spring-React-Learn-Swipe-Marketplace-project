import { createContext, useContext, useState } from "react";
import { exeJWTAuth, regesterNewUser } from "../fetch/ApiAuth";
import { apiClient } from "../fetch/ApiClient";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export default function AuthProvider({ children }) {
  const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
  const loadUserData = localStorageUserData ? localStorageUserData : { email: "", token: "" };
  const [userData, setUserData] = useState(loadUserData);
  const [isAuthed, setIsAuthed] = useState(loadUserData.email !== "");

  async function login(email, password) {
    try {
      const response = await exeJWTAuth(email, password);
      if (response.status === 200) {
        const token = "Bearer " + response.data.token;
        setIsAuthed(true);
        userData.email = email;
        userData.token = token;
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = token;
          return config;
        });
        return Promise.resolve("Logged in");
      }
      setIsAuthed(false);
      return Promise.reject("Loggin failed");
    } catch (error) {
      setIsAuthed(false);
      apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = '';
        return config;
      });
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
    setIsAuthed(false);
    const userData = { email: "", token: "" };
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider value={{ isAuthed, userData, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
