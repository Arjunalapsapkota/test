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
    if (data != 404) localStorage.setItem("$tkn", data.token);
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
                class="form-control"
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
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
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
            <a href="#">
              <i className="fab fa-instagram mr-3 fa-lg" />
            </a>
            <button
              onClick={async e => {
                e.preventDefault();
                console.log("i am clicked");
                axios.get("/auth/google");
              }}
            >
              <i className="fab fa-google mr-3 fa-lg" />
            </button>
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
