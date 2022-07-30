import React, { useContext, useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import FormMessage from "@components/FormMessage";
import PostMessage from "@components/PostMessage";
import AuthContext from "@context/AuthContextProvider";
import api from "@services/api";

const Home = () => {
  const { isPostMessage } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/messages").then((response) => {
      setMessages(response.data.allMessage.reverse());
    });
  }, [isPostMessage]);

  return (
    <Layout>
      <FormMessage />
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
        <div>
          <p className="text-gray-500 text-xl mt-16">
            Aucun message n'a été posté pour le moment, soyez le premier à
            poster un message !
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
