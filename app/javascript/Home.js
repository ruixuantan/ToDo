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
    location.href = "/dashboard";
  }

  render () {
    return (
      <div>
        <h3>Log In</h3>
        <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>

        <h3>Register for an account</h3>
        <Registration handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
      </div>
    );
  }
}
