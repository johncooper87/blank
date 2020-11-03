import { FormSubscription, SubmissionErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { useCallback } from 'react';
import { Form as FF_Form, FormProps as FP } from 'react-final-form';

type FormProps = Pick<FP,'initialValues' | 'validate'> & {
  children: ReactNode;
  onSubmit: (values: { [key: string]: any }, initialValues: { [key: string]: any }) => void | SubmissionErrors | Promise<SubmissionErrors>;
};

const subscription: FormSubscription = {
};

const mutators = {
  ...arrayMutators
};

function Form({ onSubmit, initialValues, validate, children }: FormProps) {
  // console.log('Form') /*DEBUG*/

  const _onSubmit = useCallback((values) => onSubmit(values, initialValues), [initialValues]);

  return React.createElement(FF_Form, {
    onSubmit: _onSubmit,
    initialValues,
    validate,
    subscription,
    mutators,
    children: () => {
      return children;
    }
  });
}

export default Form;