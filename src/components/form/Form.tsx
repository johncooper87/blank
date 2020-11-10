import { FormSubscription, SubmissionErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { useCallback } from 'react';
import { Form as FF_Form, FormProps as FF_FormProps } from 'react-final-form';

type FormProps<FormValues, InitialFormValues> =
  Pick<FF_FormProps<FormValues, InitialFormValues>,'initialValues' | 'validate'>
  & {
    children: ReactNode;
    onSubmit: (
      values: FormValues,
      initialValues: InitialFormValues,
    ) => void | SubmissionErrors | Promise<SubmissionErrors>;
  };

const subscription: FormSubscription = {
};

const mutators = {
  ...arrayMutators
};

function Form<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>({ onSubmit, initialValues, validate, children }: FormProps<FormValues, InitialFormValues>) {
  // console.log('Form') /*DEBUG*/

  const _onSubmit = useCallback((values) => onSubmit(values, initialValues), [initialValues]);

  return React.createElement(FF_Form, {
    onSubmit: _onSubmit,
    initialValues,
    validate,
    subscription,
    mutators,
    children: () => {
      return <>
        {children}
      </>;
    }
  });
}

export default Form;