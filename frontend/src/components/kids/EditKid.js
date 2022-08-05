import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getKid, updateKid } from "../../actions/kids";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  updateChildButton: {
    ...theme.typography.reusablebtn,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: theme.palette.common.blue,
    marginRight: "45px",
    height: "50px",
    width: "200px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "250px",
      marginRight: "40px",
    },
  },
}));

const EditKid = ({ getKid, updateKid, kid }) => {
  const classes = useStyles();
  //const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertState, setAlertState] = useState({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openAlert } = alertState;

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname.length !== 0 || dob.length !== 0) {
      const updatedKid = {
        id,
        fullname,
        dob,
      };
      //console.log(updatedKid);
      updateKid(updatedKid);
      setFullname("");
      setDob("");
      setSubmitted(true);
      setAlertState({
        openAlert: true,
        ...{ vertical: "top", horizontal: "center" },
      });
    }
  };

  console.log(`openAlert ${openAlert}`);

  const handleAlertClose = () => {
    setAlertState({ ...alertState, openAlert: false });
  };

  useEffect(() => {
    if (id) {
      getKid(id);
    }
  }, [id, getKid]);

  useEffect(() => {
    if (kid) {
      setFullname(kid.fullname);
      setDob(kid.dob);
    }
  }, [kid]);

  if (!submitted) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item style={{ marginTop: "5em" }}>
          <Typography variant="h4">Edit Kid</Typography>
        </Grid>
        <form
          autoComplete="off"
          style={{ marginTop: "2em" }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
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
                className={classes.updateChildButton}
                disableRipple
              >
                Update Child
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
                component={Link}
                to="/dashboard"
                disableRipple
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  } else {
    if (openAlert) {
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
              onClose={handleAlertClose}
              severity="success"
            >
              update was successful
            </Alert>
          </Snackbar>
        </>
      );
    }
  }
};

EditKid.propTypes = {
  getKid: PropTypes.func.isRequired,
  updateKid: PropTypes.func.isRequired,
  kid: PropTypes.object,
};

const mapStateToProps = (state) => ({
  kid: state.kidsreducer.kid,
});

export default connect(mapStateToProps, { getKid, updateKid })(EditKid);
