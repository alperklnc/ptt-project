import * as React from "react";
import { Grid, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { ProgressBar } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import AvatarImage from "../../patient1.jpg";

import "./DoctorPage.css";

import HeaderContainer from "./HeaderContainer";
import { height } from "@mui/system";

const ScreenSizeDetector = require("screen-size-detector");
const screen = new ScreenSizeDetector();

interface Props {
  patientName: string;
  progress: number;
  session: number;
  therapy: string;
  date: string;
}

const NextPatient: React.FC<Props> = (props) => {
  const startSession = () => (window.location.href = "/patient-page");

  return (
    <div className="box-shadow">
      <HeaderContainer title="Sıradaki Hasta" />
      <Grid container direction="row" height={screen.height / 2.45}>
        <Grid
          container
          item
          sm={8}
          direction="column"
          style={{
            padding: screen.width / 64,
          }}
        >
          <Typography className="Text">08:30 - 1 Nisan 2022</Typography>
          <Typography className="Text">Donuk Omuz Tedavisi</Typography>
          <Typography className="Text">Seans 3/12</Typography>
          <Typography className="Text">Toplam İyileşme</Typography>

          <ProgressBar
            className="progress"
            now={props.progress}
            label={`${props.progress}%`}
            variant="progress-bg"
            style={{
              width: screen.width / 5,
              height: screen.height / 18,
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
              sx={{ width: screen.width / 10, height: screen.width / 10 }}
            />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <Typography className="Patient-Name">Hasta 1</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Button className="Button" variant="contained" onClick={startSession}>
          Seansı Başlat
        </Button>
      </Grid>
    </div>
  );
};

export default NextPatient;
