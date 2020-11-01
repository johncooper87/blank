import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import { useFeildNameContext } from './FieldNameContext';

type FieldArrayRenderProps<T> = {
  push: (value?: T) => void;
  remove: (index: number) => void;
  length: number;
  map: <R>(iterator: (key: number, name: string, index: number) => R) => R[];
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

  const { input } = useField(_name, { subscription });

  const { fields: { map, push, remove, length } } = useFieldArray<T, any>(_name, { validate, subscription });

  const k = useMemo(() => ({
    keys: Array.from(Array(length).keys()),
    lastKey: length
  }), []);

  const mem = useRef(null);

  if (mem.current === null) {

    const keys = Array.from(Array(length).keys());
    let lastKey = length;

    const methods: Omit<FieldArrayRenderProps<T>, 'length'> = {

      push: (value?: T) => {
        keys.push(lastKey++);
        mem.current._push(value);
      },

      remove: (index: number) => {
        keys.splice(index, 1);
        mem.current._remove(index);
      },

      map: (iterator) => {
        return mem.current._map(
          (name, index) => {
            return iterator(keys[index], name, index);
          }
        );
      }

    }

    mem.current = {
      methods
    };
  }

  mem.current._map = map;
  mem.current._push = push;
  mem.current._remove = remove;

  return <span onBlur={input.onBlur}>
    {renderFn({ length, ...mem.current.methods })}
  </span>;
}

export default FieldArray;

