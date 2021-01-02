import { useCallback, useEffect, useState } from 'react';
import { addEvent, emitEvent } from 'fluxible-js';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from '@material-ui/core';
import TextField from 'components/TextField';
import Select from 'components/Select';
import validate from 'lib/validate';
import { sanitizeInput } from 'lib/input';
import useForm from 'hooks/useForm';
import { createLead, updateLead } from 'graphql/mutations';
import { unknownError } from 'fluxible/popup';
//import LeadStatusSelect from 'components/LeadStatusSelect';

const formOptions = {
  initialContext: {
    resultRecord: null,
  },
  initialFormValues: {
    firstName: '',
    lastName: '',
    gender: '',
    //leadStatusId: '',
  },
  isGraphql: true,
  createMutation: createLead,
  updateMutation: updateLead,
  validators: {
    firstName: ({ firstName }) => validate(firstName, ['required', 'maxLength:255']),
    lastName: ({ lastName }) => validate(lastName, ['required', 'maxLength:255']),
    gender: ({ gender }) => validate(gender, ['required', 'options:Male,Female']),
    //leadStatusId: ({ leadStatusId }) => validate(leadStatusId, ['required', 'leadStatus']),
  },
  transformInput({ formValues }) {
    return Object.keys(formValues).reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: field === 'leadStatusId' ? formValues[field] : sanitizeInput(formValues[field]),
      }),
      {}
    );
  },
  onSubmitSuccess({ data, setContext, operation }) {
    if (operation === 'update') {
      setContext({
        resultRecord: data.updateLead,
      });
    } else {
      // create
      setContext({
        resultRecord: data.createLead,
      });
    }
  },
  onSubmitError: unknownError,
};

function LeadForm() {
  const {
    formValues,
    formErrors,
    onChangeHandlers,
    isSubmitting,
    submitHandler,
    formContext: { resultRecord },
    resetForm,
    setEditMode,
    operation,
  } = useForm(formOptions);

  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  useEffect(() => {
    const removeListener = addEvent(
      'toggleLeadForm',
      toggle
      /*      targetLead => {
        if (targetLead) {
          const { id, firstName, middleName, lastName, gender, leadStatusId } = targetLead;
          setEditMode(({ formValues }) => ({
            targetRecordId: id,
            formValues: {
              ...formValues,
              firstName,
              middleName,
              lastName,
              gender,
              leadStatusId,
            },
          }));
        }
        toggle();
      }, */
    );
    return removeListener;
  }, [toggle, setEditMode]);

  useEffect(() => {
    if (resultRecord) {
      toggle();
      if (operation === 'create') history.push(`/lead/view/${resultRecord.id}`);
      else emitEvent('leadEditSuccess', resultRecord);
    }
  }, [resultRecord, toggle, history, resetForm, operation]);

  return (
    <Dialog open={isOpen} disableBackdropClick disableEscapeKeyDown fullWidth onExited={resetForm}>
      <form onSubmit={submitHandler}>
        <DialogTitle>{operation === 'update' ? 'Update lead' : 'Add lead'}</DialogTitle>
        <DialogContent>
          <TextField
            value={formValues.firstName}
            error={formErrors.firstName}
            label="First name"
            onChange={onChangeHandlers.firstName}
            disabled={isSubmitting}
          />
          <TextField
            value={formValues.lastName}
            error={formErrors.lastName}
            label="Last name"
            onChange={onChangeHandlers.lastName}
            disabled={isSubmitting}
          />
          <Select
            label="Gender"
            value={formValues.gender}
            error={formErrors.gender}
            onChange={onChangeHandlers.gender}
            disabled={isSubmitting}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="primary" disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LeadForm;
