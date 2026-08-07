import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  deleteContact,
  updateContactAsync,
  clearContactToEdit,
} from "../../store/slices/contactSlice";
import "./ContactForm.css";

const EMPTY_USER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: null,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

function ContactForm() {
  const dispatch = useDispatch();
  const userToEdit = useSelector((state) => state.contacts.contactToEdit);

  const formik = useFormik({
    initialValues: EMPTY_USER,
    enableReinitialize: true,
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      if (values.id) {
        dispatch(updateContactAsync(values));
      } else {
        dispatch(addContact(values));
      }
      setContactToEditToNull();
    },
  });

  useEffect(() => {
    if (userToEdit) {
      // eslint-disable-next-line
      formik.setValues({ ...userToEdit });
    } else {
      formik.setValues(EMPTY_USER);
    }
  }, [userToEdit]);

  const setContactToEditToNull = () => {
    dispatch(clearContactToEdit());
    formik.resetForm({ values: EMPTY_USER });
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    setContactToEditToNull();
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
  } = formik;

  return (
    <div>
      <form className="create-contact" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFieldValue("firstName", "")}
          >
            x
          </button>
          {touched.firstName && errors.firstName && (
            <div className="field-error">{errors.firstName}</div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            name="lastName"
            placeholder="LastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFieldValue("lastName", "")}
          >
            x
          </button>
          {touched.lastName && errors.lastName && (
            <div className="field-error">{errors.lastName}</div>
          )}
        </div>

        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFieldValue("email", "")}
          >
            x
          </button>
          {touched.email && errors.email && (
            <div className="field-error">{errors.email}</div>
          )}
        </div>

        <div className="input-container">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFieldValue("phone", "")}
          >
            x
          </button>
          {touched.phone && errors.phone && (
            <div className="field-error">{errors.phone}</div>
          )}
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
            disabled={!isValid}
          >
            Save
          </button>

          <button
            className="btn-del"
            style={values.id ? {} : { display: "none" }}
            onClick={() => handleDelete(values.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
