import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") ?? "");
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};