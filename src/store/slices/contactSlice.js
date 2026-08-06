import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const dbUrl = "http://localhost:5000/contacts";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  contactToEdit: null,
};

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(dbUrl);

      if (response.status >= 400) {
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.delete(`${dbUrl}/${id}`);

      if (response.status >= 400) {
        throw new Error("Can't delete contact. Server error.");
      }
      dispatch(removeContact({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateContactAsync = createAsyncThunk(
  "contacts/updateContact",
  async function (contactData, { rejectWithValue, dispatch }) {
    try {
      const { id, ...rest } = contactData;
      const response = await axios.patch(`${dbUrl}/${id}`, rest);

      if (response.status >= 400) {
        throw new Error("Can't update contact. Server error.");
      }
      dispatch(updateContact({ id, ...response.data }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async function (contactData, { rejectWithValue }) {
    try {
      const response = await axios.post(dbUrl, contactData);
      if (response.status >= 400) {
        throw new Error("Can't add contact. Server error.");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setFetch = (state) => {
  state.isLoading = true;
  state.error = null;
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    removeContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== payload.id,
      );
    },

    updateContact: (state, { payload }) => {
      const { id, firstName, lastName, phone, email } = payload;
      const userToEdit = state.contacts.find((contact) => contact.id === id);

      if (userToEdit) {
        userToEdit.firstName = firstName;
        userToEdit.lastName = lastName;
        userToEdit.phone = phone;
        userToEdit.email = email;
      }
    },

    setContactToEdit: (state, { payload }) => {
      state.contactToEdit = payload;
    },

    clearContactToEdit: (state) => {
      state.contactToEdit = null;
    },
  },

  extraReducers: (builder) => {
    //get contacts
    builder.addCase(getContacts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.contacts = payload;
      state.error = null;
    });
    builder.addCase(getContacts.pending, setFetch);
    builder.addCase(getContacts.rejected, setError);

    //delete contact

    builder.addCase(deleteContact.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(deleteContact.pending, setFetch);
    builder.addCase(deleteContact.rejected, setError);

    //update contact

    builder.addCase(updateContactAsync.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateContactAsync.pending, setFetch);
    builder.addCase(updateContactAsync.rejected, setError);

    //add contact

    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.contacts.push(payload);
      state.error = null;
    });
    builder.addCase(addContact.pending, setFetch);
    builder.addCase(addContact.rejected, setError);
  },
});

const { actions, reducer } = contactSlice;

export const {
  removeContact,
  updateContact,
  setContactToEdit,
  clearContactToEdit,
} = actions;

export default reducer;
