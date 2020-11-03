import { Router } from 'react-router';
//import styles1 from './styles1.css';
import './styles1.css';
import { addLocale, useLocale } from 'ttag';
import FormExample from './views/FormExample';
import QueryExample from './views/QueryExample';
import { useRouteMatch } from 'react-router-dom';
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

function App() {

  console.log('App');

  const isAdminPage = Boolean(useRouteMatch('/admin')).toString();

  // const [showComp1, setShowComp1] = useState(false);
  // const [clickCount, setClickCount] = useState(0);

  return <div className="root1">

    <div>
      <button onClick={() => _history.push('/admin')}>go admin page</button>
      <button onClick={() => _history.push('/')}>go home page</button>
    </div>
    <div>Is admin page: {isAdminPage}</div>



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

    <QueryExample />
    <FormExample />

  </div>;
}

ReactDOM.render(
  <Router history={_history}>
    <App />
  </Router>,
  document.getElementById('root')
);