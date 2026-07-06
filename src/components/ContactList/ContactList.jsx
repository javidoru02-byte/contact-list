import React, { Component } from "react";

class ContactList extends Component {
  render() {
    return (
      <>
        {this.props.users.map((user) => (
          <div key={user.phone} className="contact-card">
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
        ))}
      </>
    );
  }
}

export default ContactList;
