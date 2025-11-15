import { useCallback, useState } from "react";

/**
 * Manages inline cell editing for a single active cell.
 *
 * Exposes:
 *  - editingCell: { rowId, columnId } | null
 *  - draftValue: current temporary value while editing
 *  - startEdit(rowId, columnId, initialValue)
 *  - updateDraft(nextValue)
 *  - confirmEdit() → calls onConfirm(rowId, columnId, draftValue)
 *  - cancelEdit()
 *
 * @param {{ onConfirm: (rowId: string, columnId: string, value: any) => void }} params
 * @returns {{
 *   editingCell: { rowId: string, columnId: string } | null,
 *   draftValue: any,
 *   startEdit: Function,
 *   updateDraft: Function,
 *   confirmEdit: Function,
 *   cancelEdit: Function
 * }}
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
    
    //calling 'updateCell' from useTableData via Table component
    onConfirm(editingCell.rowId, editingCell.columnId, draftValue);
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
