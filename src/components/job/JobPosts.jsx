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
import Link from "next/link";

const JobPosts = () => {
  const [jobsData, setJobsData] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const dbRef = collection(db, "jobs");
  //---------------------========================TODO: Пагинация здесь========================================---------------------------
  const toggleBtn = () => {
    setReadMore((prevState) => !prevState);
  };

  async function getJobs() {
    await getDocs(dbRef).then((response) => {
      setJobsData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
      console.log(
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
      <div className="mb-4">
        There {jobsData.length <= 1 ? "is" : "are"} {jobsData.length}{" "}
        {jobsData.length <= 1 ? "vacation" : "vacations"}
      </div>
      {jobsData.map((data) => {
        return (
          <div className="mb-8">
            <Link href={`/jobs/${data.id}`}>{data.Name}</Link>
            {data.Salary.map((salary) => {
              return `${salary}$`;
            }).join("-")}
            <br />
            {readMore ? data.Description : data.Description.substr(0, 1)}
            <button onClick={toggleBtn}>
              {!readMore ? "Show More" : "Show Less"}
            </button>
            <br />
            {data.Author}
            <br />
            {data.City.join(", ")}
            <br />
            {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
          </div>
        );
      })}
    </div>
  );
};

export default JobPosts;
