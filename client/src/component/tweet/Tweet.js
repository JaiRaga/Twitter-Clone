import React, { Fragment, useState } from "react";
import {
  Grid,
  makeStyles,
  Avatar,
  TextField,
  Button,
  Paper
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import profilePic from "../../img/raga.jpg";
import PostTweetButton from "./PostTweetButton";
import { postTweet } from "../../Redux/actions/tweet";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginTop: "40px"
  },
  margin: {
    marginBottom: 10
  },
  textField: {
    width: "100%",
    maxWidth: "100%"
  }
}));

const Tweet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tweet, setTweet] = useState("");

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(postTweet(tweet));
    setTweet("");
  };

  return (
    <Fragment>
      <Paper elevation={3} className={classes.margin}>
        <Grid container item>
          <Grid item className={classes.root}>
            <Avatar alt='username' src={profilePic} className={classes.large} />
            <Grid container item spacing={8}>
              <Grid item className={classes.textField}>
                <form>
                  <TextField
                    fullWidth
                    name='tweet'
                    id='tweet'
                    label="What's happening?"
                    value={tweet}
                    onChange={onChange}></TextField>
                </form>
              </Grid>
              <Grid container item>
                <PostTweetButton submitHandler={submitHandler} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Tweet;
