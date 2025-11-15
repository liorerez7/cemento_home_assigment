import React from 'react';
import TableCell from './TableCell';

/**
 * Represents a single table row.
 * Maps visible columns into TableCell components and forwards
 * edit/focus state for the corresponding cell.
 *
 * @param {{
 *   rowId: string,
 *   row: Record<string, any>,
 *   visibleColumns: any[],
 *   editingCell: { rowId: string, columnId: string } | null,
 *   draftValue: any,
 *   startEdit: Function,
 *   updateDraft: Function,
 *   confirmEdit: Function,
 *   cancelEdit: Function,
 *   focusedCell: any,
 *   setFocusedCell: Function
 * }} props
 */

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

        // only in the row that is on edit, editingCell will not be null.
        const isEditing =
          editingCell &&
          editingCell.columnId === column.id; 

          // if cell is in editing mode, present draftValue
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
