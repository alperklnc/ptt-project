import React, { useState, ChangeEvent } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import NavBar from "../components/NavBar";

import "../css/NewPatient.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { IPatientData } from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

var exercisesList: string[] = [];

function remove(array: string[], element: string) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === element) {
      var spliced = array.splice(i, 1);
      return spliced;
    }
  }
}

const NewPatient: React.FC = () => {
  const initialPatientState = {
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
    //session: 0,
    recovery: 0,
  };
  
  const [patient, setPatient] = useState<IPatientData>(initialPatientState);
  const [weakSide, setWeakSide] = useState<string>("SOL");
  const [disease, setDisease] = useState<string>("Donuk Omuz");
  const [isMan, setGender] = useState<boolean>(false);

  const [openInfo, setOpenInfo] = React.useState(false);

  const closeInfo = () => {
    setOpenInfo(false);
    window.location.reload();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    var sessionAmount = patient.sessionAmount ? patient.sessionAmount : 0;
    if (target.name === "sessionAmount") {
      sessionAmount = target.value ? parseInt(target.value) : 0;
    }

    var period = patient.period ? patient.period : 0;
    if (target.name === "period") {
      period = target.value ? parseInt(target.value) : 0;
    }

    var isMan = false;

    if (target.type === "radio") {
      isMan = (event.target as HTMLInputElement).value === "male";
      setGender(isMan);
    }

    if (target.type === "checkbox") {
      if (target.id === "exercise") {
        if (target.checked) {
          exercisesList.push(target.name);
        } else {
          remove(exercisesList, target.name);
        }
      }
    }

    setPatient({
      ...patient,
      ["exercises"]: exercisesList,
      [name]: value,
      ["period"]: period,
      ["sessionAmount"]: sessionAmount,
    });
  };

  const savePatient = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    var data = {
      id: patient.id,
      patientFirstName: patient.patientFirstName,
      patientLastName: patient.patientLastName,
      patientEmail: patient.patientEmail,
      patientTellNo: patient.patientTellNo,
      isMan: isMan,
      patientDisease: disease,
      sessionAmount: patient.sessionAmount,
      period: patient.period,
      weak: weakSide,
      sessionHour: patient.sessionHour,
      exercises: patient.exercises,
      optimum: patient.optimum,
      //session: patient.session,
      recovery: patient.recovery,
    };
    
    console.log(data);

    PatientDataService.create(data)
      .then((response: any) => {
        setOpenInfo(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2vw",
          alignItems: "center",
        }}
      >
        <Grid className="box-shadow">
          <Typography
            style={{
              fontSize: "1.5vw",
              padding: "2vw 4vw 0vw",
            }}
          >
            Yeni Hasta Kay??t
            <Divider />
          </Typography>

          <Grid
            container
            direction="row"
            style={{
              padding: "0vw 2vw 0vw",
              width: "44vw",
            }}
          >
            <Grid
              item
              style={{
                width: "20vw",
                padding: "2vw",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    fontSize: "1.3vw",
                  }}
                >
                  Ki??isel Bilgiler
                </Typography>
                <Divider />
                <TextField
                  label="Ad"
                  variant="standard"
                  name="patientFirstName"
                  value={patient.patientFirstName}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Soyad"
                  variant="standard"
                  name="patientLastName"
                  value={patient.patientLastName}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Mail"
                  variant="standard"
                  name="patientEmail"
                  placeholder="email@email.com"
                  value={patient.patientEmail}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Telefon"
                  variant="standard"
                  name="patientTellNo"
                  value={patient.patientTellNo}
                  onChange={handleInputChange}
                />
                <FormControl style={{ paddingTop: "1vw" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Cinsiyet
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    onChange={handleInputChange}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Kad??n"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Erkek"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <Grid
              item
              style={{
                width: "20vw",
                padding: "2vw",
                paddingBottom: "0vw",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    fontSize: "1.3vw",
                  }}
                >
                  Seans Bilgileri
                </Typography>
                <Divider />
                <div style={{
                    paddingBottom: "10px"
                  }}>
                  <Typography
                  style={{
                    fontSize: "1vw",
                    paddingTop: "10px"
                  }}
                >
                  Hastal??k Tipi
                </Typography>
                
                <select id="disease" name="patientDisease"
                  value={disease} 
                  onChange={(e) => setDisease(e.target.value)}
                  >
                  <option value="Donuk Omuz">Donuk Omuz</option>
                </select>
                </div>
                <div style={{
                    paddingBottom: "10px"
                  }}>
                  <Typography
                  style={{
                    fontSize: "1vw",
                  }}
                >
                  Zay??f Taraf
                </Typography>
                
                <select id="weakSide" name="weak"
                  value={weakSide} 
                  onChange={(e) => setWeakSide(e.target.value)}
                  >
                  <option value="SOL">Sol</option>
                  <option value="SA??">Sa??</option>
                </select>
                </div>

                <TextField
                  label="Gerekli Seans Say??s??"
                  variant="standard"
                  name="sessionAmount"
                  value={patient.sessionAmount}
                  onChange={handleInputChange}
                  
                />

                <TextField
                  label="Seans S??kl??????"
                  variant="standard"
                  name="period"
                  value={patient.period}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Seans Saati"
                  variant="standard"
                  name="sessionHour"
                  placeholder="14:30"
                  value={patient.sessionHour}
                  onChange={handleInputChange}
                />

                <TextField
                  label="Optimum A????"
                  variant="standard"
                  name="optimum"
                  value={patient.optimum}
                  onChange={handleInputChange}
                />

                <Typography
                  style={{
                    fontSize: "1vw",
                    marginTop: "3vh",
                  }}
                >
                  Donuk Omuz Egzersizleri
                </Typography>
                <Divider />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Makara ??n"
                        id="exercise"
                        onChange={handleInputChange}
                      />
                    }
                    label="Makara ??n"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Makara Yan"
                        id="exercise"
                        onChange={handleInputChange}
                      />
                    }
                    label="Makara Yan"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Sopa ??n"
                        id="exercise"
                        onChange={handleInputChange}
                      />
                    }
                    label="Sopa ??n"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Sopa Yan"
                        id="exercise"
                        onChange={handleInputChange}
                      />
                    }
                    label="Sopa Yan"
                  />
                </FormGroup>
              </div>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2vw",
              paddingTop: "0vw",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              style={{
                borderRadius: 10,
                backgroundColor: "#4EC6C7",
                marginTop: "3vh",
                padding: "8px",
                fontSize: "2vh",
                textTransform: "none",
                width: "12vw",
                alignSelf: "center",
              }}
              variant="contained"
              onClick={savePatient}
            >
              Yeni Kay??t
            </Button>
          </div>
        </Grid>

        <Dialog
        open={openInfo}
        onClose={closeInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hasta Ba??ar??yla Eklendi"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeInfo}>Tamam</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
};

export default NewPatient;
