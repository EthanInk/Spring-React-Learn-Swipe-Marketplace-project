import { createContext, useContext, useState } from "react";
import { exeJWTAuth } from "../fetch/ApiAuth";
import { apiClient } from "../fetch/ApiClient";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [userData, setUserData] = useState({ username: "", token: "" });

  async function login(username, password) {
    try {
      const response = await exeJWTAuth(username, password);
      if (response.status === 200) {
        const token = "Bearer " + response.data.token;
        console.log(response);
        setIsAuthed(true);
        userData.username = username;
        userData.token = token;
        setUserData(userData);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = token;
          return config;
        });

        return true;
      }
      setIsAuthed(false);
      return false;
    } catch (error) {
      console.log(error);
      setIsAuthed(false);
      return false;
    }
  }

  function logout() {
    setIsAuthed(false);
    setUserData({ username: "", token: "" });
  }

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
