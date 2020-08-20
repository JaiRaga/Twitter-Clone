import React from "react";
import {
  Grid,
  makeStyles,
  Paper,
  Avatar,
  Divider,
  Typography
} from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import parseDate from "../utils/parseDate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    },
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  spacing: {
    // paggingTop: 5,
    margin: 10
  },
  items: {
    padding: 5
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  username: {
    fontWeight: "700"
  }
}));

const CommentItem = ({ comment }) => {
  const classes = useStyles();
  const { username, handle } = comment.user;
  const { text, date } = comment;

  return (
    <Paper elevation={3} className={classes.spacing}>
      <Grid container item alignItems='center' className={classes.root}>
        <Grid item className={classes.items}>
          <Avatar className={classes.purple}>R</Avatar>
        </Grid>
        <Grid item className={classes.items}>
          <Grid container item direction='column'>
            <Grid item>
              <Typography variant='subtitle1' className={classes.username}>
                {username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>@{handle}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{parseDate(date)}</Grid>
        {/* <Divider orientation='vertical' /> */}

        <Grid item className={classes.items}>
          <Grid container item>
            {text}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommentItem;
