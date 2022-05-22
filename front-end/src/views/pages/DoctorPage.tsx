import * as React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import TodaysAppointments from "../components/TodaysAppointments";
import NextPatient from "../components/NextPatient";

import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";

interface Props {
  name?: string;
  type?: string;
  reqSession?: number;
  session?: number;
  progress?: number;
  date?: string;
}

//class DoctorPage extends React.Component
const DoctorPage: React.FC<Props> = (props) => {
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
    patientId: -1,
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

  var _todaysPatients: string[] = [];

  const [todaysSessions, setTodaysSessions] = useState(_todaysSessions);
  const [nextSession, setNextSession] = useState(nextSessionData);

  const [nextPatientInfo, setNextPatientInfo] = useState(nextPatientData);
  const [todaysPatients, setTodaysPatients] = useState(_todaysPatients);

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

  function setNextPatient(pt_id: number) {
    PatientDataService.getById(pt_id)
      .then((response) => {
        setNextPatientInfo(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  }

  function getPatientName(index: number, pt_id: number) {
    PatientDataService.getById(pt_id).then((response) => {
      var name =
        response.data.patientFirstName + " " + response.data.patientLastName;
      todaysPatients[index] = name;
      setTodaysPatients(todaysPatients);
    });

    return todaysPatients[index];
  }

  if (
    todaysSessions === null ||
    todaysSessions.length === 0 ||
    nextSession === null ||
    nextSession === undefined
  ) {
    return <h2>Loading posts...</h2>;
  } else {
    //setTodaysPatients();
  }
  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "3vw",
          paddingLeft: "3vw",
          paddingRight: "3vw",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <Grid container item xs={11.8} sm={5.8}>
            <div>{setNextPatient(todaysSessions[0].pt_id)}</div>
            <div>{}</div>
            <NextPatient
              name={
                nextPatientInfo.patientFirstName +
                " " +
                nextPatientInfo.patientLastName
              }
              progress={30}
              reqSession={nextPatientInfo.sessionAmount}
              session={1}
              type={nextPatientInfo.patientDisease}
              date={nextSession.date + " - " + nextSession.time}
            />
          </Grid>
          <Grid xs={0.0} sm={0.2} />
          <Grid container item xs={11.8} sm={5.8}>
            <TodaysAppointments
              patientName1={getPatientName(0, todaysSessions[0].pt_id)}
              patientName2={getPatientName(1, todaysSessions[1].pt_id)}
              patientName3={getPatientName(2, todaysSessions[0].pt_id)}
              patientName4={getPatientName(3, todaysSessions[0].pt_id)}
              patientName5={getPatientName(4, todaysSessions[0].pt_id)}
              patientName6={getPatientName(5, todaysSessions[0].pt_id)}
              patientName7={getPatientName(6, todaysSessions[0].pt_id)}
              patientName8={getPatientName(7, todaysSessions[0].pt_id)}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DoctorPage;
