import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";

export default function useFetchJobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchJobsData() {
      try {
        const docRef = doc(db, "jobs", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobs(docSnap.data());
          console.log(docSnap.data());
        } else {
          setJobs({});
        }
      } catch (error) {
        setError("failed to fetch jobs");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobsData();
  }, []);

  return { loading, error, jobs, setJobs };
}
