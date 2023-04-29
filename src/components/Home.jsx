"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="home container">
      <Navbar />
      <div className="mt-[5rem]">Home</div>
      <Footer />
    </div>
  );
};

export default Home;
