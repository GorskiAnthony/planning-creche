import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="flex w-full items-center justify-between border-b pb-3 flex-wrap">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-10 w-10 text-gray-500" />
            <div className="text-lg font-bold text-slate-700 flex justify-center items-center ">
              {author.firstname} {author.lastname}
              {author.role === "ADMIN" || author.role === "SUPER_ADMIN" ? (
                <CheckCircleIcon className="w-5 h-5 inline-block text-blue-400 ml-0.5" />
              ) : null}
            </div>
          </div>
          <div className="flex items-center space-x-8 ">
            {urgency ? (
              <Link
                to="/urgent"
                className="rounded-2xl border text-red-700 px-3 py-1 text-xs font-semibold bg-red-100 border-red-700"
              >
                Urgent
              </Link>
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
                <button onClick={toggleModal}>
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="text-sm text-neutral-600">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default PostMessage;
