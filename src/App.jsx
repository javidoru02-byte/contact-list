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
      setUsers(JSON.parse(userFromLocalStorage)); //я зрозумів що тут може бути помилка припередачі даних але я не зрозумів я к спіймати її в try catch
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const cancelEdit = () => {
    setUserToEdit({ ...INITIAL_STATE });
  };

  const editUser = (user) => {
    setUserToEdit(user);
  };

  const addUser = (user) => {
    const newUser = { ...user, id: nanoid() };
    setUsers([...users, newUser]);
    setUserToEdit({ ...INITIAL_STATE });
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
    setUserToEdit({ ...INITIAL_STATE });
  };

  const deleteUser = (userToDelateId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userToDelateId),
    );
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
