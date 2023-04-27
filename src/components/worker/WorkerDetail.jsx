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

const WorkerDetail = ({ params }) => {
  const { id } = params;
  const [workersData, setWorkersData] = useState([]);

  const dbRef = collection(db, "workers");
  const messageDbRef = collection(db, "messages");
  const workerDetails = workersData.filter((worker) => worker.id == id);
  const [workerId, setWorkerId] = useState("");
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  async function handleAddMessage() {
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
  async function getWorkers() {
    await getDocs(dbRef).then((response) => {
      setWorkersData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  }

  useEffect(() => {
    getWorkers();
  }, []);
  return (
    <div className="worker-detail container">
      <Navbar />
      <>
        {workerDetails.map((data) => {
          return (
            <div className="mb-8" key={data.id}>
              {data.Author}
              {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
              <br />
              <h3 className="detail-name">{data.Name}</h3>
              <br />
              {data.Salary.map((salary) => {
                return `${salary}$`;
              }).join("-")}
              <br />
              {data.City}
              <br />
              {data.Experience}
              <br />
              {data.Type}
              <br />
              {data.id}
            </div>
          );
        })}
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
      </>
    </div>
  );
};

export default WorkerDetail;
