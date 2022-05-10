import * as React from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import TodaysAppointments from "../components/TodaysAppointments";
import NextPatient from "../components/NextPatient";

interface Props {
  name?: string;
  type?: string;
  reqSession?: number;
  session?: number;
  progress?: number;
  date?: string;
}

const DoctorPage: React.FC<Props> = (props) => {
  return (
    <div>
      <NavBar />
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
              name={props.name}
              progress={props.progress}
              reqSession={props.reqSession}
              session={props.session}
              type={props.type}
              date={props.date}
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
};

DoctorPage.defaultProps = {
  name: "Adar Bayan",
  type: "Donuk Omuz",
  reqSession: 10,
  session: 3,
  progress: 60,
  date: "10 Mayıs 2022",
};

export default DoctorPage;
