import http from "../http-common";
import IDoctorData from "../types/Doctor";
const getAll = () => {
  return http.get<Array<IDoctorData>>("/doctor");
};
const get = (name: string) => {
  return http.get<IDoctorData>(`/doctor/${name}`);
};
const create = (data: IDoctorData) => {
  return http.post<IDoctorData>("/patients", data);
};

const authenticate = (data: IDoctorData) => {
    return http.post<IDoctorData>("/doctor", data);
  };

const PatientService = {
  getAll,
  get,
  create,
  authenticate,
};
export default PatientService;