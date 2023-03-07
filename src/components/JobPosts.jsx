import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  setDoc,
  deleteField,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useFetchJobs from "@/hooks/fetchJobs";
import Navbar from "./Navbar";
import Footer from "./Footer";

const JobPosts = () => {
  const [jobsData, setJobsData] = useState([]);
  const dbRef = collection(db, "jobs");
  //TODO: Пагинация здесь
  async function getJobs() {
    await getDocs(dbRef).then((response) => {
      setJobsData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="container">
      {jobsData.map((data) => {
        return <div>{data.name}</div>;
      })}
    </div>
  );
};

export default JobPosts;
