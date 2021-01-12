import { FormSubscription } from 'final-form';
import { useForm, useFormState } from 'react-final-form';
import { ButtonProps } from '@material-ui/core';

const subscription: FormSubscription = {
  hasValidationErrors: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  pristine: true
};

type SubmitButtonProps = ButtonProps & { disablePristine: boolean }

function SubmitButton({ disablePristine = false, ...props }: SubmitButtonProps) {

  const { hasValidationErrors, submitFailed, dirtySinceLastSubmit, pristine } = useFormState({ subscription });
  const { submit } = useForm();
  const disabled =
    hasValidationErrors && (submitFailed || dirtySinceLastSubmit)
    || (disablePristine && pristine);

  return (
    <Button
      size="small"
      {...props}
      color="primary"
      variant="contained"
      disabled={disabled}
      onClick={submit}
    >
      submit
    </Button>
  );
}

export default memo(SubmitButton);