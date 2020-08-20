import React, { Fragment } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import AdjustIcon from "@material-ui/icons/Adjust";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  list: {
    display: "flex"
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  icons: {
    color: "white",
    minWidth: "35px"
  },
  right: {
    display: "flex",
    marginLeft: "auto"
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authLinks = (
    <Fragment>
      <List className={classes.list}>
        <Link to='/dashboard' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary='Twitter' />
          </ListItem>
        </Link>
      </List>
      <List className={classes.right}>
        <Link to='/dashboard' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>

        <Link to='/profile' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <PersonPinIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>

        <Link to='/setting' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <AdjustIcon />
            </ListItemIcon>
            <ListItemText primary='Setting' />
          </ListItem>
        </Link>

        <Link to='/landing' className={classes.link}>
          <ListItem button onClick={() => dispatch(logout())}>
            <ListItemIcon className={classes.icons}>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </Link>
      </List>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <List className={classes.list}>
        <Link to='/dashboard' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary='Twitter' />
          </ListItem>
        </Link>
      </List>
      <List className={classes.right}>
        <Link to='/login' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItem>
        </Link>

        <Link to='/register' className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary='Register' />
          </ListItem>
        </Link>
      </List>
    </Fragment>
  );

  return (
    <AppBar position='static' className={classes.navbar}>
      <Toolbar>{isAuthenticated && !loading ? authLinks : guestLinks}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
