import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Calendar from "./Calendar.jsx";
import Profil from "./Profil.jsx";
import Admin from "./Admin.jsx";
import ProtectedRoute from "../layout/ProtectedRoute.jsx";
import AuthContext from "../context/AuthContextProvider.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
