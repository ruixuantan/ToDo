import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import Dashboard from "./Dashboard";
import NavBar from "./components/utils/NavBar";

import Tasks from "./components/tasks/index";
import TaskDetails from "./components/tasks/TaskDetails";
import UpdateTask from "./components/tasks/UpdateTask";
import TagIndex from "./components/tags/TagIndex";

import "../assets/stylesheets/application.scss";

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

  checkLoginStatus = () => {
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

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
    location.href = "/dashboard";
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
    location.href = "/";
  }

  render() {
    return (
      <div>
        <div className = "jumbotron" id = "app-header">
          <h1>To-Do List</h1>
        </div>
        <BrowserRouter>
          {this.state.loggedInStatus == "LOGGED_IN"
            ? <NavBar handleLogout = {this.handleLogout}/>
            : null}
          <Switch>
            <Route
              path = "/"
              exact
              render = {props => (
                <Home {...props}
                  handleLogin = {this.handleLogin}
                  handleLogout = {this.handleLogout}
                  loggedInStatus = {this.state.loggedInStatus}
                  />
              )}
              />
            <Route
              path = "/dashboard"
              exact
              render = {props => (
                <Dashboard {...props}
                  handleLogout = {this.handleLogout}
                  />
              )}
              />
            <Route exact path = "/dashboard">
              <Tasks />
            </Route>
            <Route
              path = "/tasks/:id/edit"
              exact
              component = {UpdateTask}
              />
            <Route
              path = "/tasks/:id"
              exact
              component = {TaskDetails}
             />
             <Route
               path = "/tags"
               exact
               render = {props => (
                 <TagIndex {...props}
                   handleLogout = {this.handleLogout}
                   />
               )}
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
