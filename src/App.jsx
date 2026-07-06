import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Header from "./components/Header/Header";
import "./App.css";

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

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      this.setState({ users });
    }
  }
  /*
  deleteUser = (number) => {
    this.setState({
      users: this.state.users.filter((user) => user.phone !== number),
    })
  }
    */

  render() {
    return (
      <div className="App">
        <Header />
        <ContactForm addContact={this.addUser} />
        <ContactList users={this.state.users} />
      </div>
    );
  }
}

export default App;
