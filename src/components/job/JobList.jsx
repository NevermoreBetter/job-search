"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  deleteDoc,
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
  const { jobsData, isLoading, refetch } = useGetJobs();
  const dbRef = collection(db, "jobs");
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  const dataToShow = jobsData.filter((data) => {
    if (data.UserId === currentUser.uid) return data;
  });

  const deleteItem = async (id) => {
    try {
      if (confirm(`Видалити посаду?`)) {
        const itemToDelete = doc(dbRef, id);
        await deleteDoc(itemToDelete).then(() => {
          refetch();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container ">
      <div className="mt-[5rem] mb-[5rem]">
        <div className="flex justify-around">
          <Link
            href="/jobs/create-job"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
                fill="white"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
              </svg>
              Створити
            </div>
          </Link>
          <Link
            href={`jobs/company/edit`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                width="25px"
                height="25px"
                id="company"
              >
                <path
                  fill="white"
                  d="M21.5,21H20V7.5A.49.49,0,0,0,19.66,7L16,5.47V21H15V3.5a.5.5,0,0,0-.5-.5h-9a.5.5,0,0,0-.5.5V21H3.5a.5.5,0,0,0,0,1h18a.5.5,0,0,0,0-1Zm-4-12h1a.5.5,0,0,1,.5.5.51.51,0,0,1-.5.5h-1a.51.51,0,0,1-.5-.5A.5.5,0,0,1,17.5,9Zm0,3h1a.5.5,0,0,1,0,1h-1a.5.5,0,0,1,0-1Zm0,3h1a.51.51,0,0,1,.5.5.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5A.51.51,0,0,1,17.5,15Zm0,3h1a.5.5,0,0,1,0,1h-1a.5.5,0,0,1,0-1ZM11,6h1a.5.5,0,1,1,0,1H11a.5.5,0,0,1,0-1Zm0,3h1a.5.5,0,1,1,0,1H11a.5.5,0,0,1,0-1Zm0,3h1a.5.5,0,1,1,0,1H11a.5.5,0,0,1,0-1Zm0,3h1a.5.5,0,1,1,0,1H11a.5.5,0,0,1,0-1ZM7.94,6H9A.5.5,0,0,1,9,7h-1a.5.5,0,0,1,0-1Zm0,3H9a.5.5,0,0,1,0,1h-1a.5.5,0,0,1,0-1Zm0,3H9a.5.5,0,0,1,0,1h-1a.5.5,0,0,1,0-1Zm0,3H9a.5.5,0,0,1,0,1h-1a.5.5,0,0,1,0-1Zm2.56,6V19h-1v2h-1V18.47A.5.5,0,0,1,9,18h2a.5.5,0,0,1,.5.5V21Z"
                ></path>
              </svg>
              Інформація про вашу компанію
            </div>
          </Link>
        </div>
        <br />
        {dataToShow.map((data) => {
          return (
            <div
              className="mb-8 shadow-2xl p-4 rounded-md border-2 w-[100%] "
              key={data.id}
            >
              <div className="px-2 mb-2">
                <Link href={`/jobs/${data.id}`}>
                  <h2 className="text-teal-500 break-words mb-2">
                    {data.Name}
                  </h2>
                </Link>
                {data.Salary.map((salary) => {
                  return `${salary}$`;
                }).join("-")}
                <br />
                <div className="flex gap-4 text-sm mt-3 font-bold">
                  <div className="bg-gray-200 rounded-md p-2 text-gray-500">
                    {data.Experience}
                  </div>
                  <div className="bg-gray-200 rounded-md p-2  text-orange-500">
                    {data.Type}
                  </div>
                  <div className="bg-gray-200 rounded-md p-2  text-pink-500">
                    {data.City.join(", ")}
                  </div>
                </div>
                <br />
                <div className="break-words">{data.Description}</div>
                <br />
              </div>
              <Link
                href={`/jobs/job-list/${data.id}`}
                className="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black hover:dark:text-white border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Редагувати
              </Link>
              <button
                className="text-gray-900 dark:bg-red-500 border dark:border-gray-300 focus:outline-none dark:hover:bg-white focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-white hover:dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => deleteItem(data.id)}
              >
                Видалити
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
