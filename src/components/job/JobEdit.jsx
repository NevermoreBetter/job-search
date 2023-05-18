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

const cities = ["Миколаїв", "Київ", "Одеса"];

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
  const [open, setOpen] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const nameInputRef = useRef();
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "jobs");
  const existingId = useMemo(() =>
    jobsData.some((data) => data.UserId == currentUser.uid)
  );

  const handleAddCity = (event, value) => {
    setCityName(value);
  };

  const handleAddSalary = (event, newValue) => {
    setSalary(newValue);
  };

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

  const handleClick = () => {
    setOpen(true);
  };

  const dataToShow = jobsData.filter((data) => {
    if (data.id === id) return data;
    console.log(data);
  });

  console.log(dataToShow);

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
    // updId,
    updName,
    updDescription,
    updType,
    updExperience,
    updCity,
    updSalary
  ) => {
    // setID(updId);
    setName(updName);
    setDescription(updDescription);
    setTypeName(updType);
    setExperience(updExperience);
    setCityName(updCity);
    setSalary(updSalary);
  };

  async function handleUpdateJob() {
    try {
      const fieldsToEdit = doc(dbRef, id);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
        Author: userName,
        Type: typeName,
        City: cityName,
        Salary: salary,
        Experience: experience,
        UserId: currentUser.uid,
      });
      handleClick();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getJobs();
  }, [open]);

  useEffect(() => {
    const user = jobsData.find((data) => data.UserId === currentUser.uid);
    if (user) {
      getFields(
        // user.id,
        user.Name,
        user.Description,
        user.Type,
        user.Experience,
        user.City,
        user.Salary
      );
    }
  }, [jobsData]);

  return (
    <div className="create container">
      <Navbar />
      <div className="block mt-[5rem]">
        <div className="w-[100%]">
          <Navbar />
          <div className="mb-4 mt-[5rem]">
            <label htmlFor="jobName" className="mr-4">
              Посада
            </label>
            <input
              className="rounded-md border border-black outline-none p-2"
              id="jobName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobDescription" className="mr-4">
              Опис
            </label>
            {/* <input
          className="rounded-md border border-black outline-none p-2"
          id="jobDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}

            <textarea
              className="rounded-md border border-black outline-none p-2"
              id="jobDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="jobType" className="mr-4">
              Тип зайнятості
            </label>

            <FormControl>
              <Select
                className="min-w-[10rem]"
                id="jobType"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
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
              <Select
                className="min-w-[7rem]"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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

          <button onClick={handleUpdateJob}>Редагувати</button>
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

        {/* <div className="w-[45%]">
          <h2> Так виглядає ваше резюме:</h2>
          {dataToShow.map((data) => {
            return (
              <div>
                <div
                  className="mb-8 shadow-xl p-2 rounded-md border-8 w-[100%] "
                  key={data.id}
                >
                  <h2 className="text-teal-500 break-words mb-2">
                    {data.Name}
                  </h2>

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
                      {new Date(data.Date.seconds * 1000).toLocaleString(
                        "uk-UA"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default JobEdit;
