import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import CommentItem from "./CommentItem";

const Comment = ({ comments }) => {
  return (
    <Grid container item direction='column'>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </Grid>
  );
};

export default Comment;
