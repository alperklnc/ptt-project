import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import IPatientData from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

export default function PatientPage() {
  var initialPatientState = {
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientTellNo: "",
    isMan: false,
    patientDisease: "",
    sessionAmount: 0,
    period: 0,
    sessionHour: "",
    exercises: [],
    session: 0,
    recovery: 0,
  };

  var patientData: IPatientData;

  //const [patient, setPatient] = useState<IPatientData>(initialPatientState);

  const setPatient = (response: any) => {
    const data = response.data[27];

    patientData = {
      patientFirstName: data.patientFirstName,
      patientLastName: data.patientLastName,
      patientEmail: data.patientEmail,
      patientTellNo: data.patientTellNo,
      isMan: data.isMan,
      patientDisease: data.patientDisease,
      sessionAmount: data.sessionAmount,
      period: data.period,
      sessionHour: data.sessionHour,
      exercises: data.exercises,
      session: data.session,
      recovery: data.recovery,
    };

    return patientData;
  };

  const getAllPatient = () => {
    PatientDataService.getAll().then((response: any) => {
      patientData = setPatient(response);
      console.log(patientData);
    });
  };

  function getPatientData() {
    getAllPatient();

    return patientData;
  }

  const getPatientInfo = (id: number) => {
    PatientDataService.getById(id)
      .then((response: any) => {
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPatientInfo(27);
  }, []);

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
