interface MutableObject<T> {
  cleanup: () => void;
  instance: T;
}

function useInstance<T, P extends any[]>(
  constructor?: new (...args: P) => T,
  ...args: P
) {

  const obj = useRef<MutableObject<T>>();

  if (obj.current === null) {
    obj.current = {
      cleanup: () => () => { obj.current = null; },
      instance: constructor === undefined ? Object() : new constructor(...args)
    };
  }

  useEffect(obj.current.cleanup, []);

  return obj.current.instance;
}

export default useInstance;