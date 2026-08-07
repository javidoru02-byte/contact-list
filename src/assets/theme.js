import { createTheme } from "@mui/material/styles";

const tokens = {
  ink: "#1C2B22",
  inkLight: "#2E4636",
  card: "#F5EFDD",
  rule: "#B5493A",
  brass: "#B08968",
  text: "#241F17",
  textMuted: "#5A5240",
};

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: tokens.ink,
      paper: tokens.card,
    },
    primary: {
      main: tokens.brass,
      contrastText: tokens.ink,
    },
    secondary: {
      main: tokens.rule,
      contrastText: tokens.card,
    },
    text: {
      primary: tokens.text,
      secondary: tokens.textMuted,
    },
    divider: tokens.rule,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    h1: {
      fontFamily: '"Special Elite", monospace',
      letterSpacing: "0.04em",
    },
    h4: {
      fontFamily: '"Special Elite", monospace',
      letterSpacing: "0.03em",
    },
    button: {
      fontFamily: '"IBM Plex Mono", monospace',
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
          },
        },
      },
    },
  },
});

export { tokens };
export default theme;
