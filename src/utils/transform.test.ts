import { expect, test } from 'vitest';
import { createTransform } from './transform';

/* eslint-disable @typescript-eslint/no-unused-vars */

// Here are some dummy positions you might find useful for writing unit tests
import { AAPL, AMZN, DIS, WMT, createNamedPosition } from '../__test__/fixtures';

// You can also create custom positions using the `createNamedPosition` helper
const GME = createNamedPosition('GME', 'GameStop Corp.');

/* eslint-enable @typescript-eslint/no-unused-vars */

test('exports a createTransform function', () => {
  expect(createTransform).toBeInstanceOf(Function);
});

// Write your tests here
