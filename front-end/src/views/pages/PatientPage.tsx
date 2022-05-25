import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";

import "../css/style-sheet.css";

const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const patientId = state.patientId;

  var [sessionData, setSessionData] = useState<ISessionData[]>([]);
  var [sessionId, setSessionId] = useState(-1);

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
  };

  const endSession = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log(sessionId);
    PatientDataService.endSession(sessionId)
    .then((response) => {
      console.log(response);
      navigate("/doctor-page");
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };

  if (sessionId === null || sessionId == -1) {
    return <h2>Loading patient page...</h2>;
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
        <Grid container justifyContent="center" style={{paddingTop:"40px"}}>
          <Button 
            className="NextPatient-Button"
            onClick={endSession}
            >
              Seansı Bitir
          </Button>
        </Grid>
      </div>
    </div>
  );
};
export default PatientPage;
