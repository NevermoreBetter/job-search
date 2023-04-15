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
const type = ["Remote", "On site", "Part time"];

const WorkerCard = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [distance, setDistance] = useState();
  const [cityName, setCityName] = useState([]);
  const [typeName, setTypeName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "workers");

  const handleAddCity = (event) => {
    const {
      target: { value },
    } = event;
    setCityName(typeof value === "string" ? value.split(",") : value);
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

  async function handleAddWorker() {
    addDoc(dbRef, {
      Name: name,
      Author: userName,
      Type: typeName,
      City: cityName,
      Salary: salary,
      Experience: experience,
      UserId: currentUser.uid,
      Date: new Date(),
    })
      .then(() => {
        alert("data sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="create container">
      <Navbar />
      <div>
        <label htmlFor="workerName">Посада</label>
        <input
          id="workerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="workerDescription">Досягнення</label>
        <input
          id="workerDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="workerType">Тип зайнятості</label>

        <FormControl>
          <Select
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
      <div>
        <label htmlFor="workerCity">Місто</label>
        <div>
          <FormControl>
            <Select
              labelId="demo-multiple-chip-label"
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
      <div>
        <label htmlFor="workerExperience">Досвід роботи</label>

        <FormControl>
          <Select
            value={distance}
            onChange={(e) => setExperience(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="No experience">No experience</MenuItem>
            <MenuItem value="1 year">1 year</MenuItem>
            <MenuItem value="2 years">2 years</MenuItem>
            <MenuItem value="3 years">3 years</MenuItem>
            <MenuItem value="5 years">5 years</MenuItem>
          </Select>
        </FormControl>
      </div>
      <button onClick={handleAddWorker}>ADD</button>
      <Footer />
    </div>
  );
};

//-------------------------------------------=======================TODO: сделать в профиле==========================---------------------------------------------

export default WorkerCard;
