import { FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { errorSubscription } from 'form/subscriptions';
import shouldDisplayFieldError from 'form/shouldDisplayFieldError';

function useError<FieldValue>(name: string, validate: FieldValidator<FieldValue>) {

  const { meta } = useField(name, { subscription: errorSubscription, validate });

  const displayError = shouldDisplayFieldError(meta);
  const { error, submitError } = meta;

  return displayError ? (error || submitError) : undefined;
}

export default useError;