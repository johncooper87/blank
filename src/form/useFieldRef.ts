import { FieldState, FieldSubscription, FieldValidator } from 'final-form';
import { useForm } from 'react-final-form';
import { useEffect } from 'react';

export type ChangeCallback<FieldValue, RefNode> = (node: RefNode, nextState: FieldState<FieldValue>, prevState: FieldState<FieldValue>) => void;
export type DisconnectedCallback = () => void;
export type ConnectedCallback<FieldValue, RefNode> = (node: RefNode, getState: () => FieldState<FieldValue>) => DisconnectedCallback;

type UseFieldRefConfig<FieldValue, RefNode> = {
  subscription?: FieldSubscription;
  validate?: FieldValidator<FieldValue>;
  connectedCallback?: ConnectedCallback<FieldValue, RefNode>;
}

type UseFieldRefRecentValues<FieldValue, RefNode> = {
  node?: RefNode;
  state: FieldState<FieldValue>;
  // disconnectedCallback?: DisconnectedCallback;
}

export function useFieldRef<FieldValue, RefNode extends HTMLElement>(
  name: string,
  changeCallback: ChangeCallback<FieldValue, RefNode>,
  config?: UseFieldRefConfig<FieldValue, RefNode>
): React.RefCallback<RefNode> {

  const form = useForm();

  const { subscription, validate, connectedCallback } = config;

  const recent = useRef<UseFieldRefRecentValues<FieldValue, RefNode>>({
    state: Object()
  }).current;
  
  useEffect(() => {
    const callback = (currentState: FieldState<FieldValue>) => {
      const { node, state } = recent;
      changeCallback(node, currentState, state);
      recent.state = currentState;
    }
    const fieldConfig = {
      getValidator: () => validate
    };
    const unsubscribe = form.registerField(name, callback, subscription, fieldConfig);
    return unsubscribe;
  }, [form, name, changeCallback, subscription, validate]);

  useEffect(() => {
    const getState = () => form.getFieldState(name);
    const disconnectedCallback = connectedCallback?.(recent.node, getState);
    return disconnectedCallback;
  }, [form, name, connectedCallback]);

  const refCallback = useCallback((node: RefNode) => {
    recent.node = node;
  }, [form, name, connectedCallback]);

  // const refCallback = useCallback((node: RefNode) => {
  //   if (node == null) recent.disconnectedCallback?.();
  //   else {
  //     const getState = () => form.getFieldState(name);
  //     recent.disconnectedCallback = connectedCallback?.(node, getState);
  //   }
  //   recent.node = node;
  // }, [form, name, connectedCallback]);

  return refCallback;
};

export default useFieldRef;