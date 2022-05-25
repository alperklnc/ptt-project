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

  var _sessionId: number = -1;
  var _sessionData: ISessionData = {
    id: -1,
    time: "",
    date: "",
    comment: "",
    pt_id: -1,
    _completed: false,
  }

  var [sessionData, setSessionData] = useState<ISessionData[]>([]);
  var [sessionId, setSessionId] = useState(_sessionId);

  useEffect(() => {
    getSessionId(patientId);
  }, []);

  function getSessionId(patientId: number) {
    PatientDataService.getSession(patientId)
      .then((response) => {
        setSessionData(response.data);
        console.log(response.data);
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

    /*
    console.log(sessionId);
    PatientDataService.getCurrentSession(patientId)
    .then((response) => {
      var currentSession = response.data;
      var newSessionData = sessionData;
      newSessionData[currentSession]._completed = true;
      console.log(newSessionData[currentSession]._completed);

      PatientDataService.endSession(patientId, newSessionData)
      .then((response) => {
        console.log(response);
        navigate("/doctor-page");
      })
      .catch((e: Error) => {
        console.log(e);
      });

    })
    .catch((e: Error) => {
      console.log(e);
    });
    */
  };

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
