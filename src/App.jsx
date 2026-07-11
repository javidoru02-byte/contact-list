import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import { nanoid } from "nanoid";
import Header from "./components/Header/Header";
import "./App.css";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: null,
};

class App extends Component {
  state = {
    users: [],
    userToEdit: { ...INITIAL_STATE },
  };

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      this.setState({ users });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      this.saveUsersToLocalStorage();
    }
  }

  saveUsersToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(this.state.users));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userToEdit: {
        ...prevState.userToEdit,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.userToEdit.id) {
      this.updateUser(this.state.userToEdit);
    } else {
      this.addUser(this.state.userToEdit);
    }
  };

  cancelEdit = () => {
    this.setState({
      userToEdit: {
        ...INITIAL_STATE,
      },
    });
  };

  addUser = (user) => {
    this.setState((prevState) => ({
      users: [...prevState.users, { ...user, id: nanoid() }],
      userToEdit: { ...INITIAL_STATE },
    }));
  };

  updateUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
      userToEdit: { ...INITIAL_STATE },
    }));
  };

  deleteUser = (id) => {
    this.setState((prevState) => {
      const updatedUsers = prevState.users.filter((user) => user.id !== id);
      const shouldClearForm = prevState.userToEdit.id === id;
      return {
        users: updatedUsers,
        userToEdit: shouldClearForm ? { ...INITIAL_STATE } : prevState.userToEdit,
      };
    });
  };

  editUser = (user) => {
    this.setState({
      userToEdit: user,
    });
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
            userToEdit={this.state.userToEdit}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelEdit={this.cancelEdit}
            deleteUser={this.deleteUser}
          />
        </div>
      </div>
    );
  }
}

export default App;
