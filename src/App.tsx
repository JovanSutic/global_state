import React, { useEffect, useState } from "react";
import "./App.css";
import Hero from "./Hero";
import List from "./List";
import TodoForm from "./TodoForm";
import { initializeStore, store, State } from "./store";

function App() {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (!store) {
      initializeStore<State>({
        todos: [],
        currentTodo: "",
        currentRank: "",
      });
    } else {
      setReady(true);
    }
  }, [store]);

  return (
    <div className="App">
      {ready && (
        <main>
          <Hero
            title="ToDo"
            text="This is the the ToDo application that we are using for testing React's
          internal hooks that facilitate global state management flow."
          />

          <section className="container">
            <List />
            <TodoForm />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
