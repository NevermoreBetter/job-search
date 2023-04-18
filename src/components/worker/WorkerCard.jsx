"use client";

import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
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
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [distance, setDistance] = useState();
  const [cityName, setCityName] = useState();
  const [typeName, setTypeName] = useState([]);
  const [salary, setSalary] = useState([100, 1000]);
  const [experience, setExperience] = useState();
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const userName = currentUser.displayName;
  const dbRef = collection(db, "workers");

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
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="create container">
      <Navbar />
      <div className="mb-4">
        <label htmlFor="workerName" className="mr-4">
          Посада
        </label>
        <input
          className="rounded-md border border-black outline-none p-2"
          id="workerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="workerDescription" className="mr-4 ">
          Досягнення
        </label>
        <input
          className="rounded-md border border-black outline-none p-2"
          id="workerDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4 items-center flex">
        <label htmlFor="workerType" className="mr-4 ">
          Тип зайнятості
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
            value={distance}
            onChange={(e) => setExperience(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="No experience">Без досвіду</MenuItem>
            <MenuItem value="1 year">1 рік</MenuItem>
            <MenuItem value="2 years">2 роки</MenuItem>
            <MenuItem value="3 years">3 роки</MenuItem>
            <MenuItem value="5 years">5 років</MenuItem>
          </Select>
        </FormControl>
      </div>

      <button onClick={handleAddWorker}>Додати</button>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Заяву створено"
          action={action}
        />
      </div>
      <Footer />
    </div>
  );
};

//-------------------------------------------=======================TODO: сделать в профиле==========================---------------------------------------------

export default WorkerCard;
