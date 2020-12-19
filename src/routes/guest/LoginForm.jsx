import { useState } from 'react';
import { Box, Typography, makeStyles, Paper, Divider, TextField, Button } from '@material-ui/core';
import { updateStore } from 'fluxible-js';
import { Auth } from 'aws-amplify';
import { alertMessage } from '../../fluxible/popup';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(10),
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '500px',
  },
}));

function validateEmail(email) {
  if (!email) return 'Required';
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email) || !email.length > 320) return 'Invalid email';
  return '';
}

function validatePassword(password) {
  if (!password || password.length < 6) return 'Invalid password';
  return '';
}

const LoginForm = ( { onSuccess }) => {
  const classes = useStyles();

  const [{ email, password, isSubmitting }, setFormValues] = useState({
    email: {
      input: '',
      error: '',
    },
    password: {
      input: '',
      error: '',
    },
    isSubmitting: false,
  });

  const handleEmailChange = ({ target: { value } }) => {
    setFormValues(oldState => ({
      ...oldState,
      email: {
        input: value,
        error: validateEmail(value),
      },
    }));
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setFormValues(oldState => ({
      ...oldState,
      password: {
        input: value,
        error: validatePassword(value),
      },
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormValues(prevState => ({
      ...prevState,
      isSubmitting: true,
    }));
    updateStore({ loading: true });
    try {
      const cognitoUser = await Auth.signIn(email.input, password.input);
      onSuccess(cognitoUser)
      setFormValues(prevState => ({
        ...prevState,
        isSubmitting: false,
      }));
      updateStore({ loading: false });
    } catch (err) {
      updateStore({ loading: false });
      alertMessage({ title: 'Login error', message: err.message });
      setFormValues(prevState => ({
        ...prevState,
        isSubmitting: false,
      }));
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.wrapper}>
        <Paper>
          <Box p={2} className={classes.container}>
            <Box className={classes.titleContainer}>
              <Typography variant="h4">Leads app</Typography>
              <Typography>Login</Typography>
            </Box>
            <Divider mt={1} mb={1} />
            <TextField
              value={email.input}
              onChange={handleEmailChange}
              placeholder="Your email"
              fullWidth
              margin="dense"
              variant="outlined"
              helperText={
                <Typography variant="caption" color="error">
                  {email.error}
                </Typography>
              }
            />
            <TextField
              value={password.input}
              onChange={handlePasswordChange}
              placeholder="Your password"
              fullWidth
              margin="dense"
              variant="outlined"
              type="password"
              helperText={
                <Typography variant="caption" color="error">
                  {password.error}
                </Typography>
              }
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default LoginForm;
