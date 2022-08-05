import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addKid } from "../../actions/kids";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  addChildButton: {
    ...theme.typography.reusablebtn,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: theme.palette.common.blue,
    marginRight: "45px",
    height: "45px",
    width: "150px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "250px",
      marginRight: "40px",
    },
  },
}));

const formatDateToString = () => {
  const date = new Date();
  let dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  let MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  let yyyy = date.getFullYear();

  return `${yyyy}-${MM}-${dd}`;
};

const AddKid = ({ open, handleClose, addKid, kid }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState(formatDateToString());
  const [submitted, setSubmitted] = useState(false);
  const [alertState, setAlertState] = useState({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
  });

  const { openAlert, vertical, horizontal } = alertState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname.length !== 0 || dob.length !== 0) {
      const kid = {
        fullname,
        dob,
      };

      addKid(kid);
      setFullname("");
      setDob(formatDateToString());
      setSubmitted(!submitted);
      setAlertState({
        openAlert: true,
        ...{ vertical: "top", horizontal: "center" },
      });
    }
  };

  const handleAlertClose = () => {
    setAlertState({ ...alertState, openAlert: false });
  };

  if (!submitted) {
    return (
      <React.Fragment>
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
                  Add Child
                </Typography>
              </Grid>
              <form
                autoComplete="off"
                style={{ marginTop: "2em" }}
                onSubmit={(e) => handleSubmit(e)}
              >
                <Grid item style={{ marginBottom: "2em" }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="fullname">Full name</InputLabel>
                    <OutlinedInput
                      id="fullname"
                      type="text"
                      value={fullname}
                      onChange={(event) => setFullname(event.target.value)}
                      labelWidth={100}
                    />
                  </FormControl>
                </Grid>

                <Grid item style={{ marginBottom: "1.5em" }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-dob">
                      Date of Birth
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-dob"
                      type="date"
                      value={dob}
                      onChange={(event) => {
                        setDob(event.target.value);
                      }}
                      labelWidth={130}
                    />
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
                      type="submit"
                      color="primary"
                      className={classes.addChildButton}
                      disableRipple
                    >
                      Add Child
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
  } else {
    return (
      <>
        <Redirect to="/dashboard" />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          key={vertical + horizontal}
        >
          <Alert
            style={{ fontWeight: 900 }}
            variant="filled"
            severity="success"
          >
            child added succesfully
          </Alert>
        </Snackbar>
      </>
    );
  }
};

AddKid.propTypes = {
  addKid: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  kids: state.kidsreducer.kids,
  kid: state.kidsreducer.kid,
});

export default connect(mapStateToProps, { addKid })(AddKid);
