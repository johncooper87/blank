import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { useNameContext } from '../../form/NameContext';
import MuiTextField from '@material-ui/core/TextField';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core';

const subscription: FieldSubscription = {
  value: true,
  touched: true,
  error: true,
  submitError: true,
  dirtySinceLastSubmit: true
};

type TextFieldProps = MuiTextFieldProps & {
  validate?: FieldValidator<string>
}

const type = 'text';

function TextField({ name, validate, label, helperText, ...props }: TextFieldProps) {

  const _name = useNameContext(name);
  // console.log('TextField:', _name); //DEBUG

  const {
    input: { value, onChange, onBlur },
    meta: { touched, error, dirtySinceLastSubmit, submitError }
  } = useField(_name, { type, validate, subscription });

  const inputProps = { type, value, onChange, onBlur };

  const showError = (touched && error && typeof error === 'string')
  || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

  return <MuiTextField
    {...inputProps}
    label={label}
    error={Boolean(showError)}
    helperText={showError ? error : helperText}
    style={{ marginLeft: '8px' }}
    {...props}
  />;
};

export default memo(TextField);

// import { FieldValidator } from 'final-form';
// import { useNameContext } from '../../form/NameContext';
// import { useInputRef, ValueChange, GetNextValue } from 'form/useInputRef';
// import useError from 'form/useError';
// import MuiTextField from '@material-ui/core/TextField';
// import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
// import { valuePropSetter, dispatchInputEvent } from './helpers';

// type TextFieldProps = MuiTextFieldProps & {
//   validate?: FieldValidator<string>
// }

// const handleValueChange: ValueChange<string> =
//   (node, value = '') => {
//     valuePropSetter.call(node, value);
//     dispatchInputEvent(node);
//   };

// const getNextValue: GetNextValue<string> = node => node.value;

// function TextField({ name, validate, label, helperText, ...props }: TextFieldProps) {

//   const _name = useNameContext(name);
//   const inputRef = useInputRef(_name, handleValueChange, getNextValue);
//   const error = useError(_name, validate);
//   console.log('MuiTextField error:', error);
  
//   return <MuiTextField
//     inputRef={inputRef}
//     label={label}
//     error={Boolean(error)}
//     helperText={error ? error : helperText}
//     style={{ marginLeft: '8px' }}
//     {...props}
//   />;
// }

// export default memo(TextField);