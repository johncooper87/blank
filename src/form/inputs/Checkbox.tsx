// import { FieldSubscription } from 'final-form';
// import { useField } from 'react-final-form';
// import { useFeildNameContext } from '../FieldNameContext';

// const subscription: FieldSubscription = {
//   value: true
// };

// interface CheckboxProps {
//   name?: string;
//   value?: string | number;
//   label?: string;
// }

// const type = 'checkbox';

// function Checkbox({ name, value, label, ...props }: CheckboxProps) {

//   const _name = useFeildNameContext(name);
//   // console.log('Checkbox:', _name); //DEBUG

//   const {
//     input: { checked, onChange, onBlur },
//   } = useField(_name, { type, value, subscription });

//   const inputProps = { type, value, checked, onChange, onBlur };

//   return <label {...props} style={{ padding: '4px' }}>
//       {label}
//       <input {...inputProps} style={{ marginLeft: '4px' }} />
//     </label>;
// };

// export default memo(Checkbox);

import { useFeildNameContext } from 'form/FieldNameContext';
import useInputRef from 'form/useInputRef';

interface CheckboxProps {
  name?: string;
  value?: string | number;
  label?: string;
}

function inputEventCallback(event: InputEvent, getState) {
  const { value: _value = [] } = getState();
  const { value, checked } = event.target;
  if (value) {
    if (!checked) {
      //_value.splice(_value.indexOf(value), 1);
      const spliceIndex = _value.indexOf(value);
      if (spliceIndex === -1) return [..._value];
      return [
        ..._value.slice(0, spliceIndex),
        ..._value.slice(spliceIndex + 1)
      ];
    } else {
      //_value.push(value);
      const index = _value.indexOf(value);
      if (index !== -1) return [..._value];
      return [
        ..._value,
        value
      ];
    }
  };
  return checked;
}

function updateInputCallback(node: HTMLInputElement, _value = []) {
  const { value, checked } = node;
  // console.log(node);
  // console.log(_value);
  // console.log(value);
  //if (!value) return;
  node.checked = _value.includes(value);
  // if (_value.includes(value) && !checked) node.checked = true;
  // else if (!_value.includes(value) && checked) node.checked = false;
}

function Checkbox({ name, value, label, ...props }: CheckboxProps) {

  const _name = useFeildNameContext(name);
  // console.log('Checkbox:', _name); //DEBUG

  const inputRef = useInputRef<boolean | any[]>(_name, updateInputCallback, inputEventCallback);

  return <label {...props} style={{ padding: '4px' }}>
      {label}
      <input type="checkbox" name={_name} ref={inputRef} value={value} style={{ marginLeft: '4px' }} />
    </label>;
};

export default memo(Checkbox);