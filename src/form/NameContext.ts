export const NameContext = React.createContext<string>(null);

export function useNameContext(name?: string) {
  const providedName = React.useContext(NameContext);
  return providedName && name
    ? providedName + '.' + name
    : providedName || name;
}