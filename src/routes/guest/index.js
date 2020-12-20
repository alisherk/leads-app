import { useState, useEffect, useCallback } from 'react';
import LoginForm from './LoginForm';
import ChangePassForm from './ChangePassForm';
import { updateStore } from 'fluxible-js';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import getInitialStore from '../../fluxible/getInitialStore';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

//import ForgotPassword from './ForgotPassword';

function mapStates({ authUser }) {
  return { authUser };
}

function Login() {
  const [{ cognitoUser, step }, setState] = useState({
    cognitoUser: null,
    step: 'loginForm',
  });

  const { authUser } = useFluxibleStore(mapStates);

  const authenticate = useCallback(async () => {
    try {
      updateStore({ loading: true });
      const authedUser = await Auth.currentAuthenticatedUser();

      const {
        data: { getUser: userData },
      } = await API.graphql(graphqlOperation(getUser, { id: authedUser.username }));

      updateStore({
        loading: false,
        authedUser: {
          email: authedUser.attributes.email,
          ...userData,
        },
      });
    } catch (error) {
      updateStore({ loading: false });
      Auth.signOut();
      updateStore({
        ...getInitialStore(),
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      authenticate();
    } else {
      Auth.signOut();
      updateStore({
        ...getInitialStore(),
        isAuthenticated: true,
      });
    }
  }, [authUser, authenticate]);

  const onLoginSuccess = cognitoUser => {
    if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
      setState({
        cognitoUser,
        step: 'changePassword',
      });
    } else {
      authenticate();
    }
  };

  /*   const resetStep = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      step: 'loginForm'
    }));
  }, []); */

  /*   const onForgotPassword = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      step: 'forgotPassword'
    }));
  }, []); */

  if (step === 'loginForm') return <LoginForm onSuccess={onLoginSuccess} />;
  return <ChangePassForm cognitoUser={cognitoUser} onSuccess={authenticate} />;
}

export default Login;
