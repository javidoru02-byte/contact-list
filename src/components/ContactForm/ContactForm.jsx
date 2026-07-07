import React, { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { firstName, lastName, email, phone } = this.state;
    event.preventDefault();

    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.email ||
      !this.state.phone
    ) {
      return;
    }

    if (this.props.userToEdit) {
      this.props.updateUser({
        id: this.props.userToEdit.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      });
    } else {
      this.props.addContact({ firstName, lastName, email, phone });
      this.clearForm();
    }
  };
  clearForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  handleNewClick = () => {
    this.clearForm();
    this.props.cancelEdit();
  };

  handleDeleteClick = () => {
    if (this.props.userToEdit) {
      this.props.deleteUser(this.props.userToEdit.id);
      this.clearForm();
      this.props.cancelEdit();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userToEdit !== this.props.userToEdit) {
      if (this.props.userToEdit) {
        const { firstName, lastName, email, phone } = this.props.userToEdit;
        this.setState({
          firstName,
          lastName,
          email,
          phone,
        });
      } else {
        this.clearForm();
      }
    }
  }
  render() {
    return (
      <div>
        <form className="create-contact" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              value={this.state.firstName}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
            <button className="btn-new" onClick={this.handleNewClick}>
              New
            </button>
          </div>
          <div className="right-btn">
            <button className="btn-add" onClick={this.handleSubmit}>
              Save
            </button>

            <button
              className="btn-del"
              style={this.props.userToEdit ? {} : { display: "none" }}
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
