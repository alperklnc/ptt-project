const LOGIN_REST_API = "http://localhost:8080/login";

class APIService {
  authenticate() {
    return fetch(LOGIN_REST_API, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then((res) => res.json());
  }
}

export default new APIService();
