"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React, { useState, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { updateProfile } from "firebase/auth";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import { nanoid } from "nanoid";

const Settings = () => {
  const nameInputRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const { currentUser } = useAuth();
  console.log(currentUser);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const avatarRef = ref(storage, `avatars/${avatar.name + nanoid()}`);

    if (avatar) {
      uploadBytes(avatarRef, avatar)
        .then(() => {
          return getDownloadURL(avatarRef);
        })
        .then((avatarUrl) => {
          updateProfile(currentUser, {
            displayName: name,
            photoURL: avatarUrl,
          }).then(() => alert("Profile updated"));
        });
    } else {
      updateProfile(currentUser, {
        displayName: name,
      }).then(() => alert("Profile updated"));
    }
  };

  return (
    <div className="Settings container">
      <Navbar />
      <div className="mt-[5rem]">Settings</div>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="workerName" className="mr-4">
            Name
          </label>
          <input
            className="rounded-md border border-black outline-none p-2 "
            id="updateName"
            maxlength="50"
            ref={nameInputRef}
            value={currentUser.displayName}
          />
        </div>
        <div>
          <label className="mr-4">Avatar</label>
          <label>
            <Avatar alt="Avatar" src={currentUser.photoURL} />
          </label>
          <input
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
            type="file"
          />
        </div>
        <input
          type="submit"
          value="Submit"
          //   onClick={(e) => {
          //     e.preventDefault();
          //     const name = nameInputRef.current.value;
          //     const photo = avatar;
          //     updateProfile(currentUser, {
          //       displayName: name,
          //       photoURL: photo,
          //     }).then(() => alert("Profile updated"));
          //   }}
        />
      </form>
      <Footer />
    </div>
  );
};

export default Settings;
