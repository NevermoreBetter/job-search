import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "No experience",
  },
  {
    value: 10,
    label: "6 months",
  },
  {
    value: 20,
    label: "1 year",
  },
  {
    value: 30,
    label: "1.5 year",
  },
  {
    value: 40,
    label: "2 years",
  },
  {
    value: 50,
    label: "2.5 years",
  },
  {
    value: 60,
    label: "3 years",
  },
  {
    value: 70,
    label: "3.5 years",
  },
  {
    value: 80,
    label: "4 years",
  },
  {
    value: 90,
    label: "4.5 years",
  },
  {
    value: 100,
    label: "5+ years",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks() {
  return (
    <Slider
      aria-label="Custom marks"
      defaultValue={0}
      getAriaValueText={valuetext}
      step={10}
      marks={marks}
    />
  );
}
