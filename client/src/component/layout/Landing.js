import React, { Fragment } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "90vh"
  }
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.container}>
        <Typography variant='h5' color='primary'>
          Welcome to Twitter!
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default Landing;
