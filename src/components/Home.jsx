"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Link from "next/link";
import Image from "next/image";

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
  const [searchCat, setSearchCat] = useState("");
  return (
    <div className="home container flex items-center mt-[5rem]">
      <div>
        <h1 className="mt-[5rem] mb-10 text-8xl inline-block w-[70%]">
          На крок ближче до нової роботи
        </h1>
        <p className=" mb-5 text-gray-600 w-[80%] leading-8">
          Досліджуйте тисячі можливостей роботи з усією необхідною інформацією.
          Керуйте всіма заявками на роботу від початку до кінця.
        </p>
        <form className="flex items-center mb-5 transition-all duration-500 ease-in-out bg-white w-[80%]">
          <label for="voice-search" class="sr-only">
            Професія яка вас цікавить
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
          </div>
          <Link
            href={`/jobs${searchTerm ? `?search=${searchTerm}` : ``}`}
            passHref
          >
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Пошук
            </button>
          </Link>
        </form>
        <ul className="flex gap-4">
          <p>Популярні категорії:</p>
          <Link href={`/jobs?category=${searchCat}`} passHref>
            <li
              className="underline"
              onMouseEnter={(e) => setSearchCat(e.target.textContent)}
            >
              IT
            </li>
          </Link>
          <Link href={`/jobs?category=${searchCat}`} passHref>
            <li
              className="underline"
              onMouseEnter={(e) => setSearchCat(e.target.textContent)}
            >
              Маркетинг
            </li>
          </Link>
          <Link href={`/jobs?category=${searchCat}`} passHref>
            <li
              className="underline"
              onMouseEnter={(e) => setSearchCat(e.target.textContent)}
            >
              Дизайн
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <Image
          src="/Hotpot.png"
          width="700"
          height="700"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Home;
