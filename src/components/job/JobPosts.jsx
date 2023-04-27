import React, { useEffect, useState } from "react";
import Image from "next/image";
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
          <div
            className="mb-8 shadow-xl p-2 rounded-md border-8 "
            key={data.id}
          >
            <Link href={`/jobs/${data.id}`}>
              <h2 className="text-teal-500 break-words mb-2">{data.Name}</h2>
            </Link>
            {data.Salary.map((salary) => {
              return `${salary}$`;
            }).join("-")}
            <br />
            <div className="flex gap-4 text-sm">
              <div> {data.Experience}</div>
              <div>{data.Type}</div>
              <div>{data.City.join(", ")}</div>
            </div>
            <br />
            <div className="break-words">{data.Description}</div>
            <br />
            <div className="flex gap-2">
              <Image
                className="rounded-full"
                src={data.UserPic}
                width={50}
                height={50}
                alt="profile picture"
              />
              <br />
              <div>
                {data.Author}
                <br />
                {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobPosts;
