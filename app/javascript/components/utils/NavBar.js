import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick = () => {
    axios.delete("/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout errors", error);
      });
  }

  render() {
    return (
      <nav className = "navbar fixed-top">
         <Link className = "nav-link" to = "/dashboard">Home</Link>
         <Link className = "nav-link" to = "/tags">Manage Tags</Link>
        <ul className = "navbar-nav navbar-right">
          <li><button
            className = "btn btn-outline-primary"
            onClick = {() => this.handleLogoutClick()}>
            Logout
          </button></li>
        </ul>
      </nav>
    );
  }
}
