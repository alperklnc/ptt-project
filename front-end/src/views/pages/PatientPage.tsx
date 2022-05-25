import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";

const PatientPage: React.FC = () => {
  const location = useLocation();
  const patientId = location.state as number;

  var _sessionId: number = -1;
  var _sessionData: ISessionData = {
    id: -1,
    time: "",
    date: "",
    comment: "",
    pt_id: -1,
    _completed: false,
  }

  var [sessionData, setSessionData] = useState<ISessionData>(_sessionData);
  var [sessionId, setSessionId] = useState(_sessionId);

  useEffect(() => {
    getSessionId(patientId);
  }, []);

  function getSessionId(patientId: number) {
    PatientDataService.getSession(patientId)
      .then((response) => {
        setSessionData(response.data);
        setSessionId(response.data[0].id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  }

  if (sessionId === null || sessionId == -1) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <div>
      <NavBar />
      <PatientInfo patientId={patientId} />
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
          <ExerciseTable patientId={patientId} 
          sessionData={sessionData} sessionId={sessionId}></ExerciseTable>
        </Grid>
      </div>
    </div>
  );
};
export default PatientPage;
