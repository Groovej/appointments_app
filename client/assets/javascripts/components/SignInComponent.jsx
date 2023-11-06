import React, { useState, useCallback, useRef } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../actions/appointments/index';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Alert from './ui/Alert'

import { validateEmail } from '../helpers.js';

function SignIn(props) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backendError, setBackendError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const resetForm = useCallback(() => {
    setEmailError(false);
    setPasswordError(false);
    setBackendError('');
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }, [])

  const submitForm = useCallback(
    (event) => {
      event.preventDefault();

      const emailData = emailRef.current.value.trim();
      const passwordData = passwordRef.current.value.trim();

      if (!emailData) {
        setEmailError('Please enter a valid email address');
      }
      if (!passwordData) {
        setPasswordError('Please enter a password');
        return;
      }

      if (emailData) {
        setEmailError('');
      }
      if (passwordData) {
        setPasswordError('');
      }

      const emailIsValid = validateEmail(emailData);

      if (emailData && !emailIsValid) {
        setEmailError('Please enter a valid email address');
      }

      if (emailData && emailIsValid && passwordData) {
        props.login({
          email: emailData,
          password: passwordData,
          callback: setBackendError,
        });
      }
    },
    [props.login, emailRef, passwordRef],
  );

  return (
    <Card sx={{ maxWidth: 450, margin: "100px auto", padding: '30px', backgroundColor: '#fffbea' }}>
      <CardContent>
        <h2>Welcome Back</h2>

        <p>Enter your credentials to access your account</p>

        {backendError && (
          <Alert open={!!backendError} errorText={backendError} />
        )}

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              error={!!emailError}
              label="Email"
              placeholder="Enter email"
              inputRef={emailRef}
              helperText={emailError}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              error={!!passwordError}
              label="Password"
              type="password"
              placeholder="Enter password"
              inputRef={passwordRef}
              helperText={passwordError}
            />
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        <Button variant='outlined' onClick={resetForm}>Reset</Button>
        <Button variant='contained' onClick={submitForm}>Log In</Button>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(actions.login, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
