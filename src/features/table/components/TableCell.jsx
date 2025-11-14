import React, { useCallback } from 'react';
import { CELL_RENDERERS, CELL_EDITORS } from '../utils/constants';




/**
 * Renders a single table cell in either view mode or edit mode.
 * Selects the appropriate renderer/editor based on column.type,
 * handles focus, keyboard actions, and edit lifecycle.
 *
 * @param {{
 *   rowId: string,
 *   column: any,
 *   value: any,
 *   isEditing: boolean,
 *   draftValue: any,
 *   startEdit: Function,
 *   updateDraft: Function,
 *   confirmEdit: Function,
 *   cancelEdit: Function,
 *   isFocused: boolean,
 *   setFocusedCell: Function
 * }} props
 */

function TableCell({
  rowId,
  column,
  value,
  isEditing,
  draftValue,
  startEdit,
  updateDraft,
  confirmEdit,
  cancelEdit,
  isFocused,
  setFocusedCell
}) {
  const ViewComponent =
    CELL_RENDERERS[column.type] || DefaultCellView;

  const EditorComponent =
    CELL_EDITORS[column.type] || null;

  const handleEnterEdit = useCallback(() => {
    if (!EditorComponent) return;
    startEdit(rowId, column.id, value);
  }, [EditorComponent, startEdit, rowId, column.id, value]);

  const handleFocusCell = () => {
    setFocusedCell({ rowId, columnId: column.id });
  };

  const handleKeyDownView = (event) => {
    if (!EditorComponent) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      startEdit(rowId, column.id, value);
    }
  };

  const handleChangeDraft = (nextValue) => {
    updateDraft(nextValue);
  };

  const handleCommit = () => {
    confirmEdit();
  };

  const handleCancel = () => {
    cancelEdit();
  };

  const handleEditorKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmEdit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEdit();
    }
  };

  if (!isEditing || !EditorComponent) {
  return (
    <div
      className={`table-cell table-cell-view-mode ${
        isFocused ? "table-cell-focused" : ""
      }`}
      role="gridcell"
      tabIndex={0}
      onFocus={handleFocusCell}
      onClick={handleFocusCell}
      onDoubleClick={handleEnterEdit}
      onKeyDown={handleKeyDownView}
    >
        <div className="table-cell-text">
          <ViewComponent value={value} column={column} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="table-cell table-cell-edit-mode"
      role="gridcell"
      onKeyDown={handleEditorKeyDown}
    >
      <EditorComponent
        value={draftValue}
        column={column}
        onChange={handleChangeDraft}
        onCommit={handleCommit}
        onCancel={handleCancel}
        autoFocus
      />
    </div>
  );
}


function DefaultCellView({ value }) {
  return (
    <span className="table-cell-text">
      {value == null ? '' : String(value)}
    </span>
  );
}


export default React.memo(TableCell);
