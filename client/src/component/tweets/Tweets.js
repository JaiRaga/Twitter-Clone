import React from "react";
import { Grid } from "@material-ui/core";

import TweetItem from "./TweetItem";

const Tweets = ({ tweets }) => {
  return (
    <Grid container item>
      {tweets.map((tweet) => (
        <TweetItem key={tweet._id} tweet={tweet} />
      ))}
    </Grid>
  );
};

export default Tweets;
