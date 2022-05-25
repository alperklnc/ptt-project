import * as React from "react";
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
            xs={9.8}
            sm={4.8}
            direction="column"
          >
            <HeaderContainer title="Grafik" />
            <MyChart />
          </Grid>
          <Grid item xs={0.0} sm={0.2} />

          <Grid
            className="box-shadow"
            container
            item
            xs={13.8}
            sm={6.8}
            direction="column"
          >
            <HeaderContainer title="İskelet" />

            <div style={{                
              width:"50vw",
                height:"60vh"}}>
              <iframe
                src="http://127.0.0.1:5000/video"
                width="100%"
                height="100%"
                id="pose"
              ></iframe>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
