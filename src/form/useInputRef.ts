import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';

const subscription: FieldSubscription = {
  value: true,
  dirty: true,
};

// type Callback<T> = (nextState: FieldState<T>, prevState: FieldState<T>) => void

// class FieldSubscriber<T> {
//   form: FormApi;
//   name: string;
//   currentState: FieldState<T> = Object();

//   subscribe(form: FormApi, name: string, callback: Callback<T>, subscription: FieldSubscription, validate: FieldValidator<T>) {
//     this.form = form;
//     this.name = name;
//     const invokeCallback = (state: FieldState<T>) => {
//       callback(state, this.currentState);
//       this.currentState = state;
//     };
//     this.currentState = Object();
//     return form.registerField(name, invokeCallback, subscription, { getValidator: () => validate });
//   }
// }

// class FieldDOMNode<T, P> extends FieldSubscriber<T> {
//   node: HTMLElement;
//   ref: React.RefCallback<P>;

//   refCallback(node: HTMLElement) {
//     this.node = node;
//     if (node === null) return;
//     this.refCallback()
//   }
// }

function useInputRef<FieldValue = any>(
  name: string,
  getNextValue: (event: InputEvent, currentValue: any) => FieldValue,
  updateInputEl: (inputEl: HTMLInputElement, newValue: FieldValue) => void
) {

  const form = useForm();
  const watcher = useArbitrary();

  if (!watcher.initialized) {

    watcher.initialized = true;

    watcher.ref = (inputEl: HTMLInputElement) => {
      watcher.inputEl = inputEl;
      if (inputEl === null) return;
      
      const {
        handleInputEvent, handleBlurEvent,
        form, name, updateInputEl
      } = watcher;

      inputEl.addEventListener('input', handleInputEvent);
      inputEl.addEventListener('blur', handleBlurEvent);

      const { value } = form.getFieldState(name);
      updateInputEl(inputEl, value);
    }

    watcher.callback = (state: FieldState<FieldValue>) => {
      const { value, dirty } = state;
      if (dirty === false && watcher.dirty === true) updateInputEl(watcher.inputEl, value);
      watcher.dirty = dirty;
    };

    watcher.handleInputEvent = (event: InputEvent) => {
      const { form, name, getNextValue } = watcher;
      const { value } = form.getFieldState(name);
      const nextValue = getNextValue(event, value);
      form.change(name, nextValue);
    };

    watcher.handleBlurEvent = () => {
      const { form, name } = watcher;
      const { blur, touched } = form.getFieldState(name);
      if (!touched) blur();
    };

  }

  const shouldResubscribe = watcher.name !== name || watcher.form !== form;
  if (shouldResubscribe) {
    if (watcher.unsubscribe !== undefined) watcher.unsubscribe();
    watcher.unsubscribe = form.registerField(name, watcher.callback, subscription);
    watcher.name = name;
    watcher.form = form;
  }

  watcher.getNextValue = getNextValue;

  if (shouldResubscribe || watcher.updateInputEl !== updateInputEl) {
    if (updateInputEl !== undefined) {
      const { form, name, inputEl } = watcher;
      const { value } = form.getFieldState(name);
      updateInputEl(inputEl, value);
    }
    watcher.updateInputEl = updateInputEl;
  }
  
  return watcher.ref;
};

export default useInputRef;