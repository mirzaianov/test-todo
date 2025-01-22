import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../components/Input';

import { type Todos } from '../types/types';

type InputProps = {
  todos: Todos;
  setTodos: (value: Todos) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

describe('Input', () => {
  const spySetIsExpanded = vi.fn(() => {
    defaultProps.isExpanded = !defaultProps.isExpanded;
  });
  const spySetTodos = vi.fn();

  const defaultProps: InputProps = {
    todos: [],
    setTodos: spySetTodos,
    isExpanded: true,
    setIsExpanded: spySetIsExpanded,
  };

  // Initial rendering test
  it('should render an input with a placeholder and the `Dropdown` button', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByText('❯')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('What needs to be done?'),
    ).toBeInTheDocument();
  });

  // Add button rendering test - Hidden
  it('should not render the `Add` button', () => {
    render(<Input {...defaultProps} />);
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  // Input change event test
  it('should change an input value when typed', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText('What needs to be done?');

    await user.type(input, 'Buy milk');
    expect(input).toHaveValue('Buy milk');
  });

  // Add button rendering test - Visible
  it('should render the `Add` button', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText('What needs to be done?');

    await user.type(input, 'Buy bread');
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  // Click event test - Dropdown button
  it('should call `setIsExpanded` when the `Dropdown` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);
    await user.click(screen.getByText('❯'));
    expect(spySetIsExpanded).toHaveBeenCalledWith(false);
  });

  // Enter key press event test
  it('should call `setTodos` when the `Enter` key is pressed', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Buy eggs');
    await user.keyboard('{Enter}');
    expect(spySetTodos).toHaveBeenCalledWith([
      { id: 1, text: 'Buy eggs', completed: false },
    ]);
    expect(input).toHaveValue('');
  });

  // Click event test - Add button
  it('should call `setTodos` when the `Add` key is pressed', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText('What needs to be done?');

    await user.type(input, 'Do homework');

    const button = screen.getByText('+');

    expect(screen.getByText('+')).toBeInTheDocument();
    await user.click(button);
    expect(spySetTodos).toHaveBeenCalledWith([
      { id: 1, text: 'Do homework', completed: false },
    ]);
    expect(input).toHaveValue('');
  });
});
