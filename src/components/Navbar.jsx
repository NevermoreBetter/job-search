"use client";

import useAccount from "@/hooks/useAccount";
import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import { auth } from "../firebase/firebase";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@mui/material";
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { login, currentUser, logout } = useAuth();
  const acc = useAccount((state) => state.isWorker);
  const changeAcc = useAccount((state) => state.changeAccount);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  async function loginHandler() {
    try {
      await login();
    } catch (error) {}
  }

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset < 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  }, [ref]);
  console.log(currentUser);
  return (
    <div
      id="header"
      className={`relative z-50 flex justify-between items-center mb-8 top-0 py-2 px-[10rem] backdrop-filter backdrop-blur-lg transition-all duration-500 ease-in-out ${
        isSticky ? "sticky" : ""
      }`}
    >
      <Link href="/">
        <GrUserWorker />
      </Link>
      <div className="flex gap-12 h-fit">
        <Link href="/inbox" className={pathname === "/inbox" ? "active" : ""}>
          Пропозиції
        </Link>
        {acc ? (
          <Link href="/jobs" className={pathname === "/jobs" ? "active" : ""}>
            Вакансії
          </Link>
        ) : (
          <Link
            href="/worker"
            className={pathname === "/worker" ? "active" : ""}
          >
            Резюме
          </Link>
        )}
        {acc ? (
          <Link
            href="/worker/create-worker"
            className={pathname === "/worker/create-worker" ? "active" : ""}
          >
            Створити резюме
          </Link>
        ) : (
          <Link
            href="/jobs/job-list"
            className={pathname === "/jobs/job-list" ? "active" : ""}
          >
            Список ваших вакансій
          </Link>
        )}
        {acc ? "робітник" : "роботодавець"}
      </div>
      <div>
        {currentUser !== null ? (
          <div class="flex gap-8 items-center ">
            <div ref={ref} className="relative">
              <button
                id="dropdownAvatarNameButton"
                class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 dark:text-white"
                type="button"
                onClick={toggleDropdown}
              >
                <Image
                  className="rounded-full mr-2"
                  src={currentUser.photoURL}
                  width={30}
                  height={30}
                  alt="profile picture"
                />
                <div className="text-black">{currentUser.displayName}</div>
                <svg
                  class="w-4 h-4 mx-1.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                class={`z-10 dark:bg-white divide-y dark:divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600 ${
                  isOpen ? "absolute" : "hidden"
                }`}
              >
                <div class="px-4 py-3 text-sm dark:text-gray-900 text-white">
                  <div class="truncate">{currentUser.email}</div>
                </div>
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li className="block px-4 py-2 text-black dark:hover:bg-gray-300 hover:bg-gray-600 cursor-pointer">
                    {acc ? (
                      <Link href="/worker/create-worker">Профіль</Link>
                    ) : (
                      <Link href="/jobs/create-job">Профіль</Link>
                    )}
                  </li>
                  <li
                    className="block px-4 py-2 text-black dark:hover:bg-gray-300 hover:bg-gray-600 cursor-pointer"
                    onClick={changeAcc}
                  >
                    Змінити
                  </li>
                  <li className="block px-4 py-2 text-black dark:hover:bg-gray-300 hover:bg-gray-600 cursor-pointer">
                    <Link href="/settings">Налаштування</Link>
                  </li>
                </ul>
                <div class="py-2">
                  <p
                    class="block px-4 py-2 text-sm text-black dark:hover:bg-gray-300 hover:bg-gray-600 cursor-pointer"
                    onClick={logout}
                  >
                    Вихід
                  </p>
                </div>
              </div>
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
