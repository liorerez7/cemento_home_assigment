// src/features/table/hooks/useCellEditing.js
import { useCallback, useState } from "react";

/*
  HIGH LEVEL (final design):

  This hook is responsible for managing a single active cell edit at a time.
  It should:
    - Keep:
        editingCell: { rowId: string, columnId: string } | null
        draftValue: any
    - Expose:
        startEdit(rowId, columnId, initialValue)
        updateDraft(nextValue)
        confirmEdit()
        cancelEdit()
    - Call onConfirm(rowId, columnId, draftValue) when confirmEdit() is called.
    - Prevent multiple concurrent edits.

  CURRENT IMPLEMENTATION:

    - Fully implements the flow above.
    - However, editing is effectively disabled at the UI level for now,
      because CELL_EDITORS is empty and TableCell only allows editing
      when an editor exists for the column type.
*/

export default function useCellEditing({ onConfirm }) {
  const [editingCell, setEditingCell] = useState(null);
  const [draftValue, setDraftValue] = useState(null);

  const startEdit = useCallback((rowId, columnId, initialValue) => {
    if (!rowId || !columnId) return;
    setEditingCell({ rowId, columnId });
    setDraftValue(initialValue);
  }, []);

  const updateDraft = useCallback((nextValue) => {
    setDraftValue(nextValue);
  }, []);

  const clearState = useCallback(() => {
    setEditingCell(null);
    setDraftValue(null);
  }, []);

  const confirmEdit = useCallback(() => {
    if (!editingCell) return;
    if (typeof onConfirm === "function") {
      onConfirm(editingCell.rowId, editingCell.columnId, draftValue);
    }
    clearState();
  }, [editingCell, draftValue, onConfirm, clearState]);

  const cancelEdit = useCallback(() => {
    clearState();
  }, [clearState]);

  return {
    editingCell,
    draftValue,
    startEdit,
    updateDraft,
    confirmEdit,
    cancelEdit,
  };
}
