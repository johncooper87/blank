import { FieldState, FieldSubscription } from 'final-form';
import { useForm } from 'react-final-form';

const subscription: FieldSubscription = {
  value: true,
  dirty: true
};

interface UseInputConfig<T> {
  onInputEvent: (event: InputEvent, value: any) => T;
  onValueChange?: (node: HTMLInputElement, value: T) => void;
  onReset?: (node: HTMLInputElement, value: T) => void;
}

function useInput<T = any>(name: string, { onInputEvent, onValueChange, onReset }: UseInputConfig<T>) {

  const form = useForm();
  const _this_ref = useRef<Record<string, any>>({});
  const _this = _this_ref.current;

  if (!_this.registered) {

    _this.registered = true;
    _this.refCallback = (el: HTMLInputElement) => _this.inputEl = el;

    const callback = (state: FieldState<T>) => {

      const { value, dirty } = state;
      console.log(state);
      if (dirty === false && _this.dirty === true) onReset?.(_this.inputEl, value);
      else onValueChange?.(_this.inputEl, value);
      _this.dirty = dirty;
    };

    _this.unsubscribe = form.registerField(name, callback, subscription);
    //_this.defaultValue = form.getFieldState(name).value;
  }

  useEffect(() => {

    const { inputEl, unsubscribe } = _this;

    inputEl.addEventListener('input', (event: InputEvent) => {
      const { value } = form.getFieldState(name);
      const nextValue = onInputEvent(event, value);
      form.change(name, nextValue);
    });

    inputEl.addEventListener('blur', () => {
      const { blur, touched } = form.getFieldState(name);
      if (!touched) blur();
    });

    const { value } = form.getFieldState(name);
    onReset?.(_this.inputEl, value);

    return () => {
      unsubscribe();
      _this_ref.current = null;
    };
  }, []);
  
  return _this.refCallback;
};

export default useInput;