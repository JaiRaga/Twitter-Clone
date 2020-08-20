import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CircleLoader } from "react-spinners";
import Profile from "./Profile";
import { getTweetsByMe, clearTweets } from "../../Redux/actions/tweet";
import Tweets from "../tweets/Tweets";

const style = (theme) => ({
  Grid: {
    marginTop: 10
  }
});

const ProfileContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTweetsByMe());

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
      spacing={2}
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
        justify='center'
        alignItems='center'
        spacing={4}>
        <Profile />
        <Grid container item justify='center'>
          {loading || !tweets ? (
            <CircleLoader loading color='#1976d2' />
          ) : (
            <Tweets tweets={tweets} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileContainer;
