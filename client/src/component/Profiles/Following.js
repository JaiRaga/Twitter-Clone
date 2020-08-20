import React from "react";
import { Grid, IconButton, Button } from "@material-ui/core";
import Profiles from "./Profiles";
import { useSelector } from "react-redux";

const Following = () => {
  const following = useSelector((state) => state.profile.following);
  return (
    <Grid item>
      <Profiles profiles={following} />
    </Grid>
  );
};

export default Following;
