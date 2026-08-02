import ACTION_TYPES from "../action/types";
import { SET_CONTACT_TO_EDIT } from "../action/types";

const initialState = {
  contacts: [],
  isPanding: false,
  error: null,
  contactToEdit: null,
};

export default function contactReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    //Success

    case ACTION_TYPES.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        isPanding: false,
        contacts: [...state.contacts, payload],
      };

    case ACTION_TYPES.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        isPanding: false,
        contacts: state.contacts.filter((contact) => contact.id !== payload.id),
      };

    case ACTION_TYPES.PUT_CONTACT_SUCCESS:
      return {
        ...state,
        isPanding: false,
        contacts: state.contacts.map((contact) =>
          contact.id === payload.id ? payload : contact,
        ),
      };
    case ACTION_TYPES.GET_CONTACT_SUCCESS:
      return {
        ...state,
        isPanding: false,
        contacts: payload,
      };

    //ERROR

    case ACTION_TYPES.GET_CONTACT_ERROR:
    case ACTION_TYPES.PUT_CONTACT_ERROR:
    case ACTION_TYPES.ADD_CONTACT_ERROR:
    case ACTION_TYPES.DELETE_CONTACT_ERROR:
      return {
        ...state,
        isPanding: false,
        error: payload,
      };

    //Request

    case ACTION_TYPES.GET_CONTACT_REQEST:
    case ACTION_TYPES.PUT_CONTACT_REQEST:
    case ACTION_TYPES.DELETE_CONTACT_REQEST:
    case ACTION_TYPES.ADD_CONTACT_REQEST:
      return {
        ...state,
        isPanding: true,
      };

    //SET_CONTACT_TO_EDIT
    case SET_CONTACT_TO_EDIT:
      return {
        ...state,
        contactToEdit: payload,
      };

    default:
      return state;
  }
}
