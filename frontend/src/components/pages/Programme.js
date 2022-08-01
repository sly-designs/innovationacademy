import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import coderkids from "../../assets/coder-kids.png";
import youngcoders from "../../assets/young-coders.png";
import teencoders from "../../assets/teen-coders.png";

const Programme = ({ classes, programme, isAuthenticated, childId }) => {
  const [alertState, setAlertState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = alertState;

  const handleAlertOpen = (newState) => () => {
    setAlertState({ open: true, ...newState });
  };

  const handleAlertClose = () => {
    setAlertState({ ...alertState, open: false });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea disableRipple>
          <CardMedia
            align="center"
            className={classes.media}
            image={
              programme.title === "Coder Kids"
                ? coderkids
                : programme.title === "Teen Coders"
                ? teencoders
                : youngcoders
            }
            title={
              programme.title === "Coder Kids"
                ? "coder kids image"
                : programme.title === "Teen Coders"
                ? "teen coders image"
                : "young coders image"
            }
          />
          <CardContent>
            <Typography align="center" gutterBottom variant="h4">
              {programme.title}
            </Typography>
            <Grid container className={classes.tagsContainer}>
              <Grid item className={classes.ageContainer}>
                <Typography align="center" variant="subtitle1">
                  {`Age ${programme.minAge}-${programme.maxAge}`}
                </Typography>
              </Grid>
              <Grid item className={classes.priceContainer}>
                <Typography align="center" variant="subtitle1">
                  {`Price: Ksh. ${programme.price}`}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1">{programme.description}</Typography>
            <Grid
              container
              direction="column"
              style={{
                marginTop:
                  programme.title === "Coder Kids"
                    ? "105px"
                    : programme.title === "Teen Coders"
                    ? "40px"
                    : 0,
              }}
            >
              <Grid item>
                <Typography variant="subtitle1">{`Duration: ${programme.duration} Weeks`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{`Location: ${programme.location}`}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.enrollButton}
            disableRipple
            component={Link}
            to={isAuthenticated ? `/${programme.id}/cohorts/` : undefined}
            onClick={
              isAuthenticated
                ? undefined
                : handleAlertOpen({ vertical: "top", horizontal: "center" })
            }
          >
            Enroll
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        key={vertical + horizontal}
      >
        <Alert
          style={{ fontWeight: 900 }}
          variant="filled"
          onClose={handleAlertClose}
          severity="error"
        >
          Kindly log in to continue!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Programme;
