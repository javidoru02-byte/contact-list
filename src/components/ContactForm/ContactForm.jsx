import { useState, useEffect } from "react";
import "./ContactForm.css";

function ContactForm(props) {
  const [curentUser, setCurentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: null,
  });
  // eslint-disable-next-line
  useEffect(() => setCurentUser({ ...props.userToEdit }), [props.userToEdit]); //чесно так і не зрозумів що тут не так

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurentUser({ ...curentUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, id } = curentUser;
    const user = { firstName, lastName, email, phone, id };
    if (id) {
      props.updateUser(user);
    } else {
      props.addUser(user);
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
          <button className="btn-new" onClick={props.cancelEdit}>
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
            onClick={() => props.deleteUser(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
