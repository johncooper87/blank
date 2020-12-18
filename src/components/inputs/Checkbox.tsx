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

import { useNameContext } from 'form/NameContext';
import { useInputRef, ValueChange, GetNextValue } from 'form/useInputRef';

interface CheckboxProps {
  name?: string;
  value?: string | number;
  label?: string;
}

type CheckboxValue = boolean | string[]

const handleValueChange: ValueChange<CheckboxValue> = 
  (node: HTMLInputElement, nextValue) => {
    const { value } = node;
    if (value && nextValue instanceof Array) node.checked = nextValue.includes(value);
    else node.checked = Boolean(nextValue);
  };

const getNextValue: GetNextValue<CheckboxValue> = 
  (node, getState) =>  {
    const { value, checked } = node;
    if (value) {
      let checkedValues = getState().value;
      checkedValues = checkedValues instanceof Array ? checkedValues : [];
      if (!checked) {
        const spliceIndex = checkedValues.indexOf(value);
        if (spliceIndex === -1) return [...checkedValues];
        return [
          ...checkedValues.slice(0, spliceIndex),
          ...checkedValues.slice(spliceIndex + 1)
        ];
      } else {
        const index = checkedValues.indexOf(value);
        if (index !== -1) return [...value];
        return [
          ...checkedValues,
          value
        ];
      }
    };
    return checked;
  };

function Checkbox({ name, value, label, ...props }: CheckboxProps) {

  const _name = useNameContext(name);
  const inputRef = useInputRef<CheckboxValue>(_name, handleValueChange, getNextValue);

  return (
    <label {...props} style={{ padding: '4px' }}>
      {label}
      <input type="checkbox" name={_name} ref={inputRef} value={value} style={{ marginLeft: '4px' }} />
    </label>
  );
}

export default memo(Checkbox);