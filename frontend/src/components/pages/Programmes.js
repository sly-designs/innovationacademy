import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getProgrammes } from "../../actions/programmes";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Programme from "./Programme";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    background: "#fff",
    border: `2px solid ${theme.palette.grey[400]}`,
    borderRadius: 10,
  },
  media: {
    height: 140,
    width: 140,
    marginTop: "5px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tagsContainer: { marginTop: "15px", marginBottom: "15px" },
  ageContainer: {
    border: `2px solid ${theme.palette.grey[400]}`,
    borderRadius: 50,
    width: 140,
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  priceContainer: {
    border: `2px solid ${theme.palette.grey[400]}`,
    borderRadius: 50,
    width: 235,
    paddingTop: "5px",
    paddingBottom: "5px",
    marginLeft: "auto",
  },
  enrollButton: {
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    textTransform: "none",
    marginLeft: "5px",
    marginBottom: "20px",
    borderRadius: 8,
    borderWidth: 3,
    height: "55px",
    width: "170px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "105px",
    },
  },
}));

const Programmes = ({ getProgrammes, programmes, isAuthenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams;

  useEffect(() => {
    dispatch(getProgrammes);
  }, [dispatch, getProgrammes]);
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h2" align="center">
          Our programes & classes
        </Typography>
        <Typography variant="subtitle1" align="center">
          At Innovation Academy, we have the best curriculum for your children. Enroll
          now and be part of our tech journey.
        </Typography>
        <Typography variant="subtitle1" align="center">
          Select a program to view the available cohorts
        </Typography>
      </Grid>
      <Grid
        item
        container
        className={classes.mainContainer}
        justifyContent="space-evenly"
      >
        {programmes
          ? programmes.map((programme) => (
              <Grid item key={programme.id} style={{ marginTop: "50px" }}>
                <Programme
                  key={programme.programmeTitle}
                  classes={classes}
                  programme={programme}
                  isAuthenticated={isAuthenticated}
                  childId={id}
                />
              </Grid>
            ))
          : "Loading ...."}
      </Grid>
    </Grid>
  );
};

Programmes.propTypes = {
  getProgrammes: PropTypes.func.isRequired,
  programmes: PropTypes.array,
};

const mapStateToProps = (state) => ({
  programmes: state.programmesReducer.programmes,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProgrammes })(Programmes);
