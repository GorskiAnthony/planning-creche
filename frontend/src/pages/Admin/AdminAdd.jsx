import React from "react";
import Layout from "@/layout/Layout.jsx";
import Breadcrumbs from "@components/Breadcrumbs.jsx";

const AdminAdd = () => {
  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Ajouter un utilisateur"} />
      <h1>AdminAdd</h1>
    </Layout>
  );
};

export default AdminAdd;
