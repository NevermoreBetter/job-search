"use client";
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import Image from "next/image";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Link from "next/link";
import Slider from "@mui/material/Slider";
import useGetWorkers from "@/hooks/fetchWorkers";
import { data } from "autoprefixer";

const cities = [
  "Всі",
  "Вінниця",
  "Дніпро",
  "Донецьк",
  "Житомир",
  "Запоріжжя",
  "Івано-Франківськ",
  "Київ",
  "Кропивницький",
  "Луганськ",
  "Луцьк",
  "Львів",
  "Миколаїв",
  "Одеса",
  "Полтава",
  "Рівне",
  "Суми",
  "Тернопіль",
  "Ужгород",
  "Харків",
  "Херсон",
  "Хмельницький",
  "Черкаси",
  "Чернівці",
  "Чернігів",
];

const jobSpecializations = [
  "Всі",
  "IT",
  "Маркетинг",
  "Фінанси",
  "Банківська справа",
  "Адміністрування",
  "HR",
  "Медицина",
  "Освіта",
  "Транспорт",
  "Спорт",
  "Культура",
  "Туризм",
  "Готельно-ресторанний бізнес",
  "Юриспруденція",
  "Будівництво",
  "Архітектура",
  "Дизайн",
  "Реклама",
  "PR",
  "Журналістика",
  "Сільське господарство",
  "Логістика",
  "Енергетика",
  "Виробництво",
  "Продажі",
  "Нерухомість",
  "Страхування",
  "Телекомунікації",
  "Автомобільна справа",
  "Хімічна промисловість",
  "Металургія",
  "Машинобудування",
  "Електроніка",
  "Технічні науки",
  "Науки про землю",
];

jobSpecializations.sort();

const WorkerPosts = () => {
  const { workersData, isLoading } = useGetWorkers();
  const [cityFilter, setCityFilter] = useState("Всі");
  const [typeFilter, setTypeFilter] = useState("Всі");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Всі");
  const [salaryFilter, setSalaryFilter] = useState([100, 10000]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isSticky, setIsSticky] = useState(false);

  const handleChangeSalary = (event, newValue) => {
    setSalaryFilter(newValue);
  };
  const dataToShow = workersData
    .filter((data) => {
      if (cityFilter === "Всі") return true;
      return data.City.includes(cityFilter);
    })
    .filter((data) => {
      if (salaryFilter[0] === 0 && salaryFilter[1] === 0) return true;
      return data.Salary >= salaryFilter[0] && data.Salary <= salaryFilter[1];
    })
    .filter((data) => {
      if (categoryFilter === "Всі") return true;
      return data.Category.includes(categoryFilter);
    })
    .filter((data) => {
      if (typeFilter === "Всі") return true;
      return data.Type.includes(typeFilter);
    })
    .filter((data) => {
      if (searchTerm === "") return true;
      const regex = new RegExp(searchTerm, "i");
      return regex.test(data.Name) || regex.test(data.Description);
    });

  dataToShow.sort((a, b) => {
    return new Date(b.Date.seconds) - new Date(a.Date.seconds);
  });

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container flex justify-start mt-[5rem] mb-[5rem] relative z-auto">
      <div className="w-1/6 flex flex-col justify-start gap-8 mr-[10%]">
        <div className="gap-2">
          <label
            for="countries"
            class="block mb-2 text-lg font-medium dark:text-gray-900 text-white"
          >
            Виберіть місто
          </label>
          <select
            id="countries"
            onChange={(e) => setCityFilter(e.target.value)}
            class="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {cities.map((c) => {
              return <option>{c}</option>;
            })}
          </select>
        </div>
        <div className="gap-2">
          <label
            for="countries"
            class="block mb-2 text-lg font-medium dark:text-gray-900 text-white"
          >
            Виберіть тип
          </label>
          <select
            id="countries"
            onChange={(e) => setTypeFilter(e.target.value)}
            class="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Всі">Всі</option>
            <option value="В офісі">В офісі</option>
            <option value="Фріланс">Фріланс</option>
            <option value="Дистанційно">Дистанційно</option>
          </select>
        </div>
        <div className="gap-2">
          <label
            htmlFor="jobSalary"
            className="block mb-2 text-lg font-medium dark:text-gray-900 text-white"
          >
            Зарплата
          </label>
          <div id="jobSalary">
            <Slider
              getAriaLabel={() => "Зарплата"}
              value={salaryFilter}
              max={10000}
              step={100}
              onChange={handleChangeSalary}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-medium dark:text-gray-900 text-white"
          >
            Категорія
          </label>
          <div className="flex flex-wrap">
            {jobSpecializations.map((job) => {
              return (
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    setCategoryFilter(e.target.textContent);
                  }}
                  className={` text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 w-fit cursor-pointer mb-2 ${
                    job == categoryFilter
                      ? "dark:bg-black dark:text-white"
                      : "dark:bg-gray-300 dark:text-gray-800"
                  }`}
                >
                  {job}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-[60%] flex-1 flex flex-col items-center">
        <form
          class={`flex items-center  transition-Всі duration-500 ease-in-out ${
            isSticky ? "sticky top-0 bg-white w-[150%]" : "bg-white w-full"
          }`}
        >
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
          </div>
        </form>
        {/* <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div> */}
        <h2 className="mb-4 mt-3">
          Відображаються {dataToShow.length} резюме:
        </h2>
        {dataToShow.map((data) => {
          return (
            <div
              className="mb-8 shadow-2xl p-4 rounded-md border-2 w-[100%] "
              key={data.id}
            >
              <div className="flex items-center justify-between">
                <Link href={`/worker/${data.id}`}>
                  <h2 className="text-teal-500 break-words mb-2">
                    {data.Name}
                  </h2>
                </Link>
                <p className="text-sm">
                  {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              ${data.Salary}
              <br />
              <div className="flex gap-4 text-sm mt-3 font-bold">
                <div className="bg-gray-200 rounded-md p-2 text-gray-500">
                  {data.Experience}
                </div>
                <div className="bg-gray-200 rounded-md p-2  text-orange-500">
                  {data.Type.join(", ")}
                </div>
                <div className="bg-gray-200 rounded-md p-2  text-pink-500">
                  {data.City.join(", ")}
                </div>
              </div>
              <br />
              <div className="break-words">{data.Description}</div>
              <br />
              <div className="flex gap-2 items-center">
                <Image
                  className="rounded-full"
                  src={data.UserPic}
                  width={50}
                  height={50}
                  alt="profile picture"
                />
                <br />
                <p className="text-gray-400">{data.Author}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerPosts;
