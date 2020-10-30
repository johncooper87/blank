import { FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { useFeildNameContext } from '../FieldNameContext';

const subscription: FieldSubscription = {
  touched: true,
  error: true
};

interface FieldErrorProps {
  name?: string;
}

function FieldError({ name }: FieldErrorProps) {

  const _name = useFeildNameContext(name);
  // console.log('FieldError:', _name); //DEBUG

  const {
    meta: { touched, error }
  } = useField(_name, { subscription });

  return touched && error && typeof error === 'string'
    ? <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>
    : null;
};

export default memo(FieldError);