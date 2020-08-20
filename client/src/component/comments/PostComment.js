import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { postComment } from "../../Redux/actions/tweet";

const PostComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleComment = (e) => setComment(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(postComment(id, comment));
    setComment("");
  };

  return (
    <Grid container item>
      <TextField
        id='comment'
        name='comment'
        label='Leave a Comment'
        type='text'
        value={comment}
        variant='outlined'
        multiline
        rowsMax={4}
        fullWidth
        onChange={handleComment}
      />

      <Button color='primary' fullWidth onClick={onSubmit}>
        Post
      </Button>
    </Grid>
  );
};

export default PostComment;
