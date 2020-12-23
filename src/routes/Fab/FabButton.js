import React from 'react';
import { emitEvent } from 'fluxible-js';
import OpenIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/ExpandMore';
import RestrictToGroups from '../../components/RestrictToGroups';
import {
  Fab,
  Popper,
  MenuItem,
  Paper,
  Box,
  ClickAwayListener,
  makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles({
  fabBtn: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  paper: {
    overflow: 'hidden',
  },
});

function FabButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();
  const anchorRef = React.useRef(null);

  const toggle = () => {
    setIsOpen(isVisible => !isVisible);
  };

  const addLead = () => {
    emitEvent('toggleLeadForm');
  };

  const inviteUser = () => {
    emitEvent('toggleInviteUserForm');
  };

  const leadStatuses = () => {
    emitEvent('toggleLeadStatusesForm');
  };

  return (
    <>
      <Fab
        ref={anchorRef}
        color="primary"
        size="medium"
        className={classes.fabBtn}
        onClick={toggle}
      >
        {isOpen ? <CloseIcon /> : <OpenIcon />}
      </Fab>
      <Popper anchorEl={anchorRef.current} open={isOpen} placement="top-end">
        <ClickAwayListener onClickAway={toggle}>
          <Box mb={1}>
            <Paper className={classes.paper}>
              <MenuItem onClick={addLead}>Add lead</MenuItem>
              <RestrictToGroups allowedGroups={['Admin']}>
                <MenuItem onClick={inviteUser}>Invite user</MenuItem>
                <MenuItem onClick={leadStatuses}>Lead statuses</MenuItem>
              </RestrictToGroups>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default FabButton;
