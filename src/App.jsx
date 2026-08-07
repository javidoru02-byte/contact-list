import { Container, Box, Typography, Paper } from "@mui/material";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";

function App() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          py: 3,
          mb: 4,
          border: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>
          Contact List
        </Typography>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <ContactList />
        <ContactForm />
      </Box>
    </Container>
  );
}

export default App;
