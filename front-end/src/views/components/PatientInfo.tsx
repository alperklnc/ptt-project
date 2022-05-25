import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style-sheet.css";

import { IPatientData } from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

interface Props {
  patientId: number;
  width?: string;
  hasTop?: boolean;
}

const PatientInfo: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  var patientData: IPatientData = {
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

  const [patientInfo, setPatientInfo] = useState<IPatientData>(patientData);
  const [currentSession, setCurrentSession] = useState<number>(0);

  useEffect(() => {
    setPatient();
    getCurrentSession();
  }, []);

  function setPatient() {
    PatientDataService.getById(props.patientId)
      .then((response) => {
        setPatientInfo(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  }

  function getCurrentSession(){
    PatientDataService.getCurrentSession(props.patientId)
    .then((response) => {
      setCurrentSession(response.data + 1);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const startExercise = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    navigate("/patient-page", {
      state: {
        patientId: patientInfo.id,
      }
    });
  };

  if (patientInfo === null) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <div>
      {props.hasTop == true && (
        <Box
          style={{
            backgroundColor: "#4EC6C7",
            minHeight: "10px",
          }}
        ></Box>
      )}
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        style={{
          display: "flex",
          backgroundColor: "#4EC6C7",
          width: props.width,
          height: "5vh",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
        onClick={startExercise}
      >
        <Grid item xs={3}>
          <Typography className="PatientInfo-Text">
            {patientInfo.patientFirstName + " " + patientInfo.patientLastName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className="PatientInfo-Text">
            {patientInfo.patientDisease} Tedavisi
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className="PatientInfo-Text">
            Seans {currentSession}/{patientInfo.sessionAmount}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className="PatientInfo-Text">
            Toplam İyileşme: %{patientInfo.recovery}
          </Typography>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundColor: "#4EC6C7",
          minHeight: "10px",
        }}
      ></Box>
    </div>
  );
};
export default PatientInfo;
