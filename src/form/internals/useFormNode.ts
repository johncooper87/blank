import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import { useEffect } from 'react';

export type ChangeCallback<T, P> = (node: P, nextState: FieldState<T>, prevState: FieldState<T>) => void;
export type DisconnectedCallback = () => void;
export type ConnectedCallback<T, P> = (node: P, getState: () => FieldState<T>) => DisconnectedCallback;

type UseFieldHTMLElementConfig<T, P> = {
  subscription?: FieldSubscription;
  validate?: FieldValidator<T>;
  connectedCallback?: ConnectedCallback<T, P>;
}

type UseFieldHTMLElementHook<T, P> = {
  node?: P;
  state: FieldState<T>;
  disconnectedCallback?: DisconnectedCallback;
}

export function useFieldHTMLElement<T, P extends HTMLElement>(
  name: string,
  changeCallback: ChangeCallback<T, P>,
  config?: UseFieldHTMLElementConfig<T, P>
) {

  const form = useForm();

  const { subscription, validate, connectedCallback } = config;

  const arbitrary = useRef<UseFieldHTMLElementHook<T, P>>({
    state: Object()
  }).current;
  
  useEffect(() => {
    const invokeChangeCallback = (newState: FieldState<T>) => {
      const { node, state } = arbitrary;
      changeCallback(node, newState, state);
      arbitrary.state = newState;
    }
    const fieldConfig = {
      getValidator: () => validate
    };
    const unsubscribe = form.registerField(name, invokeChangeCallback, subscription, fieldConfig);
    return unsubscribe;
  }, [form, name, changeCallback, subscription, validate]);

  const refCallback = useCallback((node: P) => {
    if (node == null) arbitrary.disconnectedCallback?.();
    else {
      const getState = () => form.getFieldState(name);
      arbitrary.disconnectedCallback = connectedCallback(node, getState);
    }
  }, [form, name, connectedCallback]);

  return refCallback;
};

export default useFieldHTMLElement;