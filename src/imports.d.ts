declare const t: typeof import('ttag').t;
declare const jt: typeof import('ttag').jt;
declare const msgid: typeof import('ttag').msgid;
declare const ngettext: typeof import('ttag').ngettext;

declare const React: typeof import('react');
declare const memo: typeof import('react').memo;
declare const useState: typeof import('react').useState;
declare const useMemo: typeof import('react').useMemo;
declare const useCallback: typeof import('react').useCallback;
declare const useRef: typeof import('react').useRef;
declare const useEffect: typeof import('react').useEffect;
declare const ReactDOM: typeof import('react-dom');

declare const FORM_ERROR: typeof import('final-form').FORM_ERROR;
declare const ARRAY_ERROR: typeof import('final-form').ARRAY_ERROR;

declare const _history: typeof import('./services/routing')._history;

declare const useInstance: typeof import('./useInstance');

declare const Form: typeof import('./form/Form').default;
declare const SubmitButton: typeof import('./form/SubmitButton').default;
declare const ResetButton: typeof import('./form/ResetButton').default;
declare const Field: typeof import('./form/Field').default;
declare const TextField: typeof import('./form/inputs/TextField').default;
declare const Radio: typeof import('./form/inputs/Radio').default;
declare const Checkbox: typeof import('./form/inputs/Checkbox').default;
declare const FieldError: typeof import('./form/inputs/FieldError').default;
declare const FormError: typeof import('./form/FormError').default;
declare const FieldArray: typeof import('./form/FieldArray').default;