export default interface IPatientData {
  id?: number,
  patientFirstName: string,
  patientLastName: string,
  patientEmail: string,
  patientTellNo: string,
  isMan: boolean,
  patientDisease: string,
  reqSession: string,
  frequency: string,
  exercises: Array<String>,
  session: number,
  recovery: number,
  }