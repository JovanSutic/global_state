

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
