import React, { useState, ChangeEvent } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NavBar from "../components/NavBar";

import "../css/NewPatient.css";
import IPatientData from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

const NewPatient: React.FC = () => {
  const initialPatientState = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    reqSession: "",
    session: 0,
    recovery: 0,
    makara: false,
  };

  const [patient, setPatient] = useState<IPatientData>(initialPatientState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setPatient({ ...patient, [name]: value });
  };

  const savePatient = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    var data = {
      fname: patient.fname,
      lname: patient.lname,
      email: patient.email,
      phone: patient.phone,
      reqSession: patient.reqSession,
      session: patient.session,
      recovery: patient.recovery,
      makara: patient.makara,
    };

    console.log(data);

    PatientDataService.create(data)
      .then((response: any) => {
        setPatient({
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          phone: response.data.phone,
          reqSession: response.data.reqSession,
          session: response.data.session,
          recovery: response.data.recovery,
          makara: response.data.makara,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newPatient = () => {
    setPatient(initialPatientState);
    setSubmitted(false);
  };

  return (
    <div>
      <NavBar />
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPatient}>
            Add
          </button>
        </div>
      ) : (
        <div className="container">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FDFDFD",
              padding: "4vh",
              boxShadow: "10px 10px 10px #E8E8E8",
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
                Yeni Hasta Kayıt
              </Typography>
              <Divider />
              <TextField
                label="Ad"
                variant="standard"
                name="fname"
                value={patient.fname}
                onChange={handleInputChange}
              />
              <TextField
                label="Soyad"
                variant="standard"
                name="lname"
                value={patient.lname}
                onChange={handleInputChange}
              />
              <TextField
                label="Mail"
                variant="standard"
                name="email"
                value={patient.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Telefon"
                variant="standard"
                name="phone"
                value={patient.phone}
                onChange={handleInputChange}
              />
              <TextField
                label="Gerekli Seans Sayısı"
                variant="standard"
                name="reqSession"
                value={patient.reqSession}
                onChange={handleInputChange}
              />
              <Grid>
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
                        value={patient.makara}
                        defaultChecked={patient.makara}
                        name="makara"
                        onChange={handleInputChange}
                      />
                    }
                    label="Makara"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked onChange={handleInputChange} />
                    }
                    label="Sopa"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} />}
                    label="Omuz İzometrik"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} />}
                    label="Omuz Egzersiz Lastiği"
                  />
                  <FormControlLabel control={<Checkbox />} label="Top" />
                  <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} />}
                    label="Duvarda Kaydırma"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} />}
                    label="Omuz Serbest Ağırlık"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked onChange={handleInputChange} />
                    }
                    label="Codman"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} />}
                    label="Germe"
                  />
                </FormGroup>
              </Grid>
            </div>
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
              Yeni Kayıt
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPatient;
