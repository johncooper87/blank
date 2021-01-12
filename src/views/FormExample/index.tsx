import { useCallback } from 'react';
import * as validators from './validators';

function FormExample() {

  console.log('FormExample');

  const [initialValues, setInitialValues] = useState({
    lastname: 'Cooper',
    wishlist: ['eat', 'eat'],
    gender: 'male'
  });

  const onSubmit = async (values) => {
    console.log(values);
    if (values.firstname === 'John') return {
      firstname: `Name 'John' already reserved`,
      [FORM_ERROR]: `Failed to submit form`
    };
    setInitialValues(values);
  };

  return <div>

    <Form onSubmit={onSubmit} initialValues={initialValues}>
    
      <div style={{ padding: '8px' }}>
        <TextField label="Firstname*" name="firstname" validate={validators.name} />
        <TextField label="Lastname*" name="lastname" validate={validators.name} />
      </div>          

      <div style={{ padding: '8px' }}>
        Gender*:
        <Field name="gender" validate={validators.gender}>
          <Radio label="Male" value="male" />
          <Radio label="Female" value="female" />
          <FieldError />
        </Field>
      </div>

      <div style={{ padding: '8px' }}>
        <P>Bad habbits:</P>
        <Field name="badHabbits" validate={validators.badHabbits}>
          <Checkbox label="Alcohol" value="alcohol" />
          <Checkbox label="Smoking" value="smoking" />
          <Checkbox label="I like to rock'n'roll" value="i like to rock'n'roll" />
          <FieldError />
        </Field>
      </div>

      <div style={{ padding: '8px' }}>
        <P>Wishlist:</P>
        <FieldArray name="wishlist" validate={validators.wishlist}>
          {({ map, push, remove }) => <>
          
            {map(
              (name, index) => <div key={index} style={{ padding: '4px' }}>
                <TextField label={'wish ' + index} name={name} />
                <Button size="small" color="primary" variant="contained" style={{ marginLeft: '4px' }} onClick={() => remove(index)}>Delete</Button>
              </div>
            )}

            <div style={{ padding: '6px' }}>
              <Button size="small" color="primary" variant="contained" onClick={() => push(null)}>Add more wish</Button>
            </div>
          
          </>}
        </FieldArray>
        <FieldError name="wishlist" />
      </div>
      
      <div style={{ padding: '8px' }}>
        <Checkbox label="Are you sure" name="sure" />
      </div>

      <div style={{ padding: '8px' }}>
        <FormError />
      </div>

      <div style={{ padding: '8px' }}>
        <ResetButton />
        <SubmitButton disablePristine={false} style={{ marginLeft: '4px' }} />
      </div>

    </Form>

  </div>;
}

export default FormExample;