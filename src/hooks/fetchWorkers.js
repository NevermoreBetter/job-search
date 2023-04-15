import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";

export default function useFetchWorkers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workers, setWorkers] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchWorkersData() {
      try {
        const docRef = doc(db, "workers", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorkers(docSnap.data());
          console.log(docSnap.data());
        } else {
          setWorkers({});
        }
      } catch (error) {
        setError("failed to fetch workers");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkersData();
  }, []);

  return { loading, error, workers, setWorkers };
}
