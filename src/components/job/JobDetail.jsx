"use client";
import { nanoid } from "nanoid";
import jobCard from "@/components/job/JobCard";
import { AuthProvider } from "@/context/AuthContext";
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
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { HiOfficeBuilding } from "react-icons/hi";
import { BsFillFilePersonFill } from "react-icons/bs";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useGetJobs from "@/hooks/fetchJobs";
import useGetWorkers from "@/hooks/fetchWorkers";
const JobDetail = ({ params }) => {
  const { id } = params;
  const { jobsData } = useGetJobs();
  const { workersData } = useGetWorkers();
  const { currentUser } = useAuth();
  const [fileUpload, setFileUpload] = useState(null);
  const messageDbRef = collection(db, "jobMessages");
  const jobDetails = jobsData.filter((job) => job.id == id);
  const workerId = workersData.filter(
    (worker) => worker.UserId == currentUser.uid
  );
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  console.log(jobDetails);

  async function handleAddMessage() {
    addDoc(messageDbRef, {
      Message: message,
      SenderId: currentUser.uid,
      SenderLink: workerId.map((worker) => {
        return worker.id;
      }),
      SenderName: currentUser.displayName,
      RecieverId: jobDetails.map((data) => {
        return data.UserId;
      }),
      Resume: resume,
      Date: new Date(),
    })
      .then(() => {
        alert("message sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const uploadFile = async () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `${fileUpload.name + nanoid()}`);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        return getDownloadURL(fileRef);
      })
      .then((fileUrl) => {
        setResume(fileUrl);
        alert("resume sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (resume !== null) {
      handleAddMessage();
    }
  }, [resume]);

  return (
    <div className="job-detail container">
      <>
        {jobDetails.map((data) => {
          return (
            <div className="mb-8 flex justify-between mt-[5rem]" key={data.id}>
              <div className="w-[75%]">
                <h3 className="detail-name break-words">{data.Name}</h3>
                <br />
                <div className="mb-4">${data.Salary}/місяць</div>
                <br />
                <div
                  style={{ whiteSpace: "pre-line" }}
                  className="break-words"
                  dangerouslySetInnerHTML={{ __html: data.Description }}
                ></div>
                <br />
                <div className="flex justify-between items-center text-base text-gray-600">
                  <div className="flex gap-4 items-center">
                    <Image
                      className="rounded-full"
                      src={data.UserPic}
                      width={50}
                      height={50}
                      alt="profile picture"
                    />
                    {data.Author}
                  </div>
                  <div>
                    Дата публікації:{" "}
                    {new Date(data.Date.seconds * 1000).toLocaleString(
                      "uk-UA",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    )}
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    uploadFile();
                  }}
                >
                  <br />
                  <label
                    for="message"
                    class="block mb-2 dark:text-gray-900 text-white"
                  >
                    Відгукнутися на вакансію:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Розкажіть, що вас цікавить у цій вакансії"
                    required
                  />

                  <br />
                  <div className="flex items-center gap-10 mb-4 w-full">
                    <p className="mb-4">Ваше резюме: </p>
                    <label
                      for="dropzone-file"
                      className="flex flex-col  items-center justify-center w-1/2 h-40 border-2 dark:border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-50 hover:bg-bray-800 bg-gray-700 dark:hover:bg-gray-100 border-gray-600 dark:hover:border-gray-500 hover:bg-gray-600"
                    >
                      <div className="">
                        {fileUpload == null ? (
                          <div className="flex  flex-col items-center">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                              <span className="font-semibold">
                                Натисніть, щоб завантажити
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ваше резюме.
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <BsFillFilePersonFill />
                            {fileUpload.name}
                          </div>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        onChange={(e) => {
                          setFileUpload(e.target.files[0]);
                        }}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Відгукнутися
                  </button>
                </form>
              </div>
              <div className="border-4 p-2 rounded-md w-[20%] h-fit">
                <div className="flex items-center">
                  <MdLocationOn />
                  {data.City.join(", ")}
                </div>

                <div className="flex items-center">
                  <GiAchievement />
                  {data.Experience}
                </div>
                <div className="flex items-center">
                  <HiOfficeBuilding />
                  {data.Type}
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default JobDetail;
