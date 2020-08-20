import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Grid,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../Redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  loginContainer: {
    marginTop: "20px"
  }
}));

const Login = () => {
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });

  const { email, password } = loginState;

  const onChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid
        className={classes.loginContainer}
        container
        item
        xs={6}
        direction='column'
        justify='center'
        alignItems='center'>
        <Grid item>
          <Typography variant='h5'>Login</Typography>
        </Grid>
        <Grid
          container
          item
          display='column'
          justify='center'
          alignItems='center'>
          <form className={classes.root} onSubmit={onSubmit}>
            <Grid item>
              <TextField
                id='email'
                name='email'
                label='email'
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
                type='password'
                onChange={onChange}
              />
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            onClick={onSubmit}>
            Let's Get Started
          </Button>
        </Grid>
        <Grid item>
          <Typography variant='subtitle2' className={classes.loginContainer}>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
