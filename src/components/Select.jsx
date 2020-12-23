import {useMemo } from 'react';
import { select as MuiSelect, InputLabel, FormControl, FormHelperText } from '@material-ui/core'; 


let count = 0;

function Select ({ label, error, children, ...selectProps }) {
  const labelId = useMemo(() => {
    count++;
    return `${label.replace(/\s/g, '_')}-${count.toString()}`;
  }, [label]);

  return (
    <FormControl fullWidth margin="dense" variant="outlined" error={Boolean(error)}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect labelId={labelId} label={label} {...selectProps}>
        {children}
      </MuiSelect>
      <FormHelperText error margin="dense">
        {error}
      </FormHelperText>
    </FormControl>
  );
}

export default Select;