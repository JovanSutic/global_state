import { store, useCustomStore, State } from "./store";

const TodoForm = () => {
  const { currentTodo, currentRank } = useCustomStore<State>([
    "currentTodo",
    "currentRank",
  ]);

  return (
    <div className="item">
      <form>
        <input
          type="text"
          placeholder="ToDo name"
          value={currentTodo}
          onChange={(event: any) =>
            store!.setState("currentTodo", (state: State) => ({
              ...state,
              currentTodo: event.target.value,
            }))
          }
        />
        <select
          name="todoRank"
          id="todoRank"
          value={currentRank}
          onChange={(event: any) =>
            store!.setState("currentRank", (state: State) => ({
              ...state,
              currentRank: event.target.value,
            }))
          }
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button
          type="button"
          disabled={!currentTodo || !currentRank}
          onClick={() =>
            store!.setState(
              ["currentRank", "currentTodo", "todos"],
              (state: State) => ({
                ...state,
                currentTodo: "",
                currentRank: "",
                todos: [
                  ...state.todos,
                  {
                    id: state.todos.length + 1,
                    text: state.currentTodo,
                    rank: state.currentRank,
                  },
                ],
              })
            )
          }
        >
          Add ToDo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
