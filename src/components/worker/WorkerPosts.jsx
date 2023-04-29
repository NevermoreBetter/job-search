import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
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

  console.log(currentUser);
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
    <div className="flex justify-start mt-[7rem]">
      <div className="flex flex-col justify-start pt-8 gap-8 mr-[15%]">
        <div className="flex  gap-2">
          <h3>City:</h3>
          <select onChange={(e) => setCityFilter(e.target.value)}>
            <option value="all">Всі</option>
            <option value="Київ">Київ</option>
            <option value="Миколаїв">Миколаїв</option>
            <option value="Одеса">Одеса</option>
          </select>
        </div>
        <div className="flex gap-2">
          <h3>Type:</h3>
          <select onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">Всі</option>
            <option value="В офісі">В офісі</option>
            <option value="Фріланс">Фріланс</option>
            <option value="Дистанційно">Дистанційно</option>
          </select>
        </div>
      </div>
      <div className="max-w-[60%] flex-1">
        <h2 className="mb-4">Відображаються {dataToShow.length} резюме:</h2>
        {dataToShow.map((data) => {
          return (
            <div
              className="mb-8 shadow-xl p-2 rounded-md border-8 w-[100%] "
              key={data.id}
            >
              <Link href={`/worker/${data.id}`}>
                <h2 className="text-teal-500 break-words mb-2">{data.Name}</h2>
              </Link>
              {data.Salary.map((salary) => {
                return `${salary}$`;
              }).join("-")}
              <br />
              <div className="flex gap-4 text-sm">
                <div> {data.Experience}</div>
                <div>{data.Type.join(", ")}</div>
                <div>{data.City.join(", ")}</div>
              </div>
              <br />
              <div className="break-words">{data.Description}</div>
              <br />
              <div className="flex gap-2">
                <Image
                  className="rounded-full"
                  src={data.UserPic}
                  width={50}
                  height={50}
                  alt="profile picture"
                />
                <br />
                <div>
                  {data.Author}
                  <br />
                  {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerPosts;
