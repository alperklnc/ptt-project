import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  doctorName?: string;
  color?: string;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#EBF9F9",
  "&:hover": {
    backgroundColor: alpha("#EBF9F9", 0.25),
  },
  color: "black",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledIconButton = styled(IconButton)((theme) => ({
  fontSize: screen.width / 80,
  padding: screen.width / 70,
  "&:hover": { backgroundColor: "transparent" },
}));

const ScreenSizeDetector = require("screen-size-detector");
const screen = new ScreenSizeDetector();

const NavBar: React.FC<Props> = (props) => {
  const handleHomePageClick = () => {
    window.location.href = "/doctor-page";
  };
  const handlePatientsClick = () => {
    window.location.href = "/patients";
  };
  const handleNewPatientClick = () => {
    window.location.href = "/new-patient";
  };

  const menuId = "primary-search-account-menu";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "#ffffff",
            color: props.color,
            minHeight: screen.height / 10,
            paddingLeft: screen.width / 16,
            paddingRight: screen.width / 16,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {props.doctorName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <StyledIconButton
              aria-label="home page"
              size="medium"
              color="inherit"
              onClick={handleHomePageClick}
            >
              Ana Sayfa
            </StyledIconButton>
            <StyledIconButton
              size="large"
              color="inherit"
              onClick={handlePatientsClick}
            >
              Hastalar
            </StyledIconButton>
            <StyledIconButton size="large" onClick={handleNewPatientClick}>
              <Typography
                style={{
                  backgroundColor: props.color,
                  color: "white",
                  fontSize: screen.width / 75,
                  padding: "8px 30px",
                  borderRadius: "10px",
                }}
              >
                Yeni Hasta
              </Typography>
            </StyledIconButton>
          </Box>
        </Toolbar>
        <Box
          style={{
            backgroundColor: props.color,
            minHeight: "10px",
          }}
        ></Box>
      </AppBar>
    </Box>
  );
};

NavBar.defaultProps = {
  doctorName: "Dr. Özden Özyemişçi",
  color: "#4EC6C7",
};

export default NavBar;
