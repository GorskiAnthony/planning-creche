import React, { useContext, useState } from "react";
import {
  CheckCircleIcon,
  UserCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import AuthContext from "@context/AuthContextProvider";
import api from "@services/api";
import { success, error } from "@services/toast";
import Modal from "@components/Modal.jsx";

const PostMessage = ({ urgency, author, message, createdAt, id }) => {
  const [modal, setModal] = useState(false);

  const { user, setIsPostMessage, isPostMessage } = useContext(AuthContext);

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  const handleDelete = () => {
    api
      .delete(`/messages/${id}`)
      .then((res) => {
        success(`🗑 ${res.data.message}`);
        setIsPostMessage(!isPostMessage);
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  const handleEdit = () => {
    // TODO je doit l'implémenter
  };

  return (
    <div className="my-4">
      {modal && (
        <Modal
          isOpen={modal}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
        />
      )}
      <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white min-w-full">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-10 w-10 text-gray-500" />
            <div className="text-lg font-bold text-slate-700 flex justify-center items-center ">
              {author.firstname} {author.lastname}
              {author.role === "ADMIN" || author.role === "SUPER_ADMIN" ? (
                <CheckCircleIcon className="w-5 h-5 inline-block text-blue-400 ml-1" />
              ) : null}
            </div>
          </div>
          <div className="flex items-center space-x-8">
            {urgency ? (
              <button className="rounded-2xl border text-red-700 px-3 py-1 text-xs font-semibold bg-red-100 border-red-700">
                Urgent
              </button>
            ) : null}
            <div className="text-xs text-neutral-500">
              le{" "}
              <span className="font-bold">
                {new Date(createdAt).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
            {user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? (
              <button onClick={toggleModal} type="button">
                <TrashIcon className="w-7 h-7 bg-red-200 text-red-500 p-1 rounded-sm" />
              </button>
            ) : author.id === user.id ? (
              <>
                <button onClick={handleEdit}>
                  <PencilIcon className="w-5 h-5 text-indigo-500" />
                </button>
                <button onClick={handleDelete}>
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="text-sm text-neutral-600">{message}</div>
        </div>

        {/**
           }
           <div>
           <div className="flex items-center justify-between text-slate-500">
           <div className="flex space-x-4 md:space-x-8">
           <div className="flex cursor-pointer items-center transition hover:text-slate-600">
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className="mr-1.5 h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           strokeWidth="2"
           >
           <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
           />
           </svg>
           <span>125</span>
           </div>
           <div className="flex cursor-pointer items-center transition hover:text-slate-600">
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className="mr-1.5 h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           strokeWidth="2"
           >
           <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
           />
           </svg>
           <span>4</span>
           </div>
           </div>
           </div>
           </div>
           */}
      </div>
    </div>
  );
};

export default PostMessage;
