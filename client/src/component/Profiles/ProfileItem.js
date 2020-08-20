import React, { Fragment } from "react";
import {
  Grid,
  Avatar,
  Paper,
  Button,
  makeStyles,
  Typography
} from "@material-ui/core";

import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../img/raga.jpg";
import { followUser, unFollowUser } from "../../Redux/actions/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  spaceLeft: {
    marginLeft: "auto"
  }
}));

const ProfileItem = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.profile.following);
  const isFollowing = following.filter((follow) => follow._id === user._id);
  console.log(isFollowing);
  return (
    <Fragment>
      <Grid container item justify='center'>
        <Grid item className={classes.root}>
          <Avatar alt='username' src={user.avatar} />
          <Grid container item direction='column' xs={5}>
            <Grid item>
              <Typography variant='h6'>{user.username}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>@{user.handle}</Typography>
            </Grid>

            <Grid item>
              <Typography variant='body1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                eius voluptate praesentium, corrupti ipsa voluptates.
                {/* {user.caption ? user.caption : "No caption Avaliable.."} */}
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.spaceLeft}>
            {/* <Button
              color='primary'
              onClick={() =>
                isFollowing
                  ? dispatch(followUser(user._id))
                  : dispatch(unFollowUser(user._id))
              }></Button> */}
            {isFollowing.length > 0 ? (
              <Button
                color='primary'
                onClick={() => dispatch(unFollowUser(user._id))}>
                Following
              </Button>
            ) : (
              <Button
                color='primary'
                variant='contained'
                onClick={() => dispatch(followUser(user._id))}>
                Follow
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileItem;
