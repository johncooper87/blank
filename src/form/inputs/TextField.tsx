// import { FieldSubscription, FieldValidator } from 'final-form';
// import { useField } from 'react-final-form';
// import { useFeildNameContext } from '../FieldNameContext';

// const subscription: FieldSubscription = {
//   value: true,
//   touched: true,
//   error: true,
//   submitError: true,
//   dirtySinceLastSubmit: true
// };

// interface TextFieldProps {
//   name: string;
//   validate?: FieldValidator<string>;
//   label?: string;
// }

// const type = 'text';

// function TextField({ name, validate, label, ...props }: TextFieldProps) {

//   const _name = useFeildNameContext(name);
//   // console.log('TextField:', _name); //DEBUG

//   const {
//     input: { value, onChange, onBlur },
//     meta: { touched, error, dirtySinceLastSubmit, submitError }
//   } = useField(_name, { type, validate, subscription });

//   const inputProps = { type, value, onChange, onBlur };

//   const showError = (touched && error && typeof error === 'string')
//   || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

//   return <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
//     {label}
//     <span>
//       <input {...inputProps} style={{ marginLeft: '4px' }} />
//       {
//         showError
//         && <div style={{ color: 'red', fontSize: '14px', textAlign: 'left' }}>{error || submitError}</div>
//       }
//     </span>
//   </label>;
// };

// export default memo(TextField);

// import { FieldValidator } from 'final-form';
// import { useFeildNameContext } from '../FieldNameContext';
// import useInputRef from '../useInputRef';
// import useErrorRef from '../useErrorRef';

// interface TextFieldProps {
//   name: string;
//   validate?: FieldValidator<string>;
//   label?: string;
// }

// function getNextValue(event: InputEvent) {
//   return event.target.value;
// }

// function updateInputEl(node: HTMLInputElement, value: string) {
//   node.value = value || '';
// }

// function onErrorChange(node: HTMLDivElement, error: string) {
//   node.innerText = error;
// }

// function TextField({ name, validate, label, ...props }: TextFieldProps) {

//   const _name = useFeildNameContext(name);

//   const inputRef = useInputRef<string>(_name, getNextValue, updateInputEl);
//   const errorRef = useErrorRef<string>(_name, { validate, onErrorChange });
  
//   return <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
//     {label}
//     <span>
//       <input ref={inputRef} style={{ marginLeft: '4px' }} />
//       <div ref={errorRef} style={{ color: 'red', fontSize: '14px', textAlign: 'left' }} />
//     </span>
//   </label>;
// };

// export default memo(TextField);

import { FieldValidator } from 'final-form';
import { useFeildNameContext } from '../FieldNameContext';
import { useFieldRef, ChangeCallback, ConnectedCallback } from 'form/useFieldRef';
import { inputSubscription, errorSubscription } from '../subscriptions'

interface TextFieldProps {
  name: string;
  validate?: FieldValidator<string>;
  label?: string;
}

const connectedCallback: ConnectedCallback<string, HTMLInputElement> =
  (node, getState) =>  {

    const { value, change } = getState() || {};
    node.value = value || '';

    const handleInput = (event: InputEvent) => {
      const { target } = event;
      change(target.value);
    };

    const handleBlur = () => {
      const { touched, blur } = getState();
      if (!touched) blur();
    };

    node.addEventListener('input', handleInput);
    node.addEventListener('blur', handleBlur);

    return () => {
      node.removeEventListener('input', handleInput);
      node.removeEventListener('blur', handleBlur);
    };
  }

const valueChangeCallback: ChangeCallback<string, HTMLInputElement> =
  (node, nextState, prevState) => {
    if (nextState.dirty === false && prevState.dirty === true)
      node.value = nextState.value || '';
  }

const errorChangeCallback: ChangeCallback<string, HTMLDivElement> =
  (node, nextState) => {

    const { touched, error, submitError, dirtySinceLastSubmit } = nextState;

    const showError = (touched && error && typeof error === 'string')
      || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

    const prevError = node.innerText;
    if (showError !== Boolean(prevError) || error !== prevError) {
      node.innerText = showError ? error : '';
    }
  }

function TextField({ name, validate, label, ...props }: TextFieldProps) {

  const _name = useFeildNameContext(name);

  const inputRef = useFieldRef(_name, valueChangeCallback, {
    connectedCallback,
    subscription: inputSubscription
  });

  const errorRef = useFieldRef(_name, errorChangeCallback, {
    validate,
    subscription: errorSubscription
  });
  
  return <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
    {label}
    <span>
      <input ref={inputRef} style={{ marginLeft: '4px' }} />
      <div ref={errorRef} style={{ color: 'red', fontSize: '14px', textAlign: 'left' }} />
    </span>
  </label>;
};

export default memo(TextField);