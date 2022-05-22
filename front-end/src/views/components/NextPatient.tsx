import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { ProgressBar } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import AvatarImage from "../../patient1.jpg";

import "../css/style-sheet.css";

import HeaderContainer from "./HeaderContainer";
import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";

interface Props {
  patientData: IPatientData;
  sessionInfo: ISessionData;
}

const NextPatient: React.FC<Props> = (props) => {
  return (
    <div className="box-shadow">
      <HeaderContainer title="Sıradaki Hasta" />
      <Grid container direction="row" height="40vh">
        <Grid container item sm={8} direction="column" className="Container">
          <Typography className="NextPatient-Text">
            {props.sessionInfo.date + " - " + props.sessionInfo.time}
          </Typography>
          <Typography className="NextPatient-Text">
            {props.patientData.patientDisease}
          </Typography>
          <Typography className="NextPatient-Text">
            {props.patientData.id}/{props.patientData.sessionAmount}
          </Typography>
          <Typography className="NextPatient-Text">Toplam İyileşme</Typography>

          <ProgressBar
            className="progress"
            now={props.patientData.recovery}
            label={`${props.patientData.recovery}%`}
            variant="progress-bg"
            style={{
              width: "22vw",
              height: "4vh",
            }}
          />
        </Grid>
        <Grid
          container
          item
          sm={4}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "30px 30px 20px 30px",
            }}
          >
            <Avatar
              alt="Hasta 1"
              src={AvatarImage}
              sx={{ width: "10vw", height: "10vw" }}
            />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <Typography className="NextPatient-Name">
              {props.patientData.patientFirstName +
                " " +
                props.patientData.patientLastName}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Link
          to="/patient-page"
          state={props.patientData.id}
          className="NextPatient-Button"
        >
          Seansı Başlat
        </Link>
      </Grid>
    </div>
  );
};

export default NextPatient;
