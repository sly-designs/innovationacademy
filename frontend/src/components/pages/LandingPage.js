import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Programmes from "./Programmes";

import heroImage from "../../assets/herosection.png";

const useStyles = makeStyles((theme) => ({
  heroTextContainer: {
    marginLeft: "3%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  heroSpanText: {
    color: theme.palette.common.blue,
  },
  joinButton: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    textTransform: "none",
    height: 50,
    width: 200,
    borderRadius: 10,
  },
  programmesContainer: {
    marginTop: "3.5rem",
    marginBottom: "5rem",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: "4%" }}>
        <Grid
          container
          alignItems="center"
          direction={matchesMD ? "column" : "row"}
          justifyContent={matchesMD ? "center" : "flex-end"}
        >
          <Grid item className={classes.heroTextContainer} sm>
            <Typography
              variant="h2"
              style={{ marginBottom: "20px" }}
              align={matchesMD ? "center" : undefined}
            >
              Enrich children with
              <br />
              skills for the{" "}
              <span className={classes.heroSpanText}>future.</span>
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ marginBottom: "25px" }}
              align={matchesMD ? "center" : undefined}
            >
              Help your children to make the first steps in the world of
              computer {matchesSM ? null : <br />} programming. Engage your
              kids’ minds and prepare them for an{matchesSM ? null : <br />}
              increasingly tech-driven world.
            </Typography>
            <Grid container justifyContent={matchesMD ? "center" : undefined}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.joinButton}
                  disableRipple
                >
                  Join now
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : "10px",
              marginTop: matchesSM ? "10%" : 0,
            }}
            sm
          >
            <img src={heroImage} alt="hero-section " />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.programmesContainer}>
        <Programmes />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
