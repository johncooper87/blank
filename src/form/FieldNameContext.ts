export const FieldNameContext = React.createContext<string>(null);

export function useFeildNameContext(name?: string) {
  const providedName = React.useContext(FieldNameContext);
  return providedName && name
    ? providedName + '.' + name
    : providedName || name;
}