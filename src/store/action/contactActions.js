import axios from "axios";

const dbURL = "http://localhost:5000/users";

export const getUsers = () => async (dispatch) => {
  try {
    const resp = await axios.get(dbURL);
    dispatch({ type: "setUser", payload: resp.data });
  } catch (error) {
    console.error("Помилка при завантаженні", error);
  }
};

export const delateUsers = (id) => async (dispatch) => {
  try {
    await axios.delete(dbURL + "/" + id);
    dispatch({ type: "deleteUser", payload: id });
  } catch (error) {
    console.error("Помилка при видаленні", error);
  }
};

export const addContact = (newUser) => async (dispatch) => {
  try {
    const resp = await axios.post(dbURL, newUser);
    dispatch({ type: "addContact", payload: resp.data });
  } catch (error) {
    console.error("Помилка при додаванні", error);
  }
};

export const updateUser = (updatedUser) => async (dispatch) => {
  try {
    const resp = await axios.put(`${dbURL}/${updatedUser.id}`, updatedUser);
    dispatch({ type: "updateUser", payload: resp.data });
  } catch (error) {
    console.error("Помилка при оновленні", error);
  }
};

export const setUserToEdit = (contact) => ({
  type: "setUserToEdit",
  payload: contact,
});
