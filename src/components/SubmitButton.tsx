import { FormSubscription } from 'final-form';
import { useForm, useFormState } from 'react-final-form';

const subscription: FormSubscription = {
  hasValidationErrors: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  pristine: true
};

function SubmitButton({ disablePristine = false }) {

  const { hasValidationErrors, submitFailed, dirtySinceLastSubmit, pristine } = useFormState({ subscription });
  const { submit } = useForm();
  const disabled =
    hasValidationErrors && (submitFailed || dirtySinceLastSubmit)
    || (disablePristine && pristine);

  return (
    <button disabled={disabled} onClick={submit}>
      submit
    </button>
  );
}

export default memo(SubmitButton);