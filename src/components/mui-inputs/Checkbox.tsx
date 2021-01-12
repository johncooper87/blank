import { FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { useNameContext } from '../../form/NameContext';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { CheckboxProps as MuiCheckboxPropsProps, FormControlLabel } from '@material-ui/core';

const subscription: FieldSubscription = {
  value: true
};

type CheckboxProps = MuiCheckboxPropsProps & {
  label?: string;
}

const type = 'checkbox';

function Checkbox({ name, value, label, ...props }: CheckboxProps) {

  const _name = useNameContext(name);
  // console.log('Checkbox:', _name); //DEBUG

  const {
    input: { checked, onChange, onBlur },
  } = useField(_name, { type, value, subscription });

  const inputProps = { type, value, checked, onChange, onBlur };

  return <FormControlLabel
    style={{ marginLeft: '8px' }}
    label={label}
    control={
      <MuiCheckbox color="primary" {...inputProps} {...props} />
    }
  />;
};

export default memo(Checkbox);