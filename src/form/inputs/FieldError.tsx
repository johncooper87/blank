import { FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { useFeildNameContext } from '../../contexts/FieldNameContext';

const subscription: FieldSubscription = {
  touched: true,
  error: true,
  submitError: true,
  dirtySinceLastSubmit: true
};

interface FieldErrorProps {
  name?: string;
}

function FieldError({ name }: FieldErrorProps) {

  const _name = useFeildNameContext(name);
  // console.log('FieldError:', _name); //DEBUG

  const {
    meta: { touched, error, dirtySinceLastSubmit, submitError }
  } = useField(_name, { subscription });

  const showError = (touched && error && typeof error === 'string')
  || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

  return showError
    ? <div style={{ color: 'red', fontSize: '14px' }}>{error || submitError}</div>
    : null;
};

export default memo(FieldError);