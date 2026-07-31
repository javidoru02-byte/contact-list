import axios from "axios";

const dbURL = "http://localhost:5000/users";

export const setContact = () => async (dispatch) => {
  try {
    const resp = await axios.get(dbURL);
    dispatch({ type: "setContact", payload: resp.data });
  } catch (error) {
    console.error("Помилка при завантаженні", error);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(dbURL + "/" + id);
    dispatch({ type: "deleteContact", payload: id });
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

export const updateContact = (updatedUser) => async (dispatch) => {
  try {
    const resp = await axios.put(`${dbURL}/${updatedUser.id}`, updatedUser);
    dispatch({ type: "updateContact", payload: resp.data });
  } catch (error) {
    console.error("Помилка при оновленні", error);
  }
};

export const setContactToEdit = (contact) => ({
  type: "setContactToEdit",
  payload: contact,
});
