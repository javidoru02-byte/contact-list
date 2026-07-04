import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    users: [],
  };

  addUser = (user) => {
    this.setState((prevState) => ({
      users: [...prevState.users, user],
    }));
  }

  render() {
    return (<>
      <ContactForm addContact={this.addUser} />
      <ContactList/>

    </>);
  }
}

export default App;