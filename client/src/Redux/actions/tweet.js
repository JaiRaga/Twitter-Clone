import axios from "axios";
import {
  GET_TWEETS,
  POST_TWEET,
  GET_TWEETS_BY_ME,
  GET_TWEETS_BY_USER,
  TWEET_ERROR,
  AUTH_ERROR,
  CLEAR_TWEETS,
  DELETE_TWEET,
  UPDATE_LIKES,
  RETWEET,
  UPDATE_COMMENTS,
  COMMENT_ERROR,
  LIKE_ERROR,
  SHARE_ERROR,
  POST_COMMENT
} from "./types";
import { useDispatch } from "react-redux";

// Get all tweets on dashboard
export const getAllTweets = () => async (dispatch) => {
  try {
    // dispatch(clearTweets());
    const res = await axios.get("/api/tweets");
    console.log("Public");
    dispatch({
      type: GET_TWEETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: TWEET_ERROR });
  }
};

// Clear all Tweets
export const clearTweets = () => async (dispatch) => {
  try {
    console.log("clear");
    dispatch({ type: CLEAR_TWEETS });
  } catch (err) {
    dispatch({ type: TWEET_ERROR });
  }
};

// Get tweets by me
export const getTweetsByMe = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tweets/me");
    console.log("Me");
    dispatch({
      type: GET_TWEETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Get tweet by a User

// Add/Post tweet
export const postTweet = (tweet) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ text: tweet });

  try {
    const res = await axios.post("/api/tweet", body, config);
    dispatch({ type: POST_TWEET, payload: res.data });
    // dispatch(getAllTweets());
  } catch (err) {
    dispatch({ type: TWEET_ERROR });
  }
};

// Delete tweet
export const deleteTweet = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tweet/${id}`);

    dispatch({ type: DELETE_TWEET, payload: id });
  } catch (err) {
    dispatch({ type: TWEET_ERROR });
  }
};

// Add Like
export const addLike = (tweetId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/like/${tweetId}`);
    console.log(res.data);
    dispatch({ type: UPDATE_LIKES, payload: { tweetId, likes: res.data } });
  } catch (err) {
    dispatch({ type: LIKE_ERROR });
  }
};

// Remove Like
export const removeLike = (tweetId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/unlike/${tweetId}`);
    console.log(res.data);
    dispatch({ type: UPDATE_LIKES, payload: { tweetId, likes: res.data } });
  } catch (err) {
    dispatch({ type: LIKE_ERROR });
  }
};

// Add Comment
export const postComment = (id, comment) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ text: comment });

  try {
    const res = await axios.post(`/api/comment/${id}`, body, config);
    dispatch({ type: UPDATE_COMMENTS, payload: { id, comments: res.data } });
    // dispatch(getComments(id));
  } catch (err) {
    dispatch({ type: COMMENT_ERROR });
  }
};

// Remove Comment

// Share Tweet
export const reTweet = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/retweet/${id}`);
    console.log(res.data);
    dispatch({ type: RETWEET, payload: { id, retweets: res.data } });
  } catch (err) {
    dispatch({ type: SHARE_ERROR });
  }
};

// UnShare Tweet
export const deTweet = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/detweet/${id}`);
    console.log(res.data);
    dispatch({ type: RETWEET, payload: { id, retweets: res.data } });
  } catch (err) {
    dispatch({ type: SHARE_ERROR });
  }
};
