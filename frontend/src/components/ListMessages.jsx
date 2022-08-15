import React from "react";
import PostMessage from "@components/PostMessage.jsx";
import img from "@assets/message.png";

const ListMessages = ({ messages }) => {
  return (
    <>
      {messages.length > 0 ? (
        messages.map((message) => (
          <PostMessage
            key={message.id}
            id={message.id}
            author={message.author}
            urgency={message.urgency}
            message={message.message}
            createdAt={message.createdAt}
          />
        ))
      ) : (
        <div className="flex mt-5">
          <img
            src={img}
            alt="illustration d'un message"
            className="h-3/6 w-3/6 "
          />
          <p className="text-gray-500 text-xl mt-16">
            Aucun message n'a été posté pour le moment, soyez le premier à
            poster un message !
          </p>
        </div>
      )}
    </>
  );
};

export default ListMessages;
