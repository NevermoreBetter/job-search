"use client";

import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
// import Posts from "./WorkerPosts";
// import axios from "axios";
// import Pagination from "../Pagination";
import WorkerPosts from "./WorkerPosts";

const Worker = () => {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  //     setPosts(res.data);
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="jobs container relative">
      {/* <Navbar /> */}
      <WorkerPosts />
      {/* <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Worker;
