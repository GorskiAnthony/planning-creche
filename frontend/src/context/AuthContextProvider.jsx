import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const avatars = [
    "Lucy Stone",
    "Jane Johnston",
    "Rebecca Crumpler",
    "Elizabeth Cady",
    "Eunice Kennedy",
    "Amelia Earhart",
    "Maya Angelou",
  ];
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isPostMessage, setIsPostMessage] = useState(false);

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      setAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        avatar,
        setUser,
        setIsLogin,
        setIsPostMessage,
        isPostMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
