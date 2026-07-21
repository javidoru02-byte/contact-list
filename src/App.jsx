import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import { nanoid } from "nanoid";
import "./App.css";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: null,
};

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("users");
    if (userFromLocalStorage) {
      // eslint-disable-next-line
      setUsers(JSON.parse(userFromLocalStorage));
    } else {
      setUsers([]);
    }
  }, []);

  const putIntoLocal = (dateToSave) => {
    localStorage.setItem("users", JSON.stringify(dateToSave));
  };

  const cancelEdit = () => {
    setUserToEdit({ ...INITIAL_STATE });
  };

  const editUser = (user) => {
    setUserToEdit(user);
  };

  const addUser = (user) => {
    const newUser = { ...user, id: nanoid() };
    const updetedUser = [...users, newUser];
    setUsers(updetedUser);
    putIntoLocal(updetedUser);
    setUserToEdit({ ...INITIAL_STATE });
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    );
    setUsers(updatedUsers);
    putIntoLocal(updatedUsers);
    setUserToEdit({ ...INITIAL_STATE });
  };

  const deleteUser = (userToDelateId) => {
    const updatedUsers = users.filter((user) => user.id !== userToDelateId);
    setUsers(updatedUsers);
    putIntoLocal(updatedUsers);
    if (userToDelateId === userToEdit.id) {
      setUserToEdit({ ...INITIAL_STATE });
    }
  };

  return (
    <div className="App">
      <h1>Contact List</h1>

      <div className="form-container">
        <ContactList
          users={users}
          deleteUser={deleteUser}
          editUser={editUser}
        />
        <ContactForm
          userToEdit={userToEdit}
          cancelEdit={cancelEdit}
          deleteUser={deleteUser}
          addUser={addUser}
          updateUser={updateUser}
        />
      </div>
    </div>
  );
}

export default App;
