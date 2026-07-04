import React, { Component } from "react";

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

  render() {
    return (
      <div>
        <form className="ccreate-contact" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            value={this.state.firstName}
            onChange={this.hendleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="LastName"
            value={this.state.lastName}
            onChange={this.hendleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.hendleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.hendleChange}
          />

          <button className="btn" onClick={this.handleSubmit}>
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
