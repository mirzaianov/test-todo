import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type Todos, type Filter } from '../types/types';
import userEvent from '@testing-library/user-event';
import Status from '../components/Status';

describe('Status', () => {
  const mockSetFilter = vi.fn();
  const mockClearCompleted = vi.fn();

  const renderComponent = (activeTodos: Todos, filter: Filter) => {
    render(
      <Status
        activeTodos={activeTodos}
        filter={filter}
        setFilter={mockSetFilter}
        clearCompleted={mockClearCompleted}
      />,
    );
  };

  //Rendering test - No active todos
  it('should render `Items completed` when there are no active todos', () => {
    renderComponent([], 'all');
    expect(screen.getByText('Items completed')).toBeInTheDocument();
  });

  //Rendering test - One active todo
  it('should render `1 item left` when there is one active todo', () => {
    renderComponent([{ id: 1, text: 'Test Todo', completed: false }], 'all');
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  //Rendering test - Multiple active todos
  it('should render the correct number of active todos', () => {
    renderComponent(
      [
        { id: 1, text: 'Test Todo 1', completed: false },
        { id: 2, text: 'Test Todo 2', completed: false },
      ],
      'all',
    );
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });

  // Click event test - All button
  it('should call `setFilter` with `all` when `All` button is clicked', async () => {
    const user = userEvent.setup();

    renderComponent([], 'all');
    await user.click(screen.getByText('All'));
    expect(mockSetFilter).toHaveBeenCalledWith('all');
  });

  // Click event test - Active button
  it('should call `setFilter` with `active` when `Active` button is clicked', async () => {
    const user = userEvent.setup();

    renderComponent([], 'all');
    await user.click(screen.getByText('Active'));
    expect(mockSetFilter).toHaveBeenCalledWith('active');
  });

  // Click event test - Completed button
  it('should call `setFilter` with `completed` when `Completed` button is clicked', async () => {
    const user = userEvent.setup();

    renderComponent([], 'all');
    await user.click(screen.getByText('Completed'));
    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  // Click event test - Clear completed button
  it('should call `clearCompleted` when `Clear completed` button is clicked', async () => {
    const user = userEvent.setup();

    renderComponent([], 'all');
    await user.click(screen.getByText('Clear completed'));
    expect(mockClearCompleted).toHaveBeenCalled();
  });
});
