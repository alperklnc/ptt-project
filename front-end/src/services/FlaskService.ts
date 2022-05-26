import http from "../http-flask";

const sendExerciseInfo = (data: any) => {
    return http.post<any>("/data", data);
}

const endExercise = (data: any) => {
    return http.post<any>("/data", data);
}



const FlaskService = {
    sendExerciseInfo,
    endExercise
};
export default FlaskService;