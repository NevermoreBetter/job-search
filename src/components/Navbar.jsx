"use client";

import useAccount from "@/hooks/useAccount";
import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import { auth } from "../firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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
  const acc = useAccount((state) => state.isWorker);

  console.log(acc);
  async function loginHandler() {
    try {
      await login();
    } catch (error) {}
  }

  return (
    <div className="fixed flex justify-between right-[20%] left-[20%] border-4 border-t-0 border-emerald-400 rounded-b-lg items-center mb-8 top-0 bg-white py-2 px-4">
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
      <div className="">
        {currentUser !== null ? (
          <div className="flex gap-8 items-center ">
            <Image
              className="rounded-full"
              src={currentUser.photoURL}
              width={30}
              height={30}
              alt="profile picture"
            />
            <Link href="/worker/create-worker">{currentUser.displayName}</Link>{" "}
            <div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <AiFillCaretDown />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>
                      <Link href="/worker/create-worker">Профіль</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={logout}>
                      Вихід
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
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
