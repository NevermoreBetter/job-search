"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Link from "next/link";

const Home = () => {
  const { currentUser } = useAuth();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  // console.log(currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="home container">
      <div>
        <h1 className="mt-[5rem]">На крок ближче до нової роботи</h1>
        <p>
          Досліджуйте тисячі можливостей роботи з усією необхідною інформацією.
          Керуйте всіма заявками на роботу від початку до кінця.
        </p>
        <form className="flex items-center  transition-all duration-500 ease-in-out bg-white w-full">
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
              class=" dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 dark:placeholder-gray-700 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Пошук"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />

            {browserSupportsSpeechRecognition ? (
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
            ) : (
              ""
            )}
            <Link
              href={`/jobs${searchTerm ? `?search=${searchTerm}` : ``}`}
              passHref
            >
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            </Link>
          </div>
        </form>
        <ul>
          Популярні категорії:
          <li>Front-end Dev</li>
          <li>Back-end Dev</li>
          <li>UX Designer</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
