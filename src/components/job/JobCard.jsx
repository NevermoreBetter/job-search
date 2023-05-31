"use client";

import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useGetCompany from "@/hooks/useFetchCompany";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import { data } from "autoprefixer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cities = ["Миколаїв", "Київ", "Одеса"];

const JobCard = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [typeName, setTypeName] = useState();
  const [cityName, setCityName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const { companyData, isLoading } = useGetCompany();
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "jobs");
  const company = companyData.find((data) => {
    if (data.UserId.includes(currentUser.uid)) return true;
  });
  const companyName = company ? company.Name : null;

  const handleAddCity = (event, value) => {
    setCityName(value);
  };

  const handleAddSalary = (event, newValue) => {
    setSalary(newValue);
  };

  const handleClick = () => {
    setOpen(true);
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

  async function handleAddJob() {
    if (
      name &&
      description &&
      userName &&
      typeName &&
      cityName &&
      salary &&
      experience &&
      companyName &&
      currentUser.photoURL &&
      currentUser.uid
    ) {
      addDoc(dbRef, {
        Name: name,
        Description: description,
        Author: userName,
        Type: typeName,
        City: cityName,
        Salary: salary,
        Experience: experience,
        Company: companyName,
        UserPic: currentUser.photoURL,
        Date: new Date(),
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

  return (
    <div className="create container">
      <div className="mb-4 mt-[5rem]">
        <label
          for="jobName"
          class="block mb-2  font-medium dark:text-gray-900 text-white"
        >
          Посада:
        </label>
        <input
          type="text"
          id="jobName"
          class="dark:bg-gray-50 border dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Назва посади"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </div>
      <div className="mb-4">
        <label
          for="jobDescription"
          class="block mb-2  font-medium dark:text-gray-900 text-white"
        >
          Опис:
        </label>
        <textarea
          id="jobDescription"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          class="block p-2.5 w-full text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Опишіть деталі роботи"
          required
        ></textarea>
      </div>
      <div className="mb-4 flex items-center">
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
      <div className="mb-4 flex items-center">
        <label htmlFor="jobCity" className="mr-4">
          Розташування офісу
        </label>
        <div>
          <Autocomplete
            className="min-w-[7rem]"
            multiple
            id="tags-standard"
            options={cities}
            onChange={handleAddCity}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Місто" />
            )}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="jobSalary" className="mr-4">
          Зарплата
        </label>
        <div id="jobSalary">
          <Slider
            getAriaLabel={() => "Salary range"}
            value={salary}
            max={10000}
            step={100}
            onChange={handleAddSalary}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="jobExperience" className="mr-4">
          Досвід
        </label>

        <FormControl>
          <InputLabel id="demo-simple-select-label2">Вибір</InputLabel>
          <Select
            className="min-w-[7rem]"
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
        onClick={handleAddJob}
        class="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Додати
      </button>

      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Заяву створено"
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

export default JobCard;
