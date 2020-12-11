import shallowEqual from './deepEqual';

interface InstanceHook<T, P extends any[]> {
  cleanup: () => () => void;
  ctor: new (...args: P) => T;
  params: P;
  instance: T;
}

function useInstance<T extends Object = Record<string, any>, P extends any[] = undefined>(
  ctor?: new (...args: P) => T,
  params?: P
) {

  const obj = useRef<InstanceHook<T, P>>();

  if (obj.current == null) {
    obj.current = {
      cleanup() {
        return () => { obj.current = null; }
      },
      ctor,
      params,
      instance: ctor === undefined ? Object() : new ctor(...params)
    };
  }

  const current = obj.current;

  if (
    current.ctor !== ctor
    || !shallowEqual(current.params, params)
  ) {
    current.ctor = ctor;
    current.params = params;
    current.instance = ctor === undefined ? Object() : new ctor(...params);
  }

  useEffect(current.cleanup, []);

  return current.instance;
}

export default useInstance;