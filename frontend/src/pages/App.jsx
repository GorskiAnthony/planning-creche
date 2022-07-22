import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Calendar from "./Calendar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin.jsx";
import ProtectedRoute from "../layout/ProtectedRoute.jsx";
import AuthContext from "../context/AuthContextProvider.jsx";

const App = () => {
  const { admin } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute admin={admin}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
