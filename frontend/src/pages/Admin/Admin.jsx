import React, { useContext, useState, useEffect } from "react";
import Layout from "@/layout/Layout.jsx";
import AuthContext from "@/context/AuthContextProvider.jsx";
import api from "@services/api.js";
import AdminListUsers from "@components/AdminListUsers.jsx";

const Admin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
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
      </section>
    </Layout>
  );
};

export default Admin;
