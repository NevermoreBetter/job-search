"use client";
import useAccount from "@/hooks/useAccount";
import WorkerCard from "@/components/job/JobCard";
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
import { MdLocationOn } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { HiOfficeBuilding } from "react-icons/hi";
import Image from "next/image";
import useGetWorkers from "@/hooks/fetchWorkers";

const WorkerDetail = ({ params }) => {
  const { id } = params;
  const { workersData, isLoading } = useGetWorkers();
  const dbRef = collection(db, "workers");
  const fileUpload = useState(null);
  const messageDbRef = collection(db, "workerMessages");
  const workerDetails = workersData.filter((worker) => worker.id == id);
  const postId = workerDetails.map((worker) => worker.UserId);
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const acc = useAccount((state) => state.isWorker);

  async function handleAddMessage(e) {
    e.preventDefault();
    addDoc(messageDbRef, {
      Message: message,
      SenderId: currentUser.uid,
      SenderName: currentUser.displayName,
      RecieverId: workerDetails.map((data) => {
        return data.UserId;
      }),
      Date: new Date(),
    })
      .then(() => {
        alert("message sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="worker-detail container">
      <Navbar />
      <>
        {workerDetails.map((data) => {
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
        {currentUser.uid !== postId[0] && !acc ? (
          <form onSubmit={handleAddMessage}>
            <br />
            <label>
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Send</button>
          </form>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default WorkerDetail;
