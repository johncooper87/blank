interface UseArbitraryHook<T> {
  cleanup: () => () => void;
  arbitrary: T;
}

function useArbitrary<T extends Record<string, any>>() {

  const obj = useRef<UseArbitraryHook<T>>();

  if (obj.current === null) {
    obj.current = {
      cleanup: () => () => { obj.current = null; },
      arbitrary: Object()
    };
  }

  useEffect(obj.current.cleanup, []);

  return obj.current.arbitrary;
}

export default useArbitrary;

import useInstance from './useInstance'

class Class1 {
  arg1: string;
  arg2: number;
  constructor(arg1: string, arg2: number) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }
}