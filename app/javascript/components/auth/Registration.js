import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios.post("/registrations", {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    }, { withCredentials: true }
    ).then(response => {
      if (response.data.status === "created") {
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <input
            type = "email"
            name = "email"
            placeholder = "Email"
            value = {this.state.email}
            onChange = {this.handleInputChange}
            required
            />
          <input
            type = "password"
            name = "password"
            placeholder = "Password"
            value = {this.state.password}
            onChange = {this.handleInputChange}
            required
            />
          <input
            type = "password"
            name = "password_confirmation"
            placeholder = "Password confirmation"
            value = {this.state.password_confirmation}
            onChange = {this.handleInputChange}
            required
            />
            <button type = "submit">Register</button>
        </form>
      </div>
    );
  }
}
