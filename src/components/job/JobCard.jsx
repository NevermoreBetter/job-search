"use client";

import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "../Navbar";
import Footer from "../Footer";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";

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
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [distance, setDistance] = useState();
  const [cityName, setCityName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "jobs");

  const handleAddCity = (event) => {
    const {
      target: { value },
    } = event;
    setCityName(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddSalary = (event, newValue) => {
    setSalary(newValue);
  };

  async function handleAddJob() {
    addDoc(dbRef, {
      Name: name,
      Description: description,
      Author: userName,
      Distance: distance,
      City: cityName,
      Salary: salary,
      Experience: experience,
      Date: new Date(),
    })
      .then(() => {
        alert("data sent");
        setName("");
        setDescription("");
        setDistance("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="create container">
      <Navbar />
      <div className="mb-4">
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
        <input
          className="rounded-md border border-black outline-none p-2"
          id="jobDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="jobType" className="mr-4">
          Тип зайнятості
        </label>

        <FormControl>
          <Select
            className="min-w-[10rem]"
            id="jobType"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="Remote">Дистанційно</MenuItem>
            <MenuItem value="On site">В офісі</MenuItem>
            <MenuItem value="Candidtae select">На розгляд кандидата</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="jobCity" className="mr-4">
          Розташування офісу
        </label>
        <div>
          <FormControl>
            <InputLabel id="demo-multiple-chip-label-1">Місто</InputLabel>
            <Select
              className="min-w-[10rem]"
              labelId="demo-multiple-chip-label-1"
              id="demo-multiple-chip"
              multiple
              value={cityName}
              onChange={handleAddCity}
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
              {cities.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            value={distance}
            onChange={(e) => setExperience(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="No experience">Без досвіду</MenuItem>
            <MenuItem value="1 year">1 рік</MenuItem>
            <MenuItem value="2 years">2 рік</MenuItem>
            <MenuItem value="3 years">3 рік</MenuItem>
            <MenuItem value="5 years">5 рік</MenuItem>
          </Select>
        </FormControl>
      </div>
      <button onClick={handleAddJob}>Додати</button>
      <Footer />
    </div>
  );
};

export default JobCard;
