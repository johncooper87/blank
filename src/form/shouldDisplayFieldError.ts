import { FieldMetaState } from 'react-final-form';

function shouldDisplayFieldError<FieldValue>({ touched, error, dirtySinceLastSubmit, submitError }: FieldMetaState<FieldValue>) {
  return (touched && error && typeof error === 'string')
  || (!dirtySinceLastSubmit && submitError && typeof submitError === 'string')
}

export default shouldDisplayFieldError;