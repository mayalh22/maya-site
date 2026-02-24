// REUSABLE GRID COMPONENT
// Usage: <Grid columns={4} rowHeight="220px">...</Grid>
// To change grid layout sitewide, edit this file only.
import React from 'react';

export default function Grid({ columns = 3, rows, rowHeight = '200px', children }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: rowHeight,
    gap: '1.5rem',
    width: '100%',
    ...(rows && { gridTemplateRows: `repeat(${rows}, ${rowHeight})` })
  };
  return <div style={gridStyle}>{children}</div>;
}
