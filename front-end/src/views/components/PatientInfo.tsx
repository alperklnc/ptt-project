import * as React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style-sheet.css";

import { IPatientData } from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

interface Props {
  patientId: number;
}

const PatientInfo: React.FC<Props> = (props) => {
  var patientData: IPatientData = {
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

  const [patientInfo, setPatientInfo] = useState(patientData);

  useEffect(() => {
    PatientDataService.getById(props.patientId)
      .then((response) => {
        setPatientInfo(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  if (patientInfo === null) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <div>
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        style={{
          display: "flex",
          backgroundColor: "#4EC6C7",
          width: "100vw",
          height: "5vh",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
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
            Seans 3/{patientInfo.sessionAmount}
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
