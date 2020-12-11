import { useEffect } from 'react';
import deepEqual from './deepEqual';
import useInstance from './useInstance';

type Unsubscribe = () => void;
type Subscribe<T extends any[]> = (...args: T) => Unsubscribe;

function useSubscribe<T extends any[]>(subscribe: Subscribe<T>, params?: T) {

  const arbitrary = useInstance();

  if (arbitrary.cleanup === undefined) {
    arbitrary.invokeUnsubscribe = () => {
      if (arbitrary.unsubscribe != null) arbitrary.unsubscribe();
    }
    arbitrary.cleanup = () => arbitrary.invokeUnsubscribe
  }

  if (!deepEqual(arbitrary.params, params, 1)) {
    arbitrary.invokeUnsubscribe();
    arbitrary.unsubscribe = subscribe(...params);
  }

  arbitrary.params = params;

  useEffect(arbitrary.cleanup, []);
}

export default useSubscribe;