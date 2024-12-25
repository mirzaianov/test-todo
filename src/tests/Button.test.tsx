import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type Filter } from '../types/types';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';
import styles from '../components/Button.module.css';

type ButtonProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filterType: Filter;
  text: string;
};

describe('Button', () => {
  const spySetFilter = vi.fn();

  const defaultProps: ButtonProps = {
    filter: 'all',
    setFilter: spySetFilter,
    filterType: 'all',
    text: 'All',
  };

  // Rendering test
  it('should render a button with the correct text', () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('All');
  });

  // Click event test
  it('should call `setFilter` with the correct `filterType`', async () => {
    const user = userEvent.setup();

    render(
      <Button
        {...defaultProps}
        filterType="active"
      />,
    );
    await user.click(screen.getByRole('button'));
    expect(spySetFilter).toHaveBeenCalledTimes(1);
    expect(spySetFilter).toHaveBeenCalledWith('active');
  });

  // btnActive style test - Active
  it('should have `btnActive` style when the `filter` matches the `filterType`', () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button.className).includes(styles.btnActive);
  });

  // btnActive style test - Inactive
  it('should not have `btnActive` style when the `filter` and the `filterType` differ', () => {
    render(
      <Button
        {...defaultProps}
        filter="completed"
      />,
    );

    const button = screen.getByRole('button');

    expect(button.className).not.includes(styles.btnActive);
  });
});
