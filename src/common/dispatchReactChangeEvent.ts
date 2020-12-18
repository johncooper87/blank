function getInputSetter(propName: string) {
  return Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, propName).set;
}

const valueSetter = getInputSetter('value');
const checkedSetter = getInputSetter('checked');

type InputChangeProps = {
  value?: string
  checked?: boolean
}

function dispatchReactChangeEvent(node: HTMLInputElement, { value, checked }: InputChangeProps) {
  if (value != null) valueSetter.call(node, value);
  if (checked != null) checkedSetter.call(node, checked);
  const event = new InputEvent('input', { bubbles: true, cancelable: false });
  node.dispatchEvent(event);
}

export default dispatchReactChangeEvent;