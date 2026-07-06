import React, { Component } from "react";
import "./ContactList.css";
class ContactList extends Component {
  render() {
    return (
      <div className="contact-list">
        {this.props.users.map((user) => (
          <div key={user.phone} className="contact-card">
            <p className="contact-name">
              {user.firstName} {user.lastName}
            </p>
            <span className="contact-delete">X</span>
          </div>
        ))}
      </div>
    );
  }
}

export default ContactList;
