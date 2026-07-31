const initialState = {
  contacts: [],
  contactToEdit: null,
};

export default function contactReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case "addContact":
      return { ...state, contacts: [...state.contacts, payload] };

    case "deleteContact":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== payload),
      };

    case "updateContact":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === payload.id ? payload : contact,
        ),
      };
    case "setContact":
      return {
        ...state,
        contacts: payload,
      };

    case "setContactToEdit":
      return {
        ...state,
        contactToEdit: payload,
      };

    default:
      return state;
  }
}
