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
import { AuthProvider } from "@/context/AuthContext";
const Navbar = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [user] = useAuthState(auth);
  // const googleAuth = new GoogleAuthProvider();
  // console.log(user);
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
          log in
          {/* {user !== null ? (
            <div onClick={() => auth.signOut()}>
              <Image src={user.photoURL} width={100} height={100} />
              {user.displayName}
            </div>
          ) : (
            <button onClick={login}>Log In</button>
          )} */}
        </div>
      </div>
  );
};

export default Navbar;
