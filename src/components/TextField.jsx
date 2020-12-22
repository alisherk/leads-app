import React from 'react';
import { TextField as MuiTextField, Typography } from '@material-ui/core';

function TextField({ error, ...props }) {
  return (
    <MuiTextField
      helperText={
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      }
      error={Boolean(error)}
      fullWidth
      margin="dense"
      variant="outlined"
      {...props}
    />
  );
}

export default TextField;
