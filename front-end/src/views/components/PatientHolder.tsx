import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";
import { IPatientData } from "../../types/Patient";

interface PatientHolderProps {
  sessionData: ISessionData;
}

const PatientHolder: React.FC<PatientHolderProps> = (props) => {
  const navigate = useNavigate();

  var _patientData: IPatientData = {
    id: -1,
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientTellNo: "",
    isMan: false,
    patientDisease: "",
    sessionAmount: 0,
    period: 0,
    weak: "",
    sessionHour: "",
    exercises: [],
    optimum: 0,
    session: 0,
    recovery: 0,
  };

  const [patientData, setPatientData] = useState<IPatientData>(_patientData);

  useEffect(() => {
    PatientDataService.getById(props.sessionData.pt_id)
    .then((response) => {
      setPatientData(response.data);
    }).catch((e: Error) => {
      console.log(e);
    });
  }, []);

  const startExercise = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(patientData.id);

    navigate("/patient-page", {
      state: {
        patientId: patientData.id,
      }
    });
  };

  return (
    <div onClick={startExercise}>
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
            backgroundColor: "#4EC6C7",
            width: "4vw",
          }}
        >
          <Typography
            className="PatientHolder-Text"
            style={{ color: "white", textAlign: "center" }}
          >
            {props.sessionData.time}
          </Typography>
        </Box>
        <Box
          className="PatientHolder-Box"
          style={{
            border: "2px solid #4EC6C7",
            borderColor: "#4EC6C7",
            width: "30vw",
          }}
        >
          <Typography className="PatientHolder-Text">
            {patientData.patientFirstName + " " + patientData.patientLastName}
          </Typography>
        </Box>
      </button>
    </div>
  );
};

export default PatientHolder;
