import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../components/Input';

import { type InputProps } from '../types/types';

describe('Input', () => {
  const defaultProps: InputProps = {
    todos: [],
    setTodos: vi.fn(),
    isExpanded: true,
    setIsExpanded: vi.fn(),
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
    const spySetIsExpanded = vi.fn(() => {
      defaultProps.isExpanded = !defaultProps.isExpanded;
    });

    render(
      <Input
        {...defaultProps}
        setIsExpanded={spySetIsExpanded}
      />,
    );
    await user.click(screen.getByText('❯'));
    expect(spySetIsExpanded).toHaveBeenCalledWith(false);
  });

  // Enter key press event test
  it('should call `setTodos` when the `Enter` key is pressed', async () => {
    const user = userEvent.setup();
    const spySetTodos = vi.fn();

    render(
      <Input
        {...defaultProps}
        setTodos={spySetTodos}
      />,
    );

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
    const spySetTodos = vi.fn();

    render(
      <Input
        {...defaultProps}
        setTodos={spySetTodos}
      />,
    );

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

  // Enter key press event test - Empty input
  it('should not add todo when input is empty', async () => {
    const user = userEvent.setup();
    const spySetTodos = vi.fn();

    render(
      <Input
        {...defaultProps}
        setTodos={spySetTodos}
      />,
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '{Enter}');

    expect(spySetTodos).not.toHaveBeenCalled();
  });

  // Enter key press event test - Input contains only whitespace
  it('should not add todo when input contains only whitespace', async () => {
    const user = userEvent.setup();
    const spySetTodos = vi.fn();

    render(
      <Input
        {...defaultProps}
        setTodos={spySetTodos}
      />,
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '   ');
    await user.keyboard('{Enter}');

    expect(spySetTodos).not.toHaveBeenCalled();
  });

  // ID generation test
  it('should generate correct ID for non-empty todos array', async () => {
    const user = userEvent.setup();
    const spySetTodos = vi.fn();
    const existingTodos = [
      { id: 1, text: 'First', completed: false },
      { id: 5, text: 'Second', completed: false }, // Non-sequential ID
    ];

    render(
      <Input
        {...defaultProps}
        todos={existingTodos}
        setTodos={spySetTodos}
      />,
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New todo');
    await user.keyboard('{Enter}');

    expect(spySetTodos).toHaveBeenCalledWith([
      ...existingTodos,
      { id: 6, text: 'New todo', completed: false },
    ]);
  });
});
