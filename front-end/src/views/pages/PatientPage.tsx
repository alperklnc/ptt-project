import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import pdf from "../../Sample.pdf";

import NavBar from "../components/NavBar";
import PatientInfo from "../components/PatientInfo";
import ExerciseTable from "../components/ExerciseTable";

import { IPatientData } from "../../types/Patient";
import { ISessionData } from "../../types/Session";
import PatientDataService from "../../services/PatientService";

import "../css/style-sheet.css";

const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const patientId = state.patientId;

  var [sessionData, setSessionData] = useState<ISessionData[]>([]);
  var [sessionId, setSessionId] = useState(-1);
  var [hasZero, setHasZero] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openPDFAlert, setOpenPDFAlert] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);

  useEffect(() => {
    getCurrentSession();
  }, []);

  const [currentSession, setCurrentSession] = useState(-1);

  function getSessionId(patientId: number, currentSession:number) {
    PatientDataService.getSession(patientId)
      .then((response) => {
        setSessionData(response.data);
        setSessionId(response.data[currentSession].id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return "";
  };

  function getCurrentSession(){
    PatientDataService.getCurrentSession(patientId)
    .then((response) => {
      var currentSession = response.data;
      getSessionId(patientId, currentSession);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const endSession = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if(hasZero){
      setOpenAlert(true);
    } else {
      setOpenComment(true);
    }
  };

  function openPDF () {
    if(hasZero){
      setOpenPDFAlert(true);
    } else {
      window.open(pdf);
    }
  }

  const updateData = (_hasZero: boolean):void => {
    if(_hasZero){
      setHasZero(true);
    }
  }

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const closePDFAlert = () => {
    setOpenPDFAlert(false);
  }

  const closeComment = () => {
    setOpenComment(false);

    console.log(`Session ${sessionId} is finished`);
    PatientDataService.endSession(sessionId)
    .then((response) => {
      console.log(response);
      navigate('/doctor-page');
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };


  if (sessionId === null || sessionId == -1) {
    return <h2>Loading patient page...</h2>;
  }
  return (
    <div>
      <NavBar />
      <PatientInfo patientId={patientId} />
      <div
        style={{
          padding: "3.5vw",
          paddingLeft: "3.5vw",
          paddingRight: "3.5vw",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <ExerciseTable
          updateData={updateData}
          patientId={patientId} 
          sessionData={sessionData} 
          sessionId={sessionId}></ExerciseTable>
        </Grid>
        <Grid container direction="column" alignItems="center" style={{paddingTop:"40px"}}>
          <div>
            <Button 
              className="NextPatient-Button"
              onClick={endSession}
              >
                Seans?? Bitir
            </Button>
          </div>
          <div>
            <a className="PDF-Button" onClick={openPDF} target="_blank" rel="noreferrer">
              Hasta Geli??im Raporu
            </a>
          </div>
        </Grid>
        <Dialog
        open={openAlert}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seans Tamamlanmad??!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            T??m egzersizler tamamlanmadan seans?? bitiremezsiniz. L??tfen mevcut seanstaki de??erlerin 0 olmad??????na emin olun.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert}>Tamam</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPDFAlert}
        onClose={closePDFAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seans Tamamlanmad??!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            T??m egzersizler tamamlanmadan Hasta Geli??im Raporu olu??turamazs??n??z. L??tfen mevcut seanstaki de??erlerin 0 olmad??????na emin olun.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePDFAlert}>Tamam</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openComment} onClose={closeComment}>
        <DialogTitle>Ac?? ??l????m??</DialogTitle>
        <DialogContent>
          <DialogContentText>
            L??tfen seans s??ras??nda hisseti??iniz maximum a???? e??i??ini giriniz (1-10 aras??nda).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ac?? De??eri"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeComment}>G??nder</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
};
export default PatientPage;
