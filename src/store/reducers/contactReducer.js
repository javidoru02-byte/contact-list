const initialState = {
  contacts: [],
  contactToEdit: null,
};

export default function contactReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, payload] };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== payload),
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === payload.id ? payload : contact,
        ),
      };
    case "SET_CONTACT":
      return {
        ...state,
        contacts: payload,
      };

    case "SET_CONTACT_TO_EDIT":
      return {
        ...state,
        contactToEdit: payload,
      };

    default:
      return state;
  }
}
