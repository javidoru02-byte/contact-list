import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Header from "./components/Header/Header";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    userToEdit: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: null,
    },
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

  addUser = (user) => {
    this.setState((prevState) => ({
      users: [...prevState.users, { ...user, id: Date.now().toString() }],
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

  deleteUser = (id) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
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
        user.id === updatedUser.id ? updatedUser : user,
      ),
      userToEdit: updatedUser,
    }));
  };

  cancelEdit = () => {
    this.setState({
      userToEdit: null,
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
            addContact={this.addUser}
            userToEdit={this.state.userToEdit}
            updateUser={this.updateUser}
            deleteUser={this.deleteUser}
            cancelEdit={this.cancelEdit}
          />
        </div>
      </div>
    );
  }
}

export default App;
