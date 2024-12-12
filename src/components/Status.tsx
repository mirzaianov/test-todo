import { type Todos, type Filter } from '../types/types';

import Button from './Button';

import styles from './Status.module.css';

type StatusProps = {
  activeTodos: Todos;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

export default function Status({
  activeTodos,
  filter,
  setFilter,
  clearCompleted,
}: StatusProps) {
  return (
    <div className={styles.status}>
      <span className={styles.items}>
        {activeTodos.length === 1
          ? '1 item left'
          : `${activeTodos.length} items left`}
      </span>
      <div className={styles.filters}>
        <Button
          filter={filter}
          setFilter={setFilter}
          filterType="all"
          text="All"
        />
        <Button
          filter={filter}
          setFilter={setFilter}
          filterType="active"
          text="Active"
        />
        <Button
          filter={filter}
          setFilter={setFilter}
          filterType="completed"
          text="Completed"
        />
      </div>
      <button
        className="btn"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}
