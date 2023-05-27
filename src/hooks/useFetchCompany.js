import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function useGetCompany() {
  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCompany() {
    const dbRef = collection(db, "company");
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompanyData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, []);

  return { companyData, isLoading };
}

export default useGetCompany;
