import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import {IPatientData} from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

interface IProps {
  data?: IPatientData;
}

class PatientPage extends React.Component<IProps> {
  initialPatientState = {
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientTellNo: "",
    isMan: false,
    patientDisease: "",
    sessionAmount: 0,
    period: 0,
    weak: "",
    sessionHour: "",
    exercises: [],
    session: 0,
    recovery: 0,
  };

  patientData: IPatientData;

  componentWillMount() {
    console.log("componentWillMount - Patient Page");
  }
  constructor(props: IProps) {
    console.log("constructor - Patient Page");
    super(props);
    this.patientData = this.initialPatientState;
    PatientDataService.getById(1)
      .then((response: any) => {
        console.log(response.data);
        this.patientData = {
          patientFirstName: response.data.patientFirstName,
          patientLastName: response.data.patientLastName,
          patientEmail: response.data.patientEmail,
          patientTellNo: response.data.patientTellNo,
          isMan: response.data.isMan,
          patientDisease: response.data.patientDisease,
          sessionAmount: response.data.sessionAmount,
          period: response.data.period,
          weak: response.data.weak,
          sessionHour: response.data.sessionHour,
          exercises: response.data.exercises,
        };
      })
      .catch((e: Error) => {
        console.log(e);
      });
    console.log(this.patientData);
  }

  setPatient = (response: any) => {
    const data = response.data;

    this.patientData = {
      patientFirstName: data.patientFirstName,
      patientLastName: data.patientLastName,
      patientEmail: data.patientEmail,
      patientTellNo: data.patientTellNo,
      isMan: data.isMan,
      patientDisease: data.patientDisease,
      sessionAmount: data.sessionAmount,
      period: data.period,
      weak: data.weak,
      sessionHour: data.sessionHour,
      exercises: data.exercises,
    };
  };

  getPatientInfo = (id: number) => {
    PatientDataService.getById(id)
      .then((response: any) => {
        console.log(response.data);
        this.setPatient(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  render() {
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
}
export default PatientPage;
