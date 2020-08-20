import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../Redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  registerContainer: {
    marginTop: "20px"
  }
}));

const Login = () => {
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    handle: ""
  });

  const { handle, username, email, password, password2 } = registerState;

  const onChange = (e) =>
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Password do not match");
    } else {
      dispatch(registerUser({ username, email, handle, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid
        className={classes.registerContainer}
        container
        item
        xs={6}
        direction='column'
        justify='center'
        alignItems='center'>
        <Grid item>
          <Typography variant='h5'>Register</Typography>
        </Grid>
        <Grid
          container
          item
          display='column'
          justify='center'
          alignItems='center'>
          <form className={classes.root}>
            <Grid item>
              <TextField
                id='username'
                name='username'
                label='Username'
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id='handle'
                name='handle'
                label='handle'
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id='password'
                name='password'
                label='password'
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id='password2'
                name='password2'
                label='re-enter password'
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            onClick={onSubmit}>
            Let's Get Started
          </Button>
        </Grid>
        <Grid item>
          <Typography variant='subtitle2' className={classes.registerContainer}>
            Don't have an account? <Link to='/login'>Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
