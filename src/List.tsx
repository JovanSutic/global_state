import { useCustomStore } from "small-store-lib";
import { State } from "./store.types";

const List = () => {
  const { todos } = useCustomStore<State>(["todos"]);
  
  return (
    <div className="item">
      {!todos.length && (
        <p>
          Currently there are no saved ToDo's. Please use the form on the side
          to create ToDo's.
        </p>
      )}
      {todos.map((item) => (
        <div key={item.id} className="todo">
          <p>{item.text}</p>
          <p className="rank">{`Rank: ${item.rank}`}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
