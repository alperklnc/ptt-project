import * as React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style-sheet.css";

interface Props {
  type?: string;
  session?: number;
}

const ExerciseInfo: React.FC<Props> = (props) => {
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
          height: "3vh",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Grid item xs={3}>
          <Typography className="PatientInfo-Text">
            {props.type} Egzersizi
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
};

export default ExerciseInfo;
