import React, { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  render() {
    const { firstName, lastName, email, phone, id } = this.props.userToEdit;
    const isFormInvalid = !firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim();

    return (
      <div>
        <form className="create-contact" onSubmit={this.props.handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              value={firstName}
              onChange={this.props.handleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() =>
                this.props.handleChange({
                  target: { name: "firstName", value: "" },
                })
              }
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              value={lastName}
              onChange={this.props.handleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() =>
                this.props.handleChange({
                  target: { name: "lastName", value: "" },
                })
              }
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.props.handleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() =>
                this.props.handleChange({
                  target: { name: "email", value: "" },
                })
              }
            >
              x
            </button>
          </div>

          <div className="input-container">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={this.props.handleChange}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() =>
                this.props.handleChange({
                  target: { name: "phone", value: "" },
                })
              }
            >
              x
            </button>
          </div>
        </form>

        <div className="btn-holder">
          <div className="left-btn">
            <button className="btn-new" onClick={this.props.cancelEdit}>
              New
            </button>
          </div>
          <div className="right-btn">
            <button
              className="btn-add"
              onClick={this.props.handleSubmit}
              disabled={isFormInvalid}
            >
              Save
            </button>

            <button
              className="btn-del"
              style={id ? {} : { display: "none" }}
              onClick={() => this.props.deleteUser(id)}
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
