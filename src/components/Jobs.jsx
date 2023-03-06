"use client";

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Posts from "./JobPosts";
import axios from "axios";
import Pagination from "./Pagination";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";
import { auth } from "../firebase/firebase";
const Jobs = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  console.log(user);
  async function setJobPost() {
    const userRef = doc(db, "jobs", user.uid);
    await setDoc(
      userRef,
      {
        Author: "1",
      },
      { merge: true }
    );
  }
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="jobs container">
      <Navbar />
      <div
        onClick={() => {
          setJobPost();
        }}
      >
        Add post
      </div>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <Footer />
    </div>
  );
};

export default Jobs;
