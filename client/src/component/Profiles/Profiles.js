import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
import { Grid, Typography, IconButton, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SyncLoader } from "react-spinners";

const style = {
  Layout: {
    marginLeft: 7
  },
  Spinner: {
    margin: "10%"
  }
};

const Profiles = ({ profiles }) => {
  const history = useHistory();
  const location = useLocation();
  const loading = useSelector((state) => state.profile.loading);
  const user = useSelector((state) => state.auth.user);

  const redirectHandler = (whereTo) => history.push(`/${whereTo}`);

  return (
    <Grid container>
      {user !== null ? (
        <Fragment>
          <Grid item style={style.Layout}>
            <IconButton
              aria-label='back-button'
              color='secondary'
              onClick={() => history.push("/profile")}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container item direction='column' style={style.Layout}>
              <Grid item>
                <Typography variant='h5'>{user.username}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='caption'>@{user.handle}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction='column'>
            <Grid container item justify='space-evenly'>
              <Button
                color={
                  location.pathname === "/followers" ? "secondary" : "default"
                }
                onClick={() => redirectHandler("followers")}>
                Followers
              </Button>
              <Button
                color={
                  location.pathname === "/following" ? "secondary" : "default"
                }
                onClick={() => redirectHandler("following")}>
                Following
              </Button>
            </Grid>
            <Grid container item justify='center'>
              {loading ? (
                <Grid item style={style.Spinner}>
                  <SyncLoader loading size={15} color='#1976d2' />
                </Grid>
              ) : (
                <Grid item>
                  {profiles.length !== 0 ? (
                    profiles.map((profile) => <ProfileItem user={profile} />)
                  ) : (
                    <Typography variant='h5'>No Users..</Typography>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Grid container justify='center' item style={style.Spinner}>
          <SyncLoader loading size={15} color='#1976d2' />
        </Grid>
      )}
    </Grid>
  );
};

export default Profiles;
