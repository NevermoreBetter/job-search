"use client";
import * as React from "react";
import { Button } from "@mui/material";

export default function CustomButton({ text }) {
  return <Button variant="contained">{text}</Button>;
}
