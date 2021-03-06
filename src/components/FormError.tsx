import { FormSubscription } from 'final-form';
import { useFormState } from 'react-final-form';

const subscription: FormSubscription = {
  error: true,
  submitError: true,
  submitFailed: true
};

interface FormErrorProps {}

function FromError({}: FormErrorProps) {

  const {
    error, submitError, submitFailed
  } = useFormState({ subscription });

  const showError = (error && typeof error === 'string' && submitFailed)
  || (submitError && typeof submitError === 'string');

  return showError
    ? (
      <P style={{ color: 'red', fontSize: '14px' }}>
        {error || submitError}
      </P>
    ) : null;
}

export default memo(FromError);