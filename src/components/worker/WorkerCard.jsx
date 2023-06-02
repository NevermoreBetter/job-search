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
import { db } from "@/firebase/firebase";
import Navbar from "../Navbar";
import Footer from "../Footer";
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
const type = ["Дистанційно", "В офісі", "Фріланс"];

const WorkerCard = () => {
  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isIdExists, setIsIdExists] = useState(false);
  const [cityName, setCityName] = useState();
  const [typeName, setTypeName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const [open, setOpen] = useState(false);
  const [workersData, setWorkersData] = useState([]);
  const nameInputRef = useRef();
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "workers");
  const existingId = useMemo(() =>
    workersData.some((data) => data.UserId == currentUser.uid)
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
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

  const handleAddCity = (event, value) => {
    setCityName(value);
  };

  const handleAddType = (event) => {
    const {
      target: { value },
    } = event;
    setTypeName(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddSalary = (event, newValue) => {
    setSalary(newValue);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const dataToShow = workersData.filter((data) => {
    if (data.UserId === currentUser.uid) return data;
  });

  console.log(dataToShow);

  async function getWorkers() {
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setWorkersData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getFields = (
    updId,
    updName,
    updDescription,
    updType,
    updExperience,
    updCity,
    updSalary
  ) => {
    setID(updId);
    setName(updName);
    setDescription(updDescription);
    setTypeName(updType);
    setExperience(updExperience);
    setCityName(updCity);
    setSalary(updSalary);
  };

  function handleExistingId() {
    existingId ? setIsIdExists(true) : setIsIdExists(false);
  }

  function updateName(name) {}

  async function handleAddWorker() {
    try {
      await addDoc(dbRef, {
        Name: name,
        Author: userName,
        Description: description,
        Type: typeName,
        City: cityName,
        Salary: salary,
        Experience: experience,
        UserId: currentUser.uid,
        UserPic: currentUser.photoURL,
        Date: new Date(),
      });
      handleClick();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateWorker() {
    try {
      const fieldsToEdit = doc(dbRef, ID);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
        Type: typeName,
        Experience: experience,
        City: cityName,
        Salary: salary,
      });
      handleClick();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWorkers();
  }, [open]);

  useEffect(() => {
    handleExistingId();
    const user = workersData.find((data) => data.UserId === currentUser.uid);
    if (user) {
      getFields(
        user.id,
        user.Name,
        user.Description,
        user.Type,
        user.Experience,
        user.City,
        user.Salary
      );
    }
  }, [workersData]);

  return (
    <div className="create container mb-8">
      <div
        className={
          isIdExists ? "flex mt-[5rem] justify-between" : "block mt-[5rem]"
        }
      >
        <div className={isIdExists ? "w-[45%]" : "w-[100%]"}>
          <div className="mb-4 ">
            <label
              for="workerName"
              class="block mb-2  font-medium dark:text-gray-900 text-white"
            >
              Посада:
            </label>
            <input
              type="text"
              id="workerName"
              class="dark:bg-gray-50 border dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="На яку посаду ви претендуєте"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-4 ">
            <label
              for="jobDescription"
              class="block mb-2  font-medium dark:text-gray-900 text-white"
            >
              Трохи про себе:
            </label>
            <textarea
              id="jobDescription"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              class="block p-2.5 w-full text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Опишіть свої навички"
              required
            ></textarea>
          </div>
          <div className="flex mb-4 items-center ">
            <label htmlFor="workerType" className="mr-4 ">
              Тип зайнятості:
            </label>

            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Тип</InputLabel>
              <Select
                className="min-w-[10rem]"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={typeName}
                onChange={handleAddType}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {type.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="workerCity" className="mr-4 ">
              Місто
            </label>
            <div>
              <Autocomplete
                className="min-w-[10rem]"
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
          <div>
            <label htmlFor="workerSalary">Очікувана зарплата</label>
            <div id="workerSalary">
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
            <label htmlFor="workerExperience" className="mr-4 ">
              Досвід роботи
            </label>

            <FormControl>
              <Select
                className="min-w-[7rem]"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
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
            onClick={isIdExists ? handleUpdateWorker : handleAddWorker}
            className="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {isIdExists ? "Редагувати" : "Додати"}
          </button>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Заяву створено"
              action={action}
            />
          </div>
        </div>
        {isIdExists ? (
          <div className="w-[45%]">
            <h2> Так виглядає ваше резюме:</h2>
            {dataToShow.map((data) => {
              return (
                <div
                  className="mb-8 shadow-2xl p-4 rounded-md border-2 w-[100%] "
                  key={data.id}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-teal-500 break-words mb-2">
                      {data.Name}
                    </h2>

                    <p className="text-sm">
                      {new Date(data.Date.seconds * 1000).toLocaleString(
                        "uk-UA",
                        {
                          day: "numeric",
                          month: "long",
                        }
                      )}
                    </p>
                  </div>
                  {data.Salary.map((salary) => {
                    return `${salary}$`;
                  }).join("-")}
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

//-------------------------------------------=======================TODO: сделать в профиле==========================---------------------------------------------

export default WorkerCard;
