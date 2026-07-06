import React, { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  hendleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  hendleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone } = this.state;
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
    };
    this.props.addContact(newUser);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  render() {
    return (
      <div>
        <form className="create-contact" onSubmit={this.hendleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              value={this.state.firstName}
              onChange={this.hendleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => this.setState({ firstName: "" })}
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              value={this.state.lastName}
              onChange={this.hendleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => this.setState({ lastName: "" })}
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.hendleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => this.setState({ email: "" })}
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={this.state.phone}
              onChange={this.hendleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => this.setState({ phone: "" })}
            >
              x
            </button>
          </div>
        </form>

        <div className="btn-holder">
          <div className="left-btn">
            <button className="btn-new">New</button>
          </div>
          <div className="right-btn">
            <button className="btn-add" onClick={this.hendleSubmit}>
              Add
            </button>

            <button className="btn-del">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
