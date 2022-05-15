import * as React from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

export default function PatientPage() {
  return (
    <div>
      <NavBar />
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
          <ExerciseTable url="/exercise-page"></ExerciseTable>
        </Grid>
      </div>
    </div>
  );
}
