import { FieldState, FieldSubscription, FormApi, Unsubscribe, FieldValidator } from 'final-form';

export type ChangeCallback<T> = (nextState: FieldState<T>, prevState: FieldState<T>) => void;

class FieldSubscriber<T> {

  form: FormApi;
  name: string;
  subscription: FieldSubscription;
  validate: FieldValidator<T>;
  unsubscribe: Unsubscribe;
  state: FieldState<T> = Object();
  onChange: (value: T) => void;
  
  setValue(value: T) {
    const { form, name } = this;
    form.change(name, value);
  }

  getState() {
    const { form, name } = this;
    return form.getFieldState(name);
  }

  invokeChangeCallback(nextState: FieldState<T>) {
    const { state, onChange } = this;
    onChange(node, nextState, state);
    this.state = nextState;
  }

  subscribe(form: FormApi, name: string, onChange, subscription: FieldSubscription, validate: FieldValidator<T>) {
    this.state = Object();
    this.onChange = onChange;
    this.form = form;
    this.name = name;
    this.subscription = subscription;
    this.validate = validate;
    this.unsubscribe = form.registerField(name, this.invokeChangeCallback, subscription, { getValidator: () => validate });
    return this.unsubscribe;
  }
}

export default FieldSubscriber;
