import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import useInstance from 'common/useInstance'
import deepEqual from 'common/deepEqual';
import { useEffect } from 'react';

type ValueSetter<T> = (value: T) => void
export type ChangeCallback<T, P> = (node: P, nextState: FieldState<T>, prevState: FieldState<T>) => void;
export type ConnectedCallback<T, P> = (node: P, setValue: ValueSetter<T>, getState: () => FieldState<T>) => void;

type UseFormNodeConfig<T, P> = {
  validate?: FieldValidator<T>;
  subscription?: FieldSubscription;
  onConnected?: ConnectedCallback<T, P>;
}

type UseFormNodeHook<T, P> = {
  initialized: boolean;
  node: P;
  ref: (node: P) => void;
  callback: (state: FieldState<T>) => void;
  form: FormApi;
  name: string;
  subscription: FieldSubscription;
  validate: FieldValidator<T>;
  unsubscribe: Unsubscribe;
  onChange: ChangeCallback<T, P>;
  onConnected: ConnectedCallback<T, P>;
  state: FieldState<T>;
  setValue: ValueSetter<T>;
}

export function useFormNode<T, P extends HTMLElement>(
  name: string,
  onChange: ChangeCallback<T, P>,
  config?: UseFormNodeConfig<T, P>
) {

  const { validate, subscription, onConnected } = config;
  const form = useForm();
  const arbitrary = useInstance<UseFormNodeHook<T, P>>();

  if (!arbitrary.initialized) {

    arbitrary.initialized = true;
    arbitrary.state = Object();

    arbitrary.setValue = (value: T) => {
      const { form, name } = arbitrary;
      form.change(name, value);
    }

    arbitrary.getState = () => {
      const { form, name } = arbitrary;
      return form.getFieldState(name);
    }

    arbitrary.invokeConnectedCallback = () => {
      const { onConnected, node } = arbitrary;
      if (onConnected == null || node == null) return;
      const { form, name, setValue, getState } = arbitrary;
      onConnected(node, setValue, getState);
    };

    arbitrary.ref = (node: P) => {
      arbitrary.node = node;
      arbitrary.invokeConnectedCallback();
    }

    arbitrary.invokeChangeCallback = (nextState: FieldState<T>) => {
      const { node, state, onChange } = arbitrary;
      if (node != null) onChange(node, nextState, state);
      arbitrary.state = nextState;
    };

    arbitrary.subscribe = (form, name, subscription, validate) => {
      arbitrary.state = Object();
      arbitrary.onChange = onChange;
      arbitrary.form = form;
      arbitrary.name = name;
      arbitrary.subscription = subscription;
      arbitrary.validate = validate;
      arbitrary.unsubscribe = form.registerField(name, arbitrary.invokeChangeCallback, subscription, { getValidator: () => validate });
    };

    arbitrary.cleanup = () => {
      return () => {
        const { unsubscribe } = arbitrary;
        if (unsubscribe != null) unsubscribe();
      }
    }

  }

  const shouldResubscribe =
    arbitrary.form !== form
    || arbitrary.name !== name
    || !deepEqual(subscription, arbitrary.subscription, 0)
    || validate !== arbitrary.validate
    || onChange !== arbitrary.onChange;
  if (shouldResubscribe) {
    if (arbitrary.unsubscribe !== undefined) arbitrary.unsubscribe();
    arbitrary.subscribe(form, name, subscription, validate)
  }

  if (arbitrary.onConnected !== onConnected) {
    arbitrary.onConnected = onConnected;
    arbitrary.invokeConnectedCallback();
  }

  useEffect(arbitrary.cleanup, []);
  
  return arbitrary.ref;
};

export default useFormNode;