import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const login = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    var data = {
      username: loginData.username,
      password: loginData.password,
    };

    console.log(data);
    navigate("/doctor-page");

    LoginDataService.authenticate(data)
      .then((response: any) => {
        console.log("then");
        console.log(response.data);
        // if(response) navigate("/doctor-page");
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
    </div>
  );
};

export default Login;
