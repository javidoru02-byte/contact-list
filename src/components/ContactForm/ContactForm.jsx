import { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: null,
  };

  componentDidMount() {
    this.setState({ ...this.props.userToEdit });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userToEdit !== this.props.userToEdit) {
      this.setState({ ...this.props.userToEdit });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, id } = this.state;
    const user = { firstName, lastName, email, phone, id };
    if (id) {
      this.props.updateUser(user);
    } else {
      this.props.addUser(user);
    }
  };

  render() {
    const { firstName, lastName, email, phone, id } = this.state;
    const isFormInvalid =
      !firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim();

    return (
      <div>
        <form className="create-contact" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              value={firstName}
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
              value={lastName}
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
              value={email}
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
              value={phone}
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
            <button className="btn-new" onClick={this.props.cancelEdit}>
              New
            </button>
          </div>
          <div className="right-btn">
            <button
              className="btn-add"
              onClick={this.handleSubmit}
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
