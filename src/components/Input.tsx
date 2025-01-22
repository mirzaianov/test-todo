import clsx from 'clsx';

import { useState } from 'react';

import { Todos } from '../types/types';

import styles from './Input.module.css';

type InputProps = {
  todos: Todos;
  setTodos: (value: Todos) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export default function Input({
  todos,
  setTodos,
  isExpanded,
  setIsExpanded,
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
          text,
          completed: false,
        },
      ]);
    }

    setInputValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick(inputValue);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={clsx(
          styles.btn,
          styles.dropdownBtn,
          isExpanded && styles.dropdownBtnExpanded,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>❯</div>
      </button>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        autoFocus
      />
      {inputValue && (
        <button
          className={clsx(styles.btn, styles.addBtn)}
          onClick={() => handleClick(inputValue)}
        >
          <span>+</span>
        </button>
      )}
    </div>
  );
}
