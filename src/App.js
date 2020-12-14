import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
//import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

function App() {
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

export default React.memo(App);
