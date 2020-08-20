import React from "react";
import {
  Grid,
  Avatar,
  makeStyles,
  Button,
  Typography
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { PacmanLoader } from "react-spinners";
import profilePic from "../../img/raga.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0)
    }
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  back: {
    // background: "#556cd6",
    padding: 10
  },
  centerText: {
    // margin: 3,
    padding: 3
  },
  loadingSpinner: {
    margin: 15,
    padding: 15
  },
  follow: {
    marginTop: 4
  },
  username: {
    fontWeight: "800",
    margin: 0,
    padding: 0
  },
  handle: {
    margin: 0,
    padding: 0
  }
}));

const SideProfile = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  return (
    <Grid container item>
      {loading || user === null ? (
        <Grid
          container
          justify='center'
          item
          className={classes.loadingSpinner}>
          <PacmanLoader loading color='#07ADEE' size={25} />
        </Grid>
      ) : (
        <Grid container direction='column' item className={classes.back}>
          <Grid item>
            <div className={classes.root}>
              <Avatar
                alt={user.username}
                src={profilePic}
                className={classes.small}></Avatar>
            </div>
          </Grid>
          <Grid container direction='column'>
            <Grid className={classes.centerText} item>
              <div className={classes.username}>{user.username}</div>
            </Grid>
            <Grid className={classes.centerText} item>
              <div className={classes.handle}>@{user.handle}</div>
            </Grid>
            <Grid className={classes.centerText} item>
              {user.caption}
            </Grid>
            <Grid
              container
              justify='space-between'
              className={classes.follow}
              item>
              <Grid item>{user.following.length} Following</Grid>
              <Grid item>{user.followers.length} Followers</Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SideProfile;
