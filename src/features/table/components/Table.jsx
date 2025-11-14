import { useMemo, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SaveButton from './SaveButton';
import ColumnSelector from './ColumnSelector';
import useTableData from '../hooks/useTableData';
import useColumnVisibility from '../hooks/useColumnVisibility';
import useCellEditing from '../hooks/useCellEditing';

function Table({ initialColumns, initialData }) {
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

  const [focusedCell, setFocusedCell] = useState(null);

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

  const gridTemplate = visibleColumns
    .map(col => `minmax(${col.width || 150}px, 1fr)`)
    .join(" ");

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

      <div
        className="table-container"
        style={{ "--table-columns-template": gridTemplate }}>
    
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
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          rowHeight={48}
          height={600}
        />
      </div>
    </div>
  );
}

export default Table;
