import React from 'react';
import { Position } from '../types';
import './SearchInput.css';
import { createTransform } from '../utils/transform';

export interface SearchInputProps {
  positions: Position[];
  setFilteredPositions: (positions: Position[]) => void;
}

export function SearchInput({ positions, setFilteredPositions }: SearchInputProps): JSX.Element | null {
  const [input, setInput] = React.useState('');
  const [transform, setTransform] = React.useState(
    () => (positionsToTransform: Position[]) => positionsToTransform,
  );

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (input !== e.target.value.toLowerCase().trim()) {
        setInput(e.target.value.toLowerCase().trim());
        const updatedTransform = createTransform(e.target.value.toLowerCase().trim());
        setTransform(() => updatedTransform);
        setFilteredPositions(updatedTransform(positions));
      }
    },
    [input],
  );

  React.useEffect(() => {
    const updatedPositions = transform(positions);
    if (updatedPositions !== positions) {
      setFilteredPositions(updatedPositions);
    }
  }, [positions]);

  return (
    <input
      data-testid="search-input"
      className="SearchInput"
      type="search"
      placeholder="Search for a position"
      onChange={onInputChange}
    />
  );
}
