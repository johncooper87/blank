import { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles1 from './styles1.css';
import { addLocale, useLocale } from 'ttag';

// async function switchLang(lang: string) {
//   if (lang === 'ru') {
//     const locale = await import('./i18n/ru.po');
//     console.log(locale.default);
//     addLocale(lang, locale.default);
//     useLocale(lang);
//   }
//   if (lang === 'en') {
//     useLocale(lang);
//   }
//   window.location.reload();
// }


// const Comp1 = lazy(() => import('./Comp1'));

function validateName(value) {
  if (!value) return 'Is required';
  if (value.length < 3) return 'Should be no less then 3 symbols';
}

function validateGender(value: string) {
  if (!value) return 'You must explicitly specify gender';
}

function validateBadHabbits(values: string[]) {
  if (values?.length >= 1) return;
  return 'You must choose at least 1 bad habbit';
}

function validateWishlist(values) {
  if (!values) return;
  const wishes = new Map<string, number>();
  let errors = [];
  if (values?.length < 3) errors[ARRAY_ERROR] = 'You must specify at least 3 wishes';
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (!wishes.has(value)) wishes.set(value, i);
    else {
      errors[i] = 'Dublicate wish';
      errors[wishes.get(value)] = 'Dublicate wish';
    }
  }
  return errors;
}

const _initialValues = {
  lastname: 'Cooper',
  wishlist: ['eat', 'eat']
}

function logValues(values) {
  console.log(values);
}

function App() {

  console.log('App');

  // const [showComp1, setShowComp1] = useState(false);
  // const [clickCount, setClickCount] = useState(0);

  const [initialValues, setInitialValues] = useState(_initialValues);
  const onSubmit = (values) => {
    logValues(values);
    setInitialValues(values);
  };

  return <div className={styles1.root1}>
    {/* <div>
      <button onClick={() => switchLang('ru')}>ru</button>
      <button onClick={() => switchLang('en')}>en</button>
    </div>
    {t`Hello World!`}
    <div>
      <button onClick={() => setShowComp1(show => !show)}>{t`show comp1`}</button>
    </div>
    <div>
      <button onClick={() => setClickCount(count => count + 1)}>{t`increase click count`}</button>
      <div>{ngettext(msgid`${clickCount} click`, `${clickCount} clicks`, clickCount)}</div>
    </div>
    <Suspense fallback={<div>{t`loading ...`}</div>}>
      {showComp1 && <Comp1 />}
    </Suspense> */}

    <div>

      <Form onSubmit={onSubmit} initialValues={initialValues}>
          
            <div style={{ padding: '8px' }}>
              <TextField label="Firstname*" name="firstname" validate={validateName} />
              <TextField label="Lastname*" name="lastname" validate={validateName} />
            </div>          

            <div style={{ padding: '8px' }}>
              Gender*:
              <Field name="gender" validate={validateGender}>
                <Radio label="Male" value="male" />
                <Radio label="Female" value="female" />
                <FieldError />
              </Field>
            </div>

            <div style={{ padding: '8px' }}>
              <div>Bad habbits:</div>
              <Field name="badHabbits" validate={validateBadHabbits}>
                <Checkbox label="Alcohol" value="alcohol" />
                <Checkbox label="Smoking" value="smoking" />
                <Checkbox label="I like to rock'n'roll" value="i like to rock'n'roll" />
                <FieldError />
              </Field>
            </div>

            <div style={{ padding: '8px' }}>
              <div>Wishlist:</div>
              <FieldArray<string> name="wishlist" validate={validateWishlist}>
                {({ map, push, remove }) => <>
                
                  {map(
                    (name, index) => <div key={name} style={{ padding: '4px' }}>
                      <TextField label={'wish ' + index} name={name} />
                      <button onClick={() => remove(index)}>Delete</button>
                    </div>
                  )}

                  <div style={{ padding: '6px' }}>
                    <button onClick={() => push(null)}>Add more wish</button>
                  </div>
                
                </>}
              </FieldArray>
              <FieldError name="wishlist" />
            </div>
            
            <div style={{ padding: '8px' }}>
              <Checkbox label="Are you sure" name="sure" />
            </div>

            <div style={{ padding: '8px' }}>
              <ResetButton />
              <SubmitButton disablePristine={true} />
            </div>

      </Form>

    </div>

  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);