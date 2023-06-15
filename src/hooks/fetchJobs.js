import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function useGetJobs() {
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchJobs() {
    const dbRef = collection(db, "jobs");
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobsData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    await fetchJobs();
  };

  return { jobsData, isLoading, refetch };
}

export default useGetJobs;
