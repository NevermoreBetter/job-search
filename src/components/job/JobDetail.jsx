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
const JobDetail = ({ params }) => {
  const { id } = params;
  const [jobData, setJobData] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const dbRef = collection(db, "jobs");
  const messageDbRef = collection(db, "jobMessages");
  const jobDetails = jobData.filter((job) => job.id == id);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  async function handleAddMessage() {
    alert(resume);
    addDoc(messageDbRef, {
      Message: message,
      SenderId: currentUser.uid,
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

  useEffect(() => {
    if (resume !== null) {
      handleAddMessage();
    }
  }, [resume]);

  const uploadFile = async () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `${fileUpload.name + nanoid()}`);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        alert("resume sent");
        return getDownloadURL(fileRef);
      })
      .then((fileUrl) => {
        setResume(fileUrl);
        alert(resume);
        alert("file get");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function getJobs() {
    await getDocs(dbRef).then((response) => {
      setJobData(
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
    <div className="job-detail container">
      <>
        {jobDetails.map((data) => {
          return (
            <div className="mb-8 flex justify-between mt-[5rem]" key={data.id}>
              <div className="w-[75%]">
                <h3 className="detail-name break-words">{data.Name}</h3>
                <br />
                <div className="mb-4">
                  {data.Salary.map((salary) => {
                    return `${salary}$`;
                  }).join("-")}
                </div>
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
                <br />
                <div
                  style={{ whiteSpace: "pre-line" }}
                  className="break-words"
                  dangerouslySetInnerHTML={{ __html: data.Description }}
                ></div>
                <br />
                <div>
                  Дата публікації{" "}
                  {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
                </div>
              </div>
              <div className="border-4 p-2 rounded-md w-[20%] h-fit">
                <div className="flex items-center">
                  <MdLocationOn />
                  {data.City}
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadFile();
          }}
        >
          <br />
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <br />
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 dark:border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-50 hover:bg-bray-800 bg-gray-700 dark:hover:bg-gray-100 border-gray-600 dark:hover:border-gray-500 hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {fileUpload == null ? (
                  <div>
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
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
          <button type="submit">Send</button>
        </form>
      </>
    </div>
  );
};

export default JobDetail;
