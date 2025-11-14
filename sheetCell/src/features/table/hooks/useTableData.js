// src/features/table/hooks/useTableData.js
import { useMemo, useState } from "react";

/*
  HIGH LEVEL (future design):

  This hook is the single source of truth for table data.
  In the final version it should:
    - Load schema + data from an adapter (e.g. localStorageAdapter.getSchemaAndData()).
    - If nothing is stored, generate data via dataGenerator.
    - Normalize data into:
        columnsById: { [columnId]: ColumnDef }
        columnOrder: string[]
        rowsById: { [rowId]: RowObject }
        rowIds: string[]
    - Provide updateCell(rowId, columnId, newValue) for O(1) cell updates.
    - Track hasUnsavedChanges and support saveAll() to persist back via adapter.
    - Optionally support replaceAll() when loading a new dataset.

  CURRENT IMPLEMENTATION (minimal to see results):

    - Accepts { columns, data } from props (App).
    - Normalizes them in-memory.
    - updateCell() updates an internal rows array and marks hasUnsavedChanges = true.
    - saveAll() only logs to console and resets hasUnsavedChanges.
*/

function normalizeColumns(columns) {
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

function normalizeRows(rows) {
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

export default function useTableData({ columns, data }) {
  // In the future:
  // - This initial state should come from an adapter (localStorage, dataGenerator, etc).
  const [columnState] = useState(() => columns || []);
  const [rowState, setRowState] = useState(() => data || []);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { columnsById, columnOrder } = useMemo(
    () => normalizeColumns(columnState),
    [columnState]
  );

  const { rowsById, rowIds } = useMemo(
    () => normalizeRows(rowState),
    [rowState]
  );

  const updateCell = (rowId, columnId, newValue) => {
    if (!rowId || !columnId) return;

    setRowState((prevRows) => {
      if (!Array.isArray(prevRows)) return prevRows;

      // Update only the changed row, keep others by reference
      let changed = false;
      const nextRows = prevRows.map((row) => {
        if (!row || row.id !== rowId) return row;
        changed = true;
        return {
          ...row,
          [columnId]: newValue,
        };
      });

      if (changed) {
        setHasUnsavedChanges(true);
      }

      return nextRows;
    });
  };

  const saveAll = () => {
    // In the final version, this should:
    // - Denormalize the data
    // - Call localStorageAdapter.saveSchemaAndData({ columns, data })
    // - Possibly report success/failure to the UI
    // For now, we only log and reset hasUnsavedChanges.
    // eslint-disable-next-line no-console
    console.log("[useTableData] saveAll called - no real persistence yet.");
    setHasUnsavedChanges(false);
  };

  return {
    columnsById,
    columnOrder,
    rowsById,
    rowIds,
    hasUnsavedChanges,
    updateCell,
    saveAll,
  };
}
