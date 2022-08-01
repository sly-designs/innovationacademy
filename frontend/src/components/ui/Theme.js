import { createTheme } from "@material-ui/core/styles";

const innovationBlue = "#0056D2";
const innovationOrange = "#FFBA60";
const innovationGrey = "#868686";

export default createTheme({
  palette: {
    common: {
      blue: innovationBlue,
      orange: innovationOrange,
    },
    primary: {
      main: innovationBlue,
    },
    secondary: {
      main: innovationOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "1.3rem",
      color: "#000",
      textTransform: "none",
    },
    reusablebtn: {
      fontFamily: "Poppins",
      fontSize: "1.3rem",
      textTransform: "none",
    },
    h2: {
      fontFamily: "Poppins",
      fontSize: "4rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: 300,
      color: innovationGrey,
    },
    body1: {
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      fontWeight: 400,
      textAlign: "justify",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: innovationGrey,
        fontSize: "1.3rem",
        fontFamily: "Poppins",
      },
    },
    MuiOutlinedInput: {
      root: {
        color: innovationGrey,
        fontSize: "1.5rem",
        "& $notchedOutline": {
          border: `3px solid ${innovationBlue}`,
        },
        "&:hover $notchedOutline": {
          border: `3px solid ${innovationBlue}`,
        },
        "& $focused $notchedOutline": {
          border: `3px solid ${innovationBlue}`,
        },
      },
    },
    MuiCardActionArea: {
      root: {
        "&:hover": {
          background: "#fff",
        },
      },
      focusHighlight: {
        backgroundColor: "#fff",
      },
    },
    MuiCardHeader: {
      root: {
        background: innovationBlue,
        margin: 0,
      },
      title: {
        fontFamily: "Poppins",
        color: "#fff",
        textAlign: "center",
      },
      subheader: {
        fontFamily: "Poppins",
        color: "#fff",
        textAlign: "center",
      },
    },
  },
});
