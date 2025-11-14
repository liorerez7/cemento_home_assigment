// src/features/table/components/TableBody.jsx
import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import TableRow from './TableRow';

function TableBody({
  rowIds,
  rowsById,
  visibleColumns,
  editingCell,
  draftValue,
  startEdit,
  updateDraft,
  confirmEdit,
  cancelEdit,
  rowHeight = 40,
  height = 400,
}) {
  const itemKey = useCallback(
    (index) => rowIds[index],
    [rowIds]
  );

  const RowRenderer = ({ index, style }) => {
    const rowId = rowIds[index];
    const row = rowsById[rowId];

    const isEditingRow =
      editingCell && editingCell.rowId === rowId;

    const rowEditingCell = isEditingRow ? editingCell : null;
    const rowDraftValue = isEditingRow ? draftValue : undefined;

    return (
      <div style={style}>
        <TableRow
          rowId={rowId}
          row={row}
          visibleColumns={visibleColumns}
          editingCell={rowEditingCell}
          draftValue={rowDraftValue}
          startEdit={startEdit}
          updateDraft={updateDraft}
          confirmEdit={confirmEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    );
  };

  return (
    <div className="table-body">
      <List
        height={height}
        itemCount={rowIds.length}
        itemSize={rowHeight}
        itemKey={itemKey}
        width="100%"
      >
        {RowRenderer}
      </List>
    </div>
  );
}

export default TableBody;
