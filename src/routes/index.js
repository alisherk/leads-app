import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
//import Login from './guest/index';
import FabWidget from './Fab';
import LeadList from './auth/Lead/List';
import LeadView from './auth/Lead/View';
import Dashboard from './auth/Dashboard';

/* function mapState({ authedUser }) {
  return { authedUser };
} */

const Routes = () => {
  //const { authedUser } = useFluxibleStore(mapState);
  
    return (
      <BrowserRouter>
        <AppBar position="fixed">
          <Toolbar>
            <Typography> Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <FabWidget/>
        <Box mt={2}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/lead/list" component={LeadList} />
              <Route path="/lead/view/:id" component={LeadView} />
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </Container>
        </Box>
      </BrowserRouter>
    );
  
};

export default Routes;
