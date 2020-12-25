export const valuePropSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
export const checkedPropSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked').set;

export function dispatchInputEvent(node: HTMLInputElement) {
  const event = new InputEvent('input', { bubbles: true, cancelable: false });
  node.dispatchEvent(event);
}