// import { FieldSubscription } from 'final-form';
// import { useField } from 'react-final-form';
// import { useFeildNameContext } from '../FieldNameContext';

// const subscription: FieldSubscription = {
//   value: true
// };

// interface RadioProps {
//   name?: string;
//   value: string | number;
//   label?: string;
// }

// const type = 'radio';

// function Radio({ name, value, label, ...props }: RadioProps) {

//   const _name = useFeildNameContext(name);
//   // console.log('Radio:', _name); //DEBUG

//   const {
//     input: { checked, ...input },
//   } = useField(_name, { type, value, subscription });

//   const onChange = useCallback(input.onChange, []);
//   const inputProps = { type, value, checked, onChange };

//   return <label {...props} style={{ padding: '4px' }}>
//       {label}
//       <input {...inputProps} style={{ marginLeft: '4px' }} />
//     </label>;
// };

// export default memo(Radio);

import { useFeildNameContext } from '../FieldNameContext';
import useInput from './useInput';

interface RadioProps {
  name?: string;
  value: string | number;
  label?: string;
}

function onInputEvent(event: InputEvent) {
  const { value, checked } = event.target;
  if (checked) return value;
}

function onReset(node: HTMLInputElement, value: string) {
  node.checked = node.value === value;
}

function Radio({ name, value, label, ...props }: RadioProps) {

  const _name = useFeildNameContext(name);
  // console.log('Radio:', _name); //DEBUG

  const inputRef = useInput<string>(_name, { onInputEvent, onReset });

  return <label {...props} style={{ padding: '4px' }}>
      {label}
      <input type="radio" name={_name} ref={inputRef} value={value} style={{ marginLeft: '4px' }} />
    </label>;
};

export default memo(Radio);