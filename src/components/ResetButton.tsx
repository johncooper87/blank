import { FormSubscription } from 'final-form';
import { useForm, useFormState } from 'react-final-form';

const subscription: FormSubscription = {
  pristine: true
};

const ResetButton: React.FC = (props) => {
  const { pristine } = useFormState({ subscription });
  const { reset } = useForm();

  return (
    <Button
      size="small"
      {...props}
      color="primary"
      variant="contained"
      disabled={pristine}
      onClick={() => reset()}
    >
      reset
    </Button>
  );
}

export default memo(ResetButton);