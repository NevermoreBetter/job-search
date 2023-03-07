"use client";

import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  setDoc,
  deleteField,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useFetchJobs from "@/hooks/fetchJobs";
import Navbar from "./Navbar";
import Footer from "./Footer";

const JobCard = () => {
  const [name, setName] = useState();

  const dbRef = collection(db, "jobs");

  async function handleAddJob() {
    addDoc(dbRef, {
      name: name,
    })
      .then(() => {
        alert("data sent");
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="create container">
      <Navbar />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddJob}>ADD</button>
      <Footer />
    </div>
  );
};

export default JobCard;
