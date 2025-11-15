import { useMemo, useState } from "react";
import { localStorageAdapter } from "../adapters/localStorageAdapter";
import {
  normalizeColumns,
  normalizeRows,
  denormalizeRows
} from "../utils/normalization";
import { generateSchemaAndData } from "../adapters/dataGenerator";
import { DEFAULT_GENERATED_ROWS } from "../utils/constants";

/**
 * Provides normalized table data (rows & columns) with O(1) cell updates.
 *
 *  - rowsById kept directly in state → updateCell is O(1) 
 *  - columns normalized once into columnsById / columnOrder
 */

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


  const { columnsById, columnOrder } = useMemo(
    () => normalizeColumns(initialColumns),
    [] 
  );


  const initialNormalized = useMemo(
  () => normalizeRows(initialData),
  []
);


  const [rowsById, setRowsById] = useState(() => initialNormalized.rowsById);
  const [rowIds] = useState(() => initialNormalized.rowIds);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateCell = (rowId, columnId, newValue) => {
    if (!rowId || !columnId) return;

    setRowsById((prev) => {
      const prevRow = prev[rowId];
      if (!prevRow) return prev;

      const updatedRow = {
        ...prevRow,
        [columnId]: newValue,
      };

      setHasUnsavedChanges(true);

      return {
        ...prev,
        [rowId]: updatedRow,
      };
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
