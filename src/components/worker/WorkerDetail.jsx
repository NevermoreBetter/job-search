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
      SenderPic: currentUser.photoURL,
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
      <>
        {workerDetails.map((data) => {
          return (
            <div className="mb-8 flex justify-between mt-[5rem]" key={data.id}>
              <div className="w-[75%]">
                <h3 className="detail-name break-words">{data.Name}</h3>
                <br />
                <div className="mb-4">${data.Salary}/ місяць</div>

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
                      width={35}
                      height={35}
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
                {currentUser.uid !== postId[0] && !acc ? (
                  <form onSubmit={handleAddMessage}>
                    <br />
                    <label
                      for="message"
                      class="block mb-2 dark:text-gray-900 text-white"
                    >
                      Запропонувати вакансію:
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Опишіть пропозицію детальніше"
                      required
                    />

                    <br />
                    <button
                      type="submit"
                      className="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Запропонувати
                    </button>
                  </form>
                ) : (
                  ""
                )}
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
                  {data.Type.join(", ")}
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default WorkerDetail;
