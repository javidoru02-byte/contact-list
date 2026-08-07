import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper, Typography, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

  const handleDoubleClick = (contact) => {
    dispatch(setContactToEdit({ ...contact }));
  };

  return (
    <Stack spacing={1.5}>
      {contacts.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
          No entries in the catalog yet.
        </Typography>
      )}

      {Array.isArray(contacts) &&
        contacts.map((contact) => (
          <Paper
            key={contact.id}
            elevation={0}
            onDoubleClick={() => handleDoubleClick(contact)}
            sx={{
              display: "flex",
              alignItems: "stretch",
              cursor: "pointer",
              border: "1.5px solid",
              borderColor: "secondary.main",
              overflow: "hidden",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              "&:hover": {
                transform: "translateX(2px)",
                boxShadow: "3px 3px 0 0 rgba(176,137,104,0.4)",
              },
            }}
          >
            <Box
              sx={{
                width: 44,
                flexShrink: 0,
                bgcolor: "primary.main",
                color: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Special Elite", monospace',
                fontSize: 20,
              }}
            >
              {contact.firstName?.[0]?.toUpperCase() ?? "?"}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                py: 1.5,
                px: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {contact.firstName} {contact.lastName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontFamily: '"IBM Plex Mono", monospace' }}
                color="text.secondary"
              >
                {contact.phone}
              </Typography>
            </Box>

            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                dispatch(deleteContact(contact.id));
              }}
              sx={{
                borderRadius: 0,
                borderLeft: "1.5px solid",
                borderColor: "secondary.main",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
    </Stack>
  );
};

export default ContactList;
