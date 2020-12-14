import React from 'react';
import { LinearProgress, makeStyles, Box } from '@material-ui/core';
import Routes from './routes';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

const useStyles = makeStyles({
  progressStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
});

function mapState({ loading }) {
  return { loading };
}

function App() {
  const classes = useStyles();
  const { loading } = useFluxibleStore(mapState);
  return (
    <>
      {loading ? (
        <Box className={classes.progressStyle}>
          <LinearProgress />
        </Box>
      ) : null}
      <Routes />
    </>
  );
}

export default React.memo(App);
