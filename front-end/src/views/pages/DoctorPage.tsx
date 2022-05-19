import * as React from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import TodaysAppointments from "../components/TodaysAppointments";
import NextPatient from "../components/NextPatient";

import {IPatientData} from "../../types/Patient";
import PatientDataService from "../../services/PatientService";

import useStarshipsService from '../../types/useService';

interface Props {
  name?: string;
  type?: string;
  reqSession?: number;
  session?: number;
  progress?: number;
  date?: string;
}

//class DoctorPage extends React.Component 
const DoctorPage: React.FC<Props> = (props) =>{

  /*
  var todaysPatients : IPatientData[] = [];
  var nextPatient : IPatientData = {
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientTellNo: "",
    isMan: false,
    patientDisease: "",
    sessionAmount: 0,
    period: 0,
    sessionHour: "",
    exercises: [],
    session: 0,
    recovery: 0,
  };
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      PatientDataService.getTodaysPatients()
      .then((response: any) => {
        todaysPatients = response.data;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  
      // waits for 1000ms
      await sleep(1000);


      nextPatient = todaysPatients[0];
    console.log(nextPatient);
    
      return 'Hello World';
    };
  
    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // what will be logged to the console?
    console.log(result);
    
  }, []);

  
  nextPatient : IPatientData;
  todaysPatients: IPatientData[] = [];

  constructor(props: IPatientData) {
    console.log("constructor - Doctor Page");
    super(props);

    this.nextPatient = {
      patientFirstName: "",
      patientLastName: "",
      patientEmail: "",
      patientTellNo: "",
      isMan: false,
      patientDisease: "",
      sessionAmount: 0,
      period: 0,
      sessionHour: "",
      exercises: [],
      session: 0,
      recovery: 0,
    };
    //this.getTodaysPatients(this.todaysPatients);
    this.request(this.todaysPatients).then((value: IPatientData[]) => {
      //console.log(value);
      this.todaysPatients = value;
    }).catch((e: Error) => {
      console.log(e);
    });
    console.log(this.todaysPatients);
  }

  request = async (todaysPatients : IPatientData[]): Promise<IPatientData[]> => {
    const response= await PatientDataService.getTodaysPatients();
    const payload = response.data;
    console.log(payload);
    this.todaysPatients = payload;
    console.log(this.todaysPatients);
    this.nextPatient = this.todaysPatients[0];
    console.log(this.nextPatient);
    return todaysPatients;
  };

  getTodaysPatients = async (todaysPatients: Array<IPatientData>) => {
    await PatientDataService.getTodaysPatients()
    .then((response: any) => {
      todaysPatients = response.data;
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }
  
  getNextPatient = (nextPatient: IPatientData) => {

  };
  */
  const service = useStarshipsService();

  //render(){
  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "3vw",
          paddingLeft: "3vw",
          paddingRight: "3vw",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
          }}
        >
          <Grid container item xs={11.8} sm={5.8}>
          <NextPatient
              name={"props.name"}
              progress={30}
              reqSession={10}
              session={1}
              type={"props.type"}
              date={"props.date"}
            />

          </Grid>
          <Grid xs={0.0} sm={0.2} />
          <Grid container item xs={11.8} sm={5.8}>
            <TodaysAppointments
              patientName1="Adar Bayan"
              patientName2="Alp Tekirdağ"
              patientName3="Alper Kılınç"
              patientName4="Oğuzhan Taş"
              patientName5="Hasta 5"
              patientName6="Hasta 6"
              patientName7="Hasta 7"
              patientName8="Hasta 8"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
        //}
};

export default DoctorPage;
