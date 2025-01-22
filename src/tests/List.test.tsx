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
  it('should render the list', () => {
    render(<List {...defaultProps} />);

    const listElement = screen.getByRole('list');

    expect(listElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(0);
  });
});
