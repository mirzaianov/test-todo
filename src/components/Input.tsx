import clsx from 'clsx';

import styles from './Input.module.css';

type InputProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  addTodo: (value: string) => void;
};

export default function Input({
  isExpanded,
  setIsExpanded,
  inputValue,
  setInputValue,
  addTodo,
}: InputProps) {
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
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo(inputValue)}
        placeholder="What needs to be done?"
        autoFocus
      />
      {inputValue && (
        <button
          className={clsx(styles.btn, styles.addBtn)}
          onClick={() => addTodo(inputValue)}
        >
          <span>+</span>
        </button>
      )}
    </div>
  );
}
