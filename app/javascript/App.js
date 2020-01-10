import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Routes from "./Routes";

import "../assets/stylesheets/application.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state =  {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios.get("/logged_in", {withCredentials: true})
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
    location.href = "/";
  }

  render() {
    return (
      <div>
      <h1>To-Do List</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path = "/"
              render = {props => (
                <Home {...props}
                  handleLogin = {this.handleLogin}
                  handleLogout = {this.handleLogout}
                  loggedInStatus = {this.state.loggedInStatus}
                  />
              )}
              />
            <Route
              exact
              path = "/dashboard"
              render = {props => (
                <Dashboard {...props}
                  handleLogout = {this.handleLogout}
                  loggedInStatus = {this.state.loggedInStatus}
                  />
              )}
              />
          <Routes />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
