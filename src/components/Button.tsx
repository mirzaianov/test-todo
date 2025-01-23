import clsx from 'clsx';

import { type ButtonProps } from '../types/types';

import styles from './Button.module.css';

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
