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
import { ISessionData } from "../../types/Session";
import { IPatientData } from "../../types/Patient";
import { AxiosResponse } from "axios";

interface IProps {
  patientId: number;
  sessionId: number;
  sessionData: ISessionData[];
}

function createData(
  exerciseId: number,
  weakSide: string,
  type: string,
  prevAngle: string,
  currentAngle: string,
  progression: string,
  optimalAngle: number,
  totalReocary: string
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

  const [optimum, setOptimum] = useState(0);

  const [currentSessionName, setCurrentSessionName] = useState("0. Seans");
  const [prevSessionName, setPrevSessionName] = useState("---");

  const [currentSessionId, setCurrentSessionId] = useState(0);
  const [prevSessionId, setPrevSessionId] = useState(0);

  var patientData: IPatientData = {
    id: -1,
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientTellNo: "",
    isMan: false,
    patientDisease: "",
    sessionAmount: 0,
    period: 0,
    weak: "",
    sessionHour: "",
    exercises: [],
    optimum: 0,
    session: 0,
    recovery: 0,
  };

  const [patientInfo, setPatientInfo] = useState(patientData);

  useEffect(() => {
    PatientDataService.getById(props.patientId)
    .then((response) => {
      setOptimum(response.data.optimum);
      getCurrentSession(response.data.optimum);
    })
    .catch((e: Error) => {
      console.log(e);
    });
    
  }, []);

  function getCurrentSession(optimum:number){
    PatientDataService.getCurrentSession(props.patientId)
    .then((response) => {
      var currentSession = response.data;

      setCurrentSessionName(`${currentSession + 1}. Seans`);
      getSessionIds(currentSession, optimum);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  function getSessionIds(currentSession:number, optimum: number){
    var isFirst : boolean = false;

    if(currentSession == 0){
      isFirst = true;
      setPrevSessionName("-");
    } else {
      setPrevSessionName(`${currentSession}. Seans`);
    }

    PatientDataService.getSession(props.patientId)
    .then((response) => {
      var currentId = response.data[currentSession].id;
      var prevId = -1;
      setCurrentSessionId(response.data[currentSession].id);
      if(!isFirst){
        prevId = response.data[currentSession-1].id;
        setPrevSessionId(response.data[currentSession-1].id);
      }
      getCurrentSessionInfo(currentSession, optimum, isFirst, currentId, prevId);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  function getCurrentSessionInfo(currentSession: number, optimum: number, isFirst:boolean, currentId:number, prevId:number) {
    PatientDataService.getExerciseBySessionId(currentId)
    .then((response) => {
      var currentAngle:string[] = [];
      for (let index = 0; index < response.data.length; index++) {
        currentAngle[index] = "-";
      }



      if(!isFirst){
        for (let index = 0; index < response.data.length; index++) {
          currentAngle[index] = Math.max.apply(Math, response.data[index].shoulder_angles).toString();
        }
        
        getPrevSessionInfo(optimum, currentAngle, response.data, prevId);
      } else {
        var prevAngle:string[] = [];
        for (let index = 0; index < response.data.length; index++) {
          prevAngle[index] = "-";
        }
        createRows(isFirst, optimum, currentAngle, prevAngle, response.data);
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }
  

  function getPrevSessionInfo(optimum: number, currentAngle: string[], currentSessionData:IExerciseData,  prevId: number) {
    PatientDataService.getExerciseBySessionId(prevId)
    .then((response) => {
      var prevAngle:string[] = [];
      for (let index = 0; index < response.data.length; index++) {
        prevAngle[index] = Math.max.apply(Math, response.data[index].shoulder_angles).toString();
      }

      createRows(false, optimum, currentAngle, prevAngle, currentSessionData);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  function createRows(isFirst:boolean, optimum: number, currentAngle: string[], prevAngle: string[], currentSessionData:any) {
    rows = [];
    for (let index = 0; index < currentSessionData.length; index++) {
      var progression = "-";
      var recovery = "-";
      if(!isFirst){
        progression = (((parseInt(currentAngle[index])-parseInt(prevAngle[index]))/parseInt(prevAngle[index]))*100).toFixed(2);
        recovery = ((parseInt(currentAngle[index])/optimum)*100).toFixed(2);
      }
      var row = createData(
        currentSessionData[index].id,
        currentSessionData[index].weak,
        currentSessionData[index].name,
        prevAngle[index].toString(),
        currentAngle[index],
        progression,
        optimum,
        recovery
      );
      rows.push(row);
    }
    
    setExercises(rows);
  };

  const sendExerciseInfo = (data: any) => {
    navigate("/exercise-page", {
      state: {
        exerciseData: data,
        patientId: props.patientId,
      }
    });
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
      isFinished: false,
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
                {prevSessionName}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">
                {currentSessionName}
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
