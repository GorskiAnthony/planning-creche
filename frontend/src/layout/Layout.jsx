import React, { useEffect, useContext } from "react";
import Navbar from "@components/Navbar.jsx";
import { getItem, getSessionItem } from "@services/stockage.js";
import Footer from "@components/Footer.jsx";
import AuthContext from "@context/AuthContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userStorage = getSessionItem("user") || getItem("user");

  useEffect(() => {
    if (!userStorage) {
      navigate("/login");
    }
  }, [userStorage]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar isAuth={userStorage === null ? false : true} user={user} />
      <div className="mt-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
