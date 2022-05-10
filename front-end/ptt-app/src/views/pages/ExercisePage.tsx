import * as React from "react";
import { Grid } from "@mui/material";

import "../css/style-sheet.css";

import NavBar from "../components/NavBar";
import ExerciseInfo from "../components/ExerciseInfo";
import HeaderContainer from "../components/HeaderContainer";

export default function ExercisePage() {
  return (
    <div>
      <NavBar />
      <ExerciseInfo type="Sarkaç" session={3} />
      <div
        style={{
          padding: "3vw 3vw 3vw 3vw",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <Grid
            className="box-shadow"
            container
            item
            xs={11.8}
            sm={5.8}
            direction="column"
          >
            <HeaderContainer title="Grafik" />
            <img
              className="Image"
              src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41598-017-08350-x/MediaObjects/41598_2017_8350_Fig4_HTML.jpg"
              alt="graph"
            />
          </Grid>
          <Grid xs={0.0} sm={0.2} />

          <Grid
            className="box-shadow"
            container
            item
            xs={11.8}
            sm={5.8}
            direction="column"
          >
            <HeaderContainer title="Pose" />
            <img
              className="Image"
              src="https://google.github.io/mediapipe/images/mobile/pose_tracking_example.gif"
              alt="pose"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
