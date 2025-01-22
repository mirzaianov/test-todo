import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input';

type InputProps = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  addTodo: (text: string) => void;
};

describe('Input', () => {
  const spySetIsExpanded = vi.fn(() => {
    defaultProps.isExpanded = !defaultProps.isExpanded;
  });
  const spySetInputValue = vi.fn((value) => {
    defaultProps.inputValue = value;
  });
  const spyAddTodo = vi.fn();

  const defaultProps: InputProps = {
    isExpanded: true,
    setIsExpanded: spySetIsExpanded,
    inputValue: '',
    setInputValue: spySetInputValue,
    addTodo: spyAddTodo,
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
    expect(spySetInputValue).toHaveBeenCalledWith('Buy milk');
  });

  // Add button rendering test - Visible
  // it('should render the `Add` button', async () => {
  //   const user = userEvent.setup();

  //   render(<Input {...defaultProps} />);

  //   const input = screen.getByPlaceholderText('What needs to be done?');

  //   await user.type(input, 'New Todo 2');

  //   expect(screen.getByText('+')).toBeInTheDocument();
  // });

  // Click event test - Dropdown button
  it('should call `setIsExpanded` when the `Dropdown` button is clicked', async () => {
    const user = userEvent.setup();

    render(<Input {...defaultProps} />);
    await user.click(screen.getByText('❯'));
    expect(spySetIsExpanded).toHaveBeenCalledWith(false);
  });

  // Enter key press event test
  it('should call `addTodo` on the `Enter key` press', async () => {
    const user = userEvent.setup();

    render(
      <Input
        {...defaultProps}
        inputValue="New Todo"
      />,
    );
    await user.keyboard('{Enter}');
    expect(spyAddTodo).toHaveBeenCalledWith('New Todo');
  });

  // Click event test - Add button
  it('should call `addTodo` when the `Add` button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Input
        {...defaultProps}
        inputValue="New Todo"
      />,
    );
    await user.click(screen.getByText('+'));
    expect(spyAddTodo).toHaveBeenCalledWith('New Todo');
  });
});
