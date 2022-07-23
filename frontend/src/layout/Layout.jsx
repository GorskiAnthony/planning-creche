import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import { getItem, getSessionItem } from "../services/stockage.js";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContextProvider.jsx";

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
    <>
      <Navbar isAuth={userStorage === null ? false : true} user={user} />
      <main className="min-h-screen flex flex-col">
        <div className="mt-8 px-4 sm:px-6 lg:px-8 flex-1">
          <div className="max-w-5xl mx-auto">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
