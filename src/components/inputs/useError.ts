import { FieldState, FieldSubscription, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';

const subscription: FieldSubscription = {
  touched: true,
  error: true,
  submitError: true,
  dirtySinceLastSubmit: true
};

interface UseErrorConfig<T> {
  validate?: FieldValidator<T>;
  onErrorChange: (node: Element, error: string) => void;
}

function useError<T>(name: string, { validate, onErrorChange }: UseErrorConfig<T>) {

  const form = useForm();
  const _this_ref = useRef<Record<string, any>>({});
  const _this = _this_ref.current;

  if (!_this.registered) {

    _this.registered = true;
    _this.refCallback = (el: HTMLDivElement) => _this.node = el;

    const callback = (state: FieldState<string>) => {

      const { touched, error, submitError, dirtySinceLastSubmit } = state;
      const { node } = _this;

      const showError = (touched && error && typeof error === 'string')
        || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

      if (_this.showError !== showError || _this.error !== error) {
        _this.showError = showError;
        _this.error = error;
        if (node != null) onErrorChange(node, showError ? error : '');
      }
    };

    _this.unsubscribe = form.registerField(name, callback, subscription, { getValidator: () => validate });
  }

  useEffect(() => {

    return () => {
      _this.unsubscribe();
      _this_ref.current = null;
    };
  }, []);
  
  return _this.refCallback;
};

export default useError;