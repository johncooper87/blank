import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import { useFeildNameContext } from '../contexts/FieldNameContext';

type FieldArrayRenderProps<T> = {
  push: (value?: T) => void;
  remove: (index: number) => void;
  length: number;
  map: <R>(iterator: (name: string, index: number) => R) => R[];
};

const subscription: FieldSubscription = {
};

interface FieldArrayProps<T> {
  name?: string;
  validate?: FieldValidator<T[]>;
  children: (props: FieldArrayRenderProps<T>) => ReactNode;
}

function FieldArray<T>({ name, validate, children: renderFn }: FieldArrayProps<T>) {

  const _name = useFeildNameContext(name);
  // console.log('FieldArray:', _name) /*DEBUG*/

  const { input: { onBlur } } = useField(_name, { subscription });

  const { fields: { map, push, remove, length } } = useFieldArray<T, any>(_name, { validate, subscription });

  return <span onBlur={onBlur}>
    {renderFn({ map, push, remove, length })}
  </span>;
}

export default FieldArray;

