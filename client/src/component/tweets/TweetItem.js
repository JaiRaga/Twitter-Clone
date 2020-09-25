import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Avatar,
  IconButton,
  Divider,
  Paper,
  Typography,
  Button,
  Tooltip
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import CommentIcon from "@material-ui/icons/Comment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";
import {
  addLike,
  removeLike,
  reTweet,
  deTweet,
  getComments
} from "../../Redux/actions/tweet";
import Comment from "../comments/Comment";
import PostComment from "../comments/PostComment";
import parseDate from "../utils/parseDate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    },
    width: "100%",
    maxWidth: "100%"
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  margin: {
    margin: theme.spacing(1)
  },
  likeShareContainer: {
    marginTop: 10
    // maxWidth: "100%",
  },
  nameHandleParent: {
    width: "auto"
  },
  username: {
    fontWeight: "700"
  },
  handle: {
    // fontWeight: "100"
  },
  right: {
    marginLeft: "auto"
  },
  edit: {
    color: "#28df99"
  },
  delete: {
    color: "#ff4b5c"
  },
  like: {
    color: "#fa1616",
    backgroundColor: "#fa161619"
  },
  retweet: {
    // color: "#01a9b4",
    // backgroundColor: "#01a9b411"
    color: "#1976d2",
    backgroundColor: "#1976d211"
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
  },
  expand: {
    marginLeft: "auto",
    marginBottom: 20
  },
  commentDisplay: {
    marginBottom: 15
  }
}));

const TweetItem = ({ tweet }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const loading = useSelector((state) => state.tweet.loading);
  const authLoading = useSelector((state) => state.auth.loading);
  const auth = useSelector((state) => state.auth.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const comments = tweet.comments;
  const user = tweet.owner;

  const [liked, setLiked] = useState(!!tweet.likes.length);
  const [retweet, setRetweet] = useState(!!tweet.retweets.length);
  const [comment, setComment] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [title, setTitle] = useState("Edit");

  const setLike = (id) => {
    let likes = tweet.likes.map((like) => like._id === id);
    console.log(tweet.likes.map((like) => like._id === id, likes));
    if (likes.length === 0 && !liked) {
      setLiked(true);
      dispatch(addLike(id));
    } else if (liked && likes.length > 0) {
      setLiked(false);
      dispatch(removeLike(id));
    }
  };

  const share = (id) => {
    let retweets = tweet.retweets.map((retweet) => retweet._id === id);
    // console.log(retweets);
    if (retweets.length === 0 && !retweet) {
      setRetweet(true);
      dispatch(reTweet(id));
    } else if (retweet && retweets.length > 0) {
      setRetweet(false);
      dispatch(deTweet(id));
    }
  };

  // Toggles comment display
  const toggleCommentHandler = () => {
    commentToggle ? setCommentToggle(false) : setCommentToggle(true);
  };

  if (auth !== null) console.log(auth.username);
  // console.log(user.username);

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
                src={user.avatar}
                className={classes.small}
              />
              <Grid container item direction='column'>
                <Grid container item spacing={1}>
                  <Grid
                    container
                    item
                    direction='column'
                    justify='center'
                    alignItems='flex-start'
                    className={classes.nameHandleParent}>
                    <Grid item>
                      <Typography variant='h5' className={classes.username}>
                        {user.username}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.marginTop}>
                      <Typography variant='body1' className={classes.handle}>
                        @{user.handle}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Dot />
                  </Grid> */}
                  <Grid item className={classes.marginTop}>
                    <Typography variant='caption'>
                      {parseDate(tweet.createdAt)}
                    </Typography>
                  </Grid>
                  {/* <Grid item className={classes.expand}>
                    <Tooltip title={title}>
                      <IconButton aria-label='expand-more'>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid> */}

                  <Grid item className={classes.right}>
                    {!!auth &&
                    isAuthenticated &&
                    auth.username === user.username ? (
                      <Grid container item justify='space-evenly'>
                        <IconButton className={classes.edit}>
                          <EditIcon />
                        </IconButton>
                        <IconButton className={classes.delete}>
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    ) : null}
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
                    <IconButton
                      aria-label='like'
                      className={classes.like}
                      onClick={() => setLike(tweet._id)}>
                      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    {tweet.likes.length > 0 ? (
                      <Typography variant='button' className={classes.like}>
                        {tweet.likes.length}
                      </Typography>
                    ) : (
                      <Typography variant='button' className={classes.like}>
                        0
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label='retweet'
                      className={classes.retweet}
                      onClick={() => share(tweet._id)}>
                      {retweet ? <RepeatOneIcon /> : <RepeatIcon />}
                    </IconButton>
                    {tweet.retweets.length > 0 ? (
                      <Typography variant='button' className={classes.retweet}>
                        {tweet.retweets.length}
                      </Typography>
                    ) : (
                      <Typography variant='button' className={classes.retweet}>
                        0
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    {tweet.retweets.length > 0 ? (
                      <Typography variant='button' className={classes.comment}>
                        {comments.length}
                      </Typography>
                    ) : (
                      <Typography variant='button' className={classes.comment}>
                        0
                      </Typography>
                    )}
                    <IconButton
                      aria-label='comment'
                      className={classes.comment}
                      onClick={() => setComment((prevState) => !prevState)}>
                      {comment ? <CommentIcon /> : <AddCommentIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>

      {comment ? <PostComment id={tweet._id} /> : null}

      <Button
        fullWidth
        disabled={comments.length === 0}
        color='primary'
        onClick={toggleCommentHandler}
        className={classes.commentDisplay}>
        {commentToggle
          ? "Hide Comments"
          : comments.length > 1
          ? comments.length - 1 + "+ comments"
          : comments.length + " comment"}
      </Button>

      {commentToggle ? <Comment comments={comments} /> : null}
    </Fragment>
  );
};

export default TweetItem;
