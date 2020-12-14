import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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
      <Button> Test </Button> 
    </>
  );
}

export default React.memo(App);
