import { FieldValidator } from 'final-form';
import { useFieldRef, FieldStateChange } from 'form/useFieldRef';
import { errorSubscription } from './subscriptions'

type RefError = HTMLDivElement | HTMLSpanElement | HTMLParagraphElement | HTMLLabelElement;

function useErrorRef<FieldValue>(name: string, validate?: FieldValidator<FieldValue>) {

  const handleStateChange = useCallback<FieldStateChange<RefError, FieldValue>>(
    (node, nextState) => {
      const { touched, error, submitError, dirtySinceLastSubmit } = nextState;

      const showError = (touched && error && typeof error === 'string')
        || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string');

      const currentError = node.innerText;
      if (showError !== Boolean(currentError) || error !== currentError) {
        node.innerText = showError ? error : '';
      }
    }
  , []);

  const ref = useFieldRef(name, handleStateChange, {
    subscription: errorSubscription,
    validate
  });

  return ref;
};

export default useErrorRef;