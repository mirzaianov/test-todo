import clsx from 'clsx';

import { type Todo, type Todos } from '../types/types';

import styles from './List.module.css';

type ListProps = {
  isExpanded: boolean;
  filteredTodos: Todos;
  toggleTodo: (id: number) => void;
};

export default function List({
  isExpanded,
  filteredTodos,
  toggleTodo,
}: ListProps) {
  return (
    <div className={clsx(styles.wrapper, isExpanded && styles.wrapperExpanded)}>
      <div className={clsx(styles.list)}>
        {filteredTodos.map((todo: Todo) => (
          <div
            key={todo.id}
            className={styles.item}
          >
            <label className={styles.checkbox}>
              <input
                className={styles.input}
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={styles.check}></span>
            </label>
            <span
              className={clsx(
                styles.text,
                todo.completed && styles.textCompleted,
              )}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
