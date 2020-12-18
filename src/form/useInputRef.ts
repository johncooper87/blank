import { FieldState } from 'final-form';
import { useFieldRef, FieldStateChange, ConnectElement } from 'form/useFieldRef';
import { inputSubscription } from './subscriptions'

export type ValueChange<FieldValue> = (node: HTMLInputElement, value: FieldValue) => void;
export type GetNextValue<FieldValue> = (node: HTMLInputElement, getState: () => FieldState<FieldValue>) => FieldValue;

export function useInputRef<FieldValue>(
  name: string,
  valueChange: ValueChange<FieldValue>,
  getNextValue: GetNextValue<FieldValue>,
) {

  const handleStateChange = useCallback<FieldStateChange<HTMLInputElement, FieldValue>>(
    (node, nextState, prevState) => {
      if (
        nextState.dirty === false
        && prevState.dirty === true
        && node != null
      ) valueChange(node, nextState.value);
    }
  , [valueChange]);
  
  const connectInput = useCallback<ConnectElement<HTMLInputElement, FieldValue>>(
    (node, getState) => {
      const { value, change } = getState();
      if (node != null) valueChange(node, value);

      const handleInput = (event: InputEvent) => {
        const nextValue = getNextValue(event.target, getState);
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
  , [valueChange, getNextValue]);

  const ref = useFieldRef(name, handleStateChange, {
    subscription: inputSubscription,
    connect: connectInput
  });

  return ref;
};