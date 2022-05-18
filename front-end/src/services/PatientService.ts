import http from "../http-common";
import IPatientData from "../types/Patient";

const getAll = () => {
  return http.get<Array<IPatientData>>("/api/patient");
};
const getById = (id: number) => {
  return http.get<IPatientData>(`/api/patient/${id}`);
};
const getTodaysPatients = async () => {
  return await http.get<Array<IPatientData>>(`/api/session`);
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
  getById,
  create,
  update,
  remove,
  removeAll,
  findByName,
  getTodaysPatients,
};
export default PatientService;