import { FieldState, FieldSubscription } from 'final-form';
import { useForm } from 'react-final-form';

const subscription: FieldSubscription = {
  value: true,
  dirty: true
};

function useInputRef<FieldValue = any>(
  name: string,
  getNextValue: (event: InputEvent, currentValue: any) => FieldValue,
  updateInputEl: (inputEl: HTMLInputElement, newValue: FieldValue) => void
) {

  const form = useForm();
  const _this_ref = useRef<Record<string, any>>({});
  const _this = _this_ref.current;

  if (!_this.initialized) {

    _this.initialized = true;

    _this.ref = (el: HTMLInputElement) => _this.inputEl = el;

    _this.refreshInputEl = () => {
      const { value } = form.getFieldState(_this.name);
      _this.updateInputEl(_this.inputEl, value);
    };

    _this.callback = (state: FieldState<FieldValue>) => {
      const { value, dirty } = state;
      if (dirty === false && _this.dirty === true) updateInputEl(_this.inputEl, value);
      _this.dirty = dirty;
    };

    _this.handleLifecycle = () => {

      const handleInputEvent = (event: InputEvent) => {
        const { value } = form.getFieldState(_this.name);
        const nextValue = _this.getNextValue(event, value);
        form.change(_this.name, nextValue);
      };

      const handleBlurEvent = () => {
        const { blur, touched } = form.getFieldState(_this.name);
        if (!touched) blur();
      };
  
      _this.inputEl.addEventListener('input', handleInputEvent);
      _this.inputEl.addEventListener('blur', handleBlurEvent);

      const { value } = form.getFieldState(_this.name);
      _this.updateInputEl(_this.inputEl, value);
  
      return () => {
        _this_ref.current = null;
      };
    }

  }

  if (_this.name !== name) {
    if (_this.unsubscribe !== undefined) _this.unsubscribe();
    _this.unsubscribe = form.registerField(name, _this.callback, subscription);
    _this.name = name;
  }

  _this.getNextValue = getNextValue;

  if (_this.name !== name || _this.updateInputEl !== updateInputEl) {
    if (_this.updateInputEl !== undefined) _this.refreshInputEl();
    _this.updateInputEl = updateInputEl;
  }

  useEffect(_this.handleLifecycle, []);
  
  return _this.ref;
};

export default useInputRef;