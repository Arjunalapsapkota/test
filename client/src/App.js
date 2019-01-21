import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//,
//Link,
//Redirect
import Home from "./components/Home";
import MySiftz from "./components/MySiftz";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import { RedirectUser } from "./components/Login/RedirectUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isloggedin: false };
    //this.PrivateRoute = this.PrivateRoute.bind(this);
  }

  // componentDidMount() {
  //   const presence = window.localStorage.getItem("token");
  //   this.setState({ isloggedin: presence ? true : false });
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/mySiftz"
            // component={this.state.isloggedin ? MySiftz : Login}
            component={MySiftz}
          />
          <Route
            path="/search"
            // component={this.state.isloggedin ? Search : Login}
            component={Search}
          />
          <Route exact path="/signup" component={SignUp} />

          <Route
            path="/login"
            // component={this.state.isloggedin ? Login : Login}
            component={Login}
          />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
