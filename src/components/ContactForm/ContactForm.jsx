import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactAPI } from "../../services/contactService";
import {
  addContact,
  updateContact,
  deleteContact,
  setContactToEdit,
} from "../../store/action/contactActions";
import "./ContactForm.css";

const EMPTY_USER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: null,
};

function ContactForm() {
  const dispatch = useDispatch();
  const userToEdit = useSelector((state) => state.contactToEdit);

  const [curentUser, setCurentUser] = useState(EMPTY_USER);

  useEffect(() => {
    if (userToEdit) {
      // eslint-disable-next-line
      setCurentUser({ ...userToEdit });
    } else {
      setCurentUser(EMPTY_USER);
    }
  }, [userToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurentUser({ ...curentUser, [name]: value });
  };

  const setContactToEditToNull = () => {
    dispatch(setContactToEdit(null));
    setCurentUser(EMPTY_USER);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (curentUser.id) {
        const resp = await contactAPI.update(curentUser);
        dispatch(updateContact(resp.data));
      } else {
        const resp = await contactAPI.create(curentUser);
        dispatch(addContact(resp.data));
        setContactToEditToNull();
      }
    } catch (error) {
      console.error("Помилка при збереженні", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactAPI.delete(id);
      dispatch(deleteContact(id));
      setContactToEditToNull();
    } catch (error) {
      console.error("Помилка при видаленні", error);
    }
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
          <button className="btn-new" onClick={setContactToEditToNull}>
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
