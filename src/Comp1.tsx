import React from 'react';
import styles2 from './styles/styles2.scss';

function Comp1() {

  return <div className={styles2.some1}>
    {jt`Again!!!`}
    <div>{t`And again!`}</div>
  </div>;
}

export default Comp1;