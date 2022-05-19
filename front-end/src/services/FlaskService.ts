import http from "../http-flask";

const getData = () => {
    return http.get<any>("/data");
};

const sendExerciseInfo = (data: any) => {
    return http.post<any>("/data", data);
}

const FlaskService = {
    getData,
    sendExerciseInfo,
};
export default FlaskService;