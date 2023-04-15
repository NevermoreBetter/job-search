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

const WorkerDetailPage = ({ params }) => {
  const { id } = params;
  const [workersData, setWorkersData] = useState([]);
  const dbRef = collection(db, "workers");
  const workerDetails = workersData.filter((worker) => worker.id == id);
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
  console.log(workerDetails);
  return (
    <>
      {workerDetails.map((data) => {
        return (
          <div className="mb-8">
            {data.Author}
            <br />
            {data.Salary}
            <br />
            {data.id}
          </div>
        );
      })}
    </>
  );
};

export default WorkerDetailPage;
