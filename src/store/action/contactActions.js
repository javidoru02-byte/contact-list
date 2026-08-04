import {
  SET_CONTACT,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  SET_CONTACT_TO_EDIT,
} from "./types";

export const setContact = (contacts) => ({
  type: SET_CONTACT,
  payload: contacts,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact) => ({
  type: UPDATE_CONTACT,
  payload: contact,
});

export const setContactToEdit = (contact) => ({
  type: SET_CONTACT_TO_EDIT,
  payload: contact,
});