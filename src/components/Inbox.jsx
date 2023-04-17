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
import { db } from "@/firebase/firebase";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
const Inbox = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const dbRef = collection(db, "messages");
  async function getMessages() {
    await getDocs(dbRef).then((response) => {
      setMessages(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

  const messageToShow = messages.filter((message) => {
    return message.RecieverId.includes(currentUser.uid);
  });
  console.log(messageToShow);
  return (
    <div className="inbox container">
      <Navbar />
      {messageToShow.map((message) => {
        return (
          <>
            <div className="flex gap-2">
              <h3>Від: </h3>
              {message.SenderName}
            </div>

            <br />
            <div className="flex gap-2">
              <h3>Повідомлення: </h3>
              {message.Message}
            </div>
          </>
        );
      })}
      <Footer />
    </div>
  );
};

export default Inbox;
