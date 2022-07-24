import React, { useRef } from "react";
import api from "@services/api";
import Layout from "@/layout/Layout.jsx";
import Breadcrumbs from "@components/Breadcrumbs.jsx";
import { success, error } from "@services/toast.js";

const AdminAdd = () => {
  const firsnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: firsnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      repeatPassword: repeatPasswordRef.current.value,
    };

    api
      .post("/auth/register", data)
      .then((response) => {
        success(`🔐 ${response.data.message}`);
        firsnameRef.current.value = "";
        lastnameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        repeatPasswordRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
        error(`😭 ${err.response.data.error}`);
      });

    // formRef.current.submit();
  };
  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Ajouter un utilisateur"} />
      <div className="mt-10">
        <div className="my-10">
          Vous allez insérer un employé, ne pas oublié de transmettre le mot de
          passe à l'utilisateur, et lui demander de modifier ce mot de passe
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Ajouter un nouvel utilisateur
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Information sur l'employé.
                </p>
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
                          ref={firsnameRef}
                          autoComplete="given-name"
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
                          ref={lastnameRef}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
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
                          ref={emailRef}
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          ref={passwordRef}
                          autoComplete="password"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          htmlFor="repeat_password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirmation du mot de passe
                        </label>
                        <input
                          type="password"
                          name="repeat_password"
                          id="repeat_password"
                          ref={repeatPasswordRef}
                          autoComplete="password"
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
                      Enregistrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-2">
            Pour la création du mot de passe voilà comment ça se passera :
            <ul className="list-disc list-inside">
              <li>
                Le mot de passe doit être composé d'au moins 8 caractères.
              </li>
              <li>
                Il doit être composé de chiffres, lettres, caractères spéciaux.
              </li>
            </ul>
          </div>
          <p>
            Attention <span className="font-bold">l'adresse mail</span> doit
            être unique, si une personne possède déjà cette adresse mail, la
            création du compte de ne se fera pas.
          </p>
          <p>
            Si une erreur est détectée, n'hésitez pas à contacter votre
            responsable pour qu'il puisse corriger l'erreur.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAdd;
