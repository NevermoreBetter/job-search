"use client";

import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { auth } from "../firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@mui/material";
const Navbar = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [currentUser] = useAuthState(auth);
  // const googleAuth = new GoogleAuthProvider();
  // console.log(currentUser);
  // const login = async () => {
  //   const result = await signInWithPopup(auth, googleAuth);
  //   setLoggedIn(true);
  // };

  // useEffect(() => {
  //   window.localStorage.setItem("login", loggedIn);
  // }, [loggedIn]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("login");
  //   if (data !== null) setLoggedIn(data);
  // }, []);
  const { login, currentUser, logout } = useAuth();

  async function loginHandler() {
    try {
      await login();
    } catch (error) {}
  }

  return (
    <div className="flex sticky justify-between ">
      <Link href="/">
        {" "}
        <GrUserWorker />
      </Link>
      <div className="flex gap-8">
        <Link href="/inbox">Inbox</Link>
        <Link href="/worker">Workers</Link>
        <Link href="/jobs">Jobs</Link>
      </div>
      <div className="flex gap-8">
        {currentUser !== null ? (
          <div onClick={logout}>
            <Image
              src={currentUser.photoURL}
              width={100}
              height={100}
              alt="profile picture"
            />
            {currentUser.displayName}
          </div>
        ) : (
          <Button onClick={loginHandler}>Log in</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
