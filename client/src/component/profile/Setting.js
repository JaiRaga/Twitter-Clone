import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { updateProfile } from "../../Redux/actions/auth";

import GoBack from "../layout/GoBack";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  setting: {},
  backButton: {
    width: "100%",
    marginTop: 5,
    marginBottom: 20
  },
  input: {
    marginBottom: 10
  },
  update: {
    marginTop: 17,
    marginLeft: 15
  },
  button: {
    backgroundColor: theme.palette.update.main
  },
  form: {
    padding: 5,
    margin: 5
  }
}));

const Setting = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  let { username, handle, email, avatar } = user;
  console.log(username, handle, email, avatar);

  const [setting, setSetting] = useState({
    username,
    handle,
    email,
    avatar
  });

  const handleChange = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
    console.log(setting);
  };

  // For Dialog modal
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleUpdate = () => {
    dispatch(updateProfile(setting));
    setOpen(false);
    console.log(setting);
  };

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        item
        xs={10}
        md={8}>
        <Grid item className={classes.backButton}>
          <GoBack fullWidth />
        </Grid>
        <form>
          <Grid container item direction='column' justify='center'>
            <Grid container item>
              <Grid item>
                <TextField
                  id='username'
                  name='username'
                  label='Username'
                  placeholder='Change Username'
                  value={setting.username}
                  onChange={handleChange}
                  fullWidth
                  className={classes.input}
                />
              </Grid>
              <Grid item className={classes.update}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item>
                <TextField
                  id='handle'
                  name='handle'
                  label='handle'
                  placeholder='Change Handle'
                  value={setting.handle}
                  onChange={handleChange}
                  fullWidth
                  className={classes.input}
                />
              </Grid>
              <Grid item className={classes.update}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item>
                <TextField
                  id='email'
                  name='email'
                  label='Email'
                  placeholder='Change Email'
                  value={setting.email}
                  onChange={handleChange}
                  fullWidth
                  className={classes.input}
                />
              </Grid>
              <Grid item className={classes.update}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item>
                <TextField
                  id='avatar'
                  name='avatar'
                  label='Avatar'
                  placeholder='Change Avatar'
                  value={setting.avatar}
                  onChange={handleChange}
                  fullWidth
                  className={classes.input}
                />
              </Grid>
              <Grid item className={classes.update}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {/* Dialog modal */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {"Do You Wish to Proceed?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Changes made here will Over Write existing User data. Do you Wish
              to Proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Disagree
            </Button>
            <Button onClick={handleUpdate} color='primary' autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Setting;
