import React from "react";
import { Virtuoso } from "react-virtuoso";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

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
  focusedCell,
  setFocusedCell,
  rowHeight = 44,
  height = 420,
}) {
  return (
    <div className="table-body" style={{ height }}>
      <Virtuoso
        style={{ height: "100%" }}
        totalCount={rowIds.length}
        components={{
          Header: () => <TableHeader columns={visibleColumns} />,
        }}
        itemContent={(index) => {
          const rowId = rowIds[index];
          const row = rowsById[rowId];

          const isEditingRow =
            editingCell && editingCell.rowId === rowId;

          const rowEditingCell = isEditingRow ? editingCell : null;
          const rowDraft = isEditingRow ? draftValue : undefined;

          return (
            <TableRow
              rowId={rowId}
              row={row}
              visibleColumns={visibleColumns}
              editingCell={rowEditingCell}
              draftValue={rowDraft}
              startEdit={startEdit}
              updateDraft={updateDraft}
              confirmEdit={confirmEdit}
              cancelEdit={cancelEdit}
              focusedCell={focusedCell}
              setFocusedCell={setFocusedCell}
            />
          );
        }}
      />
    </div>
  );
}

export default TableBody;
