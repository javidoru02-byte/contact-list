import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  getContactReqest,
  getContactSuccess,
  getContactError,
  addContactReqest,
  addContactSuccess,
  addContactError,
  deleteContactReqest,
  deleteContactSuccess,
  deleteContactError,
  putContactReqest,
  putContactSuccess,
  putContactError,
} from "../store/action/contactActions";

const dbURL = "http://localhost:5000";

export function* getContactSaga() {
  yield put(getContactReqest());
  try {
    const contacts = yield call(axios.get, `${dbURL}/users`);
    yield put(getContactSuccess(contacts.data));
  } catch (error) {
    yield put(getContactError(error.message));
  }
}

export function* addContactSaga(action) {
  yield put(addContactReqest());
  try {
    const newContact = yield call(axios.post, `${dbURL}/users`, action.payload);
    yield put(addContactSuccess(newContact.data));
  } catch (error) {
    yield put(addContactError(error.message));
  }
}

export function* deleteContactSaga(action) {
  yield put(deleteContactReqest());
  try {
    const id = action.payload;
    yield call(axios.delete, `${dbURL}/users/${id}`);
    yield put(deleteContactSuccess({ id }));
  } catch (error) {
    yield put(deleteContactError(error.message));
  }
}

export function* putContactSaga(action) {
  yield put(putContactReqest());
  try {
    const updatedContact = yield call(
      axios.put,
      `${dbURL}/users/${action.payload.id}`,
      action.payload,
    );
    yield put(putContactSuccess(updatedContact.data));
  } catch (error) {
    yield put(putContactError(error.message));
  }
}
