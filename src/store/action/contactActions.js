import {SET_CONTACT_TO_EDIT} from "./types";
import ACTION_TYPES from "./types";

//ADD

export const addContactAction = (payload) => {
  return {
    type: ACTION_TYPES.ADD_CONTACT_ACTION,
    payload,
  };
};

export const addContactReqest = () => {
  return {
    type: ACTION_TYPES.ADD_CONTACT_REQEST,
  };
};

export const addContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.ADD_CONTACT_SUCCESS,
    payload,
  };
};

export const addContactError = (payload) => {
  return {
    type: ACTION_TYPES.ADD_CONTACT_ERROR,
    payload,
  };
};

//DEL

export const deleteContactAction = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ACTION,
    payload,
  };
};

export const deleteContactReqest = () => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_REQEST,
  };
};

export const deleteContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_SUCCESS,
    payload,
  };
};

export const deleteContactError = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ERROR,
    payload,
  };
};

//PUT

export const putContactAction = (payload) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ACTION,
    payload,
  };
};

export const putContactReqest = () => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_REQEST,
  };
};

export const putContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_SUCCESS,
    payload,
  };
};

export const putContactError = (payload) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ERROR,
    payload,
  };
};

//GET

export const getContactAction = () => {
  return {
    type: ACTION_TYPES.GET_CONTACT_ACTION,
  };
};

export const getContactReqest = () => {
  return {
    type: ACTION_TYPES.GET_CONTACT_REQEST,
  };
};

export const getContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.GET_CONTACT_SUCCESS,
    payload,
  };
};

export const getContactError = (payload) => {
  return {
    type: ACTION_TYPES.GET_CONTACT_ERROR,
    payload,
  };
};

//setToEdit
export const setContactToEdit = (payload) => ({
  type: SET_CONTACT_TO_EDIT,
  payload,
});
