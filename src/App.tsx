import React from "react";
import "./App.css";
import Hero from "./Hero";
import List from "./List";
import TodoForm from "./TodoForm";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
