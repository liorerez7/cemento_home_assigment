import { Virtuoso } from "react-virtuoso";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

/**
 * Virtualized table body using react-virtuoso.
 * Renders rows efficiently and forwards editing/focus props to each row.
 *
 * @param {{
 *   rowIds: string[],
 *   rowsById: Record<string, any>,
 *   visibleColumns: any[],
 *   editingCell: any,
 *   draftValue: any,
 *   startEdit: Function,
 *   updateDraft: Function,
 *   confirmEdit: Function,
 *   cancelEdit: Function,
 *   focusedCell: any,
 *   setFocusedCell: Function,
 *   rowHeight?: number,
 *   height?: number
 * }} props
 */

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
  height,
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

          const isFocusedRow =
            focusedCell && focusedCell.rowId === rowId;

          const focusedColumnId = isFocusedRow ? focusedCell.columnId : null;

          return (
            <TableRow
              rowId={rowId}  // e.g. "row_28"
              row={row}  // e.g. rowsById["row_28"] = { id:"row_28", name:"Lior"..}
              visibleColumns={visibleColumns}  // e.g. [{id:"name"}, {id:"email"}, {id:"role"}]
              editingCell={rowEditingCell}  // e.g. { rowId:"row_28", columnId:"email" } or null if this row is not being edited
              draftValue={rowDraft}  // e.g. "lior@newmail.com" while editing, otherwise undefined
              startEdit={startEdit}  // function that starts editing a cell
              updateDraft={updateDraft}  // function that updates the temporary typed value
              confirmEdit={confirmEdit}  // function that saves the new value to the real data
              cancelEdit={cancelEdit}  // function that cancels editing and restores original data
              isFocusedRow={Boolean(isFocusedRow)}
              focusedColumnId={focusedColumnId}
              setFocusedCell={setFocusedCell}  // function that updates which cell is focused
            />
          );
        }}
      />
    </div>
  );
}

export default TableBody;
