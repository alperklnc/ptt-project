import * as React from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style-sheet.css";

import IPatientData from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

interface IProps {
  data?: IPatientData;
}

class PatientInfo extends React.Component<IProps> {
  componentWillMount() {
    console.log("componentWillMount - Patient Info");
  }
  constructor(props: IProps) {
    console.log("constructor - Patient Info");
    super(props);
  }

  render() {
    //console.log(this.props.data);
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
            height: "5vh",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Grid item xs={3}>
            <Typography className="PatientInfo-Text">
              {this.props.data?.patientFirstName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="PatientInfo-Text">
              Donuk Omuz Tedavisi
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="PatientInfo-Text">Seans 3/10</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="PatientInfo-Text">
              Toplam İyileşme: %60
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
}
export default PatientInfo;
