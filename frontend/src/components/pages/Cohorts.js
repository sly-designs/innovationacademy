import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import { getCohorts } from "../../actions/programmes";
import { enrollKid } from "../../actions/kids";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

import coderkids from "../../assets/coder-kids.png";
import youngcoders from "../../assets/young-coders.png";
import teencoders from "../../assets/teen-coders.png";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    background: "#fff",
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 15,
  },
  media: {
    height: 140,
    width: 140,
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  joinButton: {
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    textTransform: "none",
    marginLeft: "5px",
    marginBottom: "20px",
    borderRadius: 8,
    borderWidth: 3,
    height: "60px",
    width: "540px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "105px",
    },
  },
  formControl: {
    marginLeft: "10px",
    marginTop: "5px",
    minWidth: "auto",
  },
  selectEmpty: {
    /* marginTop: theme.spacing(2), */
  },
}));

const Cohorts = ({
  enrollKid,
  getCohorts,
  cohorts,
  programmes,
  isAuthenticated,
  kids,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams(); //2
  const dispatch = useDispatch();

  const [kidName, setKidName] = useState("");
  const [kidAge, setKidAge] = useState(0);
  const [enrolled, setEnrolled] = useState(false);

  const handleChange = (event) => {
    setKidName(event.target.value);
    computeAge(kids.filter((kid) => kid.fullname === event.target.value));
    console.log(kids.filter((kid) => kid.fullname === event.target.value));
  };

  const computeAge = (kid) => {
    const today = new Date();
    const birthDate = new Date(kid[0].dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    //console.log(age);
    setKidAge(age);
  };

  const handleEnrollKid = (e, programme_id, cohort_id) => {
    e.preventDefault();
    const { id, fullname, dob } = kids.filter(
      (kid) => kid.fullname === kidName
    )[0];

    const enrolledKid = {
      id,
      fullname,
      dob,
      programme_id,
      cohort_id,
    };

    console.log(enrolledKid);
    enrollKid(enrolledKid);
    setKidName("");
    setKidAge(0);
    setEnrolled(true);
  };

  useEffect(() => {
    dispatch(getCohorts);
  }, [getCohorts, dispatch]);

  const programme = programmes
    ? programmes.filter((programme) => programme.id === parseInt(id))
    : undefined;

  if (!enrolled) {
    return (
      <Grid container direction="column">
        <Grid item container justifyContent="space-evenly">
          {cohorts
            ? cohorts
                .filter((cohort) => cohort.programme_id === parseInt(id))
                .map((cohort) => (
                  <Grid item key={cohort.id}>
                    <Card className={classes.card}>
                      <CardHeader
                        title={programme[0].title}
                        subheader={`Age ${programme[0].minAge}-${programme[0].maxAge}`}
                      />
                      <CardMedia
                        align="center"
                        className={classes.media}
                        image={
                          programme[0].title === "Coder Kids"
                            ? coderkids
                            : programme[0].title === "Teen Coders"
                            ? teencoders
                            : youngcoders
                        }
                        title={
                          programme[0].title === "Coder Kids"
                            ? "coder kids image"
                            : programme[0].title === "Teen Coders"
                            ? "teen coders image"
                            : "young coders image"
                        }
                      />

                      <CardActionArea disableRipple>
                        <CardContent>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="h4" align="center">
                                {cohort.name}
                              </Typography>
                            </Grid>
                            <Grid item container>
                              <Grid item style={{ marginRight: 150 }}>
                                <Typography variant="subtitle1" align="center">
                                  Starts: {cohort.start}
                                </Typography>
                              </Grid>
                              <Grid item style={{ marginLeft: "auto" }}>
                                <Typography variant="subtitle1" align="center">
                                  Ends:{cohort.end}{" "}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              container
                              direction="column"
                              style={{
                                background: theme.palette.grey[400],
                                borderRadius: 10,
                                paddingLeft: 10,
                                marginTop: 15,
                                marginBottom: 20,
                              }}
                            >
                              <Grid item container>
                                <Grid item>
                                  <Typography
                                    variant="subtitle1"
                                    style={{ color: theme.palette.grey[900] }}
                                  >{`Name:`}</Typography>
                                </Grid>
                                <Grid item>
                                  <FormControl
                                    className={classes.formControl}
                                    error={
                                      kidName.length !== 0
                                        ? !(
                                            programme[0].minAge <= kidAge &&
                                            kidAge <= programme[0].maxAge
                                          )
                                        : undefined
                                    }
                                  >
                                    <Select
                                      value={kidName}
                                      onChange={handleChange}
                                      displayEmpty
                                      className={classes.selectEmpty}
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select Name
                                      </MenuItem>
                                      {kids ? (
                                        kids.map((kidValue) => (
                                          <MenuItem
                                            key={kidValue.id}
                                            value={kidValue.fullname}
                                          >
                                            {kidValue.fullname}
                                          </MenuItem>
                                        ))
                                      ) : (
                                        <MenuItem>Options loading...</MenuItem>
                                      )}
                                    </Select>
                                    {kidName.length !== 0 ? (
                                      <FormHelperText
                                        style={{ fontSize: "1.2rem" }}
                                      >
                                        {!(
                                          programme[0].minAge <= kidAge &&
                                          kidAge <= programme[0].maxAge
                                        )
                                          ? `${kidName} is not eligible for this program`
                                          : undefined}
                                      </FormHelperText>
                                    ) : null}
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  style={{ color: theme.palette.grey[900] }}
                                >{`Age: ${kidAge} Years`}</Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              container
                              direction="column"
                              style={{
                                background: theme.palette.grey[400],
                                borderRadius: 10,
                                paddingLeft: 10,
                              }}
                            >
                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  style={{ color: theme.palette.grey[900] }}
                                >{`Duration: ${programme[0].duration} Weeks`}</Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  style={{ color: theme.palette.grey[900] }}
                                >{`Location: ${programme[0].location}`}</Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              container
                              style={{
                                background: theme.palette.grey[400],
                                borderRadius: 10,
                                paddingLeft: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginTop: 15,
                                marginBottom: 20,
                              }}
                            >
                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  style={{ color: theme.palette.grey[600] }}
                                >
                                  Total cost:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                style={{ marginLeft: "auto", marginRight: 10 }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  style={{ color: theme.palette.grey[600] }}
                                >
                                  {`Ksh.${programme[0].price}`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Grid container justifyContent="center">
                          <Grid item>
                            <Button
                              onClick={(e) =>
                                handleEnrollKid(e, programme[0].id, cohort.id)
                              }
                              variant="contained"
                              color="primary"
                              disabled={
                                !(
                                  programme[0].minAge <= kidAge &&
                                  kidAge <= programme[0].maxAge
                                )
                              }
                              disableRipple
                              className={classes.joinButton}
                            >
                              Join this cohort
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
            : null}
          {}
        </Grid>
      </Grid>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
};

Cohorts.propTypes = {
  getCohorts: PropTypes.func.isRequired,
  cohorts: PropTypes.array,
  programmes: PropTypes.array,
  kids: PropTypes.array,
};

const mapStateToProps = (state) => ({
  cohorts: state.programmesReducer.cohorts,
  programmes: state.programmesReducer.programmes,
  kids: state.kidsreducer.kids,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCohorts, enrollKid })(Cohorts);
