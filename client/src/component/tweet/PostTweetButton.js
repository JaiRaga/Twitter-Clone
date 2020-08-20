import React from "react";
import { Grid, Button } from "@material-ui/core";

const PostTweetButton = ({ submitHandler }) => {
  return (
    <Grid item>
      <Button onClick={submitHandler} variant='contained' color='primary'>
        Tweet
      </Button>
    </Grid>
  );
};

export default PostTweetButton;
