import { FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { useNameContext } from '../../form/NameContext';
import MuiRadio from '@material-ui/core/Radio';
import { RadioProps as MuiRadioProps, FormControlLabel } from '@material-ui/core';

const subscription: FieldSubscription = {
  value: true
};

type RadioProps = MuiRadioProps & {
  label?: string;
}

const type = 'radio';

function Radio({ name, value, label, ...props }: RadioProps) {

  const _name = useNameContext(name);
  // console.log('Radio:', _name); //DEBUG

  const {
    input: { checked, ...input },
  } = useField(_name, { type, value, subscription });

  const onChange = useCallback(input.onChange, []);
  const inputProps = { type, value, checked, onChange };

  return <FormControlLabel
    style={{ marginLeft: '8px' }}
    label={label}
    control={
      <MuiRadio color="primary" {...inputProps} {...props} />
    }
  />;
};

export default memo(Radio);