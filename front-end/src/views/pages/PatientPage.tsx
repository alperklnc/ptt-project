import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import pdf from "../../Sample.pdf";

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
    getCurrentSession();
  }, []);

  const [currentSession, setCurrentSession] = useState(-1);

  function getSessionId(patientId: number, currentSession:number) {
    PatientDataService.getSession(patientId)
      .then((response) => {
        setSessionData(response.data);
        setSessionId(response.data[currentSession].id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  };

  function getCurrentSession(){
    PatientDataService.getCurrentSession(patientId)
    .then((response) => {
      var currentSession = response.data;
      getSessionId(patientId, currentSession);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const endSession = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log(`Session ${sessionId} is finished`);

    PatientDataService.endSession(sessionId)
    .then((response) => {
      console.log(response);
      navigate('/doctor-page');
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };

  function openPDF () {
    window.open(pdf);
  }

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
        <Grid container direction="column" alignItems="center" style={{paddingTop:"40px"}}>
          <div>
            <Button 
              className="NextPatient-Button"
              onClick={endSession}
              >
                Seansı Bitir
            </Button>
          </div>
          <div>
            <a className="PDF-Button" onClick={openPDF} target="_blank" rel="noreferrer">
              Hasta Gelişim Raporu
            </a>
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default PatientPage;
