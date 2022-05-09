import * as React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}

const HeaderContainer: React.FC<Props> = (props) => {
  return (
    <div className="Header-Container">
      <Typography className="Header-Text">{props.title}</Typography>
    </div>
  );
};

export default HeaderContainer;
