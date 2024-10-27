import type { Position } from '../types';

import './PositionGrid.css';

export interface PositionGridProps {
  positions: Array<Position>;
}

export function PositionGrid(props: PositionGridProps): JSX.Element | null {
  const { positions } = props;
  return (
    <table className="PositionGrid">
      <thead>
        <tr className="Header">
          <th className="TickerColumn">Ticker</th>
          <th className="NameColumn">Name</th>
          <th className="ExposureColumn">Exposure</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.id} className="TableRows">
            <td className="TickerContent TickerColumn">{position.ticker}</td>
            <td className="NameContent NameColumn">{position.name}</td>
            <td
              className={`ExposureContent ExposureColumn ${position.exposure >= 0 ? 'Positive' : 'Negative'}`}
            >
              {position.exposure}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
