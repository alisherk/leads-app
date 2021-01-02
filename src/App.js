import React from 'react';
import Routes from './routes';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { closePopup } from './fluxible/popup';
import {
  LinearProgress,
  makeStyles,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(({ palette: { primary: { dark } } }) => ({
    linearProgress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      right: 0,
      zIndex: 9999
    },
    barColorPrimary: {
      backgroundColor: dark
    }
  }));
  
function mapState({ loading, popup }) {
  return { loading, popup };
}

function App() {
  const classes = useStyles();
  const { loading, popup } = useFluxibleStore(mapState);
  return (
    <>
      {loading ? (
        <Box className={classes.linearProgress}>
          <LinearProgress />
        </Box>
      ) : null}
      <Routes />
      <Dialog open={popup.isOpen} onClose={closePopup} fullWidth>
        {popup.title ? <DialogTitle>{popup.title}</DialogTitle> : null}
        <DialogContent>{popup.message}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closePopup}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(App);
