import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
          marginBottom: "1vh",
          border: "0px solid",
          backgroundColor: "transparent",
        }}
      >
        <Box
          className="PatientHolder-Box"
          style={{
            backgroundColor: props.color,
            width: "5vw",
          }}
        >
          <Typography
            className="PatientHolder-Text"
            style={{ color: "white", textAlign: "center" }}
          >
            {props.hour}
          </Typography>
        </Box>
        <Box
          className="PatientHolder-Box"
          style={{
            border: "2px solid #4EC6C7",
            borderColor: props.color,
            width: "30vw",
          }}
        >
          <Typography className="PatientHolder-Text">
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
