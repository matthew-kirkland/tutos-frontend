import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") ?? "");
  const roles = token ? jwtDecode(token).roles : "";
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{token, roles, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};