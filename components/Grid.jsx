export default function Grid({ columns = 3, rows, rowHeight = '200px', children }) {
  const gridClass = 'grid';
  const style = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: rowHeight,
    ...(rows && { gridTemplateRows: `repeat(${rows}, ${rowHeight})` })
  };
  return <div className={gridClass} style={style}>{children}</div>;
}
