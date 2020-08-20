import React from "react";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const GoBack = ({ fullWidth }) => {
  const history = useHistory();
  return (
    <Grid container justify='flex-start' item>
      <Button fullWidth={fullWidth} onClick={() => history.goBack()}>
        Go Back
      </Button>
    </Grid>
  );
};

export default GoBack;
