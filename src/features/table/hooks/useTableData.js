import { useMemo, useState } from "react";
import { localStorageAdapter } from "../adapters/localStorageAdapter";
import { denormalizeRows } from "../utils/normalization";
import { generateSchemaAndData } from "../adapters/dataGenerator";
import { DEFAULT_GENERATED_ROWS } from "../utils/constants";

/**
 * Provides normalized table data (rows & columns) with O(1) access,
 * local persistence through localStorage, and inline cell updates.
 *
 * Responsibilities:
 *  - Load schema & data from props or localStorage
 *  - Generate dataset if nothing exists
 *  - Normalize rows/columns into byId structures
 *  - Expose updateCell() and saveAll()
 *  - Track unsaved changes
 *
 * @param {{ columns?: any[], data?: any[] }} params
 * @returns {{
 *   columnsById: Record<string, any>,
 *   columnOrder: string[],
 *   rowsById: Record<string, any>,
 *   rowIds: string[],
 *   hasUnsavedChanges: boolean,
 *   updateCell: (rowId: string, columnId: string, value: any) => void,
 *   saveAll: () => void
 * }}
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
  let initialColumns = columns;
  let initialData = data;


  if (!initialColumns || !initialData) {
    const stored = localStorageAdapter.getSchemaAndData();
    if (stored) {
      initialColumns = stored.columns;
      initialData = stored.data;
    }
  }

  if (!initialColumns || !initialData) {
    const generated = generateSchemaAndData(DEFAULT_GENERATED_ROWS);

    initialColumns = generated.columns;
    initialData = generated.data;

    localStorageAdapter.saveSchemaAndData(generated);
  }

  const [columnState] = useState(() => initialColumns || []);
  const [rowState, setRowState] = useState(() => initialData || []);
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
