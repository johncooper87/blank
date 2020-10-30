import { FormSubscription } from 'final-form';
import arrayMutators from 'final-form-arrays';
import * as FF from 'react-final-form';
import { FormProps as FP } from 'react-final-form';

type FormProps = Pick<
  FP & {
    children: ReactNode;
  },
  'onSubmit'|'initialValues'|'validate'|'children'
>;

const subscription: FormSubscription = {
};

const mutators = {
  ...arrayMutators
};

function Form({ onSubmit, initialValues, validate, children }: FormProps) {

  return React.createElement(FF.Form, {
    onSubmit,
    initialValues,
    validate,
    subscription,
    mutators,
    children: () => {
      // console.log('Form render') /*DEBUG*/
      return children;
    }
  });
}

export default Form;