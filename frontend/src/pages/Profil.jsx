import React, { useContext, useState } from "react";
import Layout from "../layout/Layout.jsx";
import AuthContext from "../context/AuthContextProvider.jsx";

const Profil = () => {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");

  console.log(user);
  return (
    <Layout>
      <h1 className="text-lg font-medium leading-6 text-gray-900 mb-5">
        Bonjour <span className="font-bold">{user.name},</span>
      </h1>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Vos informations personnelles
            </h3>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" id="formUpdate">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user.name}
                    disabled={true}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adresse Email
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    defaultValue={user.email}
                    disabled={true}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ancien mot de passe
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    autoComplete="oldPassword"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmation mot de passe
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    autoComplete="newPassword"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="reset"
          form="formUpdate"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          En faite non..
        </button>
        <button
          type="submit"
          form="formUpdate"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Envoyer
        </button>
      </div>

      <div>
        Votre nom complet et votre adresse email sont confidentiels et ne seront
        donc pas divulgués.
        <p>
          Si une erreur est détectée, n'hésitez pas à contacter votre
          responsable pour qu'il puisse corriger l'erreur.
        </p>
      </div>
    </Layout>
  );
};

export default Profil;
