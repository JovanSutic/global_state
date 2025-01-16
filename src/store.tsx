import { useSyncExternalStore } from "react";

interface ToDo {
  id?: number;
  text: string;
  rank: string;
}

export interface State {
  todos: ToDo[];
  currentTodo: string;
  currentRank: string;
}

interface Store {
  state: State;
  subscribers: Record<keyof State, Function[]>;
  addTodo: () => void;
  getState: () => State;
  setPartial: (partial: Partial<State>) => void;
  setState: (part: keyof State | keyof State[], newState: State) => void;
  subscribe: (part: keyof State | keyof State[], subscriber: Function) => void;
  notifySubscribers: (part: keyof State | keyof State[]) => void;
}

export const internalStore: Store = {
  state: {
    currentRank: "",
    currentTodo: "",
    todos: [],
  },
  subscribers: {
    currentTodo: [],
    currentRank: [],
    todos: [],
  },
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
    this.setState(
      ["todos", "currentRank", "currentTodo"] as unknown as keyof State[],
      newState
    );
  },
  setPartial(partial: Partial<State>) {
    this.setState(Object.keys(partial) as unknown as keyof State[], {
      ...this.state,
      ...partial,
    });
  },
  setState(part: keyof State | keyof State[], newState: State) {
    this.state = newState;
    this.notifySubscribers(part);
  },
  subscribe(part: keyof State | keyof State[], subscriber: Function) {
    if (Array.isArray(part)) {
      part.forEach((p) => {
        this.subscribers[p as keyof State].push(subscriber);
      });
    } else {
      this.subscribers[part as keyof State].push(subscriber);
    }
  },

  notifySubscribers(part: keyof State | keyof State[]) {
    if (Array.isArray(part)) {
      part.forEach((p) => {
        this.subscribers[p as keyof State]?.forEach((subscriber) =>
          subscriber()
        );
      });
    } else {
      this.subscribers[part as keyof State]?.forEach((subscriber) =>
        subscriber()
      );
    }
  },
};

export function useCustomStore(part: keyof State | keyof State[]) {
  const getSnapshot = () => internalStore.getState();
  const subscribe = (callback: () => void) => {
    internalStore.subscribe(part, callback);
    return () => {
      if (Array.isArray(part)) {
        part.forEach((p) => {
          internalStore.subscribers[p as keyof State] =
            internalStore.subscribers[p as keyof State].filter(
              (sub) => sub !== callback
            );
        });
      } else {
        internalStore.subscribers[part as keyof State] =
          internalStore.subscribers[part as keyof State].filter(
            (sub) => sub !== callback
          );
      }
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}
