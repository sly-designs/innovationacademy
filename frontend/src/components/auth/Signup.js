import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { create_parentuser } from "../../actions/auth";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  signupButton: {
    ...theme.typography.reusablebtn,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: theme.palette.common.blue,
    marginRight: "45px",
    height: "45px",
    width: "125px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "105px",
      marginRight: "40px",
    },
  },
}));

export const Signup = ({
  open,
  handleClose,
  isAdmin,
  isAuthenticated,
  create_parentuser,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  //const [passwordHelper, setPasswordHelper] = useState("");

  const onValidation = (event) => {
    let valid;

    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailHelper("Invalid email");
        } else {
          setEmailHelper("");
        }
        break;

      default:
        break;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullname.length !== 0 ||
      email.length !== 0 ||
      phone.length !== 0 ||
      password.length !== 0 ||
      password2.length !== 0
    ) {
      const parent = {
        fullname,
        email,
        phone,
        password,
        password2,
      };
      // console.log(parent);
      create_parentuser(parent);
    }
    //
  };

  if (isAuthenticated && !isAdmin) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Dialog
      style={{ zIndex: 1302 }}
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 10,
          paddingTop: matchesXS ? "1em" : "5em",
          paddingBottom: matchesXS ? "1em" : "5em",
          paddingLeft: matchesXS
            ? 0
            : matchesSM
            ? "2em"
            : matchesMD
            ? "2em"
            : "4em",
          paddingRight: matchesXS
            ? 0
            : matchesSM
            ? "2em"
            : matchesMD
            ? "2em"
            : "4em",
        },
      }}
    >
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <Typography align="center" variant="h4">
              Sign up
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Sign up today and register your <br />
              kid to start learning.
            </Typography>
          </Grid>
          <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <Grid item style={{ marginBottom: "2em" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="fullname">Fullname</InputLabel>
                <OutlinedInput
                  id="fullname"
                  type="text"
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                  labelWidth={105}
                  required
                />
                <FormHelperText id="fullname"></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "2em" }}>
              <FormControl
                error={emailHelper.length !== 0}
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="text"
                  value={email}
                  onChange={onValidation}
                  labelWidth={70}
                  required
                />
                <FormHelperText id="email">
                  {emailHelper.length !== 0 ? emailHelper : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "2em" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <OutlinedInput
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  labelWidth={105}
                  required
                />
                <FormHelperText id="phone"></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1.5em" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={105}
                  required
                />
                <FormHelperText id="password">
                  {/* passwordHelper.length !== 0 ? passwordHelper : "" */}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "2em" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="confirmpassword">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirmpassword"
                  type={showPassword ? "text" : "password"}
                  value={password2}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                  }}
                  labelWidth={200}
                  required
                />
                <FormHelperText id="confirmpassword"></FormHelperText>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              direction="row"
              style={{ marginTop: "1.5em" }}
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.signupButton}
                  disableRipple
                >
                  Signup
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    fontWeight: 300,
                    fontSize: "1.3rem",
                    textTransform: "none",
                  }}
                  color="primary"
                  onClick={handleClose}
                  disableRipple
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

Signup.propTypes = {
  create_parentuser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { create_parentuser })(Signup);
