import * as React from "react";
import { Grid } from "@mui/material";

import "./PatientPage.css";

import NavBar from "../nav-bar/NavBar";
import PatientInfo from "./PatientInfo";
import ExerciseTable from "./ExerciseTable";

export default function PatientPage() {
  return (
    <div>
      <NavBar doctorName="Dr. Strange" color="#4EC6C7" />
      <PatientInfo />
      <div
        style={{
          padding: "3.5vw",
          paddingLeft: "3.5vw",
          paddingRight: "3.5vw",
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
