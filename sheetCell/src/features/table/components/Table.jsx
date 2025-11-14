// src/features/table/components/Table.jsx
import React, { useMemo, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SaveButton from './SaveButton';
import ColumnSelector from './ColumnSelector';

// NOTE: This hook needs to:
// - Accept initial schema { columns, data } on first mount.
// - Normalize into:
//     columnsById: { [columnId]: ColumnDef }
//     columnOrder: string[]  (ordered by ordinalNo)
//     rowsById: { [rowId]: RowObject }
//     rowIds: string[]       (row order)
// - Expose:
//     hasUnsavedChanges: boolean
//     updateCell(rowId, columnId, newValue): void
//         -> Updates only that cell (O(1)), with new row reference.
//     saveAll(): void
//         -> Persists current {columns, data} into localStorageAdapter (or similar).
// - Optionally: handle load from adapter / generator internally if no initial data provided.
import useTableData from '../hooks/useTableData';

// NOTE: This hook needs to:
// - Accept initialColumnOrder: string[].
// - Maintain visibleColumnIds: Set<string>.
// - Expose:
//     visibleColumnIds: Set<string>
//     toggleColumnVisibility(columnId): void
// - Optionally load/save visibility to localStorage, but not required.
import useColumnVisibility from '../hooks/useColumnVisibility';

// NOTE: This hook needs to:
// - Accept config object { onConfirm } where onConfirm(rowId, columnId, draftValue) calls updateCell.
// - Maintain:
//     editingCell: { rowId, columnId } | null
//     draftValue: any
// - Expose:
//     editingCell
//     draftValue
//     startEdit(rowId, columnId, initialValue)
//     updateDraft(newValue)
//     confirmEdit()
//     cancelEdit()
import useCellEditing from '../hooks/useCellEditing';

function Table({ initialColumns, initialData }) {
  // אם ה-hook שלך כבר מטפל ב-load מה-adapter, אתה יכול לא להעביר initialColumns/initialData בכלל.
  const {
    columnsById,
    columnOrder,
    rowsById,
    rowIds,
    hasUnsavedChanges,
    updateCell,
    saveAll,
  } = useTableData({
    columns: initialColumns,
    data: initialData,
  });

  const {
    visibleColumnIds,
    toggleColumnVisibility,
  } = useColumnVisibility(columnOrder);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const {
    editingCell,
    draftValue,
    startEdit,
    updateDraft,
    confirmEdit,
    cancelEdit,
  } = useCellEditing({
    onConfirm: updateCell,
  });

  const allColumns = useMemo(
    () =>
      columnOrder
        .map((id) => columnsById[id])
        .filter(Boolean),
    [columnOrder, columnsById]
  );

  const visibleColumns = useMemo(
    () =>
      allColumns.filter((col) => visibleColumnIds.has(col.id)),
    [allColumns, visibleColumnIds]
  );

  const handleToggleSelector = () => {
    setIsSelectorOpen((prev) => !prev);
  };

  const handleCloseSelector = () => {
    setIsSelectorOpen(false);
  };

  const handleSave = () => {
    saveAll();
  };

  return (
    <div className="table-root">
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <span className="table-row-count">
            {rowIds.length} rows
          </span>
        </div>
        <div className="table-toolbar-right">
          <button
            type="button"
            className="table-column-selector-toggle"
            onClick={handleToggleSelector}
          >
            Columns
          </button>
          <SaveButton
            onSave={handleSave}
            disabled={!hasUnsavedChanges}
          />
        </div>
      </div>

      {isSelectorOpen && (
        <ColumnSelector
          columns={allColumns}
          visibleColumnIds={visibleColumnIds}
          onToggleColumn={toggleColumnVisibility}
          onClose={handleCloseSelector}
        />
      )}

      <div className="table-container">
        <TableHeader
          columns={visibleColumns}
        />
        <TableBody
          rowIds={rowIds}
          rowsById={rowsById}
          visibleColumns={visibleColumns}
          editingCell={editingCell}
          draftValue={draftValue}
          startEdit={startEdit}
          updateDraft={updateDraft}
          confirmEdit={confirmEdit}
          cancelEdit={cancelEdit}
          rowHeight={40}
          height={400}
        />
      </div>
    </div>
  );
}

export default Table;
