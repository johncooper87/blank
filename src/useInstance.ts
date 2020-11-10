interface MutableObject<T = any> {
  effect: () => void;
  value: T | Record<string, any>;
}

function useInstance<T, P extends any[]>(
  constructor?: new (...args: P) => T,
  ...args: P
) {

  const obj = useRef<MutableObject<T>>();

  if (obj.current === null) {

    const clear = () => {
      obj.current = null;
    };

    obj.current = {

      effect: () => {
        return clear;
      },

      value: constructor === undefined ? {} : new constructor(...args)
      
    };
  }

  useEffect(obj.current.effect, []);

  return obj.current.value;
}

export default useInstance;