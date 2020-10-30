import { FieldSubscription, FieldValidator } from 'final-form';
import { useField } from 'react-final-form';
import * as FF from 'react-final-form-arrays';
import { FieldArrayRenderProps as FAR } from 'react-final-form-arrays';
import { useFeildNameContext } from './FieldNameContext';

type FieldArrayRenderProps<T> = Pick<
  FAR<T, any>['fields'],
  'insert'|'map'|'move'|'pop'|'push'|'remove'|'shift'|'swap'|'unshift'
>;

const subscription: FieldSubscription = {
};

interface FieldArrayProps<T> {
  name?: string;
  validate?: FieldValidator<T[]>;
  children: (props: FieldArrayRenderProps<T>) => ReactNode;
}

function FieldArray<T>({ name, validate, children: renderFn }: FieldArrayProps<T>) {

  const _name = useFeildNameContext(name);
  const { input: { onBlur } } = useField(_name, { subscription: {} });

  return React.createElement(FF.FieldArray, {
    name: _name,
    validate,
    subscription,
    children: ({ fields }) => {

      // console.log('FieldArray render:', _name) /*DEBUG*/
      const {
        concat, forEach, length, name, value, removeBatch, update,
        ...methods
      }: any = fields;

      return <span onBlur={onBlur}>
        {renderFn(methods)}
      </span>;
    }
  });
}

export default FieldArray;

