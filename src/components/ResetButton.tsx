import { FormSubscription } from 'final-form';
import { useForm, useFormState } from 'react-final-form';

const subscription: FormSubscription = {
  pristine: true,
};

function ResetButton() {
  // console.log('ResetButton'); //DEBUG

  const { pristine } = useFormState({ subscription });
  const { reset } = useForm();

  return <button disabled={pristine} onClick={() => reset()}>reset</button>;
}

export default memo(ResetButton);