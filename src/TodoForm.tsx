import { internalStore, useCustomStore, State } from "./store";

const TodoForm = () => {
  const {currentTodo, currentRank} = useCustomStore(['currentTodo', 'currentRank'] as unknown as keyof State[]);
  
  return (
    <div className="item">
      <form>
        <input
          type="text"
          placeholder="ToDo name"
          value={currentTodo}
          onChange={(event: any) =>
            internalStore.setPartial({ currentTodo: event.target.value })
          }
        />
        <select
          name="todoRank"
          id="todoRank"
          value={currentRank}
          onChange={(event: any) =>
            internalStore.setPartial({ currentRank: event.target.value })
          }
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="button" disabled={!currentTodo || !currentRank} onClick={() => internalStore.addTodo()}>Add ToDo</button>
      </form>
    </div>
  );
};

export default TodoForm;
