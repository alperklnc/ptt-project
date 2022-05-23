import * as React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";

import { IPatientData } from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

import "../css/NewPatient.css";

const Patients: React.FC = () => {
  var _todaysPatients: IPatientData[] = [];
  const [todaysPatients, setTodaysPatients] = useState(_todaysPatients);

  useEffect(() => {
    createPatients();
  }, []);

  function createPatients() {
    _todaysPatients = [];
    PatientDataService.getAll()
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          _todaysPatients.push(response.data[index]);
        }
        setTodaysPatients(_todaysPatients);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  }

  if (todaysPatients === null) {
    return <h2>Loading patients...</h2>;
  }
  return (
    <div>
      <NavBar />
      <div>
        <Grid
          container
          className="Container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {todaysPatients.map((item) => {
            return (
              <div
                style={{
                  paddingTop: "10px",
                }}
              >
                <PatientInfo patientId={item.id} width="90vw" hasTop={true} />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
export default Patients;
