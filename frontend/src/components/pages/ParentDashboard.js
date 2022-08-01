import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { getParentUser } from "../../actions/auth";
import { getAllKids } from "../../actions/kids";
import { getCohorts } from "../../actions/programmes";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import AddKid from "../kids/AddKid";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));
const ParentDashboard = ({ kids, programmes, cohorts }) => {
  // const state = useSelector((state) => state.auth);
  const classes = useStyles();
  const [openAddChild, setOpenAddChild] = useState(false);
  const dispatch = useDispatch();

  const openAddChildModal = () => {
    setOpenAddChild(false);
  };

  useEffect(() => {
    dispatch(getParentUser());
    dispatch(getCohorts());
    dispatch(getAllKids());
  }, [dispatch]);
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid item container direction="row">
          <Grid item style={{ marginLeft: "5em" }}>
            <Typography variant="h6">My Kids</Typography>
            {kids ? (
              <React.Fragment>
                <TableContainer component={Paper} style={{ marginTop: "1em" }}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Programme</TableCell>
                        <TableCell>Cohort</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kids.map((kid) => (
                        <TableRow key={kid.id}>
                          <TableCell component="th" scope="row">
                            {kid.fullname}
                          </TableCell>
                          <TableCell>
                            {programmes.filter(
                              (programme) =>
                                programme.id === parseInt(kid.programme_id)
                            ).length !== 0
                              ? programmes.filter(
                                  (programme) =>
                                    programme.id === parseInt(kid.programme_id)
                                )[0].title
                              : ""}
                          </TableCell>
                          <TableCell>
                            {cohorts
                              ? cohorts.filter(
                                  (cohort) =>
                                    cohort.id === parseInt(kid.cohort_id)
                                ).length !== 0
                                ? cohorts.filter(
                                    (cohort) =>
                                      cohort.id === parseInt(kid.cohort_id)
                                  )[0].name
                                : ""
                              : ""}
                          </TableCell>
                          <TableCell align="center">
                            <Grid container>
                              <Button
                                variant="contained"
                                component={Link}
                                disableRipple
                                to={`/kids/edit/${kid.id}`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={kid.programme_id !== ""}
                                disableRipple
                                style={{ marginLeft: "1em" }}
                                component={Link}
                                to={`/programmes/enroll/${kid.id}`}
                              >
                                Enroll
                              </Button>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </React.Fragment>
            ) : (
              <Typography variant="body1">
                You have no registered kids
              </Typography>
            )}
          </Grid>
          <Grid item style={{ marginLeft: "auto", marginRight: "5em" }}>
            <Button
              variant="contained"
              onClick={() => setOpenAddChild(true)}
              disableRipple
            >
              Add Kid
            </Button>
          </Grid>
        </Grid>
        <Grid item style={{ marginLeft: "5em", marginTop: "5em" }}>
          <Typography>Payment History</Typography>
        </Grid>
      </Grid>
      <AddKid open={openAddChild} handleClose={openAddChildModal} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  kids: state.kidsreducer.kids,
  programmes: state.programmesReducer.programmes,
  cohorts: state.programmesReducer.cohorts,
});

export default connect(mapStateToProps, {
  getParentUser,
  getAllKids,
  getCohorts,
})(ParentDashboard);
