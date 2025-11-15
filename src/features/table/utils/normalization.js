export function normalizeColumns(columns) {
  const columnsById = {};
  const columnOrder = [];

  const sorted =
    Array.isArray(columns) && columns.length > 0
      ? [...columns].sort((a, b) => {
          const aOrd = typeof a.ordinalNo === "number" ? a.ordinalNo : 0;
          const bOrd = typeof b.ordinalNo === "number" ? b.ordinalNo : 0;
          return aOrd - bOrd;
        })
      : [];

  for (const col of sorted) {
    if (!col || !col.id) continue;
    columnsById[col.id] = col;
    columnOrder.push(col.id);
  }

  return { columnsById, columnOrder };
}

export function normalizeRows(rows) {
  const rowsById = {};
  const rowIds = [];

  if (!Array.isArray(rows)) {
    return { rowsById, rowIds };
  }

  for (const row of rows) {
    if (!row || !row.id) continue;
    rowsById[row.id] = row;
    rowIds.push(row.id);
  }

  return { rowsById, rowIds };
}

export function denormalizeRows(rowsById, rowIds) {
  if (!rowsById || !rowIds) return [];
  return rowIds.map((id) => rowsById[id]).filter(Boolean);
}

export function denormalizeColumns(columnsById, columnOrder) {
  if (!columnsById || !columnOrder) return [];
  return columnOrder.map((id) => columnsById[id]);
}
