export const SHAPE_FIELD = {
  key: 'shape',
  label: 'Shape',
  type: 'select',
  options: [
    { value: 'box', label: 'Box' },
    { value: 'triangle', label: 'Triangle' },
  ],
};

// Triangles alternate point-up / point-down by position so a row of them
// doesn't read as a wall of identical arrows.
export function shapeClassName(shape, index = 0) {
  if (shape === 'triangle') return index % 2 === 0 ? 'shape-triangle-up' : 'shape-triangle-down';
  return '';
}
