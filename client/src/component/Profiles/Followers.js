import React from "react";
import { Grid, IconButton, Button } from "@material-ui/core";
import Profiles from "./Profiles";
import { useSelector } from "react-redux";

const Followers = () => {
  const followers = useSelector((state) => state.profile.followers);
  return (
    <Grid container>
      <Profiles profiles={followers} />
    </Grid>
  );
};

export default Followers;
