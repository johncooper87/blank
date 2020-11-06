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

import { FieldState, FieldSubscription, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import { useFeildNameContext } from '../FieldNameContext';

const subscription: FieldSubscription = {
  value: true,
  dirty: true,
  touched: true,
  error: true,
  submitError: true,
  dirtySinceLastSubmit: true
};

interface TextFieldProps {
  name: string;
  validate?: FieldValidator<string>;
  label?: string;
}

function TextField({ name, validate, label, ...props }: TextFieldProps) {

  const _name = useFeildNameContext(name);
  console.log('TextField:', _name); //DEBUG

  const form = useForm();

  const _this = useRef<Record<string, any>>({}).current;
  if (!_this.registered) {

    _this.registered = true;
    _this.inputRef = (el: HTMLInputElement) => _this.inputEl = el;
    _this.errorRef = (el: HTMLDivElement) => _this.errorEl = el;

    const callback = (state: FieldState<string>) => {

      const { value, dirty, touched, error, submitError, dirtySinceLastSubmit } = state;
      console.log(_name, ':', state);
      const { inputEl, errorEl } = _this;
      if (dirty === false && _this.dirty === true) inputEl.value = value || '';
      _this.dirty = dirty;

      const showError = (touched && error && typeof error === 'string')
        || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

      if (_this.showError !== showError || _this.error !== error) {
        _this.showError = showError;
        _this.error = error;
        if (errorEl != null) errorEl.innerText = showError ? _this.error : '';
      }
    };

    _this.unsubscribe = form.registerField(_name, callback, subscription, { getValidator: () => validate });
    _this.defaultValue = form.getFieldState(_name).value;
  }

  useEffect(() => {

    //console.log(_name, ':', _this);
    _this.inputEl.addEventListener('input', ({ target }) => {
      //console.log('change:', _name);
      form.change(_name, target.value)
    });

    _this.inputEl.addEventListener('blur', ({ target }) => {
      //console.log('change:', _name);
      const { blur, touched } = form.getFieldState(_name);
      if (!touched) blur();
    });

    return () => {
      _this.unsubscribe;
    };
  }, []);
  
  return <label {...props} style={{ padding: '4px', display: 'inline-flex' }}>
    {label}
    <span>
      <input ref={_this.inputRef} defaultValue={_this.defaultValue} style={{ marginLeft: '4px' }} />
      <div ref={_this.errorRef} style={{ color: 'red', fontSize: '14px', textAlign: 'left' }} />
    </span>
  </label>;
};

export default memo(TextField);