import http from "../http-common";
import { IPatientData } from "../types/Patient";
import { ISessionData } from "../types/Session";

const getAll = () => {
  return http.get<Array<IPatientData>>("/api/patient");
};
const getPatientById = (id: number) => {
  return http.get<IPatientData>(`/api/patient/${id}`);
};
const getTodaysPatients = () => {
  return http.get<Array<ISessionData>>(`/api/session`);
};
const getExerciseBySessionId = (sessionId: number) => {
  return http.get<any>(`/api/exercise/${sessionId}`);
}
const getSession = (patientId: number) => {
  return http.get<any>(`/api/session/${patientId}`);
}
const getCurrentSession = (patientId: number) => {
  return http.get<any>(`/api/currentsession/${patientId}`);
};


const endSession = (id: number) => {
  return http.post<any>(`/api/completesession/${id}`);
}


const create = (data: IPatientData) => {
  return http.post<IPatientData>("/api/patient", data);
};
const update = (fname: string, data: IPatientData) => {
  return http.put<any>(`/api/patient/${fname}`, data);
};
const remove = (fname: string) => {
  return http.delete<any>(`/api/patient/${fname}`);
};
const removeAll = () => {
  return http.delete<any>(`/api/patient`);
};
const findByName = (fname: string) => {
  return http.get<Array<IPatientData>>(`/api/patient?fname=${fname}`);
};
const PatientService = {
  getAll,
  getById: getPatientById,
  create,
  update,
  remove,
  removeAll,
  findByName,
  getTodaysPatients,
  getExerciseBySessionId,
  getSession,
  getCurrentSession,
  endSession,
};
export default PatientService;