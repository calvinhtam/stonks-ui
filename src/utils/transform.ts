import type { Position } from '../types';

export function createTransform(
  searchText: string,
): (positions: Array<Position>) => Array<Position> {
  const searchTextLower = searchText.toLowerCase().trim();
  const filterPosition = filterBySearchTerm(searchTextLower);
  const sortPositions = sortBySearchTerm(searchTextLower);

  return (positions: Array<Position>) => {
    const filteredPositions = positions.filter(filterPosition);

    // If nothing filtered out, just return the new array.
    if (filteredPositions.length === positions.length) {
      return filteredPositions;
    }

    return filteredPositions.sort(sortPositions);
  };
}

const filterBySearchTerm = (searchTerm: string) => {
  return (position: Position) => {
    const ticker = position.ticker.toLowerCase();
    const name = position.name.toLowerCase();
    return ticker.startsWith(searchTerm) || name.includes(searchTerm);
  };
};

const sortBySearchTerm = (searchTerm: string) => {
  return (positionA: Position, positionB: Position) => {
    const sortScoreA = getSortScore(positionA, searchTerm);
    const sortScoreB = getSortScore(positionB, searchTerm);
    if (sortScoreA > sortScoreB) {
      return -1
    } else if (sortScoreA < sortScoreB) {
      return 1;
    }
    return 0;
  };
};

const getSortScore = (position: Position, searchTerm: string): number => {
  const ticker = position.ticker.toLowerCase();
  const name = position.name.toLowerCase();
  if (ticker === searchTerm) {
    return 3;
  } else if (ticker.startsWith(searchTerm)) {
    return 2;
  } else if (name.startsWith(searchTerm)) {
    return 1;
  }
  return 0;
}
