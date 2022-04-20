import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ScreenSizeDetector = require('screen-size-detector');
const screen = new ScreenSizeDetector();

interface PatientHolderProps {
  patientName: string;
  hour: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
}

const PatientHolder: React.FC<PatientHolderProps> = (props) => {
  const onClick = () => (window.location.href = "http://github.com");

  return (
    <div onClick={onClick}>
      <button
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: screen.height/70,
          border: "0px solid",
          backgroundColor: "transparent",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: props.color,
            height: screen.height/22,
            width: screen.width/20,
          }}
        >
          <Typography
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              fontSize: screen.width/90,
            }}
          >
            {props.hour}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "2px solid #4EC6C7",
            borderColor: props.color,
            height: screen.height/22,
            width: screen.width/3.5,
          }}
        >
          <Typography
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              paddingLeft: "15px",
              fontSize: screen.width/90,
            }}
          >
            {props.patientName}
          </Typography>
        </Box>
      </button>
    </div>
  );
};

PatientHolder.defaultProps = {
  width: "500px",
  height: "40px",
  color: "#4EC6C7",
  fontSize: "20px",
};

export default PatientHolder;
