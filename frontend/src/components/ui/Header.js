import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  logoContainer: {
    textTransform: "none",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  logo: {
    color: theme.palette.common.blue,
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    fontWeight: 700,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  tabContainer: {
    marginLeft: "20px",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 15,
    marginLeft: "25px",
  },
  authButtonContainer: {
    marginLeft: "auto",
    marginRight: "100px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
  },
  loginButton: {
    ...theme.typography.reusablebtn,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: theme.palette.common.blue,
    marginRight: "50px",
    height: "45px",
    width: "125px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "105px",
      marginRight: "40px",
    },
  },
  signupButton: {
    ...theme.typography.reusablebtn,
    borderRadius: 8,
    borderWidth: 3,
    height: "45px",
    width: "125px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      height: "45px",
      width: "105px",
    },
  },
  avatarIconContainer: {
    marginLeft: "auto",
    marginRight: "100px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
  },
  avatarIcon: {
    width: 40,
    height: 40,
    color: "#fff",
    backgroundColor: theme.palette.common.blue,
  },
  menu: {
    width: "200px",
    marginTop: "38px",
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: "#FFF",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  //const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openLoginModal = () => {
    setOpenLogin(false);
  };

  const openSignupModal = () => {
    setOpenSignup(false);
  };

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const routes = useMemo(() => {
    return [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Explore Programmes",
        link: "/programmes",
        activeIndex: 1,
      },
      {
        name: "About Us",
        link: "/about",
        activeIndex: 2,
      },
      {
        name: "Contact Us",
        link: "/contact",
        activeIndex: 3,
      },
    ];
  }, []);

  /* const menuOptions = [
    {
      name: "Payments",
      link: "/payments",
    },
    {
      name: "Settings",
      link: "/settings",
    },
    {
      name: "Log",
      link: "/payments",
    },
  ]; */

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.Fragmentvalue !== route.activeIndex) {
            props.setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [props.value, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        className={classes.tabContainer}
        onChange={handleChange}
        indicatorColor={"#fff"}
      >
        {state.isAutheticated
          ? [
              ...routes,
              {
                name: "Dashboard",
                link: "/dashboard",
                activeIndex: 3,
              },
            ].map((route, index) => (
              <Tab
                key={`${route} ${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
              />
            ))
          : routes.map((route, index) => (
              <Tab
                key={`${route} ${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
              />
            ))}
      </Tabs>
    </React.Fragment>
  );

  const publicLinks = (
    <React.Fragment>
      <Button
        component={Link}
        to="/"
        className={classes.logoContainer}
        disableRipple
        onClick={() => props.setValue(0)}
      >
        <span className={classes.logo}> innovation Academy</span>
      </Button>
      {matches ? null : tabs}

      <div className={classes.authButtonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.loginButton}
          disableFocusRipple
          disableRipple
          onClick={() => setOpenLogin(true)}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableFocusRipple
          disableRipple
          className={classes.signupButton}
          onClick={() => setOpenSignup(true)}
        >
          Sign Up
        </Button>
      </div>
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      <Button
        component={Link}
        to="/"
        className={classes.logoContainer}
        disableRipple
        onClick={() => props.setValue(0)}
      >
        <span className={classes.logo}> innovation Academy</span>
      </Button>
      {matches ? null : tabs}

      <div className={classes.avatarIconContainer}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar className={classes.avatarIcon}>
            <AccountCircleIcon
              fontSize="large"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            />
          </Avatar>
        </StyledBadge>

        {/* <Button
          variant="contained"
          disableFocusRipple
          disableRipple
          onClick={() => dispatch(logout())}
        >
          Log Out
        </Button> */}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          classes={{ paper: classes.menu }}
          onClose={handleMenuClose}
          MenuListProps={{ onMouseLeave: handleMenuClose }}
          elevation={0}
          style={{ zIndex: 1302 }}
        >
          <MenuItem onClick={handleMenuClose}>Payments</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            {state.isAuthenticated ? authLinks : publicLinks}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
      <Login open={openLogin} handleClose={openLoginModal} />
      <Signup open={openSignup} handleClose={openSignupModal} />
    </React.Fragment>
  );
};

export default Header;
