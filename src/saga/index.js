import { takeLatest } from "redux-saga/effects";
import {
  getContactSaga,
  addContactSaga,
  deleteContactSaga,
  putContactSaga,
} from "./saga";
import ACTION_TYPES from "../store/action/types";

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_CONTACT_ACTION, getContactSaga);
  yield takeLatest(ACTION_TYPES.ADD_CONTACT_ACTION, addContactSaga);
  yield takeLatest(ACTION_TYPES.DELETE_CONTACT_ACTION, deleteContactSaga);
  yield takeLatest(ACTION_TYPES.PUT_CONTACT_ACTION, putContactSaga);
}
