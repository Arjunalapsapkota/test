import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";
//import axios from "axios";
class LogIn extends React.Component {
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
    //this.createAccount.sendData(this.state);
    // fetch("/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(this.state)
    // });
    console.log(JSON.stringify(this.state));
    //axios.post("/auth/signup", JSON.stringify(this.state)).then(response => {});
    //   console.log(response.token);
    // });
    let res = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(this.state)
    });

    let data = await res.json();
    console.log(`Hello, ${JSON.stringify(data)}`);
    // saving the received token to the local storage

    localStorage.setItem("$tkn", data.token);
  };
  render() {
    return (
      <Fragment>
        <HeaderLogin />
        <div className="login-form">
          <form>
            <h2>Sign Up</h2>
            <p className="text-center">
              Please provide your email and password for new SIFTZ Account
            </p>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Password"
                name="password"
                value={this.state.password}
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
                className="btn btn-primary login-btn"
                onClick={this.handlesubmit}
              >
                SignUp
              </button>
            </div>
          </form>
          <small>Sign up using : </small>
          <a href="/api/tiktok">
            <i className="fab fa-facebook-square mr-3 fa-lg" />
          </a>
          <a href="/api/tiktok">
            <i className="fab fa-instagram mr-3 fa-lg" />
          </a>
          <a href="/api/tiktok">
            <i className="fab fa-google mr-3 fa-lg" />
          </a>
          <h3 className="leadToSignUp">Already have an account?</h3>
          <Link to="/auth/login">
            <button className="btn btn-primary signUp-btn">LOG IN</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default LogIn;
