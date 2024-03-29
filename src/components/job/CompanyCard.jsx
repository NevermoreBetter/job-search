"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { nanoid } from "nanoid";
import useGetJobs from "@/hooks/fetchJobs";
const CompanyCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState();
  const [companyData, setCompanyData] = useState();
  const { currentUser } = useAuth();
  const dbRef = collection(db, "company");
  const dbJobsRef = collection(db, "jobs");
  const { jobsData, isLoading } = useGetJobs();
  const [open, setOpen] = useState(false);
  const [picUpload, setPicUpload] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const filterJobsData = jobsData.filter((data) => {
    if (data.UserId === currentUser.uid) return data;
  });

  const idsToUpdate = filterJobsData.map((data) => {
    return data.id;
  });

  console.log(idsToUpdate);

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

  const uploadAvatar = async () => {
    if (picUpload == null) return;
    const avatarRef = ref(
      storage,
      `companyAvatar/${picUpload.name + nanoid()}`
    );
    uploadBytes(avatarRef, picUpload)
      .then(() => {
        return getDownloadURL(avatarRef);
      })
      .then((fileUrl) => {
        setAvatar(fileUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function handleAddCompany() {
    try {
      addDoc(dbRef, {
        Name: name,
        Description: description,
        Avatar: avatar,
        UserId: currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateCompany() {
    try {
      const fieldsToEdit = doc(dbRef, id);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
        Avatar: avatar,
      });
    } catch (error) {
      console.log(error);
    }
  }

  idsToUpdate.forEach(async (id) => {
    const fieldsToEdit = doc(dbJobsRef, id);
    await updateDoc(fieldsToEdit, {
      Company: name,
    });
  });

  const getFields = (updName, updDescription, updAvatar, updID) => {
    setName(updName);
    setDescription(updDescription);
    setAvatar(updAvatar);
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

  // useEffect(() => {
  //   if (avatar !== null) {
  //     id ? handleUpdateCompany() : handleAddCompany();
  //   }
  // }, [avatar]);

  useEffect(() => {
    if (companyData) {
      const company = companyData.find(
        (data) => data.UserId === currentUser.uid
      );
      if (company) {
        getFields(
          company.Name,
          company.Description,
          company.Avatar,
          company.id
        );
      }
    }
  }, [companyData]);
  console.log(companyData);
  return (
    <div className="create container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadAvatar()
            .then(() => {
              id ? handleUpdateCompany() : handleAddCompany();
            })
            .then(() => {
              idsToUpdate.forEach(async (id) => {
                const fieldsToEdit = doc(dbJobsRef, id);
                await updateDoc(fieldsToEdit, {
                  Company: name,
                });
              });
            });
          handleClick();
        }}
      >
        <div className="mb-4 mt-[5rem]">
          <label
            for="companyName"
            class="block mb-2  font-medium dark:text-gray-900 text-white"
          >
            Назва:
          </label>
          <input
            type="text"
            id="companyName"
            class="dark:bg-gray-50 border dark:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Назва компанії"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="mb-4">
          <label
            for="companyDescription"
            class="block mb-2 dark:text-gray-900 text-white"
          >
            Опис:
          </label>
          <textarea
            id="companyDescription"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="block p-2.5 w-full text-sm text-gray-900 dark:bg-gray-50 rounded-lg border dark:border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Опишіть компанію детальніше"
            required
          ></textarea>
          <label>
            <Avatar alt="Avatar" src={avatar} />
          </label>
          <input
            id="dropzone-file"
            onChange={(e) => {
              setPicUpload(e.target.files[0]);
            }}
            type="file"
          />
        </div>
        <button
          type="submit"
          className="text-gray-900 dark:bg-white border dark:border-gray-300 focus:outline-none dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 mr-2 mb-2 bg-gray-800 dark:text-black border-gray-600 hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {id ? "Редагувати" : "Додати"}
        </button>
      </form>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={id ? "Компанію редаговано" : "Компанію створено"}
          action={action}
        />
      </div>
    </div>
  );
};

export default CompanyCard;
