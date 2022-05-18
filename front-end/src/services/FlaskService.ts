import http from "../http-flask";

const getData = () => {
    return http.get<any>("/data");
};

const FlaskService = {
    getData,
};
export default FlaskService;