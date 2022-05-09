import http from "../http-common";
import ILoginData from "../types/Login";

const getAll = () => {
  return http.get<Array<ILoginData>>("/doctor");
};
const get = (name: string) => {
  return http.get<ILoginData>(`/doctor/${name}`);
};

const authenticate = (data: ILoginData) => {
  return http.post<ILoginData>("/login", data);
};

const LoginService = {
  getAll,
  get,
  authenticate,
};
export default LoginService;