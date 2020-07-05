import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    email: "",
    pass: "",
    accept: false,

    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false,
    },
  };

  validationMessages = {
    username_incorrect: "must be at least 10 digits long and no spaces",
    email_incorrect: "@ missing",
    pass_incorrect: "must be 8 digits long",
    accept_incorrect: "accept T&C",
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;

    if (type === "text" || type === "email" || type === "password") {
      this.setState({ [name]: value });
    } else if (type === "checkbox") {
      this.setState({ [name]: e.target.checked });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();
    console.log(validation.pass.lenght);

    // clearing form
    if (validation.allCorrect) {
      this.setState({
        username: "",
        email: "",
        pass: "",
        accept: false,

        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,
        },
      });
      console.log("All good to send out");
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.pass,
          accept: !validation.accept,
        },
      });
      console.log("still some errors left");
    }
  };

  formValidation = () => {
    // (false - wrong; true - ok) we assume that all are wrong
    let username = false;
    let email = false;
    let pass = false;
    let accept = false;
    let allCorrect = false;

    if (
      this.state.username.length > 10 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }

    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }

    if (this.state.pass.length === 8) {
      pass = true;
    }

    if (this.state.accept) {
      accept = true;
    }

    if (username && email && pass && accept) {
      allCorrect = true;
    }

    return {
      username,
      email,
      pass,
      accept,
      allCorrect,
    };
  };

  render() {
    const {
      username_incorrect,
      email_incorrect,
      pass_incorrect,
      accept_incorrect,
    } = this.validationMessages;

    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            Name:{" "}
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && <span>{username_incorrect}</span>}
          </label>

          <label htmlFor="email">
            Email:{" "}
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && <span>{email_incorrect}</span>}
          </label>

          <label htmlFor="pass">
            Password:{" "}
            <input
              type="password"
              id="pass"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
            {this.state.errors.pass && <span>{pass_incorrect}</span>}
          </label>

          <label htmlFor="accept">
            I accept:{" "}
            <input
              type="checkbox"
              id="accept"
              name="accept"
              value={this.state.accept}
              onChange={this.handleChange}
            />
            {this.state.errors.accept && <span>{accept_incorrect}</span>}
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
