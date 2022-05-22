import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FlaskService from "../../services/FlaskService";
import PatientDataService from "../../services/PatientService";

interface IProps {
  sessionId: number;
}

function createData(
  type: string,
  prevAngle: number,
  currentAngle: number,
  progression: number,
  optimalAngle: number,
  totalReocary: number
) {
  return {
    type,
    prevAngle,
    currentAngle,
    progression,
    optimalAngle,
    totalReocary,
  };
}

const rows = [
  createData("Makara Ön", 110, 120, 9.09, 150, 80),
  createData("Makara Yan", 110, 100, -9.09, 170, 58.8),
  createData("Sopa Ön", 50, 55, 10, 110, 50),
  createData("Sopa Yan", 70, 90, 28.5, 120, 75),
];

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4ec6c7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ExerciseTable: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  var exerciseData: [] = [];

  const [exercises, setExercises] = useState(exerciseData);

  useEffect(() => {
    PatientDataService.getExerciseBySessionId(props.sessionId)
      .then((response) => {
        setExercises(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, exerciseData);

  const sendExerciseInfo = (data: any) => {
    console.log("Data wanted to sent");
    console.log(data);
    FlaskService.sendExerciseInfo(data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const startExercise = (type: any) => {
    var exerciseType = 0;
    if (type === "Makara Ön") {
      exerciseType = 1;
    } else if (type === "Makara Yan") {
      exerciseType = 2;
    } else if (type === "Sopa Ön") {
      exerciseType = 3;
    } else if (type === "Sopa Yan") {
      exerciseType = 4;
    }
    var exerciseInfo = {
      id: "275",
      weak: "LEFT",
      type: exerciseType,
    };

    sendExerciseInfo(exerciseInfo);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Egzersizler</StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              2. seans
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              3. Seans
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              İlerleme (%)
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              Optimum Açı
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              Toplam İyileşme (%)
            </StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => startExercise(row.type)}
                style={{ cursor: "pointer" }}
              >
                {row.type}
              </TableCell>
              <TableCell align="center">{row.prevAngle}</TableCell>
              <TableCell align="center">{row.currentAngle}</TableCell>
              <TableCell align="center">{row.progression}</TableCell>
              <TableCell align="center">{row.optimalAngle}</TableCell>
              <TableCell align="center">{row.totalReocary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExerciseTable;
