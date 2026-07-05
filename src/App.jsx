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
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      localStorage.setItem("users", JSON.stringify(this.state.users));
    }
  }

  render() {
    return (
      <>
        <ContactForm addContact={this.addUser} toLocal={this.componentDidUpdate}/>
        <ContactList />
      </>
    );
  }
}

export default App;
