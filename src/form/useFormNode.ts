import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import useInstance from 'common/useInstance'

type UseFormNodeConfig<T, P> = {
  validate?: FieldValidator<T>;
  subscription?: FieldSubscription;
  onConnected?: (node: P, state: FieldState<T>) => void;
}

function useFormNode<T, P extends HTMLElement>(
  name: string,
  onChange: (nextState: FieldState<T>, prevState: FieldState<T>) => void,
  config: UseFormNodeConfig<T, P>
) {

  const { validate, subscription, onConnected } = config;
  const form = useForm();
  const arbitrary = useInstance();

  if (!arbitrary.initialized) {

    arbitrary.initialized = true;

    arbitrary.ref = (node: P) => {
      arbitrary.node = node;
      if (node === null) return;
      arbitrary.onConnected(node, form.getFieldState(name))
    }

    arbitrary.callback = (state: FieldState<T>) => {
      arbitrary.onChange(state, arbitrary.currentState);
      arbitrary.currentState = state;
    };

  }

  const shouldResubscribe = arbitrary.form !== form || arbitrary.name !== name;
  if (shouldResubscribe) {
    if (arbitrary.unsubscribe !== undefined) arbitrary.unsubscribe();
    arbitrary.unsubscribe = form.registerField(name, arbitrary.callback, subscription, { getValidator: () => validate });
    arbitrary.form = form;
    arbitrary.name = name;
  }

  arbitrary.onChange = onChange;

  if (shouldResubscribe || arbitrary.onConnected !== onConnected) {
    if (arbitrary.node != null) onConnected(arbitrary.node, form.getFieldState(name))
    arbitrary.onConnected = onConnected;
  }
  
  return arbitrary.ref;
};

export default useFormNode;