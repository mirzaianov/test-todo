import clsx from 'clsx';

import { type Filter } from '../types/types';

import styles from './Button.module.css';

type ButtonProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filterType: Filter;
  text: string;
};

export default function Button({
  filter,
  setFilter,
  filterType,
  text,
}: ButtonProps) {
  return (
    <button
      className={clsx('btn', filter === filterType && styles.btnActive)}
      onClick={() => setFilter(filterType)}
    >
      {text}
    </button>
  );
}
