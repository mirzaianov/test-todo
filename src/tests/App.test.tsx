import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import styles from '../components/List.module.css';

// App initially renders 3 todos as in the test task

describe('App', () => {
  // Header rendering test
  it('should render the heading', () => {
    render(<App />);
    expect(screen.getByText(/todos/i)).toBeInTheDocument();
  });

  // Input component rendering test
  it('should render `Input` component', () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText('What needs to be done?'),
    ).toBeInTheDocument();
  });

  // List component rendering test
  it('should render `List` component', () => {
    render(<App />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(3);
  });

  // Status component rendering test
  it('should render `Status` component', () => {
    render(<App />);

    const allFilterButton = screen.getByRole('button', { name: /^All$/ });
    const activeFilterButton = screen.getByRole('button', { name: /^Active$/ });
    const completedFilter = screen.getByRole('button', { name: /^Completed$/ });

    expect(allFilterButton).toBeInTheDocument();
    expect(activeFilterButton).toBeInTheDocument();
    expect(completedFilter).toBeInTheDocument();
  });

  // New todo rendering test - Enter key
  it('should add new todo on `Enter` key press', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Buy milk');
    await user.keyboard('{Enter}');
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  // New todo rendering test - Add button
  it('should add new todo on clicking the `Add` button', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Buy chocolate');

    const button = screen.getByText('+');

    await user.click(button);
    expect(screen.getByText('Buy chocolate')).toBeInTheDocument();
  });

  // Filter test - Active todos
  it('should show only active todos when `Active` filter selected', async () => {
    const user = userEvent.setup();

    render(<App />);

    const activeFilter = screen.getByRole('button', { name: /^Active$/i });

    await user.click(activeFilter);

    const completedTodos = screen.queryAllByRole('checkbox', { checked: true });

    expect(completedTodos).toHaveLength(0);
  });

  // Filter test - Completed todos
  it('should show only completed todos when `Completed` filter selected', async () => {
    const user = userEvent.setup();

    render(<App />);

    const completedFilter = screen.getByRole('button', { name: /^Completed$/ });

    await user.click(completedFilter);

    const activeTodos = screen.queryAllByRole('checkbox', { checked: false });

    expect(activeTodos).toHaveLength(0);
  });

  // Delete test - Clear completed
  it('should clear completed todos when `Clear completed` button clicked', async () => {
    render(<App />);

    const clearButton = screen.getByRole('button', {
      name: /^Clear completed/,
    });

    await userEvent.click(clearButton);

    const completedTodos = screen.queryAllByRole('checkbox', { checked: true });

    expect(completedTodos).toHaveLength(0);
  });

  // Dropdown test
  it('should toggle todo list visibility when `Dropdown` button is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    const button = screen.getByText('❯');
    const wrapper = screen.getByTestId('list-wrapper');

    expect(wrapper).toHaveClass(styles.listWrapperExpanded);
    await user.click(button);
    expect(wrapper).not.toHaveClass(styles.listWrapperExpanded);
  });

  // Checkbox test
  it('should toggle todo completion status when checkbox is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);
    const checkboxes = screen.getAllByRole('checkbox');

    // The second checkbox is checked by default
    expect(checkboxes[1]).toBeChecked();
    await user.click(checkboxes[1]);
    expect(checkboxes[1]).not.toBeChecked();
  });
});
