import http from "../http-flask";

const getData = () => {
    return http.get<any>("/data");
};

const sendExerciseInfo = (data: any) => {
    return http.post<any>("/data", data);
}

const endExercise = (data: any) => {
    return http.post<any>("/finished", data);
}

const FlaskService = {
    getData,
    sendExerciseInfo,
    endExercise,
};
export default FlaskService;