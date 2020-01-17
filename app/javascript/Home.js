import React from "react";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  render () {
    return (
      <div class = "container">
        <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        <br />
        <p>Don't have an account? Register
          <span class = "pull-right">
            <button type = "button" class = "btn btn-link" data-toggle = "modal"
              data-target = "#register-modal">
              here
            </button>
          </span>
        </p>

          <div class = "modal" id = "register-modal">
            <Registration handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
          </div>
      </div>
    );
  }
}
