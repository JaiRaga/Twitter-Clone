import axios from "axios";
import {
  GET_PROFILE,
  AUTH_ERROR,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  UPDATE_FOLLOWING
} from "./types";

// Get Followers
export const getFollowers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/followers");
    dispatch({ type: GET_FOLLOWERS, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

// Get Following
export const getFollowing = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/following");
    dispatch({ type: GET_FOLLOWING, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

// Follow User
export const followUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/follow/${id}`);
    console.log(res.data);
    // dispatch({ type: UPDATE_FOLLOWING, payload: res.data });
    dispatch(getFollowing());
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

// Un-Follow User
export const unFollowUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/unfollow/${id}`);
    // dispatch({ type: UPDATE_FOLLOWING, payload: res.data });
    dispatch(getFollowing());
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

// Get User
export const fetchProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
