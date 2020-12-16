import { FieldState } from 'final-form';
import { useFieldRef, ChangeCallback, ConnectedCallback } from 'form/useFieldRef';
import { inputSubscription } from './subscriptions'

export type UpdateCallback<FieldValue> = (inputEl: HTMLInputElement, state: FieldValue) => void;
export type InputEventCallback<FieldValue> = (inputEl: HTMLInputElement, getState: () => FieldState<FieldValue>) => FieldValue;

function useInputRef<FieldValue>(
  name: string,
  updateCallback: UpdateCallback<FieldValue>,
  inputEventCallback: InputEventCallback<FieldValue>,
) {

  const valueChangeCallback = useCallback<ChangeCallback<FieldValue, HTMLInputElement>>(
    (node, nextState, prevState) => {
      if (
        nextState.dirty === false
        && prevState.dirty === true
        && node != null
      ) updateCallback(node, nextState.value);
    }
  , [updateCallback]);
  
  const connectedCallback = useCallback<ConnectedCallback<FieldValue, HTMLInputElement>>(
    (node, getState) => {
      const { value, change } = getState();
      if (node != null) updateCallback(node, value);

      const handleInput = (event: InputEvent) => {
        const nextValue = inputEventCallback(event.target, getState);
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
  , [updateCallback, inputEventCallback]);

  const ref = useFieldRef(name, valueChangeCallback, {
    subscription: inputSubscription,
    connectedCallback
  });

  return ref;
};

export default useInputRef;