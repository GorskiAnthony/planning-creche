import React from "react";
import Layout from "@/layout/Layout.jsx";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@components/Breadcrumbs.jsx";

const AdminEdit = () => {
  const { id } = useParams();
  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Edition d'un utilisateur"} />

      <h1>AdminEdit {id} </h1>
    </Layout>
  );
};

export default AdminEdit;
