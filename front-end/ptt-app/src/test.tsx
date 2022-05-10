import React from "react";

export default class Test extends React.Component<{}, { postId: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      postId: "",
    };
  }

  /*
  componentDidMount() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    //fetch("https://reqres.in/api/posts", requestOptions)
    fetch("https://reqres.in/api/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  }
  */

  login() {
    const loginData = {
      username: "alperklnc",
      password: "password",
    };
    console.log(loginData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(loginData),
    };
    fetch("http://localhost:8080/login", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        console.log(data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        //this.setState({ postId: data.id });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  render() {
    const { postId } = this.state;
    return (
      <div className="card text-center m-3">
        <h5 className="card-header">Simple POST Request</h5>
        <div className="card-body">Returned Id: {postId}</div>
        <button onClick={this.login}>Test me</button>
      </div>
    );
  }
}

export { Test };
