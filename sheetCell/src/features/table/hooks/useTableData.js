import { useMemo, useState } from "react";
import { localStorageAdapter } from "../adapters/localStorageAdapter";
import { denormalizeRows } from "../utils/normalization";
import { generateSchemaAndData } from "../adapters/dataGenerator";
import { DEFAULT_GENERATED_ROWS } from "../utils/constants";

/*
  HIGH LEVEL (future design):

  - Load schema + data from storage or generator.
  - Normalize.
  - Provide O(1) updates.
  - expose saveAll() which persists.
  - Track unsaved changes.

  CURRENT STATUS:
    Step 1 + Step 2 fully implemented:
      ✔ Load from localStorage if present
      ✔ Otherwise load initial props
      ✔ Otherwise generate schema+data automatically
      ✔ Save generated dataset to localStorage
*/

// ----------------------------
// Normalization helpers
// ----------------------------
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

// ----------------------------
// Main hook
// ----------------------------
export default function useTableData({ columns, data }) {
  let initialColumns = columns;
  let initialData = data;

  // -------------------------------------------
  // STEP 1: Try loading from localStorage
  // -------------------------------------------
  if (!initialColumns || !initialData) {
    const stored = localStorageAdapter.getSchemaAndData();
    if (stored) {
      initialColumns = stored.columns;
      initialData = stored.data;
    }
  }

  // -------------------------------------------
  // STEP 2: Nothing found → generate new dataset
  // -------------------------------------------
  if (!initialColumns || !initialData) {
    const generated = generateSchemaAndData(DEFAULT_GENERATED_ROWS);

    initialColumns = generated.columns;
    initialData = generated.data;

    // Save generated dataset so future reloads load from storage
    localStorageAdapter.saveSchemaAndData(generated);
  }

  // -------------------------------------------
  // Internal state (raw, unnormalized)
  // -------------------------------------------
  const [columnState] = useState(() => initialColumns || []);
  const [rowState, setRowState] = useState(() => initialData || []);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Normalize
  const { columnsById, columnOrder } = useMemo(
    () => normalizeColumns(columnState),
    [columnState]
  );

  const { rowsById, rowIds } = useMemo(
    () => normalizeRows(rowState),
    [rowState]
  );

  // ----------------------------
  // Cell update (O(1) row update)
  // ----------------------------
  const updateCell = (rowId, columnId, newValue) => {
    if (!rowId || !columnId) return;

    setRowState((prevRows) => {
      if (!Array.isArray(prevRows)) return prevRows;

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

  // ----------------------------
  // saveAll() – real persistence
  // ----------------------------
  const saveAll = () => {
    const denormalized = denormalizeRows(rowsById, rowIds);

    localStorageAdapter.saveSchemaAndData({
      columns: columnOrder.map((id) => columnsById[id]),
      data: denormalized,
    });

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
