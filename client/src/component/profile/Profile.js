import React, { useEffect } from "react";
import { Grid, Avatar, makeStyles, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { PacmanLoader } from "react-spinners";
import profilePic from "../../img/raga.jpg";
import { useHistory } from "react-router-dom";
import { getFollowers, getFollowing } from "../../Redux/actions/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  back: {
    padding: 10
  },
  padding: {
    paddingLeft: 10
  },
  loadingSpinner: {
    margin: 15,
    padding: 15
  },
  follow: {
    marginTop: 25
  },
  username: {
    fontWeight: "700",
    fontSize: "24px",
    margin: 0,
    padding: 0
  },
  handle: {
    margin: 0,
    padding: 0
  }
}));

const Profile = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowing());
  }, []);

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
          <Grid container alignItems='center' item>
            <Grid item>
              <div className={classes.root}>
                <Avatar
                  alt={user.username}
                  src={profilePic}
                  className={classes.large}></Avatar>
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                direction='column'
                className={classes.padding}
                item>
                <Grid className={classes.username} item>
                  {user.username}
                </Grid>
                <Grid className={classes.handle} item>
                  @{user.handle}
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => history.push("/setting")}>
              Edit Profile
            </Button>
          </Grid>
          <Grid container direction='column' alignItems='center'>
            <Grid className={classes.padding} item>
              {user.caption}
            </Grid>
            <Grid
              container
              justify='space-evenly'
              className={classes.follow}
              item>
              {user.following.length}
              <Button
                color='primary'
                fullWidth
                onClick={() => history.push("/following")}>
                Following
              </Button>

              {user.followers.length}
              <Button
                color='primary'
                fullWidth
                onClick={() => history.push("/followers")}>
                Followers
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
