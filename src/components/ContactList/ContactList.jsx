import "./ContactList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  deleteContact,
  setContactToEdit,
} from "../../store/slices/contactSlice";

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const hendleDoubleClick = (contact) => {
    console.log("Клік спрацював", contact);
    dispatch(setContactToEdit({ ...contact }));
  };

  return (
    <div className="contact-list">
      {Array.isArray(contacts) &&
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <p
              className="contact-name"
              onDoubleClick={() => hendleDoubleClick(contact)}
            >
              {contact.firstName} {contact.lastName}
            </p>
            <span
              className="contact-delete"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              X
            </span>
          </div>
        ))}
    </div>
  );
};
export default ContactList;
