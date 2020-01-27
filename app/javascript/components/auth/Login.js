import React, {Component} from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios.post( "/sessions", {
          user: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      ).then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          alert("Password is wrong or username doesn't exist");
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h5>Login</h5>
        <form onSubmit={ this.handleSubmit }>
          <div className = "form-group">
            <input
              type = "email"
              name = "email"
              placeholder = "Email"
              value ={ this.state.email }
              onChange = {this.handleInputChange }
              required
              />
          </div>
          <div className = "form-group">
            <input
              type = "password"
              name = "password"
              placeholder = "Password"
              value = { this.state.password }
              onChange = { this.handleInputChange}
              required
              />
          </div>
          <button
            className = "btn btn-primary"
            type = "submit">LOGIN</button>
        </form>
      </div>
    );
  }
}
