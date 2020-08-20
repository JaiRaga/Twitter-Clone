import React, { Fragment, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Avatar,
  IconButton,
  Divider,
  Paper,
  Typography
} from "@material-ui/core";
import moment from "moment-twitter";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RepeatIcon from "@material-ui/icons/Repeat";
import CommentIcon from "@material-ui/icons/Comment";
import { useSelector, useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";
import profilePic from "../../img/raga.jpg";
import { getUserById } from "../../Redux/actions/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  margin: {
    margin: theme.spacing(1)
  },
  likeShareContainer: {
    marginTop: 10
  },
  like: {
    color: "#fa1616",
    backgroundColor: "#fa161611"
  },
  retweet: {
    color: "#01a9b4",
    backgroundColor: "#01a9b411"
  },
  comment: {
    color: "#12cad6",
    backgroundColor: "#12cad619"
  },
  paper: {
    maringTop: 10,
    marginBottom: 10,
    width: "100%",
    maxWidth: "100%",
    padding: 25
  },
  tweet: {
    marginTop: 10
  },
  marginTop: {
    marginTop: 2
  }
}));

const UserTweetItem = ({ tweet }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserById(tweet.owner));
  // }, [tweet.owner]);

  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  // const user = useSelector((state) => state.profile.profile);

  const parseDate = () => {
    let t = tweet.createdAt;
    t = new Date(t);

    let copyT = String(t);
    copyT = copyT.split(" ");

    t = Date.parse(t);
    t = Date.now() - t;

    let d = moment(moment() + t)
      .twitterShort()
      .split("");

    return d.slice(-1)[0] === "m" ||
      d.slice(-1)[0] === "s" ||
      (d[1] === "d" && d[0] <= 6)
      ? moment(moment() + t).twitterShort()
      : copyT[2] + " " + copyT[1];
  };

  return (
    <Fragment>
      <Paper elevation={3} className={classes.paper}>
        {loading || user === null ? (
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            item
            className={classes.loadingSpinner}>
            <RingLoader loading color='#6A07EE' size={25} />
          </Grid>
        ) : (
          <Grid container item>
            <Grid item className={classes.root}>
              <Avatar
                alt={user.username}
                src={profilePic}
                className={classes.large}
              />
              <Grid container item direction='column'>
                <Grid container item spacing={1}>
                  <Grid item>
                    <Typography variant='h5'>{user.username}</Typography>
                  </Grid>
                  <Grid item className={classes.marginTop}>
                    <Typography variant='caption'>@{user.handle}</Typography>
                  </Grid>
                  <Grid item className={classes.marginTop}>
                    <Typography variant='caption'>{parseDate()}</Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item className={classes.tweet}>
                  {tweet.text}
                </Grid>
                <Grid
                  container
                  item
                  justify='space-between'
                  className={classes.likeShareContainer}>
                  <Grid item>
                    <IconButton aria-label='like' className={classes.like}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label='retweet'
                      className={classes.retweet}>
                      <RepeatIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label='comment'
                      className={classes.comment}>
                      <CommentIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Fragment>
  );
};

export default UserTweetItem;
