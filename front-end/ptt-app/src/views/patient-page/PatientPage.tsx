import * as React from "react";
import { Grid } from "@mui/material";

import "./PatientPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../nav-bar/NavBar";
import PatientInfo from "./PatientInfo";
import ExerciseTable from "./ExerciseTable";
const ScreenSizeDetector = require("screen-size-detector");
const screen = new ScreenSizeDetector();

export default function PatientPage() {
  return (
    <div>
      <NavBar doctorName="Dr. Strange" color="#4EC6C7" />
      <PatientInfo />
      <div
        style={{
          padding: screen.width / 30,
          paddingLeft: screen.width / 30,
          paddingRight: screen.width / 30,
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <ExerciseTable></ExerciseTable>
        </Grid>
      </div>
    </div>
  );
}
