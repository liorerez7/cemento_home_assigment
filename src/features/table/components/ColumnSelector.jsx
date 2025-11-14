/**
 * Panel for toggling column visibility.
 * Displays a list of columns with checkboxes and notifies parent via callbacks.
 *
 * @param {{
 *   columns: any[],
 *   visibleColumnIds: Set<string>,
 *   onToggleColumn: (columnId: string) => void,
 *   onClose: () => void
 * }} props
 */

function ColumnSelector({
  columns,
  visibleColumnIds,
  onToggleColumn,
  onClose,
}) {
  const handleCheckboxChange = (columnId) => {
    onToggleColumn(columnId);
  };

  return (
    <div className="table-column-selector">
      <div className="table-column-selector-header">
        <span>Columns</span>
        <button
          type="button"
          className="table-column-selector-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="table-column-selector-body">
        {columns.map((column) => {
          const checked = visibleColumnIds.has(column.id);
          return (
            <label
              key={column.id}
              className="table-column-selector-item"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  handleCheckboxChange(column.id)
                }
              />
              <span className="table-column-selector-label">
                {column.title}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default ColumnSelector;
