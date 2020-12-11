declare interface Subscribable {
  subscribe: () => () => void;
  unsubscribe: () => void;
}