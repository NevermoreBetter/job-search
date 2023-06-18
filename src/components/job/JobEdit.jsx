"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  setDoc,
  deleteField,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "@/firebase/firebase";
import useGetCompany from "@/hooks/useFetchCompany";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const cities = [
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

const JobEdit = ({ params }) => {
  const { id } = params;
  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isIdExists, setIsIdExists] = useState(false);
  const [cityName, setCityName] = useState();
  const [typeName, setTypeName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const nameInputRef = useRef();

  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "jobs");
  const { companyData, isLoading } = useGetCompany();
  const company = companyData.find((data) => {
    if (data.UserId.includes(currentUser.uid)) return true;
  });
  const companyName = company ? company.Name : null;
  console.log(companyName);
  const handleAddCity = (event, value) => {
    setCityName(value);
  };

  const handleAddSalary = (event, newValue) => {
    setSalary(newValue);
  };

  const handleAddCategory = (event, value) => {
    setCategory(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleClick = () => {
    setOpen(true);
  };

  const dataToShow = jobsData.filter((data) => {
    if (data.id === id) return data;
    console.log(data);
  });

  console.log(name);

  async function getJobs() {
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJobsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getFields = (
    updName,
    updDescription,
    updType,
    updExperience,
    updCity,
    updSalary,
    updCategory
  ) => {
    setName(updName);
    setDescription(updDescription);
    setTypeName(updType);
    setExperience(updExperience);
    setCityName(updCity);
    setSalary(updSalary);
    setCategory(updCategory);
  };

  async function handleUpdateJob() {
    if (
      name &&
      description &&
      userName &&
      typeName &&
      cityName &&
      salary &&
      category &&
      experience &&
      companyName
    ) {
      const fieldsToEdit = doc(dbRef, id);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
        Author: userName,
        Type: typeName,
        City: cityName,
        Salary: salary,
        Company: companyName,
        Experience: experience,
        UserId: currentUser.uid,
      })
        .then(() => {
          handleClick();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpenError(true);
    }
  }

  useEffect(() => {
    getJobs();
  }, [open]);

  useEffect(() => {
    const user = jobsData.find(
      (data) => data.UserId === currentUser.uid && data.id === id
    );
    if (user) {
      getFields(
        user.Name,
        user.Description,
        user.Type,
        user.Experience,
        user.City,
        user.Salary,
        user.Category
      );
    }
  }, [jobsData]);

  return (
    <div className="create container ">
      <div className="w-2/3">
        <div className="mb-4 mt-[5rem] flex justify-between">
          <label
            for="jobName"
            class="block mb-2  font-medium dark:text-gray-900 text-white"
          >
            Хто вам потрібен:
          </label>
          <input
            type="text"
            id="jobName"
            class="dark:bg-gray-50 border dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"
            placeholder="Назва посади"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="mb-4 flex justify-between">
          <label
            for="website-admin"
            class="block mb-2  font-medium dark:text-gray-900 text-white"
          >
            Зарплата:
          </label>
          <div class="flex w-1/2">
            <span class="inline-flex items-center px-3 text-sm dark:text-gray-900 dark:bg-gray-200 border border-r-0 dark:border-gray-300 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
              $
            </span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              id="website-admin"
              class="rounded-none rounded-r-lg dark:bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm dark:border-gray-300 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Зарплатня"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <label
            for="jobDescription"
            class="block mb-2  font-medium dark:text-gray-900 text-white"
          >
            Опис вакансії:
          </label>
          <textarea
            id="jobDescription"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="block p-2.5 w-1/2 text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Опишіть деталі роботи"
            required
          ></textarea>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="jobType" className="mr-4">
            Тип зайнятості
          </label>

          <FormControl>
            <InputLabel id="demo-simple-select-label1">Вибір</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              className="min-w-[10rem]"
              id="jobType"
              value={typeName}
              label="Вибір"
              onChange={(e) => setTypeName(e.target.value)}
            >
              <MenuItem value="Дистанційно">Дистанційно</MenuItem>
              <MenuItem value="В офісі">В офісі</MenuItem>
              <MenuItem value="На розгляд кандидата">
                На розгляд кандидата
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="jobCity" className="mr-4">
            Розташування офісу
          </label>
          <div>
            <Autocomplete
              className="min-w-[10rem]"
              multiple
              id="jobCity"
              options={cities}
              onChange={handleAddCity}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Місто" />
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="category" className="mr-4">
            Категорія роботи
          </label>
          <div>
            <Autocomplete
              disablePortal
              className="min-w-[10rem]"
              id="category"
              options={jobSpecializations}
              onChange={handleAddCategory}
              renderInput={(params) => (
                <TextField {...params} label="Категорія" />
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="jobExperience" className="mr-4">
            Мінімальний досвід:
          </label>

          <FormControl>
            <InputLabel id="demo-simple-select-label2">Вибір</InputLabel>
            <Select
              className="min-w-[10rem]"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              labelId="demo-simple-select-label2"
              label="Вибір"
            >
              <MenuItem value="Без досвіду">Без досвіду</MenuItem>
              <MenuItem value="1 рік">1 рік</MenuItem>
              <MenuItem value="2 роки">2 роки</MenuItem>
              <MenuItem value="3 роки">3 роки</MenuItem>
              <MenuItem value="5 років">5 років</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button
          type="button"
          onClick={handleUpdateJob}
          class="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Редагувати
        </button>
      </div>

      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Вакансію редаговано"
          action={action}
        />
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Заповніть всі поля"
          action={action}
        />
      </div>
    </div>
  );
};

export default JobEdit;
