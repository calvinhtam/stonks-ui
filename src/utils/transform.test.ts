import { expect, describe, test } from 'vitest';
import { createTransform } from './transform';

/* eslint-disable @typescript-eslint/no-unused-vars */

// Here are some dummy positions you might find useful for writing unit tests
import { AAPL, AMZN, DIS, WMT, createNamedPosition } from '../__test__/fixtures';

// You can also create custom positions using the `createNamedPosition` helper
const GME = createNamedPosition('GME', 'GameStop Corp.');
const AMZ = createNamedPosition('AMZ', 'AmznWithoutTheN Corp.');
const AMOZ = createNamedPosition('AMOZ', 'AmzMissingOType Corp.');
const OAMZ = createNamedPosition('OAMZ', 'OhhhhAmz Corp.');

/* eslint-enable @typescript-eslint/no-unused-vars */

test('exports a createTransform function', () => {
  expect(createTransform).toBeInstanceOf(Function);
});

// Write your tests here
describe('tests createTransform function', () => {
  const basePositions = [OAMZ, AAPL, AMZN, AMOZ, DIS, WMT, GME, AMZ];
  test('not filter when empty', () => {
    const emptyFilter = createTransform("");
    expect(emptyFilter(basePositions)).toEqual(basePositions);

    // Assuming that any string made of just spaces is also empty
    const emptySpace = createTransform("          ");
    expect(emptySpace(basePositions)).toEqual(basePositions);
  });

  test('filter by start of ticker', () => {
    const startOfTicker = createTransform("Gm");
    expect(startOfTicker(basePositions)).toEqual([GME]);

    const notStartOfTicker = createTransform("apl");
    expect(notStartOfTicker(basePositions)).toEqual([]);
  });

  test('filter by name', () => {
    const middleOfName = createTransform("amestop");
    expect(middleOfName(basePositions)).toEqual([GME]);

    const startOfName = createTransform("apple");
    expect(startOfName(basePositions)).toEqual([AAPL]);

    const incNames = createTransform("inc");
    expect(incNames(basePositions)).toEqual([AAPL, AMZN, WMT]);
  });

  test('sort by match', () => {
    const amazonSortOrder = createTransform("AMZ");
    expect(amazonSortOrder(basePositions)).toEqual([AMZ, AMZN, AMOZ, OAMZ]);
  });
});
