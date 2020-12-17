import { FieldValidator } from 'final-form';
import { useFieldRef, FieldStateChange } from 'form/useFieldRef';
import { errorSubscription } from './subscriptions'

function useErrorRef<FieldValue>(name: string, validate?: FieldValidator<FieldValue>) {

  const errorChangeCallback = useCallback<FieldStateChange<FieldValue, HTMLInputElement>>(
    (node, nextState) => {
      const { touched, error, submitError, dirtySinceLastSubmit } = nextState;

      const showError = (touched && error && typeof error === 'string')
        || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

      const prevError = node.innerText;
      if (showError !== Boolean(prevError) || error !== prevError) {
        node.innerText = showError ? error : '';
      }
    }
  , []);
  

  const ref = useFieldRef(name, errorChangeCallback, {
    subscription: errorSubscription,
    validate
  });

  return ref;
};

export default useErrorRef;