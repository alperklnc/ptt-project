import * as React from "react";
import Iframe from "react-iframe";
import { Grid } from "@mui/material";

import "../css/style-sheet.css";

import NavBar from "../components/NavBar";
import ExerciseInfo from "../components/ExerciseInfo";
import HeaderContainer from "../components/HeaderContainer";
import MyChart from "../components/MyChart";

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
            <MyChart />
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
            <Grid item>
              <HeaderContainer title="Pose" />
            </Grid>
            <Grid item>
              <iframe
                src="http://127.0.0.1:5000/"
                width="100%"
                height="400%"
                id="pose"
              ></iframe>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
