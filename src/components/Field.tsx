import { FieldValidator, FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { FieldNameContext } from './FieldNameContext';
import { useFeildNameContext } from './FieldNameContext';

const subscription: FieldSubscription = {
};

interface FieldProps<T> {
  name: string;
  validate?: FieldValidator<T>;
  children:  ReactNode;
}

function Field<T>({ name, validate, children }: FieldProps<T>) {

  const _name = useFeildNameContext(name);

  useField(_name, { validate, subscription });

  return <FieldNameContext.Provider value={_name}>
    {children}
  </FieldNameContext.Provider>
}

export default Field;