import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Status from '../components/Status';

import { type StatusProps } from '../types/types';

describe('Status', () => {
  const spySetFilter = vi.fn();
  const spyClearCompleted = vi.fn();

  const defaultProps: StatusProps = {
    activeTodos: [],
    filter: 'all',
    setFilter: spySetFilter,
    clearCompleted: spyClearCompleted,
  };

  //Rendering test - No active todos
  it('should render `Items completed` when there are no active todos', () => {
    render(<Status {...defaultProps} />);
    expect(screen.getByText('Items completed')).toBeInTheDocument();
  });

  //Rendering test - One active todo
  it('should render `1 item left` when there is one active todo', () => {
    render(
      <Status
        {...defaultProps}
        activeTodos={[{ id: 1, text: 'Test Todo', completed: false }]}
      />,
    );
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  //Rendering test - Multiple active todos
  it('should render the correct number of active todos', () => {
    render(
      <Status
        {...defaultProps}
        activeTodos={[
          { id: 1, text: 'Test Todo 1', completed: false },
          { id: 2, text: 'Test Todo 2', completed: false },
        ]}
      />,
    );
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });

  // Click event test - All button
  it('should call `setFilter` with `all` when `All` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Status {...defaultProps} />);
    await user.click(screen.getByText('All'));
    expect(spySetFilter).toHaveBeenCalledWith('all');
  });

  // Click event test - Active button
  it('should call `setFilter` with `active` when `Active` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Status {...defaultProps} />);
    await user.click(screen.getByText('Active'));
    expect(spySetFilter).toHaveBeenCalledWith('active');
  });

  // Click event test - Completed button
  it('should call `setFilter` with `completed` when `Completed` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Status {...defaultProps} />);
    await user.click(screen.getByText('Completed'));
    expect(spySetFilter).toHaveBeenCalledWith('completed');
  });

  // Click event test - Clear completed button
  it('should call `clearCompleted` when `Clear completed` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Status {...defaultProps} />);
    await user.click(screen.getByText('Clear completed'));
    expect(spyClearCompleted).toHaveBeenCalled();
  });
});
