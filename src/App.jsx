import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import axios from "axios";
import "./App.css";
const dbURL = "http://localhost:5000/users";

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
    const fethUsers = async () => {
      try {
        const resp = await axios.get(dbURL);
        setUsers(resp.data);
      } catch (error) {
        console.error("Неможливо завантажити користувача", error);
      }
    };
    fethUsers();
  }, []);

  const cancelEdit = () => {
    setUserToEdit({ ...INITIAL_STATE });
  };

  const editUser = (user) => {
    setUserToEdit(user);
  };

  const addUser = async (user) => {
    try {
      const resp = await axios.post(dbURL, user);
      setUsers((prevUsers) => [...prevUsers, resp.data]);
      setUserToEdit({ ...INITIAL_STATE });
    } catch (error) {
      console.error("помилка при додаванні", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const resp = await axios.put(`${dbURL}/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? resp.data : u)),
      );
      setUserToEdit(resp.data);
    } catch (error) {
      console.error("помилка при оновлені", error);
    }
  };

  const deleteUser = async (userToDelateId) => {
    try {
      await axios.delete(`${dbURL}/${userToDelateId}`);

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelateId));

      if (userToDelateId === userToEdit.id) {
        setUserToEdit({ ...INITIAL_STATE });
      }
    } catch (error) {
      console.error("помилка при видаленні", error);
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
