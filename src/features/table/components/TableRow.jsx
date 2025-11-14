import React from 'react';
import TableCell from './TableCell';

function TableRow({
  rowId,
  row,
  visibleColumns,
  editingCell,
  draftValue,
  startEdit,
  updateDraft,
  confirmEdit,
  cancelEdit,
  focusedCell,
  setFocusedCell
}) {
  return (
    <div className="table-row">
      {visibleColumns.map((column) => {
        const cellValue = row[column.id];
        const isEditing =
          editingCell &&
          editingCell.columnId === column.id;

        const effectiveDraftValue =
          isEditing && draftValue !== undefined
            ? draftValue
            : cellValue;

        const isFocused =
          focusedCell &&
          focusedCell.rowId === rowId &&
          focusedCell.columnId === column.id;

        return (
          <TableCell
            key={column.id}
            rowId={rowId}
            column={column}
            value={cellValue}
            isEditing={Boolean(isEditing)}
            draftValue={effectiveDraftValue}
            startEdit={startEdit}
            updateDraft={updateDraft}
            confirmEdit={confirmEdit}
            cancelEdit={cancelEdit}
            isFocused={isFocused}
            setFocusedCell={setFocusedCell}
          />
        );
      })}
    </div>
  );
}

export default React.memo(TableRow);
