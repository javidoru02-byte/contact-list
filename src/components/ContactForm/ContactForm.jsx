import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import {
  addContact,
  deleteContact,
  updateContactAsync,
  clearContactToEdit,
} from "../../store/slices/contactSlice";

const EMPTY_USER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: null,
};

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone is required"),
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
        setContactToEditToNull();
      }
    },
  });

  useEffect(() => {
    if (userToEdit) {
      formik.setValues({ ...userToEdit });
    } else {
      formik.setValues(EMPTY_USER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isValid,
  } = formik;

  const fieldProps = (name, label, type = "text") => ({
    fullWidth: true,
    name,
    label,
    type,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && Boolean(errors[name]),
    helperText: touched[name] && errors[name],
    variant: "standard",
    sx: {
      "& .MuiInput-underline:before": { borderBottomColor: "secondary.main" },
      "& .MuiInputLabel-root": {
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 13,
        letterSpacing: "0.05em",
      },
    },
  });

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "relative",
        border: "1.5px solid",
        borderColor: "secondary.main",
        p: 3,
        pl: 5,

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 28,
          width: "1.5px",
          bgcolor: "secondary.main",
          opacity: 0.5,
        },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          mb: 2,
          fontFamily: '"Special Elite", monospace',
          color: "text.secondary",
        }}
      >
        {values.id ? "Edit Entry" : "New Entry"}
      </Typography>

      <Stack spacing={2.5}>
        <TextField {...fieldProps("firstName", "First name")} />
        <TextField {...fieldProps("lastName", "Last name")} />
        <TextField {...fieldProps("email", "Email", "email")} />
        <TextField {...fieldProps("phone", "Phone", "tel")} />
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={setContactToEditToNull}
        >
          New
        </Button>

        <Stack direction="row" spacing={1}>
          {values.id && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(values.id)}
            >
              Delete
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default ContactForm;
