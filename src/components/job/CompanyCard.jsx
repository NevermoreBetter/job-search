"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const CompanyCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState();
  const [companyData, setCompanyData] = useState();
  const { currentUser } = useAuth();
  const dbRef = collection(db, "company");
  const [open, setOpen] = useState(false);

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

  async function handleAddCompany() {
    addDoc(dbRef, {
      Name: name,
      Description: description,
      UserId: currentUser.uid,
    })
      .then(() => {
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateCompany() {
    try {
      const fieldsToEdit = doc(dbRef, id);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
      });
      handleClick();
    } catch (error) {
      console.log(error);
    }
  }

  const getFields = (updName, updDescription, updID) => {
    setName(updName);
    setDescription(updDescription);
    setID(updID);
  };

  async function getCompany() {
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCompanyData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompany();
  }, [open]);

  useEffect(() => {
    if (companyData) {
      const company = companyData.find(
        (data) => data.UserId === currentUser.uid
      );
      if (company) {
        getFields(company.Name, company.Description, company.id);
      }
    }
  }, [companyData]);
  console.log(companyData);
  return (
    <div className="create container">
      <div className="mb-4 mt-[5rem]">
        <label htmlFor="jobName" className="mr-4">
          Назва
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
          Про компанію
        </label>
        <textarea
          className="rounded-md border border-black outline-none p-2"
          id="jobDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button onClick={id ? handleUpdateCompany : handleAddCompany}>
        {id ? "Редагувати" : "Додати"}
      </button>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Компанію створено"
          action={action}
        />
      </div>
    </div>
  );
};

export default CompanyCard;
