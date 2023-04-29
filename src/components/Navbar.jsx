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
    <div className="fixed flex justify-between left-[20%] right-[20%] items-center mb-8 top-0">
      <Link href="/">
        {" "}
        <GrUserWorker />
      </Link>
      <div className="flex gap-12 h-fit">
        <Link href="/inbox">Inbox</Link>
        <Link href="/worker">Workers</Link>
        <Link href="/worker/create-worker">Add worker</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/jobs/create-job">
          <div>Add job</div>
        </Link>
      </div>
      <div className="flex gap-8 ">
        {currentUser !== null ? (
          <div onClick={logout} className="flex flex-col">
            <Image
              className="rounded-full"
              src={currentUser.photoURL}
              width={30}
              height={30}
              alt="profile picture"
            />
            <div>
              <p>Мій профіль</p>
              <p>Вийти</p>
            </div>
          </div>
        ) : (
          <Button onClick={loginHandler}>Log in</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
