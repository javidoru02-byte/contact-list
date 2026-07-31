import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  updateContact,
  deleteContact,
  setContactToEdit,
} from "../../store/action/contactActions";
import "./ContactForm.css";

function ContactForm() {
  const dispatch = useDispatch();
  const userToEdit = useSelector((state) => state.userToEdit);

  const [curentUser, setCurentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: null,
  });

  useEffect(() => {
    if (userToEdit) {
      // eslint-disable-next-line
      setCurentUser(userToEdit);
    } else {
      setCurentUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        id: null,
      });
    }
  }, [userToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurentUser({ ...curentUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (curentUser.id) {
      dispatch(updateContact(curentUser));
    } else {
      dispatch(addContact(curentUser));
      dispatch(setContactToEdit(null));
      setCurentUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        id: null,
      });
    }
  };

  const handleNew = () => {
    dispatch(setContactToEdit(null));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    dispatch(setContactToEdit(null));
  };

  const { firstName, lastName, email, phone, id } = curentUser;
  const isFormInvalid =
    !firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim();

  return (
    <div>
      <form className="create-contact" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            value={firstName}
            onChange={handleChange}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setCurentUser({ ...curentUser, firstName: "" })}
          >
            x
          </button>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="lastName"
            placeholder="LastName"
            value={lastName}
            onChange={handleChange}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setCurentUser({ ...curentUser, lastName: "" })}
          >
            x
          </button>
        </div>

        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setCurentUser({ ...curentUser, email: "" })}
          >
            x
          </button>
        </div>

        <div className="input-container">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={handleChange}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setCurentUser({ ...curentUser, phone: "" })}
          >
            x
          </button>
        </div>
      </form>

      <div className="btn-holder">
        <div className="left-btn">
          <button className="btn-new" onClick={handleNew}>
            New
          </button>
        </div>
        <div className="right-btn">
          <button
            className="btn-add"
            onClick={handleSubmit}
            disabled={isFormInvalid}
          >
            Save
          </button>

          <button
            className="btn-del"
            style={id ? {} : { display: "none" }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
