import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import Login from './guest/index';
import FabButton from './Fab/FabButton';

function mapState({ authedUser }) {
  return { authedUser };
}

const Routes = () => {
  const { authedUser } = useFluxibleStore(mapState);
  if (authedUser) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography> Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <FabButton/>
      </>
    );
  }
  return <Login />;
};

export default Routes;
