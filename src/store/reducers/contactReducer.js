const initialState = {
  contacts: [],
  userToEdit: null,
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
        contacts: state.contacts.map((contact) =>
          contact.id === payload.id ? payload : contact,
        ),
      };
    case "setUser":
      return {
        ...state,
        contacts: payload,
      };

    case "setUserToEdit":
      return {
        ...state,
        userToEdit: payload,
      };

    default:
      return state;
  }
}
