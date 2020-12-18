import { useField } from 'react-final-form';
import { useNameContext } from 'form/NameContext';
import { errorSubscription } from 'form/subscriptions';
import shouldDisplayFieldError from 'form/shouldDisplayFieldError';

interface FieldErrorProps {
  name?: string
}

function FieldError({ name }: FieldErrorProps) {

  const _name = useNameContext(name);
  const { meta } = useField(_name, { subscription: errorSubscription });

  const displayError = shouldDisplayFieldError(meta);
  const { error, submitError } = meta;

  return displayError
    ? (
      <div style={{ color: 'red', fontSize: '14px' }}>
        {error || submitError}
      </div>
    ) : null;
}

export default memo(FieldError);