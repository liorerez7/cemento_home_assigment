// src/features/table/components/TableRow.jsx
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
          />
        );
      })}
    </div>
  );
}

export default React.memo(TableRow);
