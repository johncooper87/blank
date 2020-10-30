import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { useFeildNameContext } from '../FieldNameContext';

const subscription: FieldSubscription = {
  value: true,
  touched: true,
  error: true
};

interface TextFieldProps {
  name: string;
  validate?: FieldValidator<string>;
  label?: string;
}

const type = 'text';

function TextField({ name, validate, label, ...props }: TextFieldProps) {

  const _name = useFeildNameContext(name);
  // console.log('TextField:', _name); //DEBUG

  const {
    input: { value, onChange, onBlur },
    meta: { touched, error }
  } = useField(_name, { validate, subscription, type });

  const inputProps = { type, value, onChange, onBlur };

  return <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
    {label}
    <span>
      <input {...inputProps} style={{ marginLeft: '4px' }} />
      {touched && error &&
        <div style={{ color: 'red', fontSize: '14px', textAlign: 'left' }}>{error}</div>
      }
    </span>
  </label>;
};

export default memo(TextField);