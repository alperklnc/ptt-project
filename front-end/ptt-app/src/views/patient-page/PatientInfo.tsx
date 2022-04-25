import * as React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "./PatientPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PatientInfo() {
  return (
    <div>
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        style={{
          display: "flex",
          backgroundColor: "#4EC6C7",
          width: "100vw",
          height: "6vh",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Grid item xs={3}>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "1.2vw",
            }}
          >
            Alp Tekirdağ
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "1.2vw",
            }}
          >
            Donuk Omuz Tedavisi
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "1.2vw",
            }}
          >
            Seans 3/12
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "1.2vw",
            }}
          >
            Toplam İyileşme: %66
          </Typography>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundColor: "#4EC6C7",
          minHeight: "10px",
        }}
      ></Box>
    </div>
  );
}
