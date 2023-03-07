"use client";

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Posts from "./JobCard";
import axios from "axios";
import Pagination from "./Pagination";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useFetchJobs from "@/hooks/fetchJobs";
import Link from "next/link";
import JobPosts from "./JobPosts";
const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const { jobs } = useFetchJobs();

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="jobs container">
      <Navbar />
      <Link href="/jobs/create-job">
        <div>Add post</div>
      </Link>
      <JobPosts />
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
      <Footer />
    </div>
  );
};

export default Jobs;
