import { useCustomStore } from "./store";

const List = () => {
  const store = useCustomStore();
  return (
    <div className="item">
      {!store.todos.length && (
        <p>
          Currently there are no saved ToDo's. Please use the form on the side
          to create ToDo's.
        </p>
      )}
      {store.todos.map((item) => (
        <div key={item.id} className="todo">
          <p>{item.text}</p>
          <p className="rank">{`Rank: ${item.rank}`}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
