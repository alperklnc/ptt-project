import * as React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import TodaysAppointments from "../components/TodaysAppointments";
import NextPatient from "../components/NextPatient";

import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";

let once:boolean = true;

const DoctorPage: React.FC = () => {
  var _todaysSessions: ISessionData[] = [];
  var nextSessionData: ISessionData = {
    id: -1,
    time: "",
    date: "",
    comment: "",
    pt_id: -1,
    _completed: false,
  };

  var nextPatientData: IPatientData = {
    id: -1,
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
    optimum: 0,
    session: 0,
    recovery: 0,
  };

  const [todaysSessions, setTodaysSessions] = useState(_todaysSessions);
  const [nextSession, setNextSession] = useState(nextSessionData);

  const [nextPatientInfo, setNextPatientInfo] = useState(nextPatientData);

  const [currentSession, setCurrentSession] = useState<number>(0);

  useEffect(() => {
    PatientDataService.getTodaysPatients()
      .then((response) => {
        setTodaysSessions(response.data);
        setNextSession(response.data[0]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  
  function setNextPatient() {
    if(once) {
      once = false;
      PatientDataService.getById(todaysSessions[0].pt_id)
      .then((response) => {
        setNextPatientInfo(response.data);
        setCurrentSessionInfo(todaysSessions[0].pt_id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }

    return "";
  }

  function setCurrentSessionInfo(id:number) {
    PatientDataService.getCurrentSession(id)
    .then((response) => {
      setCurrentSession(response.data + 1);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  function getSessions(){
    return todaysSessions;
  }

  if (
    todaysSessions === null ||
    todaysSessions.length === 0 ||
    nextSession === null ||
    nextSession === undefined
  ) {
    return <h2>Loading posts...</h2>;
  } 
  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "3vw 5vw 2vw 5vw"
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <Grid container item xs={11.8} sm={5.8}>
            <div>{setNextPatient()}</div>
            <NextPatient
              patientData={nextPatientInfo}
              sessionInfo={nextSession}
              session={currentSession}
            />
          </Grid>
          <Grid item xs={0.0} sm={0.2} />
          <Grid container item xs={11.8} sm={5.8}>
            <TodaysAppointments
              sessions = {getSessions()}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DoctorPage;
