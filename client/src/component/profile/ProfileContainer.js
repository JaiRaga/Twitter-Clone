import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CircleLoader } from "react-spinners";
import Profile from "./Profile";
import {
  getTweetsByMe,
  clearTweets,
  getRetweetsByMe,
  getLikesByMe
} from "../../Redux/actions/tweet";
import Tweets from "../tweets/Tweets";
import ToggleTweets from "../tweets/ToggleTweets";

const style = {
  Grid: {
    marginTop: 10
  }
};

const ProfileContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTweetsByMe());
    dispatch(getRetweetsByMe());
    dispatch(getLikesByMe());

    return () => {
      dispatch(clearTweets());
      // dispatch(getAllTweets());
    };
  }, []);

  const tweet = useSelector((state) => state.tweet);
  const { loading, tweets } = tweet;

  return (
    <Grid
      container
      // spacing={2}
      style={style.Grid}
      justify='center'
      alignItems='center'>
      <Grid
        container
        item
        xs={12}
        sm={8}
        md={5}
        direction='column'
        // justify='center'
        // alignItems='center'
        spacing={2}>
        <Profile />

        <Grid container item justify='center'>
          {loading || !tweets ? (
            <CircleLoader loading color='#1976d2' />
          ) : (
            <Fragment>
              <Grid container item justify='center' alignItems='center'>
                <ToggleTweets />
              </Grid>
              {/* <Tweets tweets={tweets} /> */}
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileContainer;
