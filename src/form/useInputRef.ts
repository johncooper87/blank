import { FieldState } from 'final-form';
import { useFieldRef, ChangeCallback, ConnectedCallback } from 'form/useFieldRef';
import { inputSubscription } from './subscriptions'

function useInputRef<FieldValue>(
  name: string,
  updateInputEl: (inputEl: HTMLInputElement, fieldValue: FieldValue) => void,
  getFieldValue: (inputEl: HTMLInputElement, getState: () => FieldState<FieldValue>) => FieldValue,
) {

  const valueChangeCallback = useCallback<ChangeCallback<FieldValue, HTMLInputElement>>(
    (node, nextState, prevState) => {
      if (
        nextState.dirty === false
        && prevState.dirty === true
        && node != null
      ) updateInputEl(node, nextState.value);
    }
  , [updateInputEl]);
  
  const connectedCallback = useCallback<ConnectedCallback<FieldValue, HTMLInputElement>>(
    (node, getState) => {
      const { value, change } = getState();
      if (node != null) updateInputEl(node, value);

      const handleInput = (event: InputEvent) => {
        const nextValue = getFieldValue(event.target, getState);
        change(nextValue);
      };

      const handleBlur = () => {
        const { touched, blur } = getState();
        if (!touched) blur();
      };

      node.addEventListener("input", handleInput);
      node.addEventListener("blur", handleBlur);

      return () => {
        node.removeEventListener("input", handleInput);
        node.removeEventListener("blur", handleBlur);
      };
    }
  , [updateInputEl, getFieldValue]);

  const ref = useFieldRef(name, valueChangeCallback, {
    subscription: inputSubscription,
    connectedCallback
  });

  return ref;
};

export default useInputRef;