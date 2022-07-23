import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
