import { useState } from 'react';
import { type Filter, type Todos } from './types/types';

import Input from './components/Input';
import List from './components/List';
import Status from './components/Status';
import { DATA } from '../data.ts';

import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState<Todos>(DATA);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>('all');

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;

    return true;
  });

  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>todos</h1>
      <div className={styles.content}>
        <Input
          todos={todos}
          setTodos={setTodos}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <List
          isExpanded={isExpanded}
          filteredTodos={filteredTodos}
          toggleTodo={toggleTodo}
        />
        {todos.length > 0 && (
          <Status
            activeTodos={activeTodos}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
      {todos.length > 0 && (
        <>
          <div className={styles.firstPageWrapper}>
            <div className={styles.pageFirst}></div>
          </div>
          <div className={styles.secondPageWrapper}>
            <div className={styles.pageSecond}></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
