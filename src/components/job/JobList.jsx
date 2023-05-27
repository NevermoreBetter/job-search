"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  setDoc,
  deleteField,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import useGetJobs from "@/hooks/fetchJobs";

const JobList = () => {
  const { currentUser } = useAuth();
  // const [jobsData, setJobsData] = useState([]);
  const userName = currentUser.displayName;
  // const dbRef = collection(db, "jobs");
  const { jobsData, isLoading } = useGetJobs();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // async function getJobs() {
  //   try {
  //     const response = await getDocs(dbRef);
  //     const data = response.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setJobsData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const dataToShow = jobsData.filter((data) => {
    if (data.UserId === currentUser.uid) return data;
  });

  // useEffect(() => {
  //   getJobs();
  // }, []);

  return (
    <div className="container ">
      <div className="mt-[5rem]">
        <Link href="/jobs/create-job">Створити</Link>
        <br />
        {dataToShow.map((data) => {
          return (
            <div className="border-8 p-4">
              <Link href={`/jobs/${data.id}`}>
                <h2 className="text-teal-500 break-words mb-2">{data.Name}</h2>
              </Link>
              <br />
              {data.Description}
              <br />
              <Link href={`/jobs/job-list/${data.id}`}>Редагувати</Link>
            </div>
          );
        })}
        <Link href={`jobs/company/edit`}>Інформація про вашу компанію</Link>
      </div>
    </div>
  );
};

export default JobList;
