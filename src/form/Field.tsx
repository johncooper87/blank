import { FieldValidator, FieldSubscription } from 'final-form';
import { useField } from 'react-final-form';
import { NameContext, useNameContext } from './NameContext';

const subscription: FieldSubscription = {};

interface FieldProps<FeildValue> {
  name: string
  validate?: FieldValidator<FeildValue>
  children:  ReactNode
}

function Field<FeildValue>({ name, validate, children }: FieldProps<FeildValue>) {

  const _name = useNameContext(name);
  useField(_name, { validate, subscription });

  return (
    <NameContext.Provider value={_name}>
      {children}
    </NameContext.Provider>
  );
}

export default Field;