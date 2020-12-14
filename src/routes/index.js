import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import Login from './guest/Login';

function mapState({ authedUser }) {
  return { authedUser };
}

const Routes = () => {
  const { authedUser } = useFluxibleStore(mapState);

  if (authedUser.id) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography> Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
  return <Login />;
};

export default Routes;
