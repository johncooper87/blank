import { FieldState, FieldSubscription, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import { useEffect } from 'react';

export type FieldStateChange<RefNode, FieldValue> = (node: RefNode, nextState: FieldState<FieldValue>, prevState: FieldState<FieldValue>) => void
type DisconnectElement = () => void
export type ConnectElement<RefNode, FieldValue> = (node: RefNode, getState: () => FieldState<FieldValue>) => DisconnectElement

type UseFieldRefConfig<RefNode, FieldValue> = {
  subscription?: FieldSubscription
  validate?: FieldValidator<FieldValue>
  connect?: ConnectElement<RefNode, FieldValue>
}

type UseFieldRefRecentValues<RefNode, FieldValue> = {
  node?: RefNode
  state: FieldState<FieldValue>
}

export function useFieldRef<RefNode extends HTMLElement, FieldValue>(
  name: string,
  stateChange: FieldStateChange<RefNode, FieldValue>,
  config?: UseFieldRefConfig<RefNode, FieldValue>
): React.RefCallback<RefNode> {

  const form = useForm();

  const { subscription, validate, connect } = config;

  const recent = useRef<UseFieldRefRecentValues<RefNode, FieldValue>>({
    state: Object()
  }).current;
  
  useEffect(() => {
    const callback = (currentState: FieldState<FieldValue>) => {
      const { node, state } = recent;
      stateChange(node, currentState, state);
      recent.state = currentState;
    }
    const fieldConfig = {
      getValidator: () => validate
    };
    const unsubscribe = form.registerField(name, callback, subscription, fieldConfig);
    return unsubscribe;
  }, [form, name, stateChange, subscription, validate]);

  useEffect(() => {
    const getState = () => form.getFieldState(name);
    const disconnect = connect?.(recent.node, getState);
    return disconnect;
  }, [form, name, connect]);

  const refCallback = useCallback((node: RefNode) => {
    recent.node = node;
  }, []);

  return refCallback;
}