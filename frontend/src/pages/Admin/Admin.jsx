import React, { useContext, useState, useEffect } from "react";
import Layout from "@/layout/Layout.jsx";
import AuthContext from "@/context/AuthContextProvider.jsx";
import api from "@services/api.js";
import AdminListUsers from "@components/Admin/AdminListUsers.jsx";
import AdminListCalendars from "@components/Admin/AdminListCalendars.jsx";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    Promise.all([api.get("/users"), api.get("/calendars")]).then(
      ([users, calendars]) => {
        console.log({ users, calendars });
        setUsers(users.data.users);
        setCalendars(calendars.data.calendars);
      }
    );
  }, []);

  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <header className="mb-9">
        <h1 className="text-2xl">
          Bonjour <span className="font-bold">{user.name},</span>
        </h1>
        <p className="text-sm">
          Vous pouvez gérer l'ensemble du personnel sur cette page.
        </p>
      </header>
      <section>
        <AdminListUsers users={users} />
        <AdminListCalendars calendars={calendars} />
      </section>
    </Layout>
  );
};

export default Admin;
