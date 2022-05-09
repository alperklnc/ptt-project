import http from "../http-common";
import IPatientData from "../types/Patient";
const getAll = () => {
  return http.get<Array<IPatientData>>("/patients");
};
const get = (name: string) => {
  return http.get<IPatientData>(`/patients/${name}`);
};
const create = (data: IPatientData) => {
  return http.post<IPatientData>("/patients", data);
};
const update = (name: string, data: IPatientData) => {
  return http.put<any>(`/patients/${name}`, data);
};
const remove = (name: string) => {
  return http.delete<any>(`/patients/${name}`);
};
const removeAll = () => {
  return http.delete<any>(`/patients`);
};
const findByName = (name: string) => {
  return http.get<Array<IPatientData>>(`/patients?title=${name}`);
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