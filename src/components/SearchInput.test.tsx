// @vitest-environment jsdom
import { render, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SearchInput } from './SearchInput';
import { AAPL, AMZN, DIS, WMT } from '../__test__/fixtures';

describe('tests createTransform function', () => {
  const basePositions = [AAPL, AMZN, DIS, WMT];
  const handleChange = vi.fn();
  const { getByTestId } = render(
    <SearchInput positions={basePositions} setFilteredPositions={handleChange} />,
  );
  const input = getByTestId('search-input');

  beforeEach(() => {
    handleChange.mockReset();
  })

  test('renders an input field', () => {
    expect(input).toBeInstanceOf(HTMLInputElement);
    fireEvent.change(input, { target: { value: 'foo' } });
  });

  test('updates positions accordingly', () => {
    fireEvent.change(input, { target: { value: 'AMZ' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([AMZN]);

    fireEvent.change(input, { target: { value: 'snEy' } });
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith([DIS]);

    fireEvent.change(input, { target: { value: ' ' } });
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith(basePositions);
  });

  test('keeps original positions intact', () => {
    fireEvent.change(input, { target: { value: 'AMZ' } });
    expect(basePositions.length).toEqual(4);

    fireEvent.change(input, { target: { value: ' ' } });
    expect(basePositions.length).toEqual(4);
  });
});
