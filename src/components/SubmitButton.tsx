import { FormSubscription } from 'final-form';
import { useForm, useFormState } from 'react-final-form';

const subscription: FormSubscription = {
  invalid: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  pristine: true
};

function SubmitButton({ disablePristine = false }) {
  // console.log('SubmitButton'); //DEBUG

  const { invalid, submitFailed, dirtySinceLastSubmit, pristine } = useFormState({ subscription });
  const { submit } = useForm();
  const disabled =
    invalid && (submitFailed || dirtySinceLastSubmit)
    || (disablePristine && pristine);

  return (
    <button disabled={disabled} onClick={submit}>
      submit
    </button>
  );
}

export default memo(SubmitButton);