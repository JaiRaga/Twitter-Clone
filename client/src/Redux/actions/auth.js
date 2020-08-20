import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  CLEAR_TWEETS,
  AUTH_ERROR,
  PROFILE_ERROR
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { useSelector } from "react-redux";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/user/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser = ({ username, handle, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, handle, email, password });

  try {
    const res = await axios.post("/api/register", body, config);
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_TWEETS });
  dispatch({ type: LOGOUT });
};

// Update User Profile
export const updateProfile = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ ...formData });
  try {
    const res = await axios.patch("/api/user", body, config);
    console.log(res.data);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};
