import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Calendar from "./Calendar.jsx";
import Profil from "./Profil.jsx";
import Admin from "./Admin/Admin.jsx";
import AdminEditUser from "./Admin/AdminEditUser.jsx";
import AdminAddUser from "./Admin/AdminAddUser.jsx";
import AdminEditCalendar from "@pages/Admin/AdminEditCalendar.jsx";
import ProtectedRoute from "@/layout/ProtectedRoute.jsx";
import AuthContext from "@context/AuthContextProvider.jsx";
import AdminAddCalendar from "@pages/Admin/AdminAddCalendar.jsx";
import Urgency from "@pages/Urgency";
import NotFound from "@pages/NotFound.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urgent" element={<Urgency />} />
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
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute user={user}>
              <AdminEditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/add"
          element={
            <ProtectedRoute user={user}>
              <AdminAddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/calendars/:id"
          element={
            <ProtectedRoute user={user}>
              <AdminEditCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/calendars/add"
          element={
            <ProtectedRoute user={user}>
              <AdminAddCalendar />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
