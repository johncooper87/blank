import { FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { useFeildNameContext } from '../FieldNameContext';

const subscription: FieldSubscription = {
  value: true
};

interface CheckboxProps {
  name?: string;
  value?: string | number;
  label?: string;
}

const type = 'checkbox';

function Checkbox({ name, value, label, ...props }: CheckboxProps) {

  const _name = useFeildNameContext(name);
  // console.log('Checkbox:', _name); //DEBUG

  const {
    input: { checked, onChange },
  } = useField(_name, { value, subscription, type });

  const inputProps = { type, value, checked, onChange };

  return <label {...props} style={{ padding: '4px' }}>
      {label}
      <input {...inputProps} style={{ marginLeft: '4px' }} />
    </label>;
};

export default memo(Checkbox);