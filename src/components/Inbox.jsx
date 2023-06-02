"use client";
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
import useAccount from "@/hooks/useAccount";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
const Inbox = () => {
  const acc = useAccount((state) => state.isWorker);
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const dbRef = collection(db, acc ? "workerMessages" : "jobMessages");
  async function getMessages() {
    await getDocs(dbRef).then((response) => {
      setMessages(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  }

  console.log(messages);

  useEffect(() => {
    getMessages();
  }, [acc]);

  const messageToShow = messages.filter((message) => {
    return message.RecieverId.includes(currentUser.uid);
  });
  console.log(messageToShow);
  return (
    <div className="inbox container mb-8">
      {messageToShow.map((message) => {
        return (
          <div
            className="mb-8 shadow-2xl p-4 rounded-md border-2 w-[100%] "
            key={message.id}
          >
            <div className="flex gap-2 items-center">
              <h3>Від: </h3>
              <Link href={`worker/${message.SenderLink[0]}`}>
                <div className="bg-gray-200 rounded-md p-2  text-pink-500">
                  {message.SenderName}
                </div>
              </Link>
            </div>

            <br />
            <div className=" gap-2">
              <h3>Повідомлення: </h3>
              {message.Message}
            </div>
            <br />
            <div>
              <a
                href={message.Resume}
                className="bg-gray-200 rounded-md p-2 text-orange-500"
              >
                Відкрити резюме
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
