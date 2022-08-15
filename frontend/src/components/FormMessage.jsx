import React, { useContext, useRef, useState } from "react";
import api from "@services/api.js";
import { warning } from "@services/toast.js";
import AuthContext from "@context/AuthContextProvider.jsx";

const FormMessage = () => {
  const messageRef = useRef();
  const urgencyRef = useRef();
  const [data, setData] = useState({});
  const { user, setIsPostMessage, isPostMessage } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageRef.current.value === "") {
      warning("✋ Le message ne doit pas être vide");
    } else {
      setData({
        message: messageRef.current.value,
        urgency: urgencyRef.current.checked,
        authorId: user.id,
      });
    }

    api
      .post("/messages", data)
      .then(() => {
        setIsPostMessage(!isPostMessage);
        messageRef.current.value = "";
        urgencyRef.current.checked = false;
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };
  return (
    <div className="bg-gray-50">
      <form
        className="flex flex-col space-y-4 p-8 rounded-xl"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="message"
          className="block mb-2 font-medium text-gray-900 dark:text-gray-400"
        >
          Bonjour {user.name},
        </label>
        <textarea
          id="message"
          ref={messageRef}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quelle est l'information importante à transmettre ?"
        ></textarea>
        <div className="flex justify-between">
          <fieldset className="space-y-1">
            <legend className="sr-only">Notifications</legend>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="urgency"
                  ref={urgencyRef}
                  aria-describedby="urgency-description"
                  name="urgency"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="urgency" className="font-medium text-gray-700">
                  Urgent
                </label>
                <p id="offers-description" className="text-gray-500">
                  L'information doit être connu de tout les utilisateurs.
                </p>
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-3 inline-block"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormMessage;
