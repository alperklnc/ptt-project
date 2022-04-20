import * as React from "react";
import Typography from "@mui/material/Typography";

import "./DoctorPage.css";

const ScreenSizeDetector = require('screen-size-detector');
const screen = new ScreenSizeDetector();

interface Props {
  title: string;
  color?: string;
  backgroundColor?: string;
  height?: string;
}

const HeaderContainer: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: props.backgroundColor,
        color: props.color,
        height: screen.height/12,
      }}
    >
      <Typography className="Header">{props.title}</Typography>
    </div>
  );
};

HeaderContainer.defaultProps = {
  color: "white",
  backgroundColor: "#4EC6C7",
  height: "80px",
};

export default HeaderContainer;
