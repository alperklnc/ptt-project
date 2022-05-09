import http from "../http-common";
import IPatientData from "../types/Patient";

const getAll = () => {
  return http.get<Array<IPatientData>>("/patient");
};
const get = (fname: string) => {
  return http.get<IPatientData>(`/patient/${fname}`);
};
const create = (data: IPatientData) => {
  return http.post<IPatientData>("/patient", data);
};
const update = (fname: string, data: IPatientData) => {
  return http.put<any>(`/patient/${fname}`, data);
};
const remove = (fname: string) => {
  return http.delete<any>(`/patient/${fname}`);
};
const removeAll = () => {
  return http.delete<any>(`/patient`);
};
const findByName = (fname: string) => {
  return http.get<Array<IPatientData>>(`/patient?fname=${fname}`);
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