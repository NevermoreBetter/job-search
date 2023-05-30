"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Link from "next/link";
import useGetWorkers from "@/hooks/fetchWorkers";

const WorkerPosts = () => {
  const { workersData, isLoading } = useGetWorkers();
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  // const dbRef = collection(db, "workers");
  // const [idData, setIdData] = useState(0);
  // const { currentUser } = useAuth();
  //---------------------========================TODO: Пагинация здесь========================================---------------------------

  const dataToShow = workersData
    .filter((data) => {
      if (cityFilter === "all") return true;
      return data.City.includes(cityFilter);
    })
    .filter((data) => {
      if (typeFilter === "all") return true;
      return data.Type.includes(typeFilter);
    })
    .filter((data) => {
      if (searchTerm === "") return true;
      const regex = new RegExp(searchTerm, "i");
      return regex.test(data.Name) || regex.test(data.Description);
    });

  dataToShow.reverse();

  return (
    <div className="flex justify-start mt-[5rem]">
      <div className="flex flex-col justify-start pt-8 gap-8 mr-[15%]">
        <div className="flex  gap-2 justify-between">
          <h3>City:</h3>
          <select onChange={(e) => setCityFilter(e.target.value)}>
            <option value="all">Всі</option>
            <option value="Київ">Київ</option>
            <option value="Миколаїв">Миколаїв</option>
            <option value="Одеса">Одеса</option>
          </select>
        </div>
        <div className="flex gap-2 justify-between">
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
        {/* <form class="flex items-center ">
          <label for="voice-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              class="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 dark:placeholder-gray-700 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Пошук"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                aria-hidden="true"
                class="w-4 h-4 dark:text-gray-500 text-gray-400 dark:hover:text-gray-900 hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </form> */}
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
        <h2 className="mb-4 mt-3">
          Відображаються {dataToShow.length} резюме:
        </h2>
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
