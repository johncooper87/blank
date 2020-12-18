import { FieldValidator } from 'final-form';
import { useFieldRef, FieldStateChange } from './useFieldRef';
import { errorSubscription } from './subscriptions'
import shouldDisplayFieldError from './shouldDisplayFieldError'

type RefError = HTMLDivElement | HTMLSpanElement | HTMLParagraphElement | HTMLLabelElement

function useErrorRef<FieldValue>(name: string, validate?: FieldValidator<FieldValue>) {

  const handleStateChange = useCallback<FieldStateChange<RefError, FieldValue>>(
    (node, nextState) => {
      const showError = shouldDisplayFieldError(nextState);
      const { error, submitError } = nextState;
      const _error = error || submitError;

      const currentError = node.innerText;
      if (showError !== Boolean(currentError) || _error !== currentError) {
        node.innerText = showError ? _error : '';
      }
    }
  , []);

  const ref = useFieldRef(name, handleStateChange, {
    subscription: errorSubscription,
    validate
  });

  return ref;
}

export default useErrorRef;