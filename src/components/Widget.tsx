import React from 'react';
import type { Position } from '../types';
import { PositionGrid } from './PositionGrid';
import { SearchInput } from './SearchInput';

import './Widget.css';

export interface WidgetProps {
  positions: Array<Position>;
}

export function Widget(props: WidgetProps): JSX.Element | null {
  const [filteredPositions, setFilteredPositions] = React.useState(props.positions);
  return (
    <div className="Widget">
      <SearchInput positions={props.positions} setFilteredPositions={setFilteredPositions} />
      <PositionGrid positions={filteredPositions} />
    </div>
  );
}
