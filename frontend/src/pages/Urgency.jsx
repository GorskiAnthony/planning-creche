import React, { useContext, useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import AuthContext from "@context/AuthContextProvider";
import api from "@services/api";
import ListMessages from "@components/ListMessages.jsx";
import Pagination from "@components/Pagination.jsx";

const Urgency = () => {
  const { isPostMessage } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    api.get("/messages/urgency").then((response) => {
      setMessages(response.data.allMessage.reverse());
    });
  }, [isPostMessage]);

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <ListMessages messages={currentPosts} />
      <Pagination
        postsPerPage={postPerPage}
        totalPost={messages.length}
        paginate={handlePaginate}
      />
    </Layout>
  );
};

export default Urgency;
