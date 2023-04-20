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

const WorkerPosts = () => {
  const [workersData, setWorkersData] = useState([]);
  const [cityFilter, setCityFilter] = useState("all"); // initial city filter value is "all"
  const [typeFilter, setTypeFilter] = useState("all"); // initial type filter value is "all"
  const dbRef = collection(db, "workers");
  const [idData, setIdData] = useState(0);
  const { currentUser } = useAuth();
  //---------------------========================TODO: Пагинация здесь========================================---------------------------

  const dataToShow = workersData
    .filter((data) => {
      if (cityFilter === "all") return true;
      return data.City.includes(cityFilter);
    })
    .filter((data) => {
      if (typeFilter === "all") return true;
      return data.Type.includes(typeFilter);
    });

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
    <div className="container">
      <div className="flex gap-8 mb-8">
        <div className="flex gap-2">
          <h3>City:</h3>
          <select onChange={(e) => setCityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="Київ">Київ</option>
            <option value="Миколаїв">Миколаїв</option>
            <option value="Одеса">Одеса</option>
          </select>
        </div>
        <div className="flex gap-2">
          <h3>Type:</h3>
          <select onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="On site">On site</option>
            <option value="Part time">Part time</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>
      <div>
        <h2 className="mb-4">
          There {dataToShow.length <= 1 ? "is" : "are"} {dataToShow.length}{" "}
          {dataToShow.length <= 1 ? "resume" : "resumes"}
        </h2>
        {dataToShow.map((data) => {
          return (
            <div className="mb-8">
              <Link href={`/worker/${data.id}`}>{data.Name}</Link>
              {data.Salary.map((salary) => {
                return `${salary}$`;
              }).join("-")}
              <br />
              {data.Author}
              <br />
              {data.City.join(", ")}
              <br />
              {data.Experience}
              <br />
              {data.Type}
              <br />
              {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerPosts;
