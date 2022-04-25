import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NavBar from "../nav-bar/NavBar";

import "./NewPatient.css";

export default function NewPatient() {
  const [term, setTerm] = useState("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something
    alert(term);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div>
      <NavBar doctorName="Dr. Strange" color="#4EC6C7" />
      <div className="container">
        <form
          onSubmit={submitForm}
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
            <TextField label="Ad" variant="standard" />
            <TextField label="Soyad" variant="standard" />
            <TextField label="Mail" variant="standard" />
            <TextField label="Telefon" variant="standard" />
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
                  control={<Checkbox defaultChecked />}
                  label="Makara"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Sopa"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Omuz İzometrik"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Omuz Egzersiz Lastiği"
                />
                <FormControlLabel control={<Checkbox />} label="Top" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Duvarda Kaydırma"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Omuz Serbest Ağırlık"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Codman"
                />
                <FormControlLabel control={<Checkbox />} label="Germe" />
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
          >
            Yeni Kayıt
          </Button>
        </form>
      </div>
    </div>
  );
}
