import { FieldState, FieldSubscription, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import { useFeildNameContext } from '../FieldNameContext';

const subscription: FieldSubscription = {
  value: true,
  dirty: true,
};

interface UseInputConfig {
  name: string;
  handleInputEvent: (...args: any[]) => any;
}

function useInput({ name, handleInputEvent }: UseInputConfig) {

  const form = useForm();
  const _name = useFeildNameContext(name);
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

    _this.inputEl.addEventListener('input', (event) => {
      const 
      form.change(_name, target.value);
    });

    _this.inputEl.addEventListener('blur', () => {
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