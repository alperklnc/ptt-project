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
import { IExerciseData } from "../../types/Exercise";

interface IProps {
  sessionId: number;
}

function createData(
  exerciseId: number,
  weakSide: string,
  type: string,
  prevAngle: number,
  currentAngle: number,
  progression: number,
  optimalAngle: number,
  totalReocary: number
) {
  return {
    exerciseId,
    weakSide,
    type,
    prevAngle,
    currentAngle,
    progression,
    optimalAngle,
    totalReocary,
  };
}

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

  var rows: IExerciseData[] = [];
  const [exercises, setExercises] = useState(rows);

  useEffect(() => {
    createRows();
  }, []);

  function createRows() {
    rows = [];
    PatientDataService.getExerciseBySessionId(props.sessionId)
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          var row = createData(
            response.data[index].id,
            response.data[index].weak,
            response.data[index].name,
            110,
            120,
            9.09,
            response.data[index].optimum,
            80
          );
          rows.push(row);
        }
        setExercises(rows);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  }

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

  const startExercise = (data: IExerciseData) => {
    var type = data.type;

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

    var _weakSide = "";
    if (data.weakSide == "SOL") {
      _weakSide = "LEFT";
    } else if (data.weakSide == "SAĞ") {
      _weakSide = "RIGHT";
    }
    var exerciseInfo = {
      id: data.exerciseId,
      weak: _weakSide,
      type: exerciseType,
    };

    sendExerciseInfo(exerciseInfo);
  };

  if (exercises === null) {
    return <h2>Loading exercises...</h2>;
  }
  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
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
            {exercises.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => startExercise(row)}
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
    </div>
  );
};

export default ExerciseTable;
