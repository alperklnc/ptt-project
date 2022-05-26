import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button, ProgressBar } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import AvatarImage from "../../patient1.jpg";

import "../css/style-sheet.css";

import HeaderContainer from "./HeaderContainer";
import PatientDataService from "../../services/PatientService";
import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";

interface Props {
  patientData: IPatientData;
  sessionInfo: ISessionData;
  session: number;
}

const NextPatient: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const startExercise = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    navigate("/patient-page", {
      state: {
        patientId: props.patientData.id,
      }
    });
  };

  return (
    <div className="box-shadow">
      <HeaderContainer title="Günün İlk Hastası" />
      <Grid container direction="row" height="36vh" width="40vw">
        <Grid container item direction="column" className="Container">
          <Typography className="NextPatient-Text">
            Hasta: {props.patientData.patientFirstName +
                " " +
            props.patientData.patientLastName}
          </Typography>
          <Typography className="NextPatient-Text">
            Tarih: {props.sessionInfo.date + " - " + props.sessionInfo.time}
          </Typography>
          <Typography className="NextPatient-Text">
            Hastalık: {props.patientData.patientDisease}
          </Typography>
          <Typography className="NextPatient-Text">
            Seans: {props.session}/{props.patientData.sessionAmount}
          </Typography>
          <Typography className="NextPatient-Text" style={{paddingBottom: "15px",}}>Toplam İyileşme</Typography>

          <ProgressBar
            className="progress"
            now={props.patientData.recovery}
            label={`${props.patientData.recovery}%`}
            variant="progress-bg"
            style={{
              width: "36vw",
              height: "4vh",
            }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Button 
            className="NextPatient-Button"
            onClick={startExercise}
            >
              Seansı Başlat
        </Button>
      </Grid>
    </div>
  );
};

export default NextPatient;
