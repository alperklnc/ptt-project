import * as React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PatientHolder from "./PatientHolder";
import HeaderContainer from "./HeaderContainer";

import "../css/style-sheet.css";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";
import { IPatientData } from "../../types/Patient";

interface Props {
  sessions: ISessionData[];
}

let once:number = 0;

const TodaysAppointments: React.FC<Props> = (props) => {
  var _todaysPatients: IPatientData[] = [];

  const [todaysPatients, setTodaysPatients] = useState<IPatientData[]>(_todaysPatients);

  useEffect(() => {
    setTodaysPatientsInfo();
    
  }, []);

  function setTodaysPatientsInfo() {
    if(once < 2){
      once = once + 1;
      _todaysPatients = [];
      for (let index = 0; index < props.sessions.length; index++) {
        PatientDataService.getById(props.sessions[index].pt_id)
        .then((response) => {
          todaysPatients[index] = response.data;
        }).catch((e: Error) => {
          console.log(e);
        });
      };
    }
    return "";
  };


  function getPatientName(index: number) {
    setTodaysPatientsInfo();

    return "todaysPatients[index]";
  }

  /*
  function getPatientNamee(index: number, pt_id: number) {
    PatientDataService.getById(pt_id).then((response) => {
      var name =
        response.data.patientFirstName + " " + response.data.patientLastName;
      todaysPatients[index] = name;
      setTodaysPatients(todaysPatients);
    });

    return todaysPatients[index];
  }
  */
  return (
    <div className="box-shadow">
      <div>{setTodaysPatientsInfo()}</div>
      <HeaderContainer title="Bugünün Randevuları" />
      <Grid container item direction="row" height="25vh" className="Container">
        <PatientHolder
          sessionData={props.sessions[0]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[1]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[2]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[3]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[4]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[0]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[0]}
        ></PatientHolder>
        <PatientHolder
          sessionData={props.sessions[0]}
        ></PatientHolder>
      </Grid>
    </div>
  );
};

export default TodaysAppointments;
