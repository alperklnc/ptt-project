import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
            padding: "3vh",
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
                fontSize: "1.2vw",
              }}
            >
              Yeni Hasta Kayıt
            </Typography>
            <Divider />
            <TextField margin="normal" label="Ad" variant="standard" />
            <TextField margin="normal" label="Soyad" variant="standard" />
            <TextField margin="normal" label="Mail" variant="standard" />
            <TextField margin="normal" label="Telefon" variant="standard" />
            <TextField margin="normal" label="Tedavi" variant="standard" />
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
