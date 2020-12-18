import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import { useNameContext } from './NameContext';

type FieldArrayRenderProps<FieldValue> = {
  push: (value?: FieldValue) => void
  remove: (index: number) => void
  length: number
  map: <R>(iterator: (name: string, index: number) => R) => R[]
}

const subscription: FieldSubscription = {};

interface FieldArrayProps<FieldValue> {
  name?: string;
  validate?: FieldValidator<FieldValue[]>;
  children: (props: FieldArrayRenderProps<FieldValue>) => ReactNode;
}

function FieldArray<FieldValue>({ name, validate, children: renderFn }: FieldArrayProps<FieldValue>) {

  const _name = useNameContext(name);
  const { input: { onBlur } } = useField(_name, { subscription });
  const { fields: { map, push, remove, length } } = useFieldArray<FieldValue, any>(_name, { validate, subscription });

  return (
    <span onBlur={onBlur}>
      {renderFn({ map, push, remove, length })}
    </span>
  );
}

export default FieldArray;

