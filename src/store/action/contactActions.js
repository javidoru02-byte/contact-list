import { contactAPI } from "../../services/contactService";
import {
  SET_CONTACT,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  SET_CONTACT_TO_EDIT,
} from "./types";

export const setContact = () => async (dispatch) => {
  try {
    const resp = await contactAPI.getAll();
    dispatch({ type: SET_CONTACT, payload: resp.data });
  } catch (error) {
    console.error("Помилка при завантаженні", error);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    await contactAPI.delete(id);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (error) {
    console.error("Помилка при видаленні", error);
  }
};

export const addContact = (newUser) => async (dispatch) => {
  try {
    const resp = await contactAPI.create(newUser);
    dispatch({ type: ADD_CONTACT, payload: resp.data });
  } catch (error) {
    console.error("Помилка при додаванні", error);
  }
};

export const updateContact = (updatedUser) => async (dispatch) => {
  try {
    const resp = await contactAPI.update(updatedUser);
    dispatch({ type: UPDATE_CONTACT, payload: resp.data });
  } catch (error) {
    console.error("Помилка при оновленні", error);
  }
};

export const setContactToEdit = (contact) => ({
  type: SET_CONTACT_TO_EDIT,
  payload: contact,
});
