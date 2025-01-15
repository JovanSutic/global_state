import { useSyncExternalStore } from "react";

interface ToDo {
  id?: number;
  text: string;
  rank: string;
}

interface State {
  todos: ToDo[];
  currentTodo: string;
  currentRank: string;
}

interface Store {
  state: State;
  listeners: Set<() => void>;
  addTodo: () => void;
  getState: () => State;
  setPartial: (partial: Record<string, any>) => void;
  setState: (newState: State) => void;
  subscribe: (listener: () => void) => () => void;
}

export const internalStore: Store = {
  state: {
    currentRank: "",
    currentTodo: "",
    todos: [],
  },
  listeners: new Set<() => void>(),
  getState() {
    return this.state;
  },
  addTodo() {
    const newId =
      (this.state.todos?.[this.state.todos?.length - 1]?.id || 0) + 1;
    const newState = {
      ...this.state,
      currentRank: "",
      currentTodo: "",
      todos: [
        ...this.state.todos,
        {
          id: newId,
          text: this.state.currentTodo,
          rank: this.state.currentRank,
        },
      ],
    };
    this.setState(newState);
  },
  setPartial(partial: Record<keyof Store, any>) {
    const newState = { ...this.state, ...partial };
    this.setState(newState);
  },
  setState(newState: State) {
    this.state = newState;
    this.listeners.forEach((listener: () => void) => listener()); // Notify listeners
  },
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // Unsubscribe when the component unmounts
  },
};

export function useCustomStore() {
  const getSnapshot = () => internalStore.getState();
  const subscribe = (callback: () => void) => internalStore.subscribe(callback);

  return useSyncExternalStore(subscribe, getSnapshot);
}
