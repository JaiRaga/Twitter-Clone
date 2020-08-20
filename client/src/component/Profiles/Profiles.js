import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
import { Grid, Typography, IconButton, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  const loading = useSelector((state) => state.profile.loading);
  const user = useSelector((state) => state.auth.user);

  return (
    <Grid container>
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
          <Button onClick={() => history.push("/followers")}>Followers</Button>
          <Button onClick={() => history.push("/following")}>Following</Button>
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
    </Grid>
  );
};

export default Profiles;
