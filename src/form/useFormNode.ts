import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import useInstance from 'common/useInstance'
import shallowEqual from 'common/shallowEqual';

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

    arbitrary.setValue = value => arbitrary.form.change(arbitrary.name, value);

    arbitrary.ref = (node: P) => {
      arbitrary.node = node;
      if (node === null) return;
      arbitrary.onConnected?.(node, arbitrary.setValue, () => form.getFieldState(name))
    }

    arbitrary.callback = (state: FieldState<T>) => {
      if (arbitrary.node != null) arbitrary.onChange(arbitrary.node, state, arbitrary.state);
      arbitrary.state = state;
    };

  }

  const shouldChange = arbitrary.onChange !== onChange;
  if (shouldChange) arbitrary.onChange = onChange;

  const shouldResubscribe =
    arbitrary.form !== form
    || arbitrary.name !== name
    || !shallowEqual(subscription, arbitrary.subscription)
    || validate !== arbitrary.validate;
  if (shouldResubscribe) {
    if (arbitrary.unsubscribe !== undefined) arbitrary.unsubscribe();
    arbitrary.unsubscribe = form.registerField(name, arbitrary.callback, subscription, { getValidator: () => validate, silent: true });
    arbitrary.form = form;
    arbitrary.name = name;
    arbitrary.subscription = subscription;
    arbitrary.validate = validate;
  }

  if (shouldChange && !shouldResubscribe) {
    if (arbitrary.node != null && !shouldResubscribe) onChange(arbitrary.node, arbitrary.state, Object());
  }

  if (shouldResubscribe || arbitrary.onConnected !== onConnected) {
    if (arbitrary.node != null) onConnected?.(arbitrary.node, arbitrary.setValue, () => form.getFieldState(name))
    arbitrary.onConnected = onConnected;
  }
  
  return arbitrary.ref;
};

export default useFormNode;