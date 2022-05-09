import * as React from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import HeaderContainer from "../components/HeaderContainer";

export default function ExercisePage() {
  return (
    <div>
      <NavBar />
      <PatientInfo />
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
          <Grid
            container
            item
            xs={11.8}
            sm={5.8}
            direction="column"
            style={{ backgroundColor: "pink" }}
          >
            <HeaderContainer title="Grafik" />
            <img
              //className="Login-Image"
              src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41598-017-08350-x/MediaObjects/41598_2017_8350_Fig4_HTML.jpg"
              alt="graph"
            />
          </Grid>
          <Grid xs={0.0} sm={0.2} />

          <Grid
            container
            item
            xs={11.8}
            sm={5.8}
            direction="column"
            style={{ backgroundColor: "purple" }}
          >
            <HeaderContainer title="Pose" />
            <img
              //className="Login-Image"
              src="https://mediapipe.dev/assets/img/photos/pose_1.jpg"
              alt="pose"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
