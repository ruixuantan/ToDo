import React from "react";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
  }

  render () {
    return (
      <div className = "container">
        <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        <br />
        <p>Don't have an account? Register&nbsp;
          <button type = "button"
            data-toggle = "modal" data-target = "#register-modal"
            id = "register-link">
            here
          </button>
        </p>

        <div className = "modal" id = "register-modal">
          <Registration handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        </div>
      </div>
    );
  }
}
