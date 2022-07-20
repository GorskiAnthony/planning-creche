import React from "react";
import Navbar from "../components/Navbar.jsx";
import { getItem, getSessionItem } from "../services/stockage.js";
import Footer from "../components/Footer.jsx";

const Layout = ({ children }) => {
  const user = getSessionItem("user") || getItem("user");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuth={user === null ? false : true} />
      <div className="max-w-7xl mt-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
