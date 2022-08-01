import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Link } from "react-router-dom";
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
  loginButton: {
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

export const Login = ({
  open,
  handleClose,
  isAuthenticated,
  isAdmin,
  login,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event) => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username: email, password });
    login({ username: email, password });
  };

  if (isAuthenticated && !isAdmin) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <React.Fragment>
        <Redirect to="/" />;
        <Dialog
          style={{ zIndex: 1302 }}
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={handleClose}
          fullWidth
          PaperProps={{
            style: {
              borderRadius: 10,
              paddingTop: matchesXS ? "1em" : "0.5",
              paddingBottom: matchesXS ? "1em" : "5em",
              paddingLeft: matchesXS
                ? 0
                : matchesSM
                ? "2em"
                : matchesMD
                ? "2    em"
                : "5em",
              paddingRight: matchesXS
                ? 0
                : matchesSM
                ? "2em"
                : matchesMD
                ? "2em"
                : "5em",
            },
          }}
        >
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <Typography align="center" variant="h4" gutterBottom>
                  Login
                </Typography>
              </Grid>
              <form
                autoComplete="off"
                style={{ marginTop: "2em" }}
                onSubmit={(e) => handleLogin(e)}
              >
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
                      onChange={onChange}
                      labelWidth={70}
                    />
                    <FormHelperText id="email">
                      {emailHelper.length !== 0 ? emailHelper : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item style={{ marginBottom: "1.5em" }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
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
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{ marginBottom: "0.5em" }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: "1.2rem",
                      color: `${theme.palette.common.blue}`,
                    }}
                    component={Link}
                    to="/reset-password"
                  >
                    Forgot password?
                  </Typography>
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
                      className={classes.loginButton}
                      disableRipple
                    >
                      Login
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
      </React.Fragment>
    );
  }
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { login })(Login);
