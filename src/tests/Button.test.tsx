import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../components/Button';

import { type ButtonProps } from '../types/types';

import styles from '../components/Button.module.css';

describe('Button', () => {
  const defaultProps: ButtonProps = {
    filter: 'all',
    setFilter: vi.fn(),
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
    const spySetFilter = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        {...defaultProps}
        setFilter={spySetFilter}
        filterType="active"
      />,
    );
    await user.click(screen.getByRole('button'));
    expect(spySetFilter).toHaveBeenCalledTimes(1);
    expect(spySetFilter).toHaveBeenCalledWith('active');
  });

  // btnActive style test - Active
  it('should have `btnActive` style when `filter` matches `filterType`', () => {
    render(
      <Button
        {...defaultProps}
        filter="completed"
        filterType="completed"
      />,
    );

    const button = screen.getByRole('button');

    expect(button.className).includes(styles.btnActive);
  });

  // btnActive style test - Inactive
  it('should not have `btnActive` style when `filter` and `filterType` differ', () => {
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
