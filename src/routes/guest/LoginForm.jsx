import { Box, Button } from '@material-ui/core';
import { useEffect } from 'react';
import { unknownError } from '../../fluxible/popup';
import { Auth } from 'aws-amplify';
import { alertMessage } from '../../fluxible/popup';
import useForm from '../../hooks/useForm';
import Form from './Form';
import TextField from '../../components/TextField';

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

const formOptions = {
  initialContext: {
    cognitoUser: null,
  },
  initialFormValues: {
    email: '',
    password: '',
  },
  validators: {
    email({ email }) {
      return validateEmail(email);
      //return validate(email, ['required', 'email']);
    },
    password({ password }) {
      return validatePassword(password);
      //return validate(password, ['required']);
    },
  },
  async onSubmit({ formValues, setContext }) {
    const cognitoUser = await Auth.signIn(formValues.email, formValues.password);
    setContext({ cognitoUser });
  },
  onSubmitError({ code }) {
    if (code === 'UserNotFoundException' || code === 'NotAuthorizedException') {
      alertMessage({
        message: 'The credentials may be incorrect or the account may have been disabled.',
      });
    } else {
      unknownError();
    }
  },
};

const LoginForm = ({ onSuccess, onForgotPassword }) => {
  const {
    formContext: { cognitoUser },
    formValues,
    onChangeHandlers,
    formErrors,
    isSubmitting,
    submitHandler,
  } = useForm(formOptions);

  useEffect(() => {
    if (cognitoUser) onSuccess(cognitoUser);
  }, [cognitoUser]);

  return (
    <Form
      onSubmit={submitHandler}
      submitLabel="Login"
      title="Leads Management System"
      subtitle="Login to your account"
      isSubmitting={isSubmitting}
      extendedChild={
        <Box mt={1}>
          <Button onClick={onForgotPassword}>Forgot password</Button>
        </Box>
      }
    >
      <TextField
        value={formValues.email}
        error={formErrors.email}
        onChange={onChangeHandlers.email}
        label="Your email"
        type="email"
        disabled={isSubmitting}
      />
      <TextField
        value={formValues.password}
        error={formErrors.password}
        onChange={onChangeHandlers.password}
        label="Your password"
        type="password"
        disabled={isSubmitting}
      />
    </Form>
  );
};

export default LoginForm;
