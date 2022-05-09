import * as React from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import TodaysAppointments from "../components/TodaysAppointments";
import NextPatient from "../components/NextPatient";

export default function DoctorPage() {
  return (
    <div>
      <NavBar doctorName="Dr. Strange" color="#4EC6C7" />
      <div
        style={{
          padding: "3vw",
          paddingLeft: "3vw",
          paddingRight: "3vw",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <Grid container item xs={11.8} sm={5.8}>
            <NextPatient
              patientName="Hasta X"
              progress={60}
              session={3}
              therapy="Donuk Omuz Tedavisi"
              date="08:30 - 1 Nisan 2022"
            />
          </Grid>
          <Grid xs={0.0} sm={0.2} />
          <Grid container item xs={11.8} sm={5.8}>
            <TodaysAppointments
              patientName1="Adar Bayan"
              patientName2="Alp Tekirdağ"
              patientName3="Alper Kılınç"
              patientName4="Oğuzhan Taş"
              patientName5="Hasta 5"
              patientName6="Hasta 6"
              patientName7="Hasta 7"
              patientName8="Hasta 8"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
