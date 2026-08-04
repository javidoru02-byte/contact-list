import "./ContactList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactAPI } from "../../services/contactService";
import {
  setContact,
  deleteContact,
  setContactToEdit,
} from "../../store/action/contactActions";

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const resp = await contactAPI.getAll();
        dispatch(setContact(resp.data));
      } catch (error) {
        console.error("Помилка при завантаженні", error);
      }
    };
    loadContacts();
  }, [dispatch]);

  const hendleDoubleClick = (contact) => {
    console.log("Клік спрацював", contact);
    dispatch(setContactToEdit({ ...contact }));
  };

  const handleDelete = async (id) => {
    try {
      await contactAPI.delete(id);
      dispatch(deleteContact(id));
    } catch (error) {
      console.error("Помилка при видаленні", error);
    }
  };

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-card">
          <p
            className="contact-name"
            onDoubleClick={() => hendleDoubleClick(contact)}
          >
            {contact.firstName} {contact.lastName}
          </p>

          <span
            className="contact-delete"
            onClick={() => handleDelete(contact.id)}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
};

export default ContactList;