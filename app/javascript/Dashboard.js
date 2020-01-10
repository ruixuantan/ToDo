import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tasks from "./components/tasks/index";
import NavBar from "./components/utils/NavBar";

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios.delete("/logout", {withCredentials: true})
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout errors", error);
      });
  }

  render () {
    return (
      <div>
        <div>
          <button onClick = {() => this.handleLogoutClick()}>Logout</button>
          <NavBar />
        </div>
        <br />
        <Tasks />
      </div>
    );
  };
}
