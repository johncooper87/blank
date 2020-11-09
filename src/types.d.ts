declare type ReactNode = import('react').ReactNode;

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}