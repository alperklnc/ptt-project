import axios from "axios";
export default axios.create({
  baseURL: "http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/",
  //baseURL: "localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});