import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";

import "../css/style-sheet.css";

import NavBar from "../components/NavBar";
import ExerciseInfo from "../components/ExerciseInfo";
import HeaderContainer from "../components/HeaderContainer";
import MyChart from "../components/MyChart";

import FlaskService from "../../services/FlaskService";

export default function ExercisePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  const [submitted, setSubmitted] = useState<boolean>(false);

  const endExercise = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var finishData = state.exerciseData;
    finishData.isFinished = true;
    console.log(finishData);

    setSubmitted(true);
    FlaskService.endExercise(finishData)
    .then((response: any) => {
      setSubmitted(true);
    })
    .catch((e: Error) => {
      console.log(e);
    });

    setTimeout(function() {
      navigate("/patient-page", {
        state: {
          patientId: state.patientId,
        }
      });
    }, 1000);
    
  
  };

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
      <Grid container justifyContent="center">
          {submitted ? (
              <div
                style={{
                  paddingBottom: "2vw",
                }}
              >
                <h4>Egzersiz verisi işleniyor...</h4>
              </div>
            ) : (
              <h4></h4>
            )}</Grid>
      <Grid container justifyContent="center">

          <Button 
            className="NextPatient-Button"
            onClick={endExercise}
            >
              Seansı Bitir
          </Button>
        </Grid>
    </div>
  );
}
