export default function Grid({ columns = 3, rows, rowHeight = '200px', children }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: rowHeight,
        ...(rows && { gridTemplateRows: `repeat(${rows}, ${rowHeight})` }),
      }}
    >
      {children}
    </div>
  );
}