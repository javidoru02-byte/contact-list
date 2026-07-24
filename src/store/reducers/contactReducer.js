import { contactsState } from "../../model/initialContacts";

const initialState = {
  contacts: contactsState,
};

export default function contactReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case "addContact":
      return { ...state, contacts: [...state.contacts, payload] };

    case "deleteUser":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== payload),
      };

    case "updateUser":
      return {
        ...state,
        contacts: statusbar.contacts.map((contact) =>
          contact.id === payload ? payload : contact,
        ),
      };

    default:
      return state;
  }
}
