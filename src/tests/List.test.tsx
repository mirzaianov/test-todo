import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import List from '../components/List';

import { type ListProps } from '../types/types';

import styles from '../components/List.module.css';

describe('List', () => {
  const spyToggleTodo = vi.fn();

  const defaultProps: ListProps = {
    isExpanded: true,
    filteredTodos: [],
    toggleTodo: spyToggleTodo,
  };

  // Initial rendering test
  it('should be accessible but empty', () => {
    render(<List {...defaultProps} />);

    const listElement = screen.getByRole('list');

    expect(listElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(0);
  });

  // .Todos rendering test
  it('should render the correct number of passed in todos', () => {
    render(
      <List
        {...defaultProps}
        filteredTodos={[
          { id: 1, text: 'Test Todo', completed: false },
          { id: 2, text: 'Test Todo', completed: true },
        ]}
      />,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  // Toggle event test
  it('should call `toggleTodo` when a todo is clicked', async () => {
    const user = userEvent.setup();

    render(
      <List
        {...defaultProps}
        filteredTodos={[
          { id: 1, text: 'Test Todo 1', completed: false },
          { id: 2, text: 'Test Todo 2', completed: true },
        ]}
      />,
    );
    await user.click(screen.getAllByRole('checkbox')[0]);
    expect(spyToggleTodo).toHaveBeenCalledWith(1);
  });

  // Checkbox test
  it('should have a todo with the correct checked state', () => {
    render(
      <List
        {...defaultProps}
        filteredTodos={[
          { id: 1, text: 'Test Todo 1', completed: false },
          { id: 2, text: 'Test Todo 2', completed: true },
        ]}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  // Style test
  it('should have a todo with the correct text style', () => {
    const { container } = render(
      <List
        {...defaultProps}
        filteredTodos={[
          { id: 1, text: 'Test Todo 1', completed: false },
          { id: 2, text: 'Test Todo 2', completed: true },
        ]}
      />,
    );

    const spans = container.querySelectorAll('span');

    expect(spans[0]).not.toHaveClass(styles.textCompleted);
    expect(spans[1]).toHaveClass(styles.textCompleted);
  });

  // Expanded class test - Expanded
  it('should have the `wrapperExpanded` class when `isExpanded` is true', () => {
    const { container } = render(<List {...defaultProps} />);
    const firstElement = container.firstElementChild;

    expect(firstElement).toHaveClass(styles.wrapperExpanded);
  });

  // Expanded class test - Collapsed
  it('should not have the `wrapperExpanded` class when `isExpanded` is false', () => {
    const { container } = render(
      <List
        {...defaultProps}
        isExpanded={false}
      />,
    );
    const firstElement = container.firstElementChild;

    expect(firstElement).not.toHaveClass(styles.wrapperExpanded);
  });
});
