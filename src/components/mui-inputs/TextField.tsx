import { FieldValidator } from 'final-form';
import { useNameContext } from '../../form/NameContext';
import { useInputRef, ValueChange, GetNextValue } from 'form/useInputRef';
import useErrorRef from 'form/useErrorRef';
import MuiTextField from '@material-ui/core/TextField';
import dispatchReactChangeEvent from 'common/dispatchReactChangeEvent';

interface TextFieldProps {
  name: string;
  validate?: FieldValidator<string>;
  label?: string;
}

const handleValueChange: ValueChange<string> =
  (node, value = '') => dispatchReactChangeEvent(node, { value });

const getNextValue: GetNextValue<string> = node => node.value;

function TextField({ name, validate, label, ...props }: TextFieldProps) {

  const _name = useNameContext(name);
  const inputRef = useInputRef(_name, handleValueChange, getNextValue);
  // const errorRef = useErrorRef(_name, validate);
  
  return <MuiTextField inputRef={inputRef} label={label} />;
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