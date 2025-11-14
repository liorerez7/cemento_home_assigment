// src/features/table/components/TableCell.jsx
import React, { useCallback } from 'react';

// NOTE: constants.js needs to export:
//
// export const CELL_RENDERERS = {
//   string: StringCellView,
//   number: NumberCellView,
//   boolean: BooleanCellView,
//   select: SelectCellView,
//   // ...any other supported types
// };
//
// export const CELL_EDITORS = {
//   string: StringEditor,
//   number: NumberEditor,
//   boolean: BooleanEditor,
//   select: SelectEditor,
//   // ...matching the renderers
// };
//
// Each *CellView should be a pure presentational component:
//   ({ value, column }) => JSX
//
// Each *Editor should be a controlled input component with props:
//   {
//     value,
//     column,
//     onChange(nextValue),
//     onCommit(),   // called when user confirms (Enter / blur / button)
//     onCancel(),   // called when user cancels (Esc)
//     autoFocus?: boolean
//   }
import { CELL_RENDERERS, CELL_EDITORS } from '../utils/constants';

function DefaultCellView({ value }) {
  return (
    <span className="table-cell-text">
      {value == null ? '' : String(value)}
    </span>
  );
}

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
}) {
  const ViewComponent =
    CELL_RENDERERS[column.type] || DefaultCellView;

  const EditorComponent =
    CELL_EDITORS[column.type] || null;

  const handleEnterEdit = useCallback(() => {
    if (!EditorComponent) return;
    startEdit(rowId, column.id, value);
  }, [EditorComponent, startEdit, rowId, column.id, value]);

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
        className="table-cell table-cell-view-mode"
        role="gridcell"
        tabIndex={0}
        onDoubleClick={handleEnterEdit}
        onKeyDown={handleKeyDownView}
      >
        <ViewComponent value={value} column={column} />
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

export default React.memo(TableCell);
