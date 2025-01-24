import clsx from 'clsx';

import { type Todos, type StatusProps } from '../types/types';

import Button from './Button';

import styles from './Status.module.css';

function StatusView({ activeTodos }: { activeTodos: Todos }) {
  if (activeTodos.length === 0) {
    return <span>Items completed</span>;
  }

  if (activeTodos.length === 1) {
    return <span>1 item left</span>;
  }

  return <span>{`${activeTodos.length} items left`}</span>;
}

export default function Status({
  activeTodos,
  filter,
  setFilter,
  clearCompleted,
}: StatusProps) {
  return (
    <div className={styles.status}>
      <div className={styles.items}>
        <StatusView activeTodos={activeTodos} />
      </div>
      <div className={styles.filters}>
        <div className={styles.empty}></div>
        <div className={styles.buttons}>
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
        <div className={styles.empty}></div>
      </div>
      <div className={styles.clear}>
        <button
          className={clsx('btn', styles.btnClear)}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
