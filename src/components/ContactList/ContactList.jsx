import "./ContactList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  delateUsers,
  setUserToEdit,
} from "../../store/action/contactActions";

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const hendleDoubleClick = (contact) => {
    //console.log("Клік спрацював", contact);
    dispatch(setUserToEdit(contact));
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
            onClick={() => dispatch(delateUsers(contact.id))}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
