import React, { useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CircleLoader } from "react-spinners";
import UserTweetItem from "./UserTweetItem";
import {
  getTweetsByMe,
  clearTweets,
  getAllTweets
} from "../../Redux/actions/tweet";

const UserTweets = () => {
  const tweet = useSelector((state) => state.tweet);
  const { loading, tweets } = tweet;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTweetsByMe());

    return () => {
      dispatch(clearTweets());
      // dispatch(getAllTweets());
    };
  }, []);

  return (
    <Grid container item>
      {loading && !tweets ? (
        <CircleLoader loading />
      ) : (
        tweets.map((tweet) => <UserTweetItem key={tweet._id} tweet={tweet} />)
      )}
    </Grid>
  );
};

export default UserTweets;
