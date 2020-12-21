import { FieldValidator } from 'final-form';
import { useNameContext } from '../../form/NameContext';
import { useInputRef, ValueChange, GetNextValue } from 'form/useInputRef';
import useError from 'form/useError';
import MuiTextField from '@material-ui/core/TextField';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import dispatchReactChangeEvent from 'common/dispatchReactChangeEvent';

type TextFieldProps = MuiTextFieldProps & {
  validate?: FieldValidator<string>
}

const handleValueChange: ValueChange<string> =
  (node, value = '') => dispatchReactChangeEvent(node, { value });

const getNextValue: GetNextValue<string> = node => node.value;

function TextField({ name, validate, label, helperText, ...props }: TextFieldProps) {

  const _name = useNameContext(name);
  const inputRef = useInputRef(_name, handleValueChange, getNextValue);
  const error = useError(_name, validate);
  console.log('MuiTextField error:', error);
  
  return <MuiTextField inputRef={inputRef} label={label} error={Boolean(error)} helperText={error ? error : helperText} {...props} />;
  // return (
  //   <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
  //     {label}
  //     <span>
  //       <input ref={inputRef} style={{ marginLeft: '4px' }} />
  //       <div ref={errorRef} style={{ color: 'red', fontSize: '14px', textAlign: 'left' }} />
  //     </span>
  //   </label>
  // );
}

export default memo(TextField);