import * as React from "react";
import { useState, useEffect, ChangeEvent, Suspense } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import { IPatientData } from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

interface IProps {
  data?: IPatientData;
}

const PatientPage: React.FC<IProps> = (props) => {
  var _sessionId: number = -1;

  const [sessionId, setSessionId] = useState(_sessionId);

  useEffect(() => {
    PatientDataService.getSession(717)
      .then((response) => {
        setSessionId(response.data[0].id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  if (_sessionId === null || _sessionId != -1) {
    return <h2>Loading posts...</h2>;
  } else {
    return (
      <div>
        <NavBar />
        <PatientInfo patientId={717} />
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
            <p>{sessionId}</p>
            <ExerciseTable sessionId={sessionId}></ExerciseTable>
          </Grid>
        </div>
      </div>
    );
  }
};
export default PatientPage;
