import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
//import TextField from 'components/TextField';
import { TextField } from '@material-ui/core';
//import useForm from 'hooks/useForm';
//import validate from 'libs/validate';
//import { updateUser } from 'graphql/mutations';
import Form from './Form';

/* const formOptions = {
  initialFormValues: {
    newPassword: ''
  },
  initialContext: {
    cognitoUser: null
  },
  validators: {
    newPassword ({ newPassword }) {
      return validate(newPassword, ['required']);
    }
  },
  async onSubmit ({ formValues, formContext }) {


   await Auth.completeNewPassword(formContext.cognitoUser, formValues.newPassword);

await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: formContext.cognitoUser.username,
          status: 'CONFIRMED'
        }
      }) 
    );
  }
}; */

function ChangePassForm({ onSuccess, cognitoUser }) {
  /*   const {
    formValues,
    formErrors,
    isSubmitting,
    status,
    submitHandler,
    onChangeHandlers,
    setContext
  } = useForm(formOptions);
 */
  /*   React.useEffect(() => {
    setContext({ cognitoUser });
  }, [cognitoUser, setContext]); */

  const [password, setPassword ] = useState(''); 

  useEffect(() => {
    if (status === 'submitSuccess') onSuccess();
  }, [status, onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.completeNewPassword(cognitoUser, password)
      onSuccess();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      title="Change your password"
      subtitle="You need to change your temporary password."
      //isSubmitting={isSubmitting}
      submitLabel="Change password"
    >
      <TextField
        //value={formValues.newPassword}
        onChange={(e) => setPassword(e.target.value)}
        label="New password"
        //error={formErrors.newPassword}
        type="password"
        name='password'
      />
    </Form>
  );
}

export default ChangePassForm;
