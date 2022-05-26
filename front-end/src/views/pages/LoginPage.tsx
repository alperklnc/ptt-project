import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import "../css/Login.css";
import ILoginData from "../../types/Login";
import LoginDataService from "../../services/LoginService";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const initialLoginData = {
    username: "",
    password: "",
  };

  const [loginData, setLoginData] = useState<ILoginData>(initialLoginData);

  const [openAlert, setOpenAlert] = React.useState(false);

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const login = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = new FormData();  
    data.append("username", loginData.username);
    data.append("password", loginData.password);

    LoginDataService.authenticate(data)
      .then((response: any) => {
        if(response.data.status === 200) { 
          navigate("/doctor-page") 
        } else {
          setOpenAlert(true);
        }
      })
      .catch((e: Error) => {
        console.log("error");
        console.log(e);
      });
  };

  return (
    <div className="Page">
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6} md={7}>
          <img
            className="Login-Image"
            src="https://www.care2curephysiotherapy.com/wp-content/uploads/2019/09/physiotherapy_techniques.jpg"
            alt="login-image"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={5}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          <div />
          <div className="Login-Container" style={{ justifyContent: "center" }}>
            <p className="Title">Hesabınıza Giriş Yapın</p>
            <TextField
              margin="normal"
              label="Kullanıcı Adı / e-mail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              name="username"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              type="password"
              label="Şifre"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
              name="password"
              onChange={handleInputChange}
            />
            <a
              className="Forgot-Password"
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Şifremi Unuttum
            </a>
            <div style={{ height: 40 }} />
            <Button
              className="Button"
              style={{
                borderRadius: 10,
                backgroundColor: "#4EC6C7",
                padding: "8px",
                fontSize: "18px",
                textTransform: "none",
                width: "15vw",
                alignSelf: "center",
              }}
              variant="contained"
              onClick={login}
            >
              Giriş Yap
            </Button>
          </div>
          <div />
        </Grid>
      </Grid>
      <Dialog
        open={openAlert}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hatalı Kullanıcı Bilgileri!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yanlış kullanıcı adı ya da şifre. Lütfen bilgilerinizi tekrar kontrol edin.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert}>Tamam</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
