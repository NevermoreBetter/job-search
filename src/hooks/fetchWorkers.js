import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function useGetWorkers() {
  const [workersData, setWorkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchWorkers() {
    const dbRef = collection(db, "workers");
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWorkersData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkers();
  }, []);

  return { workersData, isLoading };
}

export default useGetWorkers;
