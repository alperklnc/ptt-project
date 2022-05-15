import http from "../http-common";
import IPatientData from "../types/Patient";

const getAll = () => {
  return http.get<Array<IPatientData>>("/api/patient");
};
const get = (fname: string) => {
  return http.get<IPatientData>(`/api/patient/${fname}`);
};
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
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
export default PatientService;