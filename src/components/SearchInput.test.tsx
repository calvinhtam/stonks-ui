// @vitest-environment jsdom
import { render, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SearchInput } from './SearchInput';

test('renders an input field', () => {
  // Render elements using React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
  const { getByTestId } = render(<SearchInput />);
  const input = getByTestId('search-input');
  expect(input).toBeInstanceOf(HTMLInputElement);

  // Dispatch a change event
  fireEvent.change(input, { target: { value: 'foo' } });
});

// Write your tests here
