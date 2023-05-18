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
      <Navbar />
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
          <label>
            Upload file:
            <input
              type="file"
              onChange={(e) => {
                setFileUpload(e.target.files[0]);
              }}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </>
    </div>
  );
};

export default JobDetail;
