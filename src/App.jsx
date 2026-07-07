import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Header from "./components/Header/Header";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    userToEdit: null,
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

  deleteUser = (number) => {
    this.setState({
      users: this.state.users.filter((user) => user.phone !== number),
    });
  };

  editUser = (user) => {
    this.setState({
      userToEdit: user,
    });
  };

  updateUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.phone === updatedUser.phone ? updatedUser : user,
      ),
      userToEdit: null,
    }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="form-container">
          <ContactList
            users={this.state.users}
            deleteUser={this.deleteUser}
            editUser={this.editUser}
          />
          <ContactForm
            addContact={this.addUser}
            userToEdit={this.state.userToEdit}
            updateUser={this.updateUser}
            deleteUser={this.deleteUser}
          />
        </div>
      </div>
    );
  }
}

export default App;
