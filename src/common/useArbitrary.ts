interface UseArbitraryHook<T> {
  clear: () => () => void;
  arbitrary: T;
}

function useArbitrary<T = Record<string, any>>() {

  const obj = useRef<UseArbitraryHook<T>>();

  if (obj.current === null) {
    obj.current = {
      clear: () => () => { obj.current = null; },
      // @ts-ignore
      arbitrary: {}
    };
  }

  useEffect(obj.current.clear, []);

  return obj.current.arbitrary;
}

export default useArbitrary;