import { useEffect } from 'react';
import { Auth, graphqlOperation, API } from 'aws-amplify';
import TextField from '../../components/TextField';
import useForm from '../../hooks/useForm';
import { updateUser } from '../../graphql/mutations';
import Form from './Form';
import validate from '../../lib/validate';

const formOptions = {
  initialFormValues: {
    newPassword: '',
  },
  initialContext: {
    cognitoUser: null,
  },
  validators: {
    newPassword({ newPassword }) {
      return validate(newPassword, ['required']);
    },
  },
  async onSubmit({ formValues, formContext }) {
    await Auth.completeNewPassword(formContext.cognitoUser, formValues.newPassword);

    await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: formContext.cognitoUser.username,
          status: 'CONFIRMED',
        },
      })
    );
  },
};

function ChangePassForm({ onSuccess, cognitoUser }) {
  const {
    formValues,
    formErrors,
    isSubmitting,
    status,
    submitHandler,
    onChangeHandlers,
    setContext,
  } = useForm(formOptions);

  useEffect(() => {
    setContext({ cognitoUser });
  }, [cognitoUser]);

  useEffect(() => {
    if (status === 'submitSuccess') onSuccess();
  }, [status, onSuccess]);

  return (
    <Form
      onSubmit={submitHandler}
      title="Change your password"
      subtitle="You need to change your temporary password."
      isSubmitting={isSubmitting}
      submitLabel="Change password"
    >
      <TextField
        value={formValues.newPassword}
        onChange={onChangeHandlers.newPassword}
        label="New password"
        error={formErrors.newPassword}
        type="password"
      />
    </Form>
  );
}

export default ChangePassForm;
