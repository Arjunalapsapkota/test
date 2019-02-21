import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    };
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  };
  handlesubmit = async event => {
    event.preventDefault();
    let res = await fetch("/auth/signin", {
      method: "POST",
      body: JSON.stringify(this.state)
    });

    let data = await res.json();
    console.log(data);
    // saving the received token to the local storage
    if (data !== 404) localStorage.setItem("$tkn", data.token);
    else console.log("please provide valid credentials");
  };
  handlegoogle = async e => {
    e.preventDefault();
    console.log("i am clicked");
    //axios.get("http://localhost:3001/auth/google");
    let res = await fetch("http://localhost:3001/auth/google", {
      method: "GET"
    });
    console.log("getting back here");
    //save res to local storage

    let data = await res.json();
    console.log(data);
    // saving the received token to the local storage
    if (data !== 404) localStorage.setItem("$tkn", data.token);
    else console.log("please provide valid credentials");
  };
  render() {
    return (
      <Fragment>
        <HeaderLogin />
        <div className="login-form">
          <form>
            <h2>
              <strong>Login</strong>
            </h2>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                placeholder="email"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-row signUpButtonWrap">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                onClick={this.handlesubmit}
                className="btn btn-primary login-btn"
              >
                Login
              </button>
            </div>
            <small>Login with </small>
            <a href="/api/tiktok">
              <i className="fab fa-facebook-square mr-3 fa-lg" />
            </a>
            <a href="/auth/instagram">
              <i className="fab fa-instagram mr-3 fa-lg" />
            </a>

            {/* <button onClick={this.handlegoogle}>
              <i className="fab fa-google mr-3 fa-lg" />
            </button> */}
            <a href="http://localhost:3001/auth/google">
              <i className="fab fa-google mr-3 fa-lg" />
            </a>
            {/* <Link to="/auth/google">
              <button className="btn btn-primary signUp-btn">
                <i className="fab fa-google mr-3 fa-lg" />
              </button>
            </Link> */}
          </form>
          <hr />
          <h3 className="leadToSignUp">Don't have an account?</h3>
          <Link to="/auth/signUp">
            <button className="btn btn-primary signUp-btn">SIGN UP</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default Login;
