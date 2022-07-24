import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@components/Breadcrumbs.jsx";
import api from "@services/api.js";
import { UserRemoveIcon } from "@heroicons/react/solid";
import Modal from "@components/Modal.jsx";
import { success } from "@services/toast.js";

const AdminEdit = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  useEffect(() => {
    api.get(`/users/${id}`).then((response) => {
      setCurrentUser({
        firstname: response.data.user.firstname,
        lastname: response.data.user.lastname,
        email: response.data.user.email,
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/users/${id}`, currentUser).then((response) => {
      success(`🚀 ${response.data.message} !`);
      navigate("/admin");
    });
  };

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    api.delete(`/users/${id}`).then((response) => {
      success(
        `🗑 l'utilisateur ${currentUser.firstname} ${currentUser.lastname} a été supprimé`
      );
      navigate("/admin");
    });
  };

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Modifier un utilisateur"} />
      {modal && (
        <Modal
          isOpen={modal}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
        />
      )}
      <div className="mt-10">
        <div className="sm:flex sm:items-center my-4">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Modification d'un utilisateur
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={toggleModal}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
            >
              <UserRemoveIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <div className="text-lg font-medium leading-6 text-gray-900"></div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="firstname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          value={currentUser.firstname}
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="lastname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={currentUser.lastname}
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={currentUser.email}
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p>
            Vous ne pouvez que modifier le
            <span className="font-bold"> nom</span> le
            <span className="font-bold"> prénom</span> et l'
            <span className="font-bold"> email</span> de l'utilisateur.
            <p>
              Son mot de passe n'est pas modifiable ici. Seul l'utilisateur peux
              modifier son mot de passe.
            </p>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEdit;
